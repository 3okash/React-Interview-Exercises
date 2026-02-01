import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <article className="max-w-2xl mx-auto py-12">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    React Interview Exercises
                </h1>
            </header>

            <div className="prose prose-lg text-gray-600 space-y-6">
                <section>
                    <p>
                        Welcome to <strong>React Interview Exercises</strong>, a comprehensive collection of <strong>26 interactive examples</strong> designed to help you master common React patterns found in technical interviews and real-world applications.
                    </p>

                    <p>
                        Whether you're preparing for your next frontend interview or sharpening your React skills, these hands-on exercises cover everything from fundamental concepts to advanced architectural patterns, all built with <strong>TypeScript</strong> and <strong>Tailwind CSS</strong> following modern best practices.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercise Categories</h2>
                    <p>
                        The exercises are organized into four main categories:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Core</strong> (6 exercises): Master fundamental React concepts including state management, props, lifecycle methods, and side effects with useEffect.</li>
                        <li><strong>Logic</strong> (6 exercises): Practice complex algorithms, data filtering, sorting, and advanced state management patterns.</li>
                        <li><strong>Forms</strong> (5 exercises): Learn input handling, validation, multi-step flows, and component composition techniques.</li>
                        <li><strong>Apps</strong> (9 exercises): Build real-world mini-applications that combine multiple concepts into cohesive projects.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                    <p>
                        These exercises demonstrate modern React development patterns including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>React Hooks (useState, useEffect, useRef, custom hooks)</li>
                        <li>TypeScript integration with React components</li>
                        <li>State management and data flow</li>
                        <li>API integration and async operations</li>
                        <li>Form handling and validation</li>
                        <li>Component composition and reusability</li>
                        <li>Performance optimization techniques</li>
                    </ul>
                </section>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 my-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Run Locally</h2>
                    <div className="bg-gray-900 text-gray-50 p-4 rounded-xl font-mono text-sm shadow-inner overflow-x-auto">
                        <span className="text-gray-500"># 1. Clone the repository</span>
                        <br />
                        <span className="text-green-400">git clone</span> https://github.com/3okash/React-Interview-Exercises.git
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

                <section className="pt-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
                    <p className="mb-4">
                        Select any exercise from the sidebar to explore its implementation, or click the button below to jump into the first exercise and start practicing.
                    </p>
                    <button
                        onClick={() => navigate('/accordion')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                        aria-label="Start practicing with the Accordion exercise"
                    >
                        Start Practicing &rarr;
                    </button>
                </section>
            </div>
        </article>
    );
}
