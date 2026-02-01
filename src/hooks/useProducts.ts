import { useEffect, useState, useCallback } from "react"
import type { Product } from '../types'

const API_URL = 'https://fakestoreapi.com/products'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const request = await fetch(API_URL)
            if (!request.ok) throw new Error('Failed to fetch products')
            const response: Product[] = await request.json()
            setProducts(response)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return { products, loading, error, refetch: fetchProducts }
}
