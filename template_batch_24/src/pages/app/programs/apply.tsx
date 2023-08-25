import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AddApplyRequest } from "@/redux-saga/action/applyAction";
import { useSelector } from "react-redux";
import config from "@/config/config";
import { useRouter } from "next/router";
import AppLayout from "@/pages/component/layout/AppLayout";
import Header from "./Header";
import Checkpoint from "./Checkpoint";
import { GetProgressRequest } from "@/redux-saga/action/programsAction";
import {
  UserImageRequest,
  // UserDataRequest,
} from "@/redux-saga/action/userAction";
import * as Yup from "yup";

interface formType {
  firstName: string;
  lastName: string;
  birthDate: string;
  school: string;
  fieldStudy: string;
  degree: string;
  file: any;
  image: any;
}

const validation = Yup.object().shape({
  firstName: Yup.string().required("Please Insert Your First Name"),
  lastName: Yup.string().required("Please Insert Your Last Name"),
  birthDate: Yup.date().required("Please Insert Your Birth Date"),
  degree: Yup.string().required(),
  school: Yup.string().required("Please Insert Your School Name"),
  fieldStudy: Yup.string().required("Please Insert Your Field Study"),
});

const Apply = () => {
  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [age, setAge] = useState<any>(0);
  const [progId, setProgId] = useState(0);
  const [birthdate, setBirthdate] = useState<any>(new Date());
  const [image, setImage] = useState<any>("");
  const [uploadImage, setUploadImage] = useState<any>(false);
  const [previewImage, setPreviewImage] = useState<any>("");
  const [motivation, setMotivation] = useState(false);
  const [user, setUser] = useState({
    UserId: "",
    Firstname: "",
    Lastname: "",
    school: "",
    Fieldstudy: "",
    degree: "",
    photo: "",
  });
  // const { UserProfile } = useSelector((state: any) => state.userState);
  const UserData = useSelector((state: any) => state.userState.oneUser);
  const detail = useSelector((state: any) => state.programState.detail);
  const progress = useSelector((state: any) => state.programState.progress);

  const initialValues: formType = {
    firstName: UserData?.oneUSerData?.userFirstName || "",
    lastName: UserData?.oneUSerData?.userLastName || "",
    birthDate: UserData?.oneUSerData?.userBirthDate?.split("T")[0] || "",
    // school: UserData?.usersEducations[0].usduSchool || "",
    // fieldStudy: UserData?.usersEducations[0].usduFieldStudy || "",
    // degree: UserData?.usersEducations[0].usduDegree || "",
    school: UserData?.oneUSerData?.userEducation[0].School || "",
    fieldStudy: UserData?.oneUSerData?.userEducation[0].Study || "",
    degree: UserData?.oneUSerData?.userEducation[0]?.Degree || "",
    file: null,
    image: null,
  };

  console.log("photo ", UserData);

  useEffect(() => {
    // dispatch(UserDataRequest(UserProfile.UserId));
    // dispatch(GetProgressRequest(UserProfile.UserId, progId));
    setProgId(
      parseInt(detail?.bootcampAndMentor?.progEntityId || query.progId)
    );
    dispatch(GetProgressRequest(UserData?.oneUSerData?.userEntityId, progId));
    console.log("ini user progid ", progId);

    // setUser({
    //   ...user,
    //   UserId: UserProfile.UserId,
    //   Firstname: UserData.userFirstName,
    //   Lastname: UserData.userLastName,
    //   // school: UserData.usersEducations.usduSchool,
    //   // Fieldstudy: UserData.usersEducations.usduFieldStudy,
    //   // degree: UserData.usersEducations.usduDegree,
    //   school: UserData.userEducation[0].School,
    //   Fieldstudy: UserData.userEducation[0].Study,
    //   degree: UserData.userEducation[0].Degree,
    //   photo: UserData.userphoto,
    // });

    if (UserData?.oneUSerData?.userBirthDate) {
      handleAge(UserData?.oneUSerData?.userBirthDate);
    }
  }, [progId]);

  // console.log("ini user profile ", UserProfile);
  console.log("ini user data ", UserData);
  console.log("ini user detail ", detail);
  console.log("ini user user ", user);
  console.log("ini user query ", query);
  console.log("ini user progress ", progress);

  const calculateAge = (birthdate: any) => {
    const birthDate: any = new Date(birthdate);
    const today: any = new Date();

    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    const daysDiff = today.getDate() - birthDate.getDate();
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    }

    console.log("ini yearsdiff", yearsDiff);

    return yearsDiff;
  };

  const handleAge = (birthDate: any) => {
    // event.preventDefault();
    const newBirthDate = birthDate;
    setBirthdate(newBirthDate);

    if (newBirthDate) {
      const newAge = calculateAge(birthdate);
      setAge(newAge);
    } else {
      setAge(0);
      setBirthdate(null);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: async (values) => {
      if (!motivation) return;

      let payload = new FormData();
      payload.append("firstName", values.firstName);
      payload.append("lastName", values.lastName);
      payload.append("birthDate", values.birthDate);
      payload.append("school", values.school);
      payload.append("fieldStudy", values.fieldStudy);
      payload.append("degree", values.degree);
      payload.append("file", values.file);
      console.log("ini adalah payload di halaman apply:", values);

      let imageForm = new FormData();
      imageForm.append("file", values.image);
      // dispatch(UserImageRequest(user.UserId, imageForm));
      dispatch(UserImageRequest(UserData.oneUSerData.userEntityId, imageForm));

      dispatch(
        AddApplyRequest(
          // UserProfile.UserId,
          UserData.oneUSerData.userEntityId,
          detail.bootcampAndMentor.progEntityId,
          payload
        )
      );

      setPreviewImage("");
      router.push("confirm");
    },
  });

  const uploadConfig = (name: any) => (event: any) => {
    let reader = new FileReader();
    const file = event.target.files[0];
    console.log("ini adalah data file:", event.target.files);
    reader.onload = () => {
      formik.setFieldValue("file", file);
    };
    reader.readAsDataURL(file);
  };

  const imageConfig = (name: any) => (event: any) => {
    let reader = new FileReader();
    const image = event.target.files[0];
    console.log("ini image ", image);

    reader.onload = () => {
      const result = reader.result;
      setImage(image);
      formik.setFieldValue("image", image);
      setUploadImage(true);
      setPreviewImage(result?.toLocaleString());
    };
    reader.readAsDataURL(image);
  };

  const handleMotivation = () => {
    setMotivation(true);
  };
  return (
    <>
      {/* <Header></Header> */}
      <AppLayout>
        <div>
          <div className="flex justify-center m-5">
            <h1 className="text-2xl">
              Application Bootcamp Regular
              {query.title
                ? " " + query.title
                : " " + detail?.bootcampAndMentor?.progTitle}
            </h1>
          </div>
          <div className="flex justify-evenly">
            <div>
              <div className="flex">
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="firstName">First Name</label>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={UserData?.oneUSerData?.userFirstName}
                    className="mr-2"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500">
                      {formik.errors.firstName as string}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={UserData?.oneUSerData?.userLastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500">
                      {formik.errors.lastName as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="birthDate">Birth Date</label>
                  </div>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={formik.values.birthDate}
                    max={new Date().toISOString().split("T")[0]}
                    onBlur={formik.handleBlur}
                    // onChange={handleAge}
                    onChange={(event) => {
                      handleAge(event.currentTarget.value),
                        formik.handleChange(event);
                    }}
                  />
                  {formik.touched.birthDate && formik.errors.birthDate && (
                    <p className="text-red-500">
                      {formik.errors.birthDate as string}
                    </p>
                  )}
                </div>
                <div className="mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="age" className="mb-1">
                      Age
                    </label>
                  </div>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={age}
                    onChange={() => {}}
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="school" className="mb-1">
                      University or School
                    </label>
                  </div>
                  <input
                    type="text"
                    name="school"
                    id="school"
                    value={formik.values.school}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // placeholder={UserData?.usersEducations[0].usduSchool}
                    placeholder={UserData?.oneUSerData?.userEducation[0].School}
                    className="w-full"
                  />
                  {formik.touched.school && formik.errors.school && (
                    <p className="text-red-500">
                      {formik.errors.school as string}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="fieldStudy" className="mb-1">
                      Field of Study
                    </label>
                  </div>
                  <input
                    type="text"
                    name="fieldStudy"
                    id="fieldStudy"
                    value={formik.values.fieldStudy}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // placeholder={UserData?.usersEducations[0].usduFieldStudy}
                    placeholder={UserData?.oneUSerData?.userEducation[0].Study}
                    className="w-full"
                  />
                  {formik.touched.fieldStudy && formik.errors.fieldStudy && (
                    <p className="text-red-500">
                      {formik.errors.fieldStudy as string}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <div className="mb-1">
                    <label htmlFor="degree" className="mb-1">
                      Degree
                    </label>
                  </div>
                  <select
                    name="degree"
                    id="degree"
                    value={formik.values.degree}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full"
                  >
                    <option value="" disabled>
                      Degree
                    </option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                  {formik.touched.degree && formik.errors.degree && (
                    <p className="text-red-500">
                      {formik.errors.degree as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="motivation" className="mb-1">
                    Motivation to Join Bootcamp
                  </label>
                  <textarea
                    name="motivation"
                    id="motivation"
                    rows={4}
                    cols={50}
                    onChange={handleMotivation}
                  ></textarea>
                  {!motivation && (
                    <p className="text-red-500">
                      Please Insert Your Motivation to Join Bootcamp
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <span className="mr-3">Curriculum Vitae</span>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={uploadConfig("file")}
                    accept="application/pdf"
                  ></input>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="bg-slate-800 p-2 w-full mb-5 text-white"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                {uploadImage === false ? (
                  !UserData?.oneUSerData?.userPhoto === null ? (
                    <Image
                      width={150}
                      height={150}
                      alt="user photo"
                      src="/static/image/user-image-not-found.jpg"
                      className="rounded-full"
                    ></Image>
                  ) : (
                    <Image
                      width={150}
                      height={150}
                      alt="user photo"
                      src={`${config.domain}/programs/image/${UserData?.oneUSerData?.userPhoto}`}
                      className="rounded-full"
                    ></Image>
                  )
                ) : (
                  <Image
                    width={150}
                    height={150}
                    alt="Uploaded Photo"
                    src={previewImage}
                    className="rounded-full"
                  ></Image>
                )}
              </div>
              <div>
                <label htmlFor="image" className="mr-3">
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={imageConfig("file")}
                  accept="image/jpg"
                ></input>
              </div>
              <div>
                <div className="mt-8 text-xl">
                  <h5 className="mb-2">Step to Join Bootcamp</h5>
                </div>
                <div className="flex justify-center">
                  <Checkpoint progress={progress}></Checkpoint>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Apply;
