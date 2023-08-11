import AppLayout from "@/pages/component/layout/AppLayout";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { GetUserReq } from "@/redux-saga/action/UserAction";
import { GetResumeReq, JobApplyReq } from "@/redux-saga/action/JobApplyAction";
import { getAge } from "@/helpers/calculateAge";
import { error } from "console";
import { domain } from "@/pages/config/config";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

const validation = Yup.object().shape({
  fullName: Yup.string().trim().required("Full Name is required"),
  birthDate: Yup.date().required("Birth date is required"),
  degree: Yup.string().required(),
  school: Yup.string().trim().required("Sekolah/University is required"),
  fieldStudy: Yup.string().trim().required(),
  phone: Yup.string().trim().matches(/^\+?([ -]?\d+)+$|\(\d+\)([ -]\d+)/, "invalid phone number").required(),
});

export default function Apply() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { user } = useSelector((state: any) => state.userState);
  const { resume } = useSelector((state: any) => state.jobApplyState)
  const jopoEntityId = "1";
  const loginUserId = "8";    //diganti kalau udah integrasi ke user

  const [age, setAge] = useState<number>();
  const [resumeName, setResumeName] = useState<string>("");
  const [previewImg, setPreviewImg] = useState("");
  const [upload, setUpload] = useState(false);
  const [fileError, setFileError] = useState({
    resume: false,
    photo: false,
  });
  const [alert, setAlert] = useState({ open: false, status: "" });

  const hpNumber = user?.usersPhones?.find((phone: any) => phone.uspoPontyCode?.pontyCode?.toLowerCase() === "cell");
  const initialValues = {
    fullName: `${user?.userFirstName || ""} ${user?.userLastName || ""}` || "",
    birthDate: user?.userBirthDate?.split("T")[0] || "",
    degree: user?.usersEducations?.[user.usersEducations.length - 1]?.usduDegree || "",
    school: user?.usersEducations?.[user.usersEducations.length - 1]?.usduSchool || "",
    fieldStudy: user?.usersEducations?.[user.usersEducations.length - 1]?.usduFieldStudy || "",
    phone: hpNumber?.uspoNumber || user?.usersPhones?.[0]?.uspoNumber || "",
    resume: "",
    photo: "",
  };

  const isFileEmpty = () => {
    !previewImg && setFileError({...fileError, photo: true});
    !resumeName && setFileError({...fileError, resume: true});
    
    if ((!resumeName && !formik.values.resume) || (!previewImg && !formik.values.photo)) return true;
    return false;
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values: typeof initialValues) => {
      if (isFileEmpty()) return;
      
      const formData = new FormData();
      formData.set("userEntityId", user.userEntityId);
      formData.set("jobEntityId", jopoEntityId);

      for (let value in values) {
        if (
          values[value as keyof typeof initialValues] &&
          values[value as keyof typeof initialValues] !==
            initialValues[value as keyof typeof initialValues]
        )
          formData.append(value, values[value as keyof typeof initialValues]);
      }
      user?.usersEducations?.length > 0 && formData.set("usduId", user.usersEducations[user.usersEducations.length - 1].usduId);
      user?.usersPhones?.length > 0 && formData.set("oldPhone", initialValues.phone);
      
      dispatch(JobApplyReq(formData));
      setAlert({ open: true, status: "success" });
      setTimeout(() => {
        router.push(`/hiring/${jopoEntityId}`);
        setAlert({ ...alert, open: false });
      }, 10000);
    },
  });

  
  const handleResumeSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files && e.currentTarget.files[0];
    if (files) {
      formik.setFieldValue("resume", files);
      setResumeName(files?.name || "");
      setFileError({...fileError, resume: false});
    }
  };

  const uploadConfig = (event: any) => {
    let reader = new FileReader();
    const file = event.target.files[0];
    if (file) {
      reader.onload = () => {
        formik.setFieldValue("photo", file);
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUpload(true);
    }
  };

  useEffect(() => {
    dispatch(GetUserReq(loginUserId));
    dispatch(GetResumeReq(loginUserId));
  }, []);

  useEffect(() => {
    setResumeName(resume?.usmeFilename);
    setPreviewImg(user?.userPhoto);
    setAge(getAge(initialValues.birthDate))
  }, [initialValues.birthDate, resume?.usmeFilename, user?.userPhoto]);

  return (
    <AppLayout>
      <div className="text-black text-center px-7 py-3">
        <h2 className="font-semibold text-2xl">
          Profesional Application Process
        </h2>
        <form
          className="mt-5 grid grid-cols-1 gap-4 place-items-center"
          method="post"
          onSubmit={formik.handleSubmit}
        >
          <label
            htmlFor="photo"
            className={`border rounded-full w-28 h-28 flex items-center justify-center text-sm md:absolute inset-y-16 xl:right-1/4 lg:right-28 md:right-20 cursor-pointer ${
              (fileError.photo && "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500 text-red-500") || "border-slate-500"
            }`}
          >
            {!previewImg && !upload ? (
              fileError.photo ? "Please upload your photo" : "Upload Photo"
            ) : (
              <Image
                loader={({ src }) => src}
                src={`${
                  upload ? previewImg : `${domain}/users/photo/${previewImg}`
                }`}
                alt={previewImg}
                width={0}
                height={0}
                className="w-28 h-28 rounded-full absolute"
              />
            )}
            <div className="w-28 h-28 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
              <Image className="hidden group-hover:block w-8" loader={({ src }) => src} src="https://www.svgrepo.com/show/33565/upload.svg" alt="" width={0} height={0} />
            </div>
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            hidden
            onChange={uploadConfig}
          />
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              className={`text-sm w-full ${
                formik.touched.fullName &&
                formik.errors.fullName &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
              }`}
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <small className="text-red-500">{formik.errors.fullName}</small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <div className="flex justify-between gap-3">
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                className={`text-sm w-full ${
                  formik.touched.birthDate &&
                  formik.errors.birthDate &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
                }`}
                max={new Date().toISOString().split("T")[0]}
                value={formik.values.birthDate}
                onBlur={(e) => setAge(getAge(e.currentTarget.value))}
                onChange={formik.handleChange}
              />
              <input
                type="text"
                name="age"
                id="age"
                className="text-sm w-2/5 md:w-3/4"
                value={(age && `${age} tahun`) || ""}
                readOnly
              />
            </div>
            {formik.touched.birthDate && formik.errors.birthDate && (
              <small className="text-red-500">
                {formik.errors.birthDate as string}
              </small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <select
              name="degree"
              id="degree"
              className={`w-full text-sm ${
                formik.touched.degree &&
                formik.errors.degree &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
              }`}
              value={formik.values.degree}
              onChange={formik.handleChange}
            >
              <option value="">Pendidikan</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Diploma">Diploma</option>
            </select>
            {formik.touched.degree && formik.errors.degree && (
              <small className="text-red-500">
                {formik.errors.degree as string}
              </small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <input
              type="text"
              name="school"
              id="school"
              placeholder="Sekolah / University"
              className={`w-full text-sm ${
                formik.touched.school &&
                formik.errors.school &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
              }`}
              value={formik.values.school}
              onChange={formik.handleChange}
            />
            {formik.touched.school && formik.errors.school && (
              <small className="text-red-500">
                {formik.errors.school as string}
              </small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <input
              type="text"
              name="fieldStudy"
              id="fieldStudy"
              placeholder="Jurusan"
              className={`w-full text-sm ${
                formik.touched.fieldStudy &&
                formik.errors.fieldStudy &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
              }`}
              value={formik.values.fieldStudy}
              onChange={formik.handleChange}
            />
            {formik.touched.fieldStudy && formik.errors.fieldStudy && (
              <small className="text-red-500">
                {formik.errors.fieldStudy as string}
              </small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="HP Number"
              className={`w-full text-sm ${
                formik.touched.phone &&
                formik.errors.phone &&
                "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500"
              }`}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-red-500">
                {formik.errors.phone as string}
              </small>
            )}
          </div>
          <div className="w-full md:w-2/5 xl:w-1/4 text-sm text-left">
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleResumeSelected}
              accept="application/pdf"
              hidden
            />
            <label
              htmlFor="resume"
              className={`flex justify-between w-full text-sm border cursor-pointer ${
                fileError.resume && "border-red-500 focus:border-red-500 focus:ring-red-500 focus:ring-offset-red-500" || "border-slate-500 "
              }`}
            >
              <span className="py-2 ps-2 text-start whitespace-nowrap overflow-hidden text-ellipsis w-3/5">
                {resumeName || "Resume"}
              </span>
              <span className={`border-s px-2 py-2 w-2/5 ${fileError.resume && "border-s-red-500" || "border-s-slate-500"}`}>
                Choose File PDF
              </span>
            </label>
            {fileError.resume && (<small className="text-red-500">resume is required</small>)}
          </div>
          
          <div className="flex w-full md:w-2/5 xl:w-1/4 justify-between gap-3 text-sm">
            <button
              type="button"
              className="bg-orange-400 px-10 py-2.5 hover:bg-orange-500 focus:bg-orange-500 focus:text-white hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-10 py-2.5 hover:bg-blue-600 focus:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </form>
      </div>

      <Transition appear show={alert.open} as={Fragment}>
        <Dialog as="div" onClose={() => ""} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Thank you for applying
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-gray-600">
                    We have received your profile and we will review your application. Our Talent Acquisition Team will contact you if your qualifications match our needs for the role.
                  </Dialog.Description>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-950 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        router.push(`/hiring/${jopoEntityId}`);
                        setAlert({ ...alert, open: false });
                      }}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </AppLayout>
  );
}
