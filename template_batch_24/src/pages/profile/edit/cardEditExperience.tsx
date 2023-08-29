import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import { addPhoneReq } from "@/redux-saga/action/phoneAction";
import { addEducationReq } from "@/redux-saga/action/educationAction";
import {
  UpdateExperienceRequest,
  addExperienceReq,
} from "@/redux-saga/action/experienceAction";

type Modaleditexperience = {
  setRefresh: (value: boolean) => void;
  setOpenModalEdit: (value: boolean) => void;

  setId: any;
  setTittle: any;
  setHeadline: any;
  setCompany: any;
  setCity: any;
  setStart: any;
  setStartYear: any;
  setEnd: any;
  setEndYear: any;
  setIndustry: any;
  setEmptype: any;
  setDesc: any;
  setExtype: any;
  setCurrent: any;
};
const CardEditExperiences = (props: Modaleditexperience) => {
  const dispatch = useDispatch();

  const [selectedEmployeeTypeCode, setSelectedEmployeeTypeCode] = useState("");
  const handleEmployeeTypeCodeChange = (event: any) => {
    setSelectedEmployeeTypeCode(event.target.value);
    formik.setFieldValue("emtype", event.target.value);
  };

  const [selectedExperienceTypeCode, setSelectedExperienceTypeCode] =
    useState("");
  const handleExperienceTypeChange = (event: any) => {
    setSelectedExperienceTypeCode(event.target.value);
    formik.setFieldValue("extype", event.target.value);
  };

  const [selectedStartCode, setSelectedStartCode] = useState("");
  const handleStartCodeChange = (event: any) => {
    setSelectedStartCode(event.target.value);
    formik.setFieldValue("start", event.target.value);
  };

  const [selectedEndCode, setSelectedEndCode] = useState("");
  const handleEndCodeChange = (event: any) => {
    setSelectedEndCode(event.target.value);
    formik.setFieldValue("end", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      id: props.setId,
      tittle: props.setTittle,
      headline: props.setHeadline,
      company: props.setCompany,
      search_city: props.setCity,
      start: props.setStart,
      startYear: props.setStartYear,
      end: props.setEnd,
      endYear: props.setEndYear,
      industry: props.setIndustry,
      emtype: props.setEmptype,
      desc: props.setDesc,
      extype: props.setExtype,
      current: props.setCurrent,
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          tittle: values.tittle,
          headline: values.headline,
          company: values.company,
          search_city: values.search_city,
          start: selectedStartCode,
          startyear: values.startYear,
          end: selectedEndCode,
          endyear: values.endYear,
          industry: values.industry,
          emtype: selectedEmployeeTypeCode,
          desc: values.desc,
          extype: selectedExperienceTypeCode,
          current: values.current,
        };

        const id = values.id;
        props.setRefresh(true);
        window.alert("Data Successfully ");
        dispatch(UpdateExperienceRequest(payload, id));
        // window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Edit Experience
      </h2>
      <div className="w-full bg-white p-3 rounded-md mt-3 mb-3">
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            {/* TITLE */}
            <div className="sm:col-span-3 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="headline"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Tittle
                </label>
                <div className="mt-1 flex-1">
                  <input
                    id="tittle"
                    name="tittle"
                    type="text"
                    autoComplete="headline"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.tittle}
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* HEADLINE */}
            <div className="sm:col-span-3 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="headline"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Headline
                </label>
                <div className="mt-1 flex-1">
                  <input
                    id="headline"
                    name="headline"
                    type="text"
                    autoComplete="headline"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.headline}
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* COMPANY */}
            <div className="sm:col-span-3 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Company
                </label>
                <div className="mt-1 flex-1">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="postal-code"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.company}
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* CITY */}
            <div className="sm:col-span-3 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  City
                </label>
                <div className=" xl:w-96">
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="search"
                      name="search_city"
                      id="search_city"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.search_city}
                      className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
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

            {/* START AND END EXPERIENCE */}
            <div className="sm:col-span-4 mt-3 flex items-center">
              <label
                htmlFor="start"
                className="block text-sm font-medium leading-6 text-gray-900 w-24"
              >
                Start
              </label>
              <div className="mt-1">
                <select
                  id="start"
                  name="start"
                  autoComplete="start"
                  required
                  value={selectedStartCode}
                  onChange={handleStartCodeChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  placeholder="Code Telp."
                >
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="Oktober">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </select>
              </div>
              <label
                htmlFor="startYear"
                className="block ml-3 text-sm font-medium leading-6 text-gray-900 w-11"
              >
                Year
              </label>
              <div className="mt-1">
                <input
                  id="startYear"
                  name="startYear"
                  type="text"
                  autoComplete="postal-code"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.startYear}
                  className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <label
                htmlFor="postal-code"
                className="block ml-3 text-sm font-medium leading-6 text-gray-900 w-11"
              >
                Until
              </label>
              <div className="mt-1">
                <select
                  id="end"
                  name="end"
                  autoComplete="end"
                  required
                  value={selectedEndCode}
                  onChange={handleEndCodeChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  placeholder="Code Telp."
                >
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April</option>
                  <option value="Mei">Mei</option>
                  <option value="Juni">Juni</option>
                  <option value="Juli">Juli</option>
                  <option value="Agustus">Agustus</option>
                  <option value="September">September</option>
                  <option value="Oktober">Oktober</option>
                  <option value="November">November</option>
                  <option value="Desember">Desember</option>
                </select>
              </div>

              <label
                htmlFor="endYear"
                className="block ml-3 text-sm font-medium leading-6 text-gray-900 w-11"
              >
                Year
              </label>
              <div className="mt-1">
                <input
                  id="endYear"
                  name="endYear"
                  type="text"
                  autoComplete="endYear"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.endYear}
                  className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="relative ml-5 flex gap-x-3 items-center">
                <div className="flex h-6 items-center">
                  <input
                    id="current"
                    name="current"
                    type="checkbox"
                    required
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("current", e.target.checked ? 1 : 0); // Set 1 jika checked, 0 jika tidak
                    }}
                    checked={formik.values.current == 1} // Set checked jika usex_is_current adalah 1
                    value={formik.values.current}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm flex items-center">
                  <label
                    htmlFor="current"
                    className="font-medium text-gray-900"
                  >
                    Until Now
                  </label>
                </div>
              </div>
            </div>

            {/* INDUSTRY */}
            <div className="sm:col-span-3 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Industry
                </label>
                <div className="mt-1 flex-1">
                  <input
                    id="industry"
                    name="industry"
                    type="text"
                    autoComplete="postal-code"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.industry}
                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* EMPLOYMENT-TYPE*/}
            <div className="sm:col-span-4 w-1/2 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="employment-type"
                  className="block text-sm font-medium leading-6 text-gray-900 w-36"
                >
                  Employment Type
                </label>
                <div className="mt-1">
                  <select
                    id="meployment-type"
                    name="emptype"
                    autoComplete="emptype"
                    required
                    value={selectedEmployeeTypeCode}
                    onChange={handleEmployeeTypeCodeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    placeholder="Code Telp."
                  >
                    <option value="fulltime">Full-Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900 w-24"
                >
                  Descriptions
                </label>
                <div className="mt-1 flex-1">
                  <textarea
                    name="desc"
                    id="desc"
                    rows={4}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.desc}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>

            {/* EXPERIENCE-TYPE*/}
            <div className="sm:col-span-4 mt-4">
              <div className="flex items-center">
                <label
                  htmlFor="experience-type"
                  className="block text-sm font-medium leading-6 text-gray-900 w-36"
                >
                  Experience Type
                </label>
                <div className="mt-1">
                  <select
                    id="extype"
                    name="extype"
                    autoComplete="experience-type"
                    required
                    value={selectedExperienceTypeCode}
                    onChange={handleExperienceTypeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    placeholder="Code Telp."
                  >
                    <option value="company">Company</option>
                    <option value="certified">Certified</option>
                    <option value="voluntering">Voluntering</option>
                    <option value="organization">Organization</option>
                    <option value="reward">Reward</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                props.setOpenModalEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                formik.handleSubmit();
                props.setOpenModalEdit(false);
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

export default CardEditExperiences;
