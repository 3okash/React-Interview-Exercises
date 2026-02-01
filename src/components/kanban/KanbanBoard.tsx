import { useState } from "react";

type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface Task {
    id: number;
    title: string;
    status: Status;
}

const STATUSES: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<Status>('TODO');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now(),
            title: title.trim(),
            status: selectedStatus
        };

        setTasks([...tasks, newTask]);
        setTitle('');
    };

    const handleDelete = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateStatus = (id: number, newStatus: Status) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-8">Mini Kanban Board</h2>

            <form onSubmit={handleAddTask} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 ml-1">Task Title</label>
                    <input
                        name='task'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs doing?"
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
                <div className="md:w-48">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 ml-1">Initial Status</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as Status)}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium bg-white"
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="md:mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95 cursor-pointer"
                >
                    Create Task
                </button>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {STATUSES.map(status => (
                    <div key={status} className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-black text-gray-400 uppercase tracking-widest text-sm">
                                {status.replace('_', ' ')}
                            </h3>
                            <span className="text-xs font-bold bg-white border border-gray-100 px-2 py-0.5 rounded-full text-gray-400">
                                {tasks.filter(t => t.status === status).length}
                            </span>
                        </div>

                        <div className="bg-gray-50/50 rounded-[2rem] p-4 min-h-[400px] border-2 border-dashed border-gray-200 flex flex-col gap-4">
                            {tasks.filter(t => t.status === status).map(task => (
                                <div key={task.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all animate-slide-down group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="font-bold text-gray-800 leading-tight flex-1">
                                            {task.title}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="text-gray-200 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                                        {STATUSES.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(task.id, s)}
                                                className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded transition-all cursor-pointer ${task.status === s
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {s === 'IN_PROGRESS' ? 'Progress' : s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {tasks.filter(t => t.status === status).length === 0 && (
                                <div className="flex-1 flex items-center justify-center opacity-20">
                                    <p className="text-sm font-bold italic uppercase tracking-tighter">Empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
