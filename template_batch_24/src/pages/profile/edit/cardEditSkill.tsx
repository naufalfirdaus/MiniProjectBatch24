import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import {
  UpdateSkillRequest,
  addSkillReq,
} from "@/redux-saga/action/skillAction";

type ModalSkill = {
  setRefresh: (value: boolean) => void;
  setOpenModalEdit: (value: boolean) => void;
  setIdSkill: any;
  setSKill: any;
};
const CardEditSkill = (props: ModalSkill) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Skillid: props.setIdSkill,
      search_skill: props.setSKill,
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          search_skill: values.search_skill,
        };

        const id = values.Skillid;

        // window.alert("Data Successfully ");
        dispatch(UpdateSkillRequest(payload, id));
        // props.setRefresh(true);
        // window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Edit Skill
      </h2>
      <div className="w-full  bg-white p-3 rounded-md mt-3 mb-3">
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <div className="flex  mt-3 items-center">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 w-12"
                >
                  Skills
                </label>
                <div className="xl:w-96">
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="search"
                      name="search_skill"
                      id="search_skill"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.search_skill}
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

export default CardEditSkill;
