import { useState, useCallback } from "react"

const getRandomColor = (type: 'hex' | 'rgb') => {
    if (type === 'hex') {
        return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    } else {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

export default function Colors() {
    const [colorType, setColorType] = useState<'hex' | 'rgb'>('hex')
    const [color, setColor] = useState(() => getRandomColor('hex'))

    const generateRandomColor = useCallback(() => {
        setColor(getRandomColor(colorType));
    }, [colorType]);

    const handleTypeChange = (type: 'hex' | 'rgb') => {
        setColorType(type);
        setColor(getRandomColor(type));
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        alert(`Copied ${color} to clipboard!`);
    }

    return (
        <div className="min-h-[600px] rounded-xl flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden relative" style={{ backgroundColor: color }}>
            {/* Controls Overlay */}
            <div className="absolute top-6 flex gap-3 z-10">
                <button
                    onClick={() => handleTypeChange('hex')}
                    className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all cursor-pointer ${colorType === 'hex' ? 'bg-white text-gray-900' : 'bg-white/30 text-white backdrop-blur-md'
                        }`}
                >
                    HEX Mode
                </button>
                <button
                    onClick={() => handleTypeChange('rgb')}
                    className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all cursor-pointer ${colorType === 'rgb' ? 'bg-white text-gray-900' : 'bg-white/30 text-white backdrop-blur-md'
                        }`}
                >
                    RGB Mode
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-black/20 backdrop-blur-lg p-10 rounded-3xl border border-white/20 text-center shadow-2xl flex flex-col items-center max-w-sm mx-auto">
                <h2 className="text-white/70 uppercase tracking-widest text-sm font-bold mb-2">Random Color Generator</h2>
                <h1 className="text-white text-5xl font-mono font-black mb-8 break-all">{color.toUpperCase()}</h1>

                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={generateRandomColor}
                        className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                    >
                        Generate New Color
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="w-full bg-black/30 hover:bg-black/40 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10 cursor-pointer"
                    >
                        📋 Copy Code
                    </button>
                </div>
            </div>

            <p className="absolute bottom-6 text-white/50 text-xs font-mono">Current mode: {colorType.toUpperCase()}</p>
        </div>
    )
}