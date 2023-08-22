import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import { addPhoneReq } from "@/redux-saga/action/phoneAction";

type Modalphone = {
  setRefresh: (value: boolean) => void;
  setOpenModal: (value: string | undefined) => void;
  setDataProfile: any;
};

const CardAddPhone = (props: Modalphone) => {
  const dispatch = useDispatch();
  const [selectedPontyCode, setSelectedPontyCode] = useState("");
  const handlePontyCodeChange = (event: any) => {
    setSelectedPontyCode(event.target.value); // Mengupdate state ketika select berubah
  };
  const formik = useFormik({
    initialValues: {
      user_id: props.setDataProfile.userid,
      phone: "",
      pontycode: "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          phone: values.phone,
          pontycode: values.pontycode,
        };

        const id = values.user_id;
        props.setRefresh(true);

        dispatch(addPhoneReq(payload, id));
        // window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Add Phone
      </h2>
      <div className="w-full  bg-white p-3 rounded-md mt-3">
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <div className="flex items-center">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900 w-16"
                >
                  Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="phone"
                  className="block ml-3 text-sm font-medium leading-6 text-gray-900 w-10"
                >
                  Type
                </label>
                <div className="mt-1">
                  <select
                    id="pontycode"
                    name="PontyCode"
                    autoComplete="PontyCode"
                    required
                    value={selectedPontyCode}
                    onChange={handlePontyCodeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Code Telp."
                  >
                    <option value="">Select type</option>
                    <option value="Cell">Cell</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => props.setOpenModal(undefined)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                formik.handleSubmit();
                props.setOpenModal(undefined);
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CardAddPhone;
