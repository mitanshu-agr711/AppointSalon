import Image from 'next/image';
import Blowdry from '../../../public/blow-dry.png';
import Scissors from '../../../public/scissors.png';
import Tube from '../../../public/tube.png';


export default function BookApp() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="justify-center items-center border border-slate-800 p-4 w-2/3 h-2/3 divide-y divide-dashed hover:divide-solid">
              
                <div className="flex justify-center items-center m-2 text-4xl">Available</div>

              
                <div className="flex w-full flex-nowrap h-full justify-between">
                   
                    <div className="w-1/2">
                        <div className="space-y-30">
                            <div className="text-lg mt-4 w-3/4">
                                <div className="font-bold justify-center items-center flex">Service Selection</div>
                                <span className=" text-gray-600">Please select a service for which you want to schedule an appointment</span>
                            </div>
                            <div className="flex mt-4 items-center">
                                Contact us
                                <span className="text-blue-500 ml-2">+91 999xxxxx</span>
                            </div>
                        </div>
                    </div>

                   
                    <div className="w-1/2">
                        <ul className="space-y-6">
                            <li className="outline outline-2 outline-offset-2 outline-blue-500 w-3/4 p-2">
                               <Image src={Blowdry} alt="pic" /> Hair Coloring
                                <div className="text-sm text-gray-600">Change Color of hair permanently</div>
                            </li>
                            <li className="outline outline-2 outline-offset-2 outline-blue-500 w-3/4 p-2">
                               <Image src={Scissors} alt="pic"/> Hair Cut
                            </li>
                            <li className="outline outline-2 outline-offset-2 outline-blue-500 w-3/4 p-2">
                               <Image src={Tube} alt="pic" className='flex flex-nowrap' /> Hair Wash
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
