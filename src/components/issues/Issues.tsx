import type { IssueStatus, Severity } from '../../types'
import { useIssueExplorer } from "../../hooks/useIssueExplorer"

const SEVERITIES: Severity[] = ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO']
const STATUS_TYPES: IssueStatus[] = ['OPEN', 'CONFIRMED', 'RESOLVED', 'CLOSED']

const SEVERITY_COLORS: Record<Severity, string> = {
    BLOCKER: "bg-red-600",
    CRITICAL: "bg-red-400",
    MAJOR: "bg-orange-400",
    MINOR: "bg-amber-400",
    INFO: "bg-blue-400"
}

export default function Issues() {
    const {
        filteredIssues,
        searchTerm,
        setSearchTerm,
        sevFilter,
        setSevFilter,
        statusFilter,
        setStatusFilter,
        stats
    } = useIssueExplorer()

    return (
        <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Issue Explorer</h2>
                    <p className="text-sm text-gray-400">Analyze and manage codebase quality</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Issues</p>
                        <p className="text-xl font-black text-gray-800">{stats.count}</p>
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
                        <p className="text-[10px] uppercase font-bold text-gray-400">Est. Effort</p>
                        <p className="text-xl font-black text-blue-600">{stats.totalEffort}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Filter by message..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>

                    <div className="flex gap-4">
                        <select
                            onChange={(e) => setSevFilter(e.target.value)}
                            value={sevFilter}
                            className="px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer min-w-[140px]"
                        >
                            <option value="">All Severities</option>
                            {SEVERITIES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer min-w-[140px]"
                        >
                            <option value="">All Statuses</option>
                            {STATUS_TYPES.map((i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {filteredIssues.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 italic">No issues found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredIssues.map((issue) => (
                        <div key={issue.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all p-5 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                                        {issue.key}
                                    </span>
                                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase ${SEVERITY_COLORS[issue.severity]}`}>
                                        {issue.severity}
                                    </span>
                                </div>
                                <span className={`text-[10px] uppercase font-black tracking-widest ${issue.status === 'OPEN' ? 'text-red-400' : 'text-green-400'
                                    }`}>
                                    {issue.status}
                                </span>
                            </div>

                            <p className="text-gray-800 font-bold mb-4 line-clamp-2 leading-tight">
                                {issue.message}
                            </p>

                            <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-gray-50">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Type</p>
                                    <p className="text-xs font-medium text-gray-600">{issue.type}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Effort</p>
                                    <p className="text-xs font-medium text-blue-600">{issue.effort}</p>
                                </div>
                                <div className="col-span-2 overflow-hidden">
                                    <p className="text-[10px] uppercase font-bold text-gray-400">File</p>
                                    <p className="text-xs font-mono text-gray-400 truncate whitespace-nowrap">
                                        {issue.component} {issue.line && <span className="text-gray-200 ml-1">:{issue.line}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
