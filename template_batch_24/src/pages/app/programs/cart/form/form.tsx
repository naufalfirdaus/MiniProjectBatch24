'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { HttpStatusCode } from 'axios';
import config from '@/config/config';
import { useState, useEffect } from 'react';
import Cart from '@/pages/api/cart';

const verfyAccNumberSchema = Yup.object().shape({
  accountNumber: Yup.number().required('Required').min(5),
});

const FormVerify = ({ setSuccess, setError }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  const handleSubmit = async (values: any) => {
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

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
    },
    validationSchema: verfyAccNumberSchema,
    onSubmit(values, formikHelpers) {
      handleSubmit(values.accountNumber)
        .then((temp) => {
          setSuccess(temp);
        })
        .catch((temp: boolean) => {
          setError(temp);
        });
      setTimeout(() => {
        formikHelpers.resetForm();
      }, 1000);
    },
  });

  useEffect(() => {
    Cart.getData(10).then((data: any) => {
      setCart(data.data);
    });
    console.log(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      <form autoComplete='off' className='ml-5' onSubmit={formik.handleSubmit}>
        <div className='flex'>
          {cart?.length > 0 ? (
            <input
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              type='text'
              id='accountNumber'
              placeholder='Account Fintech'
              className={`input input-bordered w-full max-w-xs ${
                formik.errors.accountNumber &&
                'bg-rose-100 border-rose-400 focus:border-rose-400'
              }`}
              disabled={false}
            />
          ) : (
            <input
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              type='text'
              id='accountNumber'
              placeholder='Account Fintech'
              className={`input input-bordered w-full max-w-xs ${
                formik.errors.accountNumber &&
                'bg-rose-100 border-rose-400 focus:border-rose-400'
              }`}
              disabled={true}
            />
          )}

          <button
            type='submit'
            className='btn bg-orange-600 text-white '
            onClick={() => formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Verify
          </button>
        </div>
        {formik.errors.accountNumber && formik.touched.accountNumber ? (
          <p className='text-red-500 mt-2 mx-1'>
            {formik.errors.accountNumber}
          </p>
        ) : null}
      </form>
    </>
  );
};

export default FormVerify;
