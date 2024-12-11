
export default function Summary() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className=" space y-8  border border-slate-800 p-4 w-1/4 h-auto divide-y divide-dashed hover:divide-solid">
                    <div className="text-4xl w-full flex justify-center items-center ">Summary</div>
                    <ul className="space-y-20 h-full">
                    <li className=" w-full h-full flex m-3  ">Hair Coloring</li>
                    <li className=" w-full h-full flex  text-slate-500 m-3">Cost breakdown</li>
                    </ul>
                    {/* <ur/> */}
                    <div className="text-2xl m-3">Total Cost:</div>
                </div>
            </div>
        </>
    )
}