import React, { useState } from "react"
import type { AttendeeData } from "../../types"

const TICKET_TYPES = [
    { value: "standard", label: "Standard" },
    { value: "vip", label: "VIP" },
    { value: "premium", label: "Premium" },
]

export default function Attendee() {
    const [userData, setUserData] = useState<AttendeeData>({
        name: '',
        email: '',
        ticket_type: 'standard'
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
        if (error) setError("")
        if (success) setSuccess(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!userData.name.trim()) {
            setError("Name is required.")
            return
        }
        if (!userData.email.includes("@")) {
            setError("Please enter a valid email.")
            return
        }
        setError("")
        setSuccess(true)
        console.log("Submitted: ", userData)
    }

    return (
        <div className="p-5 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Event Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 animate-slide-down">
                        ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100 animate-slide-down">
                        ✅ Registration successful!
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="e.g. John Doe"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                    <select
                        name="ticket_type"
                        value={userData.ticket_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white"
                    >
                        {TICKET_TYPES.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                >
                    Complete Registration
                </button>
            </form>
        </div>
    )
}
