import { useState } from "react";

const FRUITS = [
    "Apple", "Banana", "Orange", "Strawberry", "Grapes", "Mango",
    "Pineapple", "Blueberry", "Raspberry", "Blackberry", "Watermelon",
    "Peach", "Cherry", "Kiwi", "Papaya", "Pear", "Plum", "Apricot",
    "Pomegranate", "Lemon"
];

export default function FruitList() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredFruits = FRUITS.filter((fruit) =>
        fruit.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6">Fruit Search</h2>

            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search for a fruit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all placeholder:italic"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🍎
                </span>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {filteredFruits.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-400 italic">No fruits found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-gray-100">
                        {filteredFruits.map((fruit) => (
                            <div key={fruit} className="bg-white p-4 text-center hover:bg-orange-50 transition-colors cursor-default group">
                                <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">{fruit}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-gray-400 text-right italic">
                Showing {filteredFruits.length} of {FRUITS.length} total fruits
            </div>
        </div>
    )
}
