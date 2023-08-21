import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AddApplyRequest } from "@/redux-saga/action/ApplyAction";
import { useSelector } from "react-redux";
import config from "@/config/config";
import { useRouter } from "next/router";
import AppLayout from "@/pages/component/layout/AppLayout";
import Header from "./Header";
import Checkpoint from "./Checkpoint";
import { GetProgressRequest } from "@/redux-saga/action/ProgramsAction";
import {
  UserImageRequest,
  UserDataRequest,
} from "@/redux-saga/action/UserAction";

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
  const [user, setUser] = useState({
    UserId: "",
    Firstname: "",
    Lastname: "",
    school: "",
    Fieldstudy: "",
    degree: "",
    photo: "",
  });
  const { UserProfile } = useSelector((state: any) => state.userState);
  const UserData = useSelector((state: any) => state.userState.data);
  const detail = useSelector((state: any) => state.programState.detail);
  const progress = useSelector((state: any) => state.programState.progress);

  const initialValues: formType = {
    firstName: UserData?.userFirstName || "",
    lastName: UserData?.userLastName || "",
    // birthDate: UserData?.userBirthDate?.split("T")[0] || "",
    birthDate: UserData?.userBirthDate || "",
    school: UserData?.usersEducations[0].usduSchool || "",
    fieldStudy: UserData?.usersEducations[0].usduFieldStudy || "",
    degree: UserData?.usersEducations[0].usduDegree || "",
    file: null,
    image: null,
  };

  console.log("photo ", UserData);

  useEffect(() => {
    dispatch(UserDataRequest(UserProfile.UserId));
    dispatch(GetProgressRequest(UserProfile.UserId, progId));
    setProgId(
      parseInt(detail?.bootcampAndMentor?.progEntityId || query.progId)
    );
    console.log("ini user progid ", progId);

    setUser({
      ...user,
      UserId: UserProfile.UserId,
      Firstname: UserData.userFirstName,
      Lastname: UserData.userLastName,
      school: UserData.usersEducations.usduSchool,
      Fieldstudy: UserData.usersEducations.usduFieldStudy,
      degree: UserData.usersEducations.usduDegree,
      photo: UserData.userphoto,
    });
  }, [progId]);

  console.log("ini user profile ", UserProfile);
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

  const handleAge = (event: any) => {
    // event.preventDefault();
    const newBirthDate = event.target.value;
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
    initialValues: initialValues,
    onSubmit: async (values) => {
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
      dispatch(UserImageRequest(user.UserId, imageForm));

      dispatch(
        AddApplyRequest(
          UserProfile.UserId,
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
                    placeholder={UserData?.userFirstName}
                    className="mr-2"
                  />
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
                    placeholder={UserData?.userLastName}
                  />
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
                    // onChange={handleAge}
                    onChange={(event) => {
                      handleAge(event), formik.handleChange(event);
                    }}
                  />
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
                    onChange={formik.handleChange}
                    placeholder={UserData?.usersEducations[0].usduSchool}
                    className="w-full"
                  />
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
                    onChange={formik.handleChange}
                    placeholder={UserData?.usersEducations[0].usduFieldStudy}
                    className="w-full"
                  />
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
                    onChange={formik.handleChange}
                    className="w-full"
                  >
                    <option value="" disabled>
                      Degree
                    </option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Diploma">Diploma</option>
                  </select>
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
                  ></textarea>
                </div>
                <div className="my-2">
                  <span className="mr-3">Curriculum Vitae</span>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={uploadConfig("file")}
                  ></input>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 p-2 w-full mb-5 text-white"
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
                  !UserData.userPhoto === null ? (
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
                      src={`${config.domain}/programs/image/${UserData?.userPhoto}`}
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
                <label htmlFor="image" className="mr-3">Upload Image</label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={imageConfig("file")}
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
