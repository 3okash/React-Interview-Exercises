import { useEffect, useState } from "react"
import type { User } from "../../types"

interface Subscriber extends User {
    isActive: boolean;
}

export default function Subscribers() {
    const [subs, setSubs] = useState<Subscriber[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const subscribers: User[] = await response.json()
                setSubs(subscribers.map(s => ({ ...s, isActive: Math.random() > 0.3 })))
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        }
        fetchSubscribers()
    }, [])

    const handleDelete = (id: number) => {
        setSubs(prev => prev.filter(sub => sub.id !== id))
    }

    const toggleStatus = (id: number) => {
        setSubs(prev => prev.map(sub =>
            sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
        ))
    }

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
                    <p className="text-sm text-gray-400">Manage your audience and active memberships</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black text-gray-800">{subs.length}</p>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total Members</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100">
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Subscriber</th>
                                <th className="px-6 py-4">Handle</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                                        Loading audience data...
                                    </td>
                                </tr>
                            ) : subs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                                        No subscribers found.
                                    </td>
                                </tr>
                            ) : subs.map(sub => (
                                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(sub.id)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${sub.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                }`}
                                        >
                                            {sub.isActive ? 'Active' : 'Idle'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-800">{sub.name}</p>
                                            <p className="text-xs text-gray-400">{sub.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-mono text-blue-500">@{sub.username.toLowerCase()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-2 cursor-pointer"
                                                title="Remove Subscriber"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
