import Image from 'next/image';
import Contact from '../../../../public/contact.png';
import Agent from '../../../../public/boycontacts.png';
import John from '../../../../public/young-man.png';
import Mirra from '../../../../public/woman.png';
import Link from 'next/link'

export default function Agents() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">

                <div className="justify-center items-center border border-slate-800 p-4 w-1/2 h-auto divide-y divide-dashed hover:divide-solid">
            
                    <div className="flex w-full h-full justify-between">
                      
                        <div className="w-1/2">
                        <div className='h-full justify-center items-center flex-col flex space-y-8'>
                            <div className="text-lg mt-4 w-3/4">
                            <div  className="justify-center items-center flex ">
                                <Image src={Contact} alt="Contact Icon"/>
                                </div>
                                <div className="font-bold flex justify-center items-center">Agents</div>
                                <span className="text-gray-600 w-1/6">
                                    Please select an Agent that will be providing you a service
                                </span>
                            </div>
                            <div className="flex mt-4 items-center">
                                Contact us
                                <span className="text-blue-500 ml-2">+91 999xxxxx</span>
                            </div>
                            </div>
                        </div>

                    
                        <div className="w-1/2">
                        <div className="flex justify-center items-center m-4 mb-6 text-4xl">Available Agents</div>
                            <ul className="space-x-4 flex">
                                
                                <li className=" space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3">
                                   <Image src={Agent} alt="Any Agent" className="w-14 h-14 flex justify-center items-center m-3"  /> 
                                  
                                        <div className="font-semibold">Any Agent</div>
                                    
                                </li>

                                
                                <li className="items-center space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3">
                                    <div><Image src={John} alt="John Icon" className="w-14 h-14 m-3" /></div>
                                    <div>
                                        <div className="font-semibold">John</div>
                                    </div>
                                </li>

                              
                                <li className=" items-center space-x-4 outline outline-2 outline-slate-500 hover:outline-blue-500 p-4 rounded-lg w-2/3">
                                    <Image src={Mirra} alt="Hair Wash Icon" className="w-14 h-14 m-3" />
                                    <div>
                                        <div className="font-semibold font-">Mirra</div>
                                    </div>
                                </li>
                            </ul>
                            <div className='mt-6'><Link href="/bookyour" className='font-bold text-gray-500'>🔙Back</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
