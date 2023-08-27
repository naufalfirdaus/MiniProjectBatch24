import { useEffect, useState } from 'react';
import Cart from '@/pages/api/cart';
/* eslint-disable @next/next/no-img-element */
export default function ProgPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  useEffect(() => {
    Cart.getData(10).then((data: any) => {
      setCart(data.data);
    });
    console.log(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  function deleteCart(caitId: any) {
    Cart.remove(caitId);
    setRefresh(true);
  }

  return (
    <div>
      {cart?.map((item: any) => {
        return (
          <>
            <div className='mt-5 ml-10'>
              <h3 className='font-medium'>
                {item.data.length} Kursus Dalam Keranjang
              </h3>
            </div>
          </>
        );
      })}
      {cart?.map((item: any) => {
        const query = item.data?.map((item: any) => {
          return (
            <>
              <div>
                <div className='border mt-5 ml-5 card lg:card-side max-w-3xlxl max-h-72 bg-slate-50 shadow-xl'>
                  <figure className='w-6/12 mx-3'>
                    <img
                      src={`http://localhost:3001/api/programs/sales/cart/photo/${item.caitProgEntity.progImage}`}
                      alt='prog_image'
                    />
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title font-mono'>
                      {item.caitProgEntity.progTitle}
                    </h2>
                    <p className='font-extralight'>
                      {item.caitProgEntity.progHeadline}
                    </p>
                    <p className='font-semibold text-xl  mt-3'>
                      Rp.{' '}
                      {item.caitProgEntity.progPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </p>
                    <div className='card-actions mt-10 flex-wrap'>
                      <button className='btn bg-orange-600 text-white btn-sm'>
                        Save For Later
                      </button>
                      <button
                        className='btn bg-orange-600 text-white btn-sm justify-end'
                        onClick={() => deleteCart(item.caitId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ;
            </>
          );
        });
        return query;
      })}
    </div>
  );
}
