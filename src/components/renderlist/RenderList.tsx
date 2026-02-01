import React, { useState } from "react"
import type { ToDoItem as Task, TaskType } from "../../types"

const TASK_TYPES: TaskType[] = ['Research', 'Feature', 'Bug Fix']

export default function RenderList() {
    const [list, setList] = useState<Task[]>([])
    const [text, setText] = useState<string>("")
    const [type, setType] = useState<TaskType>("Research")
    const [filter, setFilter] = useState<TaskType | "">("")

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return
        const newItem: Task = {
            id: Date.now(),
            title: text,
            type: type
        }
        setList([...list, newItem])
        setText('')
        setType('Research')
    }

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as TaskType)
    }

    const handleDrop = (id: number) => {
        setList(list.filter(item => item.id !== id))
    }

    const filteredList = filter ? list.filter(item => item.type === filter) : list

    return (
        <div className='p-5'>
            <h2 className="text-2xl font-bold mb-4">Advanced List Rendering</h2>
            <p className="text-gray-500 mb-6 text-sm italic">Example of filtering and multi-attribute list items.</p>
            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                {/* Addition Form */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700">Add New Item</h3>
                    <form onSubmit={handleForm} className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <input
                            type="text"
                            placeholder="Add item title..."
                            value={text}
                            onChange={handleText}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        />
                        <select
                            value={type}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={handleType}
                        >
                            {TASK_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer active:scale-95">
                            Add to List
                        </button>
                    </form>
                </div>

                {/* Filter & List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">Item List</h3>
                        <select
                            value={filter}
                            className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={(e) => setFilter(e.target.value as TaskType | "")}
                        >
                            <option value=''>Show All Types</option>
                            {TASK_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-3 min-h-[200px]">
                        {filteredList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-400">List is empty</p>
                            </div>
                        ) : (
                            filteredList.map((item) => (
                                <div key={item.id} className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <p className="font-medium text-gray-800">{item.title}</p>
                                        <span className={`text-[10px] w-fit uppercase tracking-wider font-bold mt-1 px-1.5 py-0.5 rounded ${item.type === 'Research' ? 'bg-purple-100 text-purple-700' :
                                                item.type === 'Feature' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <button
                                        className="text-gray-300 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDrop(item.id)}
                                        title="Remove item"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}