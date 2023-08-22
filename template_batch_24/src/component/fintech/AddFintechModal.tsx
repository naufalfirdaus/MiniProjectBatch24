import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  AddFintechReq,
  GetFintechReq,
} from '@/redux-saga/action/fintechAction';

type setModal = {
  setShowModal: (value: boolean) => void;
  setRefresh: (value: boolean) => void;
};

export default function AddFintechModal(props: setModal) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fint_code: '',
      fint_name: '',
    },
    onSubmit: async (values: any) => {
      const payload = {
        fint_code: values.fint_code,
        fint_name: values.fint_name,
      };
      dispatch(AddFintechReq(payload));
      props.setRefresh(true);
    },
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <form onSubmit={formik.handleSubmit}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">Add / Edit Fintech</h3>
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
                      Code
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="fint_code"
                      placeholder="Input Fintech Code"
                      value={formik.values.fint_code}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-password"
                    >
                      Fintech Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-password"
                      type="text"
                      name="fint_name"
                      value={formik.values.fint_name}
                      onChange={formik.handleChange}
                      placeholder="Input Fintech Name"
                    />
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
