import React, { useState } from 'react'
import type { Country } from '../../types'

const COUNTRIES: Country[] = [
    {
        name: 'India',
        value: 'IN',
        cities: [
            'Delhi',
            'Mumbai'
        ]
    },
    {
        name: 'Pak',
        value: 'PK',
        cities: [
            'Lahore',
            'Karachi'
        ]
    },
    {
        name: 'Bangladesh',
        value: 'BG',
        cities: [
            'Dhaka',
            'Chittagong'
        ]
    },
];

export default function Nested() {
    const [countryName, setCountryName] = useState('India')

    const cities = COUNTRIES.find(item => item.name === countryName)?.cities || []

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryName(e.target.value)
    }

    return (
        <div className='p-5'>
            <h2 className="text-2xl font-bold mb-4">Nested Dropdowns</h2>
            <hr />
            <div className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Country</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleCountryChange}
                        value={countryName}
                    >
                        {COUNTRIES.map((country) => (
                            <option key={country.value} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select City</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}