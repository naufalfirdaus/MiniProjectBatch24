import AppLayout from "@/pages/component/layout/AppLayout";
import { GetClientReq } from "@/redux-saga/action/ClientAction";
import {
  GetAddressReq,
  GetEducationReq,
  GetIndustryReq,
  GetJobTypeReq,
} from "@/redux-saga/action/MasterAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CreateJobReq,
  CreateJobReset,
  GetJobCategoryReq,
  GetJoponumberReq,
} from "@/redux-saga/action/JobAction";
import { Combobox } from "@headlessui/react";
import Editor from "@/pages/component/form/Editor";
import Image from "next/image";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import SubmitAlert from "@/pages/component/form/SubmitAlert";

export default function Create() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jopoNumber, jobCategory, error, createState } = useSelector(
    (state: any) => state.jobState
  );
  const { clients } = useSelector((state: any) => state.clientState);
  const { jobType, address, industry, education } = useSelector(
    (state: any) => state.masterState
  );

  const [queryClient, setQueryClient] = useState("");
  const [selectedClient, setSelectedClient] = useState(clients[0] || "");
  const [queryAddr, setQueryAddr] = useState("");
  const [selectedAddr, setSelectedAddr] = useState(address[0] || "");
  const [toggleData, setToggleData] = useState({
    status: false,
    woty: false,
    closehiring: false,
  });
  const [description, setDescription] = useState("");
  const [previewImg, setPreviewImg] = useState<string>("");
  const [upload, setUpload] = useState(false);
  const [alert, setAlert] = useState({ open: false, status: "" });

  const filteredClient =
    queryClient === ""
      ? clients
      : clients.filter((client: any) =>
          client.clitName.toLowerCase().includes(queryClient.toLowerCase())
        );

  const filteredAddress =
    queryAddr === ""
      ? address
      : address.filter((addr: any) =>
          addr.addrLine1.toLowerCase().includes(queryAddr.toLowerCase())
        );

  const initialValues = {
    jopo_number: jopoNumber || "",
    title: "",
    start_date: "",
    end_date: "",
    max_sal: "",
    max_exp: "",
    primary_skill: "",
    secondary_skill: "",
    indu_code: "",
    joca_id: jobCategory[0]?.jocaId,
    joty_id: jobType[0]?.jotyId,
    edu_code: "",
    benefit: "",
    photos: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      title: Yup.string().required().min(2),
    }),
    onSubmit: async (values: typeof initialValues) => {
      const formData = new FormData();
      toggleData.closehiring && (values.end_date = new Date().toISOString());

      for (let value in values) {
        if (values[value as keyof typeof initialValues])
          formData.append(value, values[value as keyof typeof initialValues]);
      }

      formData.set("clit_id", selectedClient.clitId || "");
      formData.set("addr_id", selectedAddr.addrId || "");
      formData.set("status", toggleData.status ? "Publish" : "Draft");
      formData.set(
        "benefit",
        values.benefit && JSON.stringify({ item: values.benefit })
      );
      formData.set("des", description && JSON.stringify({ item: description }));

      dispatch(CreateJobReq(formData));
    },
  });

  const uploadConfig = (name: string) => (event: any) => {
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      formik.setFieldValue("photos", file);
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(file);
    setUpload(true);
  };
  const onClear = (event: any) => {
    event.preventDefault();
    setPreviewImg("");
    setUpload(false);
    formik.values.photos = "";
  };

  useEffect(() => {
    dispatch(GetJoponumberReq());
    dispatch(GetJobCategoryReq());
    dispatch(GetClientReq());
    dispatch(GetJobTypeReq());
    dispatch(GetAddressReq());
    dispatch(GetIndustryReq());
    dispatch(GetEducationReq());
  }, [dispatch]);

  useEffect(() => {
    if (!createState?.pending && createState?.success) {
      setAlert({ open: true, status: "success" });
      setTimeout(() => {
        router.push("/app/hiring");
        setAlert({ ...alert, open: false });
      }, 2000);
      dispatch(CreateJobReset());
    } else if (!createState?.pending && error) {
      setAlert({ open: true, status: "failed" });
    }
  }, [createState, error]);

  return (
    <AppLayout>
      <div className="flex justify-between text-gray-900 px-7 py-3 border border-black">
        <h1 className="font-medium text-lg">Posting Jobs</h1>
        <button
          type="button"
          className="text-sm inline-flex"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap gap-7 text-gray-900 text-sm px-7 border-x py-3 pb-7 border-black">
          <div className="grid grid-cols-1 gap-4 md:w-1/2 w-full">
            <label htmlFor="title" className="block">
              <span>Title</span>
              <input
                type="text"
                placeholder="Title"
                name="title"
                id="title"
                className={`mt-1 block w-full text-xs p-2 ${
                  formik.touched.title &&
                  formik.errors.title &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
                }`}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minLength={2}
              />
              {formik.touched.title && formik.errors.title && (
                <small className="text-red-500">{formik.errors.title}</small>
              )}
            </label>

            <label htmlFor="start_date">
              <span>Periode Posting</span>
              <div className="mt-1">
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="text-xs p-2"
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                />
                <span className="mx-3">to</span>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="text-xs p-2"
                  value={formik.values.end_date}
                  onChange={formik.handleChange}
                />
              </div>
            </label>

            <div className="flex gap-3">
              <label htmlFor="max_sal">
                <span>Up To Salary</span>
                <input
                  type="number"
                  name="max_sal"
                  id="max_sal"
                  className="block mt-1 text-xs p-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min={100000}
                  value={formik.values.max_sal}
                  onChange={formik.handleChange}
                />
              </label>

              <label htmlFor="max_exp">
                <span>Max. Experience</span>
                <input
                  type="number"
                  name="max_exp"
                  id="max_exp"
                  className="block mt-1 w-2/5 text-xs p-2"
                  min={0}
                  value={formik.values.max_exp}
                  onChange={formik.handleChange}
                />
              </label>
            </div>

            <label htmlFor="primary_skill">
              <span>Primary Skill</span>
              <input
                type="text"
                name="primary_skill"
                id="primary_skill"
                className={`block mt-1 w-full text-xs p-2`}
                value={formik.values.primary_skill}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            <label htmlFor="secondary_skill">
              <span>Secondary Skill</span>
              <input
                type="text"
                name="secondary_skill"
                id="secondary_skill"
                className="block mt-1 w-full text-xs p-2"
                value={formik.values.secondary_skill}
                onChange={formik.handleChange}
              />
            </label>

            <div className="flex gap-3">
              <label htmlFor="indu_code" className="w-full">
                <span>Industry Type</span>
                <select
                  name="indu_code"
                  id="indu_code"
                  className="block mt-1 w-full text-xs p-2"
                  onChange={formik.handleChange}
                >
                  {industry.length > 0 &&
                    industry.map((indu: any) => {
                      return (
                        <option key={indu.indu_code} value={indu.indu_code}>
                          {indu.indu_name}
                        </option>
                      );
                    })}
                </select>
              </label>

              <label htmlFor="joca_id" className="w-full">
                <span>Spesification Role</span>
                <select
                  name="joca_id"
                  id="joca_id"
                  className="block mt-1 w-full text-xs p-2"
                  onChange={formik.handleChange}
                >
                  {jobCategory.length > 0 &&
                    jobCategory.map((item: any) => {
                      return (
                        <option value={item.jocaId} key={item.jocaId}>
                          {item.jocaName}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>

            <div className="flex gap-3">
              <label htmlFor="joty_id" className="w-full">
                <span>Working Type</span>
                <select
                  name="joty_id"
                  id="joty_id"
                  className="block mt-1 w-full text-xs p-2"
                  onChange={formik.handleChange}
                >
                  {jobType.length > 0 &&
                    jobType.map((item: any) => {
                      return (
                        <option value={item.jotyId} key={item.jotyId}>
                          {item.jotyName}
                        </option>
                      );
                    })}
                </select>
              </label>

              <label htmlFor="edu_code" className="w-full">
                <span>Education</span>
                <select
                  name="edu_code"
                  id="edu_code"
                  className="block mt-1 w-full text-xs p-2"
                  onChange={formik.handleChange}
                >
                  {education.length > 0 &&
                    education.map((edu: any) => {
                      return (
                        <option key={edu.edu_code} value={edu.edu_code}>
                          {edu.edu_name}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>

            <label htmlFor="benefit" className="w-full">
              <span>Benefit</span>
              <input
                type="text"
                name="benefit"
                id="benefit"
                className="block mt-1 w-full text-xs p-2"
                value={formik.values.benefit}
                onChange={formik.handleChange}
              />
            </label>

            <Combobox value={selectedClient} onChange={setSelectedClient}>
              <div>
                <Combobox.Label>Client</Combobox.Label>
                <div className="relative w-full cursor-default text-xs mt-1">
                  <Combobox.Input
                    className="w-full pl-3 pr-10 text-xs"
                    onChange={(event) => setQueryClient(event.target.value)}
                    displayValue={(client: any) => client.clitName}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-2/5 w-4 text-gray-600"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="max-h-60 w-full bg-white text-xs border border-slate-500">
                  {filteredClient.map((client: any) => (
                    <Combobox.Option
                      key={client.clitId}
                      value={client}
                      className={({ active }) =>
                        `relative cursor-default select-none p-1 pl-8 ${
                          active ? "bg-green-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {client.clitName}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>

            <Combobox value={selectedAddr} onChange={setSelectedAddr}>
              <div>
                <Combobox.Label>Location City</Combobox.Label>
                <div className="relative w-full cursor-default text-xs mt-1">
                  <Combobox.Input
                    className="w-full pl-3 pr-10 text-xs"
                    onChange={(event) => setQueryAddr(event.target.value)}
                    displayValue={(addr: any) =>
                      addr
                        ? `${addr.addrLine1 || addr.addrLine2},  ${
                            addr.addrCity.cityName
                          }, ${addr.addrCity.cityProv.provName}, ${
                            addr.addrCity.cityProv.provCountryCode.countryName
                          }`
                        : ""
                    }
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-2/5 w-4 text-gray-600"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="max-h-60 w-full bg-white text-xs border border-slate-500">
                  {filteredAddress.map((addr: any) => (
                    <Combobox.Option
                      key={addr.addrId}
                      value={addr}
                      className={({ active }) =>
                        `relative cursor-default select-none p-1 pl-8 ${
                          active ? "bg-green-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {`${addr.addrLine1 || addr.addrLine2},  ${
                              addr.addrCity.cityName
                            }, ${addr.addrCity.cityProv.provName}, ${
                              addr.addrCity.cityProv.provCountryCode.countryName
                            }`}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>

            <div>
              <label>Descriptions</label>
              <Editor
                classes="w-full mt-1"
                value={description}
                onChange={setDescription}
              />
            </div>
          </div>
          <div className="md:w-2/5 w-full text-sm flex flex-col items-center flex-wrap gap-4">
            <label>
              <span>Posting Number</span>
              <input
                type="text"
                name="jopo_number"
                value={formik.values.jopo_number}
                readOnly
                className="block mt-1 bg-slate-300 text-xs p-2"
              />
            </label>

            <label htmlFor="photos" className="text-center">
              {!upload ? (
                <input
                  type="file"
                  name="photos"
                  id="photos"
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:font-semibold hover:file:bg-slate-200 file:hover:cursor-pointer hover:cursor-pointer"
                  accept="image/png, image/jpeg"
                  onChange={uploadConfig("photos")}
                />
              ) : (
                <>
                  <Image src={previewImg} alt="img" width={200} height={200} />
                  <button onClick={onClear}>Remove</button>
                </>
              )}
            </label>

            <Switch.Group>
              <div className="flex items-center cursor-pointer text-sm gap-11">
                <Switch.Label className="cursor-pointer">Publish?</Switch.Label>
                <Switch
                  checked={toggleData.status}
                  onChange={() =>
                    setToggleData({ ...toggleData, status: !toggleData.status })
                  }
                  className={`${
                    toggleData.status
                      ? "bg-green-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  } relative inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="false"
                    className={`${
                      toggleData.status ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-[1.3rem] w-[1.3rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </Switch.Group>

            <Switch.Group>
              <div className="flex items-center cursor-pointer text-sm gap-7">
                <Switch.Label className="cursor-pointer">
                  Remotely?
                </Switch.Label>
                <Switch
                  checked={toggleData.woty}
                  onChange={() =>
                    setToggleData({ ...toggleData, woty: !toggleData.woty })
                  }
                  className={`${
                    toggleData.woty
                      ? "bg-green-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  } relative inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="false"
                    className={`${
                      toggleData.woty ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-[1.3rem] w-[1.3rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </Switch.Group>

            <Switch.Group>
              <div className="flex items-center cursor-pointer text-sm gap-4">
                <Switch.Label className="cursor-pointer">
                  Close Hiring?
                </Switch.Label>
                <Switch
                  checked={toggleData.closehiring}
                  onChange={() =>
                    setToggleData({
                      ...toggleData,
                      closehiring: !toggleData.closehiring,
                    })
                  }
                  className={`${
                    toggleData.closehiring
                      ? "bg-green-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  } relative inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="false"
                    className={`${
                      toggleData.closehiring ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-[1.3rem] w-[1.3rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>
        </div>

        <div className="bg-slate-100 px-7 py-3 sm:text-sm flex gap-4 justify-end border border-black">
          <button
            type="submit"
            className="py-1 px-3 bg-green-800 hover:bg-green-900"
          >
            Save
          </button>
          <button
            type="button"
            className="py-1 px-4 bg-slate-800 hover:bg-slate-900"
            onClick={() => router.push("/app/hiring")}
          >
            Cancel
          </button>
        </div>
      </form>

      <SubmitAlert
        alert={alert}
        setAlert={setAlert}
        title={
          alert.status === "success"
            ? `Create Data Success`
            : `Create data failed`
        }
        description={
          alert.status === "success"
            ? `New job post successfully created`
            : `Something went wrong. ${error?.response?.data?.message}`
        }
        onClose={() => ""}
        onClickOk={() => {
          alert.status === "success" && router.push("/app/hiring");
          setAlert({ ...alert, open: false });
          dispatch(CreateJobReset());
        }}
      ></SubmitAlert>
    </AppLayout>
  );
}
