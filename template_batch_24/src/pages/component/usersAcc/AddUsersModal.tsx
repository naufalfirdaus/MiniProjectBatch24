import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { AddBankReq, GetBankReq } from '@/redux-saga/action/bankAction';
import { AddUsersReq } from '@/redux-saga/action/usersAccountAction';

type setModal = {
  setShowModal: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
  setBank: Array<any>;
  setFintech: Array<any>;
};

export default function AddUsersModal(props: setModal) {
  const [saldo, setSaldo] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      bank_id: '',
      user_id: '',
      usac_account_number: accountNumber,
      usac_saldo: saldo,
      usac_type: '',
    },
    onSubmit: async (values: any) => {
      const payload = {
        bank_id: values.bank_id,
        user_id: values.user_id,
        usac_account_number: values.usac_account_number,
        usac_saldo: saldo,
        usac_type: values.usac_type,
      };
      dispatch(AddUsersReq(payload));
      props.setRefresh(true);
    },
  });

  const handleAccChange = (e: any) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^\d-]/g, ''); // Hapus karakter selain angka dan "-"
    setAccountNumber(formattedValue);

    formik.handleChange(e);
  };

  const handleAccChangeRupiah = (e: any) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^\d]/g, ''); // Hapus karakter selain angka dan "-"
    setSaldo(formattedValue);

    formik.handleChange(e);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <form onSubmit={formik.handleSubmit}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">
                  Add / Edit Account Number
                </h3>
                <button
                  className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-1">
                    ×
                  </span>
                  {/* <span>X</span> */}
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      User ID
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="text" value={saldo} />
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="user_id"
                      placeholder="Input USER Id"
                      value={formik.values.user_id}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Account Number
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="usac_account_number"
                      placeholder="Input Account Number"
                      value={accountNumber}
                      onChange={handleAccChange}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-password"
                    >
                      Saldo
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-password"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="usac_saldo"
                      value={`Rp ${saldo.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.'
                      )}`} // Tambahkan "Rp" dan pemisah titik
                      onChange={handleAccChangeRupiah}
                      placeholder="Input Saldo"
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Type
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      className="w-full py-2 px-4 bg-gray-200 border-2 border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      name="usac_type"
                      value={formik.values.usac_type}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="bank">Bank</option>
                      <option value="fintech">Fintech</option>
                    </select>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Select Code
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      className="w-full py-2 px-4 bg-gray-200 border-2 border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      name="bank_id"
                      value={formik.values.bank_id}
                      onChange={formik.handleChange}
                    >
                      {/* Tolong tunjukan disini sebagai option isi dari bank.bankCode */}
                      <option value="">Select an option</option>

                      {formik.values.usac_type == 'bank'
                        ? props.setBank.map((bankItem) => (
                            <option
                              key={bankItem.bankEntityId}
                              value={bankItem.bankEntityId}
                            >
                              {bankItem.bankCode}
                            </option>
                          ))
                        : formik.values.usac_type == 'fintech'
                        ? props.setFintech.map((fintItem) => (
                            <option
                              key={fintItem.fintEntityId}
                              value={fintItem.fintEntityId}
                            >
                              {fintItem.fintCode}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-medium uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-medium uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  onClick={() => {
                    formik.handleSubmit();
                    props.setShowModal(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
