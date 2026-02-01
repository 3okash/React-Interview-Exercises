import { useState } from 'react'
import data from './data'
import type { Question } from '../../types'

export default function Accordion() {
    const [selected, setSelected] = useState<number | null>(null)
    const [isMulti, setIsMulti] = useState<boolean>(false)
    const [multiple, setMultiple] = useState<number[]>([])

    const handleSingleSelection = (id: number) => {
        setSelected(prev => (prev === id ? null : id))
    }

    const handleMultiSelection = (id: number) => {
        const copyMultiple = [...multiple]
        const findIndexOfId = copyMultiple.indexOf(id)

        if (findIndexOfId === -1) copyMultiple.push(id)
        else copyMultiple.splice(findIndexOfId, 1)

        setMultiple(copyMultiple)
    }

    return (
        <div className='h-screen p-5 flex flex-col items-center'>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Accordion</h2>

            <button
                onClick={() => setIsMulti(!isMulti)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all mb-8 cursor-pointer ${isMulti
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
            >
                {isMulti ? "Disable Multi Selection" : "Enable Multi Selection"}
            </button>

            <div className='w-full max-w-2xl space-y-4'>
                {data.map((item: Question) => (
                    <div
                        key={item.id}
                        className='border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'
                    >
                        <div
                            onClick={() => isMulti ? handleMultiSelection(item.id) : handleSingleSelection(item.id)}
                            className='flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'
                        >
                            <h3 className='font-bold text-lg text-gray-700'>{item.question}</h3>
                            <span className={`text-2xl transition-transform duration-300 ${(isMulti ? multiple.includes(item.id) : selected === item.id) ? 'rotate-180' : ''
                                }`}>
                                ↓
                            </span>
                        </div>

                        {(isMulti ? multiple.includes(item.id) : selected === item.id) && (
                            <div className='p-5 bg-white text-gray-600 leading-relaxed border-t border-gray-100 animate-slide-down'>
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}