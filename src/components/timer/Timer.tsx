import { useEffect, useState } from "react"

const INITIAL_TIME = 60;

export default function Timer() {
    const [seconds, setSeconds] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isActive && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, seconds]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setSeconds(INITIAL_TIME);
        setIsActive(false);
    };

    const progress = (seconds / INITIAL_TIME) * 100;

    return (
        <div className="p-5 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-10 w-full text-left">Focus Countdown</h2>

            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full -rotate-90 transform">
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-100"
                    />
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={754}
                        strokeDashoffset={754 - (754 * progress) / 100}
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ${seconds < 10 ? 'text-red-500' : 'text-blue-600'
                            }`}
                    />
                </svg>

                <div className="absolute flex flex-col items-center">
                    <span className={`text-6xl font-black font-mono tabular-nums tracking-tighter ${seconds < 10 && seconds > 0 && isActive ? 'animate-pulse text-red-500' : 'text-gray-800'
                        }`}>
                        {seconds}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-2">
                        Seconds Left
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mt-12 w-full max-w-sm">
                <button
                    onClick={toggleTimer}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer ${isActive
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-amber-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                        }`}
                >
                    {isActive ? "Pause" : seconds === 0 ? "Start" : "Resume"}
                </button>
                <button
                    onClick={resetTimer}
                    className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-2xl transition-all cursor-pointer"
                >
                    Reset
                </button>
            </div>

            {seconds === 0 && (
                <p className="mt-8 text-red-500 font-bold animate-bounce uppercase tracking-tighter">
                    Time is up! 🔔
                </p>
            )}
        </div>
    );
}
