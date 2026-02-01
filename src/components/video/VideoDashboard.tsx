import { useRef, useState } from "react"

interface VideoPlayerProps {
    src: string;
    onAction: (status: 'Playing' | 'Paused' | 'Stopped') => void;
}

function VideoPlayer({ src, onAction }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    const handlePause = () => {
        videoRef.current?.pause()
        onAction('Paused')
    }

    const handlePlay = () => {
        videoRef.current?.play()
        onAction('Playing')
    }

    const handleStop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            onAction('Stopped');
        }
    }

    return (
        <div className="bg-black rounded-[2.5rem] p-4 shadow-2xl border-8 border-gray-900 overflow-hidden aspect-video relative group">
            <video ref={videoRef} className="w-full h-full object-cover rounded-3xl">
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <button
                    onClick={handlePlay}
                    className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-xl"
                >
                    ▶️
                </button>
                <button
                    onClick={handlePause}
                    className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer backdrop-blur-md border border-white/20"
                >
                    ⏸️
                </button>
                <button
                    onClick={handleStop}
                    className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-2xl hover:scale-110 active:scale-90 transition-all cursor-pointer backdrop-blur-md border border-white/20"
                >
                    ⏹️
                </button>
            </div>
        </div>
    )
}

export default function VideoDashboard() {
    const [status, setStatus] = useState<string>("Ready")
    const VIDEO_SRC = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Video Player</h2>
                    <p className="text-sm text-gray-400 italic">Custom controller pattern exercise</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Current Status</span>
                    <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${status === 'Playing' ? 'bg-green-100 text-green-600 animate-pulse' :
                            status === 'Paused' ? 'bg-amber-100 text-amber-600' :
                                'bg-gray-100 text-gray-400'
                        }`}>
                        ● {status}
                    </div>
                </div>
            </div>

            <VideoPlayer src={VIDEO_SRC} onAction={(msg) => setStatus(msg)} />

            <div className="mt-12 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <h3 className="text-gray-800 font-bold mb-4">Exercise Notes</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    This component demonstrates the use of <code className="bg-white px-2 py-0.5 rounded border border-gray-200 text-blue-500 font-bold">useRef</code> to interact with the underlying HTML5 Video API while maintaining component state for the dashboard status.
                    <br /><br />
                    Hover over the video to reveal the high-end custom controls.
                </p>
            </div>
        </div>
    )
}
