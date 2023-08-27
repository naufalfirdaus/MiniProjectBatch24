import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Success({ setSuccess }: any) {
  const router = useRouter();
  const handleClick = () => {
    router.push({ pathname: '/program/cart/order' });
  };
  return (
    <>
      <div className=' flex ml-20 mt-10 mb-16 justify-items-end'>
        <div className='alert bg-emerald-200 max-h-16 max-w-2xl'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-emerald-200 stroke-2 fill-emerald-700 shrink-0 h-8 w-10'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='font-medium '>
            Your Account Valid, please continue to complete payment
          </span>
        </div>
        <div className='mx-10 mb-2 mt-2'>
          <button
            onClick={() => setSuccess(false)}
            className='border p-3 rounded-lg bg-orange-600 text-white mx-6'
          >
            Back
          </button>

          <button
            className='border p-3 rounded-lg bg-orange-600 text-white'
            onClick={() => handleClick()}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
