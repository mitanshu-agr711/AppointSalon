
'use client';

// import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Summary from '@/summary/page';

import { useRouter } from 'next/navigation';
import Sidebar from '@/sidebar/page';

import { useAppointmentStore } from '@/store/appointmentStore';
interface Agent {
   service: string;
}

export default function Agents() {
   const router = useRouter();
   const addAgent = useAppointmentStore((state) => state.addAgent); 


    // const searchParams = useSearchParams();
    // const service = searchParams.get('service') || '';
    // console.log(service);
    const handleOnclick = () => {
        
        router.push(`/bookyour`); 
    };
    const handleOnAgent=({service}:Agent)=>{
        router.push(`/calender`); 
        addAgent(service);
    }

    return (
        <>
         <div className="flex-row h-[100%] border border-gray-600  md:w-[20%] sm:hidden" >
                        <Sidebar />
                    </div>
                    
            <div className="flex items-center justify-center h-screen">
                 <div className="hidden sm:block md:w-[20%] w-auto h-full mr-3 shadow-lg">
                                    <Sidebar />
                                </div>

                <div className="justify-center items-center border border-slate-800 p-4 w-auto h-auto divide-y divide-dashed hover:divide-solid">

                    <div className="flex w-full h-full justify-between">

                        <div className="w-1/2">
                            <div className='h-full justify-center items-center flex-col flex space-y-8'>
                                <div className="text-lg mt-4 w-3/4">
                                    <div className="justify-center items-center flex ">
                                        <Image src='/contact.png' alt="Contact Icon"  width={40} height={40} />
                                    </div>
                                    <div className="font-bold flex justify-center items-center">Agents</div>
                                    <span className="text-gray-600 w-1/6">
                                        Please select an Agent that will be providing you a service
                                    </span>
                                </div>
                                <div className='w-3/4'>
                                    ContactUs:-<span className="text-blue-500">+91 999xxxxx</span>
                                </div>
                            </div>
                        </div>


                        <div className="w-1/2">
                            <div className="flex justify-center items-center m-4 mb-6 text-4xl">Available Agents</div>
                            <ul className="space-x-4 flex">

                                <li className="cursor-pointer space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3"
                                 onClick={()=>handleOnAgent({service:'Any Agent'})}
                                 >
                                    <Image src='/boycontacts.png' alt="Any Agent"  width={40} height={40} className="w-14 h-14 flex justify-center items-center m-3" />

                                    <div className="font-semibold">Any Agent</div>

                                </li>


                                <li className=" cursor-pointer items-center space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3"
                                 onClick={()=>handleOnAgent({service:'John'})}
                                >
                                    <div><Image src='/young-man.png' alt="John Icon"  width={40} height={40} className="w-14 h-14 m-3" /></div>
                                    <div>
                                        <div className="font-semibold">John</div>
                                    </div>
                                </li>


                                <li className="cursor-pointer items-center space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3"
                                 onClick={()=>handleOnAgent({   service:'Mirra'})}
                                >
                                    <Image src='/woman.png' alt="Hair Wash Icon"  width={40} height={40} className="w-14 h-14 m-3" />
                                    <div>
                                        <div className="font-semibold font-">Mirra</div>
                                    </div>
                                </li>
                            </ul>
                            <div className='mt-6 cursor-pointer' onClick={()=>handleOnclick()}>
                                🔙Back</div>
                        </div>

                        <div className="flex flex-col flex-1 border border-gray-600 p-6 rounded-lg shadow-lg m-5">
                            <Summary/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
