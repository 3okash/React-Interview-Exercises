import { useEffect, useState, useCallback } from "react"

interface Product {
    id: number
    title: string
    price: number
}

export default function LoadMore() {
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const limit = 5
            const skip = page * limit
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&select=title,price&skip=${skip}`)
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()

            if (data.products.length < limit) {
                setHasMore(false)
            }

            setProducts(prev => [...prev, ...data.products])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [page]);

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <div className='p-5 max-w-2xl mx-auto'>
            <h2 className="text-2xl font-bold mb-6">Product Catalog</h2>

            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-100 rounded-xl p-5 shadow-sm bg-white hover:border-blue-200 transition-colors flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold text-gray-800 text-lg">
                                {product.title}
                            </p>
                            <p className="text-blue-600 font-bold mt-1">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                            #{product.id}
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center">
                    {error}
                </div>
            )}

            <div className="mt-10 flex flex-col items-center">
                {hasMore ? (
                    <button
                        disabled={loading}
                        onClick={() => setPage(prev => prev + 1)}
                        className={`px-8 py-3 rounded-full font-bold transition-all shadow-md transform active:scale-95 cursor-pointer ${loading
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </span>
                        ) : "Load More Products"}
                    </button>
                ) : (
                    <p className="text-gray-400 font-medium italic">You've reached the end of the collection.</p>
                )}

                <p className="mt-3 text-gray-400 text-sm">
                    Showing {products.length} products
                </p>
            </div>
        </div>
    )
}