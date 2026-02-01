import { useState } from "react";

const ITEMS = [
    { id: 1, name: "Project Dashboard" },
    { id: 2, name: "User Management" },
    { id: 3, name: "Billing System" },
    { id: 4, name: "API Reference" },
    { id: 5, name: "Data Explorer" },
];

export default function SelectAll() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const isAllSelected = selectedIds.length === ITEMS.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < ITEMS.length;

    const toggleAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(ITEMS.map(i => i.id));
        }
    };

    const toggleItem = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="p-5 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-6">Bulk Selection</h2>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Header / Select All */}
                <label className="flex items-center gap-4 p-5 bg-gray-50 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleAll}
                            className="w-6 h-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer peer appearance-none checked:bg-blue-600 checked:border-blue-600"
                        />
                        {isIndeterminate && !isAllSelected && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-0.5 bg-gray-400 rounded-full" />
                            </div>
                        )}
                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs font-bold">
                            ✓
                        </span>
                    </div>
                    <span className="font-bold text-gray-700">Select All Tasks</span>
                    <span className="ml-auto text-xs font-bold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        {selectedIds.length} / {ITEMS.length}
                    </span>
                </label>

                {/* List Items */}
                <div className="divide-y divide-gray-50">
                    {ITEMS.map(item => (
                        <label
                            key={item.id}
                            className={`flex items-center gap-4 p-5 cursor-pointer transition-colors ${selectedIds.includes(item.id) ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleItem(item.id)}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className={`transition-all ${selectedIds.includes(item.id) ? 'text-blue-900 font-medium' : 'text-gray-600'
                                }`}>
                                {item.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex gap-2">
                <button
                    disabled={selectedIds.length === 0}
                    className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => {
                        alert(`Deleting ${selectedIds.length} items...`);
                        setSelectedIds([]);
                    }}
                >
                    Delete Selected
                </button>
                <button
                    disabled={selectedIds.length === 0}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => alert(`Archiving ${selectedIds.length} items...`)}
                >
                    Archive
                </button>
            </div>
        </div>
    );
}
