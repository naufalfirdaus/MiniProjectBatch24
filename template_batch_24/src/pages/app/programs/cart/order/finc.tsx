/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import Fintech from '@/pages/api/fintech';

export default function Finc() {
  const [fin, setFin] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<any>(false);
  useEffect(() => {
    Fintech.getFintechByAccountNumber(987654321).then((data: any) => {
      setFin(data.data);
    });
    return () => {
      console.log(fin);
    };
  }, [refresh]);

  return (
    <div className='overflow-x-auto max-w-2xl mx-14 my-5'>
      {fin?.map((item: any, index: any) => {
        return (
          <table key={index} className='table'>
            <tbody>
              <tr key={item._id}>
                <td>
                  <span className='font-thin text-xl'>
                    {' '}
                    <span className='text-lg'>Payment Via : </span>
                  </span>{' '}
                  <span className='font-medium text-xl'>{item?.name}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='font-thin text-xl'>
                    {' '}
                    <span className='text-lg'>AccountNumber :</span>
                  </span>{' '}
                  <span className='font-medium text-xl'>
                    {item?.accountNumber}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='font-thin text-xl'> AccountName :</span>{' '}
                  <span className='font-medium text-xl'>
                    {item?.accountName.userName}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className='font-thin text-xl'> Credit :</span>{' '}
                  <span className='font-medium text-xl'>{item?.credit}</span>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
