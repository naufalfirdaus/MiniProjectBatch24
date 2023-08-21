import { GetDetailRequest } from "@/redux-saga/action/ProgramsAction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import YouTube from "react-youtube";
import config from "@/config/config";
import Header from "./Header";
import Search from "./Search";
import Accordion from "./Accordion";

const DetailBootcamp = () => {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<any>("");
  // const [date, setDate] = useState({
  //   startDate: "",
  //   endDate: "",
  // });

  useEffect(() => {
    dispatch(GetDetailRequest(query.DetailBootcamp));
    // setDate({
    //   startDate: detail?.startDate?.startDate,
    //   endDate: detail?.endDate?.endDate,
    // });
  }, [dispatch, query.DetailBootcamp]);

  const detail = useSelector((state: any) => state.programState.detail);

  console.log("ini detail ", detail);

  const getFormattedDate = (date: any) => {
    if (date === undefined || date === null) {
      return "TBA";
    } else {
      return date.split("T")[0];
    }
    console.log("ini date dalam func", date);

    // const dateObject = new Date(date);
    // if (dateObject) {
    //   return dateObject.toISOString().split("T")[0];
    // }
  };

  const handleInput = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setSearch(value);
  };
  const handleSearch = (event: any) => {
    router.push(
      {
        pathname: "/app/programs",
        query: {
          search: search,
        },
      },
      "/app/programs"
    );
  };

  const youtubeOps = {
    height: "185",
    width: "280",
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-row justify-center mt-3 p-3 pb-5 shadow-md">
        <Search
          label="Search"
          value={search}
          onChange={handleInput}
          onClick={handleSearch}
        ></Search>
      </div>
      <div className="flex">
        <div className="m-10">
          <div className="mb-5">
            <div>
              <h2 className="mb-2 font-bold text-2xl">
                {detail?.bootcampAndMentor?.progTitle}
              </h2>
              <p>{detail?.bootcampAndMentor?.progHeadline}</p>
            </div>
            <div className="flex items-center justify-items-center my-3">
              <div className="flex mx-2">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>

                <p className="mx-2 mr-1">
                  {detail?.bootcampAndMentor?.progTotalTrainee + " talents"}
                </p>
              </div>
              <div className="flex mx-2">
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
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <p className="mx-2 mr-1">{detail?.endDate?.batchName}</p>
              </div>
              <div className="flex mx-2">
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="mx-2 mr-1">
                  Durasi{" "}
                  {detail?.bootcampAndMentor?.progDuration +
                    " " +
                    detail?.bootcampAndMentor?.progDurationType}
                </p>
              </div>
              <div className="flex mx-2">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>

                <p className="mx-2 mr-1">
                  {/* {"Current batch, until " +
                  (detail.endDate.endDate
                    ? getFormattedDate(detail?.endDate?.endDate)
                    : "TBA")} */}
                  {"Current batch, until " +
                    getFormattedDate(detail?.endDate?.endDate)}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-slate-100 p-5 mb-5">
              <h2 className="mb-2 text-lg">What you&apos;ll learn</h2>
              <ul className="ml-5 list-disc">
                {detail?.learnItems?.predItemLearning.items.map((item: any) => {
                  return (
                    <li
                      key={Math.floor(Math.random() * 100) + 1}
                      className="my-2"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5 mb-5">
              <h2 className="mb-2 text-lg">Bootcamp Material</h2>
              <Accordion data={detail?.material}></Accordion>
              {/* {detail?.material?.map((item: any) => {
                return (
                  <details key={item.sectId} className="mb-1">
                    <summary>{item.sectTitle}</summary>
                    <ul className="ml-5 list-decimal">
                      {item.sectionDetails.map((title: any) => {
                        return (
                          <li key={title.secdId} className="my-2">
                            {title.secdTitle}
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })} */}
            </div>
            <div className="mb-5 p-5">
              {/* <h2 className="text-lg mb-2">Description</h2> */}
              <div className="flex justify-center p-5">
              <p className=" text-xl text-center ">{detail?.endDate?.batchDescription}</p>
              </div>
            </div>
          </div>
          <div className="mb-5 p-5 rounded-2xl bg-slate-100">
            <div>
              <h2 className="text-lg mb-2">Instructor</h2>
            </div>
            <div className="flex justify-evenly">
              <div className="mr-5">
                <Image
                  width={500}
                  height={500}
                  alt="Instructor Image"
                  src={`${config.domain}/programs/image/${detail?.bootcampAndMentor?.userPhoto}`}
                ></Image>
              </div>
              <div>
                <h3 className="font-bold">
                  {detail?.bootcampAndMentor?.userFirstName +
                    " " +
                    detail?.bootcampAndMentor?.userLastName}
                </h3>
                <p>
                  With over a decade of industry experience, He brings a wealth
                  of knowledge and expertise to the classroom. His journey
                  started with a curiosity for coding that eventually led him to
                  become a senior software engineer at a code.id. Throughout his
                  career, he has contributed to the development of cutting-edge
                  applications, tackled complex challenges, and mentored
                  countless developers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl shadow-xl p-5">
            <div>
              <h2 className="text-lg mb-2">Review</h2>
            </div>
            {detail?.review?.map((item: any) => {
              return (
                <div
                  key={item.prowUserEntity}
                  className="grid grid-cols-3 my-3 px-1"
                >
                  <div style={{ borderRadius: "0px", overflow: "hidden" }}>
                    {item.reviewUserPhoto ? (
                      <Image
                        width={50}
                        height={50}
                        alt="user image"
                        src={`${config.domain}/programs/image/${item.reviewUserPhoto}`}
                        className=" grid grid-flow-col items-center "
                      ></Image>
                    ) : (
                      <Image
                        width={50}
                        height={50}
                        alt="user image"
                        src={`/static/images/user-image-not-found.jpg`}
                        className=" grid grid-flow-col items-center "
                      ></Image>
                    )}
                  </div>
                  {/* <div className="">
                    <p className="mr-5">
                      {item.reviewUserFirstName + " " + item.reviewUserLastName}
                    </p>
                  </div> */}
                  <div>
                    <p className="mr-5">{item.prowReview}</p>
                  </div>
                  <div className=" grid grid-flow-col items-center justify-end ">
                    <Rating
                      name="read-only"
                      size="small"
                      value={item.prowRating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-0 p-3 bg-slate-300">
          <div>
            <YouTube videoId="atKItcv56HE" opts={youtubeOps} />
          </div>
          <div className="flex flex-col ml-5">
            <div className="flex my-3">
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

              <p className="ml-2">
                {"Next batch, " +
                  getFormattedDate(detail?.startDate?.startDate)}
              </p>
            </div>
            <div className="flex mb-3">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <p className="ml-2">
                {detail?.location?.city +
                  ", " +
                  detail?.location?.province +
                  ", " +
                  detail?.location?.country}
              </p>
            </div>
            <div className="flex mb-3">
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <p className="ml-2">0813-3333-3333</p>
            </div>
          </div>
          <div className=" bg-slate-200 rounded-2xl m-3 p-1">
            <div className="flex flex-col items-center">
              <button
                className="bg-blue-700 text-white p-3 mt-3"
                onClick={() => {
                  router.push(`apply`);
                }}
              >
                Apply Regular Bootcamp
              </button>
            </div>
            <div className="m-3 text-sm">
              <div>
                <h4 className="text-base">Persyaratan :</h4>
              </div>
              <div className="bg-white rounded-2xl shadow-lg ">
                <ul className="p-3">
                  <li className="mb-2">Usia Maksimal 26 Tahun</li>
                  <li className="mb-2">
                    Pendidikan SMK RPL/D3/S1 Teknik Informatika/Sistem Informasi
                  </li>
                  <li className="mb-2">
                    Memiliki passion di bidang pemrogramman
                  </li>
                  <li className="mb-2">Pengalaman di bidang RDBMS & SQL</li>
                  <li className="mb-2">Mampu bekerja sama dalam team</li>
                </ul>
              </div>
            </div>
            <div className="m-3 text-sm">
              <div>
                <h4 className="text-base">Benefit :</h4>
              </div>
              <div className="bg-white rounded-2xl shadow-lg ">
                <ul className="p-3">
                  <li className="mb-2">Disediakan Laptop</li>
                  <li className="mb-2">Makan gratis 3x sehari</li>
                  <li className="mb-2">Sertifikat</li>
                  <li className="mb-2">Berkesempatan terlibat dalam proyek</li>
                </ul>
              </div>
            </div>
          </div>
          <div className=" bg-slate-200 rounded-2xl m-3">
            <div className="flex flex-col items-center">
              <h3 className="text-lg m-3">
                {detail?.bootcampAndMentor?.progPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h3>
            </div>
            <div className="flex flex-col items-center ">
              <button className="bg-blue-700 text-white p-3 px-5 items-center">
                Buy This Course
              </button>
            </div>
            <div className="m-3 text-sm pb-5">
              <div>
                <h4>Benefit :</h4>
              </div>
              <div className="bg-white rounded-2xl shadow-lg">
                <ul className="p-3">
                  <li className="mb-2">Learn anywhere anytime</li>
                  <li className="mb-2">Lifetime access</li>
                  <li className="mb-2">Material learning book & videos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBootcamp;
