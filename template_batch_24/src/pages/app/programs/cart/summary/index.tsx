/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Cart from '@/pages/api/cart';
import SummaryPage from './summary';
import SummaryOrderPage from './sumOrder';

export default function Summary() {
  const [cart, setCart] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  useEffect(() => {
    Cart.getData(10).then((data: any) => {
      setCart(data.data);
    });
    console.log(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return (
    <>
      <div className='flex justify-end mr-16 ml-12'>
        <div className='order-first'>
          <div>
            {cart?.map((item: any) => {
              const price = item.caitProgEntity.progPrice;
              return (
                <>
                  <div className='border mt-14 ml-5 card lg:card-side max-h-72 bg-slate-50 shadow-xl'>
                    <figure className='w-8/12 mx-3'>
                      <img
                        src={`http://localhost:3001/api/programs/sales/cart/photo/${item?.caitProgEntity.progImage}`}
                        alt='prog_image'
                      />
                    </figure>
                    <div className='card-body'>
                      <h2 className='card-title font-mono'>
                        {item?.caitProgEntity.progTitle}
                      </h2>
                      <p className='font-extralight'>
                        {item?.caitProgEntity.progHeadline}
                      </p>
                      <p className='font-semibold text-xl  mt-3'>
                        Rp.{' '}
                        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className='order-last ml-20 mt-12'>
          <SummaryPage />
        </div>
      </div>
      <SummaryOrderPage />
    </>
  );
}
