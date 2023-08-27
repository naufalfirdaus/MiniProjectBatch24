import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cart from '@/pages/api/cart';

export default function SummaryPage() {
  const router = useRouter();
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
      <div className='card bg-slate-50 shadow-xl border mt-3'>
        <div className='card-body max-h-64'>
          <h2 className='card-title text-stone-600'>Total: </h2>
          {cart?.map((item: any) => {
            return (
              <>
                <h2 className='card-title font-bold text-3xl'>
                  {item?.caitUnitPrice}
                </h2>
              </>
            );
          })}
          <div>
            <h2 className='text-center my-8 font-semibold text-lg from-accent-focus divider'>
              Thanks For Buying
            </h2>
            <h3 className='text-justify '>
              Please, Check Your Email to get your access token
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
