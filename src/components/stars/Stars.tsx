import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface StarsProps {
    noOfStars?: number
}

export default function Stars({ noOfStars = 5 }: StarsProps) {
    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)

    const handleClick = (index: number) => {
        setRating(index + 1)
    }

    const handleMouseEnter = (index: number) => {
        setHover(index + 1)
    }

    const handleMouseLeave = () => {
        setHover(0)
    }

    return (
        <div className='p-5 flex flex-col items-center'>
            <h2 className="text-2xl font-bold mb-6">Star Rating</h2>
            <div className='flex items-center gap-2'>
                {Array.from({ length: noOfStars }).map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            size={48}
                            className={`cursor-pointer transition-all duration-200 transform hover:scale-110 ${starValue <= (hover || rating)
                                    ? 'text-yellow-400 drop-shadow-sm'
                                    : 'text-gray-300'
                                }`}
                        />
                    );
                })}
            </div>

            <p className="mt-4 text-gray-600 font-medium">
                {rating > 0 ? `You rated this ${rating} out of ${noOfStars} stars!` : 'Select a rating'}
            </p>

            <button
                onClick={() => setRating(0)}
                className="mt-6 text-sm text-blue-500 hover:text-blue-700 underline cursor-pointer"
            >
                Reset Rating
            </button>
        </div>
    )
}