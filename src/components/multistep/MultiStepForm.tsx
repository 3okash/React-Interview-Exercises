import { useState } from "react";

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const back = () => setStep((prev) => prev - 1);
    const next = () => {
        if (step === 1 && !formData.name.trim()) return alert("Name is required");
        if (step === 2 && !formData.email.includes("@")) return alert("Valid email is required");
        setStep((prev) => prev + 1);
    };

    return (
        <div className="p-5 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Onboarding Process</h2>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-indigo-500' : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl min-h-[300px] flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                        Step {step} of 3
                    </h3>

                    <div className="animate-slide-down">
                        {step === 1 && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-gray-800">What's your name?</h4>
                                <input
                                    name="name"
                                    placeholder="Enter your full name"
                                    type="text"
                                    value={formData.name}
                                    onChange={updateField}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                                    autoFocus
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold text-gray-800">And your email?</h4>
                                <input
                                    name="email"
                                    placeholder="your@email.com"
                                    type="email"
                                    value={formData.email}
                                    onChange={updateField}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                                    autoFocus
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-gray-800">Check your details</h4>
                                <div className="space-y-3">
                                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                        <p className="text-xs text-indigo-400 font-bold uppercase">Name</p>
                                        <p className="text-lg font-bold text-indigo-900">{formData.name}</p>
                                    </div>
                                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                                        <p className="text-xs text-indigo-400 font-bold uppercase">Email</p>
                                        <p className="text-lg font-bold text-indigo-900">{formData.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mt-10">
                    {step > 1 && (
                        <button
                            onClick={back}
                            className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all cursor-pointer"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={step === 3 ? () => alert("Finished!") : next}
                        className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95 cursor-pointer"
                    >
                        {step === 3 ? "Complete" : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}
