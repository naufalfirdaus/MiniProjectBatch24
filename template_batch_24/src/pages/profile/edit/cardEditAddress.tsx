import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import Select from "react-select";
import { UpdateAddressRequest } from "@/redux-saga/action/addressAction";

const optionList = [
  { value: "Bandung", label: "Bandung" },
  { value: "Bogor", label: "Bogor" },
  { value: "Jakarta", label: "Jakarta" },
];

type ModalAddress = {
  setRefresh: (value: boolean) => void;
  setOpenModalEdit: (value: boolean) => void;
  setId: any;
  setAddress1: any;
  setAddress2: any;
  setPostalcode: any;
  setCity: any;
  settype: any;
};

const CardEditAddress = (props: ModalAddress) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<null | {
    value: string;
    label: string;
  }>(null);
  const [selectedTypeAddress, setSelectedTypeAddress] = useState("");
  const handleTypeAddressChange = (event: any) => {
    setSelectedTypeAddress(event.target.value);
    formik.setFieldValue("type", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      addrid: props.setId,
      address1: props.setAddress1,
      address2: props.setAddress2,
      postalcode: props.setPostalcode,
      city: props.setCity,
      type: props.settype,
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          address1: values.address1,
          address2: values.address2,
          poscode: values.postalcode,
          search_city: values.city,
          type: selectedTypeAddress,
        };

        const id = values.addrid;
        props.setRefresh(true);
        window.alert("Data Update ");
        dispatch(UpdateAddressRequest(payload, id));
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Edit Address
      </h2>
      <div className="w-full bg-white p-3 rounded-md mt-3 mb-3">
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <div className="flex items-center">
                <label
                  htmlFor="address1"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Address 1
                </label>
                <div className="mt-2.5 flex-1">
                  <textarea
                    name="address1"
                    id="address1"
                    rows={4}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.address1}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4 mt-3">
              <div className="flex items-center">
                <label
                  htmlFor="address2"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Address 2
                </label>
                <div className="flex-1">
                  <textarea
                    name="address2"
                    id="address2"
                    rows={4}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.address2}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex items-center">
                {/* POSTAL CODE */}
                <div className="flex items-center space-x-1">
                  <label
                    htmlFor="postalcode"
                    className="block text-sm font-medium leading-6 text-gray-900 w-24"
                  >
                    <span style={{ display: "inline-block", width: "7rem" }}>
                      Postal Code
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="postalcode"
                      name="postalcode"
                      type="text"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.postalcode}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* CITY */}
                <div className="flex items-center ml-3 space-x-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900 w-10"
                  >
                    City
                  </label>
                  <div className="mb-3 xl:w-90">
                    <div className="relative mt-4 flex w-full flex-wrap items-stretch">
                      {/* <input
                        type="search"
                        name="city"
                        id="city"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                      /> */}

                      <Select
                        name="city"
                        id="city"
                        options={optionList}
                        onChange={(selectedOption) => {
                          setSelectedOptions(selectedOption);
                          formik.setFieldValue(
                            "city",
                            selectedOption?.value || ""
                          );
                        }}
                        value={selectedOptions}
                        isSearchable={true}
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                      />

                      {/* <!--Search icon--> */}
                      <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS TYPE */}
            <div className="sm:col-span-3">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="address-type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address Type
                </label>
                <div className="mt-2  w-1/4">
                  <select
                    id="addresstype"
                    name="addresstype"
                    autoComplete="addresstype"
                    value={selectedTypeAddress}
                    onChange={handleTypeAddressChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    placeholder="Code Telp."
                  >
                    <option value="Home">Home</option>
                    <option value="Main Office">Main Office</option>
                    <option value="Primary">Primary</option>
                    <option value="Archive">Archive</option>
                    <option value="Billing">Billing</option>
                    <option value="Shipping">Shipping</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => {
                props.setOpenModalEdit(false);
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                formik.handleSubmit();
                props.setOpenModalEdit(false);
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CardEditAddress;
