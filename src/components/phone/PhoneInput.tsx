import React, { useState } from "react";

export default function PhoneInput() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const formatNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        const len = cleaned.length;

        if (len === 0) return "";
        if (len <= 3) return cleaned;
        if (len <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;

        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatNumber(e.target.value);
        setPhoneNumber(formattedNumber);
    };

    return (
        <div className="p-5 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-6">Input Masking</h2>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
                <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1"
                >
                    US Phone Number
                </label>
                <div className="relative">
                    <input
                        type="tel"
                        id="phone"
                        placeholder="(555) 000-0000"
                        value={phoneNumber}
                        onChange={handleChange}
                        maxLength={14}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all text-xl font-mono"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                        📞
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-500 italic text-center">
                    Auto-formats digits as you type: <br />
                    <span className="font-mono text-gray-300">(XXX) XXX-XXXX</span>
                </p>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Raw Value:</span>
                <span className="font-mono font-bold text-green-800">{phoneNumber.replace(/\D/g, "") || "Empty"}</span>
            </div>
        </div>
    );
}
