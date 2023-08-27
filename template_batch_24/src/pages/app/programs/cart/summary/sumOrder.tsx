/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import SumOrd from '@/pages/api/order';

export default function SummaryOrderPage() {
  const [sumOrder, setSumOrder] = useState<any[]>([]);
  const [order, setOrder] = useState<any>('');
  useEffect(() => {
    SumOrd.getOrder().then((data: any) => {
      setOrder(data.data);
    });
  });
  const c = order;
  useEffect(() => {
    SumOrd.getSumOrder(c).then((data: any) => {
      setSumOrder(data.data);
    });
  });
  return (
    <>
      <div className='overflow-x-auto max-w-2xl mx-14 '>
        {sumOrder?.map((item: any, index: any) => {
          return (
            <table key={index} className='table'>
              <tbody>
                <tr key={item._id}>
                  <td>
                    <span className='font-thin text-xl'> Payment Via :</span>{' '}
                    <span className='font-medium text-xl'>{item?.nama}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='font-thin text-xl'> AccountNumber :</span>{' '}
                    <span className='font-medium text-xl'>
                      {item?.accountNumber}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='font-thin text-xl'> AccountName :</span>{' '}
                    <span className='font-medium text-xl'>
                      {item?.accountName}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='font-thin text-xl'> Credit :</span>{' '}
                    <span className='font-medium text-xl'>{item?.credit}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='font-thin text-xl'>
                      {' '}
                      Transaction Number :
                    </span>{' '}
                    <span className='font-medium text-xl'>
                      {item?.transactionNumber}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
}
