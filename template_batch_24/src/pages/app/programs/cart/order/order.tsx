import { useState, useEffect, SyntheticEvent } from 'react';
import Cart from '@/pages/api/cart';
import config from '@/config/config';
import { useRouter } from 'next/router';
import axios, { HttpStatusCode } from 'axios';

export default function OrderPage() {
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

  const handleOrder = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${config.domain}/api/sales/createOrder/?user=${10}`
      );
      if (response.status === HttpStatusCode.Created) {
        router.push({
          pathname: `/program/cart/summary/`,
        });
        console.log(response.data);
      }
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const handleCancel = async (caitId: any) => {
    Cart.remove(caitId);
    setRefresh(true);
    router.push({ pathname: '/program/cart/' });
  };
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
                <div className='card-actions mt-5'>
                  <button
                    className='btn bg-orange-600 text-white w-80'
                    onClick={(values) => handleOrder(values)}
                  >
                    Create Order
                  </button>
                </div>
                <div className='card-actions'>
                  <button
                    className='btn bg-orange-600 text-white w-80'
                    onClick={() => window.my_modal_2.showModal()}
                  >
                    Cancel Order
                  </button>
                  <dialog id='my_modal_2' className='modal'>
                    <form method='dialog' className='modal-box'>
                      <p className='py-4'>
                        Apakah Yakin Ingin Membatalkan Pesanan?
                      </p>
                      <div className='modal-action'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn'>No</button>
                        <button
                          className='btn bg-orange-500 text-white'
                          onClick={() => handleCancel(item.caitId)}
                        >
                          Yes
                        </button>
                      </div>
                    </form>
                  </dialog>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
