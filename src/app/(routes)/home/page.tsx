import Image from 'next/image';
export default function Home() {
  return (
    <div className="flex flex-col">
      <ul className="flex flex-row gap-x-8 items-center justify-center ">
        <li><Image src="/icon8.png" alt="Icons logo" width={40} height={40} /></li>
        <li>Playground</li>
        <li>Add on</li>
        <li>Pricing </li>
        <li>
          <span className='flex flex-row'>Help Center <Image src="/arrowdown.svg" alt="arrow" className='bg-white' width={20} height={15} />
          </span></li>
        <li>My Account</li></ul>

    </div>
  )
}