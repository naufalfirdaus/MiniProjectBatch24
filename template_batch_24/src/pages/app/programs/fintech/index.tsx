/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import Fintech from '@/pages/api/fintech';
import FormVerify from '../cart/form/form';
import Success from '../cart/form/succes';
import ErrorPage from '../cart/form/error';

export default function PaymentPage() {
  const [success, setSuccess] = useState<any>(false);
  const [error, setError] = useState<any>();
  const [fintech, setFintech] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  useEffect(() => {
    Fintech.getFintech('').then((data: any) => {
      setFintech(data.data);
    });
    return () => {
      console.log(fintech);
    };
  }, [refresh]);

  return (
    <>
      {!success && (
        <>
          <div className='max-w-xl mx-32 divider mt-10'>
            <h4 className='font-semibold text-2xl p-2'>Payment</h4>
          </div>
          <div className='flex mt-7'>
            <select className='select select-bordered w-72 ml-28'>
              <option disabled selected>
                Fintech
              </option>
              {fintech?.map((item: any) => {
                return (
                  <>
                    <option>{item.fintName}</option>
                  </>
                );
              })}
            </select>
            <FormVerify setSuccess={setSuccess} setError={setError} />
          </div>
        </>
      )}
      {success ? <Success setSuccess={setSuccess} /> : ''}
      {error ? <ErrorPage setError={setError} /> : ''}
    </>
  );
}
