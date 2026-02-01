import { useEffect, useState } from "react"

export default function Counter() {
    const [count, setCount] = useState(60)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isActive && count > 0) {
            intervalId = setInterval(() => {
                setCount(prev => prev - 1)
            }, 1000)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [isActive, count])

    const reset = () => {
        setCount(60)
        setIsActive(true)
    }

    const toggle = () => {
        setIsActive(!isActive)
    }

    return (
        <div className='p-5 flex flex-col items-center'>
            <h2 className="text-2xl font-bold mb-6">Countdown Timer</h2>

            <div className="relative flex items-center justify-center">
                <div className={`w-48 h-48 rounded-full border-8 flex items-center justify-center transition-colors duration-300 ${count === 0 ? 'border-red-500' : 'border-blue-500'
                    }`}>
                    <span className={`text-6xl font-black tabular-nums ${count <= 10 && count > 0 ? 'text-red-500 animate-pulse' : 'text-gray-800'
                        }`}>
                        {count}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mt-10">
                <button
                    onClick={toggle}
                    disabled={count === 0}
                    className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md cursor-pointer ${count === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                            isActive ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                >
                    {isActive ? 'Pause' : 'Resume'}
                </button>
                <button
                    onClick={reset}
                    className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                    Reset
                </button>
            </div>

            {count === 0 && (
                <p className="mt-4 text-red-500 font-bold animate-bounce text-lg">Time's Up! 🔔</p>
            )}
        </div>
    )
}