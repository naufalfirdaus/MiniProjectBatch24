import React from 'react';

export default function ErrorPage({ setError }: any) {
  return (
    <div className=' flex ml-28 mt-5 mb-16'>
      <div className='alert bg-rose-200 max-w-xl'>
        <button onClick={() => setError(false)}>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-rose-200 fill-red-600 shrink-0 h-8 w-10'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
        <span className='font-medium'>Sorry, Account Number Not Valid </span>
      </div>
    </div>
  );
}
