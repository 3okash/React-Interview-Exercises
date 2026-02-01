import { useEffect, useMemo, useState } from "react"
import { useProducts } from "../../hooks/useProducts"

export default function ProductList() {
    const { products, loading } = useProducts()
    const [searchTerm, setSearchTerm] = useState("")
    const [debounce, setDebounce] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(searchTerm)
        }, 500)
        return () => clearTimeout(handler)
    }, [searchTerm])

    const categories = Array.from(new Set(products.map(p => p.category)))

    const filteredProducts = useMemo(() => {
        let list = products.filter(product =>
            (
                product.title.toLowerCase().includes(debounce.toLowerCase()) ||
                product.description?.toLowerCase().includes(debounce.toLowerCase())
            ) &&
            (selectedCategory ? product.category === selectedCategory : true)
        )

        if (sortOrder === "asc") {
            list = [...list].sort((a, b) => a.price - b.price)
        } else if (sortOrder === "desc") {
            list = [...list].sort((a, b) => b.price - a.price)
        }

        return list
    }, [debounce, products, selectedCategory, sortOrder])

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Catalog Browser</h2>
                <div className="text-sm font-bold text-blue-500 bg-blue-50 px-4 py-1 rounded-full border border-blue-100 italic">
                    {loading ? "Syncing inventory..." : `${filteredProducts.length} items`}
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-10 space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or description..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 ml-1">Filter Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-700 font-medium"
                        >
                            <option value="">All Departments</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 ml-1">Price Sorting</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "none")}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-700 font-medium"
                        >
                            <option value="none">Relance (Default)</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-[400px] bg-gray-100 rounded-3xl" />
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="py-32 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-xl italic font-medium">No results found for your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col overflow-hidden group">
                            <div className="h-64 bg-white p-8 flex items-center justify-center relative">
                                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-500" />
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                    {product.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-800 line-clamp-2 leading-snug flex-1 mr-4">
                                        {product.title}
                                    </h3>
                                    <span className="text-xl font-black text-blue-600 font-mono">
                                        ${product.price}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-1">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1">
                                        <span className="text-orange-400 text-lg">★</span>
                                        <span className="font-bold text-gray-700">{product.rating?.rate}</span>
                                        <span className="text-[10px] text-gray-300 ml-1">({product.rating?.count})</span>
                                    </div>
                                    <button className="bg-gray-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-all cursor-pointer">
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
