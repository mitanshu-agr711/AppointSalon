import Image from 'next/image';
import Blowdry from '../../../public/blow-dry.png';
import Scissors from '../../../public/scissors.png';
import Tube from '../../../public/tube.png';
import Link from 'next/link'
// import Agents from './components/agents';
export default function BookApp() {
    return (
        <div className="flex items-center justify-center h-screen">

            <div className="justify-center items-center border border-slate-800 p-4 w-1/2 h-auto divide-y divide-dashed hover:divide-solid">

                <div className="flex w-full flex-nowrap h-full justify-between">

                    <div className="w-1/2">
                        <div className="space-y-8 flex flex-col justify-center items-center h-full">
                            <div className="text-lg mt-4 w-3/4">
                                <div className="font-bold flex">Service Selection</div>
                                <span className="text-gray-600 w-1/6">Please select a service for which you want to schedule an appointment</span>
                            </div>
                            <div className='w-3/4'>
                                ContactUs:-<span className="text-blue-500">+91 999xxxxx</span>
                            </div>
                        </div>
                    </div>


                    <div className="w-1/2">
                        <div className="flex justify-center items-center m-4 mb-6 text-4xl">Available Service</div>
                        <ul className="space-y-5">

                            <Link href="/bookyour/agents"><li
                                className="flex items-center space-x-4 outline outline-2 outline-offset-2  outline-slate-500 hover:outline-blue-500 w-auto  p-2">

                                <Image src={Blowdry} alt="Blowdry Icon" className="w-10 h-10" />
                                <div>
                                    <div>Hair Coloring</div>
                                    <div className="text-sm text-gray-600">Change Color of hair permanently</div>
                                </div>
                            </li></Link>


                            <Link href="/bookyour/agents"><li
                                className="flex mt-9 items-center space-x-4 outline outline-2 outline-offset-2 outline-slate-500 hover:outline-blue-500 w-auto p-2">

                                <Image src={Scissors} alt="Scissors Icon" className="w-10 h-10" />
                                <div>
                                    <div>Hair Cut</div>
                                    <div className="text-sm text-gray-600">Come experience a perfect haircut today with the best stylists</div>
                                </div>
                            </li></Link>


                            <Link href="/bookyour/agents"><li
                                className="flex mt-9  items-center space-x-4 outline outline-2 outline-offset-2 outline-slate-500  hover:outline-blue-500 w-auto  p-2">

                                <Image src={Tube} alt="Tube Icon" className="w-10 h-10" />
                                <div>
                                    <div>Hair Wash</div>
                                    <div className="text-sm text-gray-600">Come experience a perfect haircut today with the best stylists</div>
                                </div>
                            </li></Link>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
