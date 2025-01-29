'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/bookyour');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ul className="flex items-center space-x-8">
                <li className="transition-transform hover:scale-110">
                  <Image 
                    src="/icons.8png" 
                    alt="Icons logo" 
                    width={40} 
                    height={40}
                    className="cursor-pointer"
                  />
                </li>
                <li className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200">
                  Playground
                </li>
                <li className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200">
                  Add on
                </li>
                <li className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200">
                  Pricing
                </li>
                <li className="group relative">
                  <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200">
                    <span>Help Center</span>
                    <Image 
                      src="/arrowdown.svg" 
                      alt="arrow" 
                      width={20} 
                      height={15}
                      className="transform group-hover:rotate-180 transition-transform duration-200"
                    />
                  </span>
                </li>
                <li className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    My Account
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-white mb-8 tracking-wider font-serif animate-fade-in">
          MUSKAN
        </h1>
        <p className="text-white text-xl mb-8 max-w-2xl text-center">
          Experience excellence in style and service
        </p>
        <button className="bg-white/90 text-purple-600 px-8 py-4 rounded-full font-bold text-lg 
          hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg
          animate-bounce" onClick={() =>handleClick()}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}
