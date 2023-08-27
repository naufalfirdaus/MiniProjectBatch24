import React from 'react';
import ProgPage from '../form/prog';
import Finc from './finc';
import OrderPage from './order';

export default function Order() {
  return (
    <>
      <div className='flex mr-16 ml-12'>
        <div className='order-first'>
          <ProgPage />
        </div>
        <div className='ml-20 mt-12'>
          <OrderPage />
        </div>
      </div>
      <Finc />
    </>
  );
}
