import Image from 'next/image';
import Icons8 from '../../../public/icons8.png';
import Arrowdown from '../../../public/arrowdown.svg';
export default function Home() {
    return (
        <div className="flex flex-col">
            <ul className="flex flex-row gap-x-8 items-center justify-center ">
        <li><Image src={Icons8} alt="Icons logo" width={40} height={40}/></li>
          <li>Playground</li>
          <li>Add on</li>
          <li>Pricing </li>
          <li>
            <span className='flex flex-row'>Help Center <Image src={Arrowdown} alt="arrow" className='bg-white' width={20} height={15}/>
            </span></li>
          <li>My Account</li></ul>

        </div>
    )
}