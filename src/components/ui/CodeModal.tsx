import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect } from 'react';

interface CodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    code: string;
    title: string;
}

export default function CodeModal({ isOpen, onClose, code, title }: CodeModalProps) {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        alert('Code copied to clipboard!');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
            {/* Backdrop click to close */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            <div className="relative bg-gray-900 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900 z-10">
                    <div>
                        <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                            <span className="text-blue-400">{'< />'}</span> {title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCopy}
                            className="text-xs font-bold text-gray-400 hover:text-white bg-gray-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                            Copy
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 p-2 rounded-full transition-all cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Code Content */}
                <div className="flex-1 overflow-auto custom-scrollbar bg-[#1e1e1e]">
                    <SyntaxHighlighter
                        language="tsx"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            backgroundColor: 'transparent'
                        }}
                        showLineNumbers={true}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
}
