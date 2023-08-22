// components/Header.js
import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex bg-white p-4 border-b-2">
      <Image
        src="/code-colored.webp"
        alt='CodeID'
        width={262}
        height={78}
        priority
        className='flex-none'
      />
      <h1 className="flex-none text-black text-xl w-36 self-center">Realta</h1>
      <div className='grid justify-items-end w-full'>
        <div className='grid w-52 justify-items-center'>
          <div className='w-12 h-12 bg-red-300 rounded-xl'></div>
          <p className=''>Widi [Administrator]</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
