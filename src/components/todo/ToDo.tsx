import React, { useState } from "react"
import type { ToDoItem, TaskType } from "../../types"

const TASK_TYPES: TaskType[] = ['Research', 'Feature', 'Bug Fix']

export default function ToDo() {
    const [title, setTitle] = useState("")
    const [type, setType] = useState<TaskType>("Research")
    const [tasks, setTasks] = useState<ToDoItem[]>([])

    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as TaskType)
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        const newTask: ToDoItem = {
            id: Date.now(),
            title: title,
            type: type
        }
        setTasks([...tasks, newTask])
        setTitle("")
    }

    const dropTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className='h-screen p-5'>
            <h2 className="text-2xl">ToDo</h2>
            <hr />
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-4 ml-0">
                <input
                    type="text"
                    id="todo"
                    name="todo"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Enter your task..."
                    className=" w-full px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select value={type} onChange={handleType}
                    className=" w-full mt-5 px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {TASK_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <button type="submit"
                    className=" px-4 py-2 mt-5 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors">
                    Add
                </button>
            </form>
            <hr className="mt-4" />
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="mt-5 flex justify-between items-center p-3 border border-gray-300 rounded-md shadow-sm bg-white"
                >
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <span
                        className={`
                    px-2 py-1 text-sm font-semibold rounded-full
                    ${task.type === "Research"
                                ? "bg-green-100 text-green-800"
                                : task.type === "Feature"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                            }
                    `}
                    >
                        {task.type}
                    </span>
                    <button
                        onClick={() => dropTask(task.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    )
}