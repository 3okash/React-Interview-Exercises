import React, { useState } from "react"

export default function MirrorText() {
    const [text, setText] = useState<string>("")

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <div className='p-5'>
            <h2 className="text-2xl font-bold mb-4">Mirror Text</h2>
            <hr />

            <div className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source Input</label>
                    <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
                        type="text"
                        placeholder="Start typing anything..."
                        value={text}
                        onChange={handleText}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mirror Output</label>
                    <div className="min-h-[100px] p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center italic text-gray-400">
                        <p className={`text-2xl font-bold break-all transition-all ${text ? 'text-blue-600' : 'text-gray-300'}`}>
                            {text ? text : 'Wait for it...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}