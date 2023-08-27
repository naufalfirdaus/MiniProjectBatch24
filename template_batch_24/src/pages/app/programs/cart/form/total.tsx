import { useState, useEffect, SyntheticEvent } from 'react';
import Cart from '@/pages/api/cart';
import { useRouter } from 'next/router';
import config from '@/config/config';
import axios, { HttpStatusCode } from 'axios';
import ErrorCheckout from '../form/errorCheckout';
import SuccesDisc from './succesDisc';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function TotalPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [Success, setSuccess] = useState<any>(false);
  useEffect(() => {
    Cart.getData(10).then((data: any) => {
      setCart(data.data);
    });
    console.log(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const verfyAccNumberSchema = Yup.object().shape({
    disc: Yup.string().required('Required'),
  });
  const handleCheckout = async (values: any) => {
    try {
      const response = await axios.post(
        `${config.domain}/api/fintech/verify?accountNumber=${values}`,
        values
      );
      if (response.status === HttpStatusCode.BadRequest) {
        const error = true;
        setTimeout(() => {
          return error;
        }, 200);
      } else if (response.status === HttpStatusCode.Ok) {
        const error = false;
        return error;
      }
      return response;
    } catch (errors) {
      setTimeout(() => {
        setError(errors);
      }, 1000);
      console.log('Error Verifikasi', errors);
    }
  };
  // const handleDiscount = async (values: any) => {
  //   try {
  //     const response = await axios.post(
  //       `${config.domain}/api/programs/sales/cart/discount`,
  //       { values }
  //     );

  //     if (response.status === 201) {
  //       setSuccess(true);
  //       window.location.reload();
  //       console.log(response.status);
  //       return response;
  //     }
  //   } catch (error) {
  //     setError(error);
  //     return error;
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      disc: '',
    },
    validationSchema: verfyAccNumberSchema,
    onSubmit(values, formikHelpers) {
      Cart.addDiscount(values.disc);
      setTimeout(() => {
        formikHelpers.resetForm();
      }, 1000);
    },
  });

  return (
    <>
      <div className='card bg-slate-50 shadow-xl border mt-3'>
        <div className='card-body max-h-64'>
          <h2 className='card-title text-stone-600'>Total: </h2>
          {cart?.map((item: any) => {
            return (
              <>
                <h2 className='card-title font-bold text-2xl'>
                  Rp. {item.total}
                </h2>
                <div className='card-actions'>
                  <button
                    className='btn bg-orange-600 text-white w-80'
                    onClick={(values) => handleCheckout(values)}
                    disabled={error}
                  >
                    Checkout
                  </button>
                </div>
              </>
            );
          })}
          <div className='flex mt-2'>
            <form onSubmit={formik.handleSubmit}>
              <div className='flex'>
                <input
                  value={formik.values.disc}
                  type='text'
                  id='disc'
                  name='disc'
                  placeholder='Enter Coupon'
                  className={`input input-bordered w-full max-w-xs ${
                    formik.errors.disc &&
                    'bg-rose-100 border-rose-400 focus:border-rose-400'
                  }`}
                  disabled={false}
                  onChange={formik.handleChange}
                />
                <button
                  onClick={() => formik.handleSubmit}
                  disabled={formik.isSubmitting}
                  type='submit'
                  className='btn bg-orange-600 text-white justify-end '
                >
                  Apply
                </button>
              </div>
            </form>
            {formik.errors.disc && formik.touched.disc ? (
              <p className='text-red-500 mt-2 mx-1'>{formik.errors.disc}</p>
            ) : null}
          </div>
        </div>
      </div>
      {Success ? <SuccesDisc setSuccess={setSuccess} /> : ''}
      {error ? <ErrorCheckout setError={setError} /> : ''}
    </>
  );
}
