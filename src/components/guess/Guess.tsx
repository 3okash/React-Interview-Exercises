import { useEffect, useState, useCallback } from "react";

const getNewRound = () => {
    const generatedColors: string[] = [];
    for (let i = 0; i < 3; i++) {
        const hex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
        generatedColors.push(hex);
    }
    const randomColor = generatedColors[Math.floor(Math.random() * generatedColors.length)];
    return { answers: generatedColors, boxColor: randomColor };
}

export default function Guess() {
    const [gameState, setGameState] = useState(() => getNewRound());
    const [correct, setCorrect] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(10);

    const { boxColor, answers } = gameState;

    const generateRound = useCallback(() => {
        setGameState(getNewRound());
        setCounter(10);
        setCorrect(false);
    }, []);

    const checkAnswer = (color: string) => {
        if (boxColor === color) {
            alert('Correct! 🎉');
            setCorrect(true);
        } else {
            alert('Try again! ❌');
        }
    };

    useEffect(() => {
        if (correct) {
            const timeout = setTimeout(generateRound, 1500);
            return () => clearTimeout(timeout);
        }
    }, [correct, generateRound]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    alert(`Time's up! The color was ${boxColor}`);
                    generateRound();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [boxColor, generateRound]);

    return (
        <div className='p-5 flex flex-col h-[600px]'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Guess the Hex</h2>
                <div className="text-xl font-mono bg-gray-100 px-3 py-1 rounded">
                    Time: {counter}s
                </div>
            </div>
            <hr />

            <div
                className="mt-10 flex-grow flex items-center justify-center rounded-xl shadow-inner border-4 border-white"
                style={{ backgroundColor: boxColor }}
            >
                <div className="bg-black/20 backdrop-blur-sm px-8 py-4 rounded-full">
                    <p className="text-white text-6xl font-bold tabular-nums">{counter}</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                {answers.map((color) => (
                    <button
                        key={color}
                        className="px-6 py-4 text-white font-mono font-bold rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer active:scale-95"
                        style={{ backgroundColor: color }}
                        onClick={() => checkAnswer(color)}
                    >
                        {color.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}


