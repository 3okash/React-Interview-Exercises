import { useState, useEffect, useMemo } from "react";
import type { Issue } from '../types';

// Mock data to ensure it works without a running backend
const MOCK_ISSUES: Issue[] = [
    {
        id: "1",
        key: "REACT-001",
        component: "src/App.tsx",
        severity: "CRITICAL",
        status: "OPEN",
        message: "Missing key prop in list rendering",
        rule: "react/jsx-key",
        effort: "15min",
        type: "BUG",
        line: 45,
        creationDate: "2024-01-20T10:00:00Z"
    },
    {
        id: "2",
        key: "TS-002",
        component: "src/types.ts",
        severity: "MAJOR",
        status: "CONFIRMED",
        message: "Explicit 'any' type detected",
        rule: "@typescript-eslint/no-explicit-any",
        effort: "1h 30min",
        type: "CODE_SMELL",
        line: 12,
        creationDate: "2024-01-22T14:30:00Z"
    }
];

const ISSUES_API = "http://localhost:3001/issues";

export function useIssueExplorer() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sevFilter, setSevFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [debounce, setDebounce] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const request = await fetch(ISSUES_API);
                if (!request.ok) throw new Error("API not available");
                const response = await request.json();
                setIssues(response);
            } catch (err) {
                console.warn("Falling back to mock data: ", err);
                setIssues(MOCK_ISSUES);
            }
        };
        fetchIssues();
    }, []);

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounce(searchTerm);
        }, 300); // Reduced delay for better UX
        return () => clearTimeout(handle);
    }, [searchTerm]);

    const filteredIssues = useMemo(() => {
        return issues.filter(issue => {
            const matchesSearch = issue.message.toLowerCase().includes(debounce.toLowerCase());
            const matchSev = sevFilter ? issue.severity === sevFilter : true;
            const matchStatus = statusFilter ? issue.status === statusFilter : true;

            return matchesSearch && matchSev && matchStatus;
        });
    }, [debounce, issues, sevFilter, statusFilter]);

    const stats = useMemo(() => {
        let totalMinutes = 0;

        filteredIssues.forEach(issue => {
            const hoursMatch = issue.effort.match(/(\d+)h/);
            const minsMatch = issue.effort.match(/(\d+)min/);

            if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
            if (minsMatch) totalMinutes += parseInt(minsMatch[1]);
        });

        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;

        const formattedEffort = [
            h > 0 ? `${h}h` : null,
            m > 0 || h === 0 ? `${m}min` : null
        ].filter(Boolean).join(' ');

        return {
            count: filteredIssues.length,
            totalEffort: formattedEffort
        };
    }, [filteredIssues]);

    return {
        filteredIssues,
        searchTerm,
        setSearchTerm,
        sevFilter,
        setSevFilter,
        statusFilter,
        setStatusFilter,
        stats
    };
}
