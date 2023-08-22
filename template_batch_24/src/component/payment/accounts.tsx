import React, { useEffect, useState } from 'react'
import Layout from '../_layout';
import Confirm from './confirm';
import { useDispatch, useSelector } from 'react-redux';
import { GetBankReq } from '@/redux-saga/action/bankAction';
import { GetFintechReq } from '@/redux-saga/action/fintechAction';
import { GetUserAccountSourceReq, GetUserAccountTargetReq } from '@/redux-saga/action/usersAccountAction';
import { useFormik } from 'formik';
import { CreateTopupReq } from '@/redux-saga/action/trpaAction';
import router from 'next/router';

export default function Accounts() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [source, setSource] = useState<any>('');
  const [target, setTarget] = useState<any>('');
  const [transferPayload, setTransferPayload] = useState<any>(null);

  const [sameAccount, setSameAccount] = useState(true);

  const [selectedSource, setSelectedSource] = useState<any>();
  const [selectedTarget, setselectedTarget] = useState<any>();

  const { bank } = useSelector((state: any) => state.bankState);
  const { fintech } = useSelector((state: any) => state.fintechState);

  const { sourceAccount } = useSelector((state: any) => state.usersAccState);
  const { targetAccount } = useSelector((state: any) => state.usersAccState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBankReq(null, ''));
    dispatch(GetFintechReq(null, ''));

    if (source == '' || target == '') {
      setSameAccount(true)
    } else if (source === target) {
      setSameAccount(true)
    } else {
      setSameAccount(false)
    }
  }, [dispatch, source, target, selectedSource, selectedTarget])

  const handleSelectSourceChange = (e: any) => {
    setSelectedSource(e.target.value)
    dispatch(GetUserAccountSourceReq({ bankFintech: e.target.value }))
    setSource('')
  }
  const handleSelectTargetChange = (e: any) => {
    setselectedTarget(e.target.value)
    dispatch(GetUserAccountTargetReq({ bankFintech: e.target.value }))
    setTarget('')
  }

  // Source Account
  const handleChangeSourceAccount = (e: any) => {
    setSource(e.target.value)
  }

  const selectedSourceAccount = sourceAccount.find(
    (account: any) => account.usacAccountNumber === source
  );

  // Target Account
  const handleChangeTargetAccount = (e: any) => {
    setTarget(e.target.value)
  }

  const selectedTargetAccount = targetAccount.find(
    (account: any) => account.usacAccountNumber === target
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const bankOptions = bank.items.map((option: any) => ({
    value: option.bankEntityId,
    label: option.bankName
  }))

  const fintechOptions = fintech.items.map((option: any) => ({
    value: option.fintEntityId,
    label: option.fintName
  }))

  const options = [...bankOptions, ...fintechOptions]

  const transferAction = async (payload: any) => {
    try {
      // Dispatch your Redux action here
      await dispatch(CreateTopupReq(payload));

      alert('Topup success');
      router.push(`/payment/accounts?accountId=${source}`);

    } catch (error) {
      alert('Topup Failed')
    }

  };

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    onSubmit: async (values) => {
      let payload = {
        amount: values.amount,
        source: source,
        target: target
      }
      setTransferPayload(payload);
      setIsModalVisible(true);
    }
  })

  return (
    <Layout>
      <div className='h-full px-24'>
        <div className='flex flex-row py-10'>
          <div className='mx-2 w-full '>
            <h1 className='text-center font-medium text-xl'>Source</h1>
            <div className='my-4 text-gray-900'>
              <label>Source Name</label>
              <select id="source" onChange={handleSelectSourceChange}
                className='w-full my-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                <option value={''}>Bank/Fintech</option>
                {options && options.map((item: any, index: number) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className='mt-4 mb-12 text-gray-900'>
              <label>Account</label>
              <select className='w-full my-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100' disabled={!selectedSource}
                onChange={handleChangeSourceAccount}
                value={source}
              >
                <option value={''}>Users Account</option>
                {sourceAccount && sourceAccount.map((item: any, index: number) => (
                  <option key={index}>{item.usacAccountNumber}</option>
                ))}
              </select>
            </div>
            <div className='my-4 text-gray-900'>
              <label>Current Saldo</label>
              <span className='mx-2 border-b-2 border-red-300'>Rp{selectedSourceAccount ? selectedSourceAccount.usacSaldo : '0'} </span>
            </div>
          </div>

          <div className='mx-2 w-full'>
            <h1 className='text-center font-medium text-xl'>Target</h1>
            <div className='my-4 text-gray-900'>
              <label>Target Name</label>
              <select id="source" onChange={handleSelectTargetChange}
                className='w-full my-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                <option value={''}>Bank/Fintech</option>
                {options && options.map((item: any, index: number) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className='mt-4 mb-12 text-gray-900'>
              <label>Account</label>
              <select className='w-full my-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100' disabled={!selectedTarget}
                onChange={handleChangeTargetAccount}
                value={target}>
                <option value={''}>Users Account</option>
                {targetAccount && targetAccount.map((item: any, index: number) => (
                  <option key={index}>{item.usacAccountNumber}</option>
                ))}
              </select>
            </div>
            <div className='my-4 text-gray-900'>
              <label>Current Saldo</label>
              <span className='mx-2 border-b-2 border-red-300'>Rp{selectedTargetAccount ? selectedTargetAccount.usacSaldo : '0'} </span>
            </div>
          </div>

        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-row max-h-full items-center py-10'>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="block text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 disabled:bg-blue-200"
              type="submit"
              disabled={sameAccount || parseInt(formik.values.amount) < 10000}
            >
              Transfer
            </button>

            {isModalVisible && (<Confirm toggleModal={toggleModal}
              transferAction={transferAction}
              transferPayload={transferPayload} />)}
            <input
              placeholder='Amount'
              name='amount'
              type='number'
              className='border-2 rounded-md px-2 mx-2 py-1.5 h-10 border-gray-400 text-gray-900'
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </div>
        </form>

      </div >


    </Layout >
  )
}
