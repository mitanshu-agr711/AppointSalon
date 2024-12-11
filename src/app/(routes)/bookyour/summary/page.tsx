'use client';

import { useState, useEffect } from 'react';

export default function Summary() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from the Next.js API route
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user.get');
                const result = await response.json();
                setData(result); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); 
    }, []); 

    return (
        <div className="flex items-center justify-center ">
            <div className="space-y-8 border border-slate-800 p-4 w-full h-auto divide-y divide-dashed hover:divide-solid">
                <div className="text-4xl w-full flex justify-center items-center">Summary</div>
                <ul className="space-y-20 h-full">
                    <li className="w-full h-full flex m-3">Hair Coloring</li>
                    <li className="w-full h-full flex text-slate-500 m-3">Cost breakdown</li>
                </ul>
                <div className="text-2xl m-3">
                    Total Cost: {data ? data.totalCost : 'Loading...'}
                </div>
            </div>
        </div>
    );
}
