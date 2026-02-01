import React, { useEffect, useState } from "react"
import type { TaskWithTimer } from "../../types"

const TASK_TYPES = ['Work', 'Study', 'Exercise']

export default function TaskCounter() {
    const [tasks, setTasks] = useState<TaskWithTimer[]>([])
    const [taskType, setTaskType] = useState<'Work' | 'Study' | 'Exercise'>('Work')
    const [title, setTitle] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim()) {
            const newTask: TaskWithTimer = {
                id: Date.now(),
                title: title.trim(),
                type: taskType,
                timeLeft: 60
            }
            setTasks([...tasks, newTask])
            setTitle('')
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskType(e.target.value as TaskWithTimer['type'])
    }


    const removeTask = (id: number) => {
        setTasks((prev) => prev.filter(task => task.id !== id))
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTasks(prev =>
                prev.map(task => ({
                    ...task,
                    timeLeft: task.timeLeft > 0 ? task.timeLeft - 1 : 0
                }))
            )
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className='p-5'>
            <h2 className="text-2xl font-bold mb-6">Task Timers</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="What needs to be done?"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            onChange={handleTypeChange}
                            value={taskType}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            {TASK_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer">
                    Start Timer
                </button>
            </form>

            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-400 py-10 italic">No active tasks</p>
                ) : (
                    tasks.map((t) => (
                        <div
                            key={t.id}
                            className="group flex justify-between items-center p-4 border border-gray-100 rounded-2xl shadow-sm bg-white hover:border-blue-200 transition-all"
                        >
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800">{t.title}</h3>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-500">
                                    {t.type}
                                </span>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className={`px-4 py-2 rounded-xl text-lg font-mono font-bold tabular-nums ${t.timeLeft < 10 ? "bg-red-100 text-red-600 animate-pulse" :
                                    t.timeLeft < 30 ? "bg-yellow-100 text-yellow-700" :
                                        "bg-green-100 text-green-700"
                                    }`}>
                                    {t.timeLeft}s
                                </div>
                                <button
                                    onClick={() => removeTask(t.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                                    title="Delete task"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}