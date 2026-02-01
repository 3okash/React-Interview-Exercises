import { useEffect, useState, useCallback } from "react"
import type { SliderImage } from "../../types"

interface SliderProps {
    url: string
    limit?: number
}

export default function Slider({ url, limit = 5 }: SliderProps) {
    const [images, setImages] = useState<SliderImage[]>([])
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`${url}&limit=${limit}`)
            if (!response.ok) throw new Error('Failed to fetch images')
            const data = await response.json()
            setImages(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }, [url, limit]);

    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1))
    }

    if (loading) return <div className="h-96 flex items-center justify-center font-medium">Loading slider...</div>
    if (error) return <div className="h-96 flex items-center justify-center text-red-500 font-medium">{error}</div>
    if (images.length === 0) return null

    return (
        <div className='p-5 flex flex-col items-center bg-white rounded-xl'>
            <h2 className="text-2xl font-bold mb-6">Image Slider</h2>

            <div className="relative group w-full max-w-2xl aspect-video overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <img
                    src={images[currentSlide].download_url}
                    alt={images[currentSlide].author}
                    className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Overlay with author info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-medium">Photo by {images[currentSlide].author}</p>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                    →
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <p className="mt-4 text-gray-500 text-sm">
                Slide {currentSlide + 1} of {images.length}
            </p>
        </div>
    )
}