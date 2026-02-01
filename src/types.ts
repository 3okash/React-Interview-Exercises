export type TaskType = 'Research' | 'Feature' | 'Bug Fix';

export interface ToDoItem {
    id: number;
    title: string;
    type: TaskType;
}

export interface Question {
    id: number;
    question: string;
    answer: string;
}

export interface Country {
    name: string;
    value: string;
    cities: string[];
}

export interface SliderImage {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

export interface MenuItemType {
    id: string | number;
    label: string;
    href?: string;
    children?: MenuItemType[];
}

export interface TaskWithTimer {
    id: number;
    title: string;
    type: 'Work' | 'Study' | 'Exercise';
    timeLeft: number;
}export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string;
    image?: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export type Severity = 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
export type IssueStatus = 'OPEN' | 'CONFIRMED' | 'RESOLVED' | 'CLOSED';

export interface Issue {
    readonly key: string;
    readonly component: string;
    readonly severity: Severity;
    readonly status: IssueStatus;
    message: string;
    rule: string;
    effort: string;
    type: string;
    line?: number;
    creationDate: string;
    id: string;
}

export interface AttendeeData {
    name: string;
    email: string;
    ticket_type: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}
