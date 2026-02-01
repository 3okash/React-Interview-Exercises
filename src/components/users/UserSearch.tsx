import React, { useEffect, useState } from "react"
import type { User } from "../../types"

export default function UserSearch() {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [debounceValue, setDebounceValue] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) throw new Error('Failed to fetch users')
                const result: User[] = await response.json()
                setUsers(result)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm)
        }, 500)
        return () => clearTimeout(handler)
    }, [searchTerm])

    const filteredList = users.filter(user => (
        user.name.toLowerCase().includes(debounceValue.toLowerCase()) ||
        user.email.toLowerCase().includes(debounceValue.toLowerCase())
    ))

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Directory</h2>
                <div className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 italic">
                    {loading ? 'Fetching...' : `${filteredList.length} users found`}
                </div>
            </div>

            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4" />
                    <p className="text-gray-400 font-medium">Loading users...</p>
                </div>
            ) : filteredList.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg italic">No users match your search terms.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredList.map(user => (
                        <div key={user.id} className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h3 className="font-bold text-gray-800 truncate">{user.name}</h3>
                                <p className="text-sm text-gray-400 truncate">{user.email}</p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors uppercase cursor-pointer">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
