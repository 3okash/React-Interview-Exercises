import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                React Interview Exercises
            </h1>

            <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                    Welcome to the <strong>React Interview Exercises</strong> collection. This project contains 26 interactive examples designed to help you practice and master common React patterns found in technical interviews.
                </p>

                <p>
                    The exercises are organized into four main categories:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Core</strong>: Fundamental concepts like state, props, and effects.</li>
                    <li><strong>Logic</strong>: Algorithms and complex state management.</li>
                    <li><strong>Forms</strong>: Input handling, validation, and multi-step flows.</li>
                    <li><strong>Apps</strong>: Mini-applications that combine multiple concepts.</li>
                </ul>

                <p>
                    Every component in this collection is built with <strong>TypeScript</strong> and styled with <strong>Tailwind CSS</strong> to demonstrate modern best practices.
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 my-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Run Locally</h2>
                    <div className="bg-gray-900 text-gray-50 p-4 rounded-xl font-mono text-sm shadow-inner overflow-x-auto">
                        <span className="text-gray-500"># 1. Clone the repository</span>
                        <br />
                        <span className="text-green-400">git clone</span> https://github.com/your-username/react-interview-exercises.git
                        <br /><br />

                        <span className="text-gray-500"># 2. Install dependencies</span>
                        <br />
                        <span className="text-green-400">npm</span> install
                        <br /><br />

                        <span className="text-gray-500"># 3. Start the dev server</span>
                        <br />
                        <span className="text-green-400">npm</span> run dev
                    </div>
                </div>

                <div className="pt-6">
                    <p className="mb-4">
                        Select an exercise from the sidebar to get started, or click the button below to jump into the first one.
                    </p>
                    <button
                        onClick={() => navigate('/accordion')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Start Practicing &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}
