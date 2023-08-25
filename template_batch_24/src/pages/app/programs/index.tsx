import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import programs from "@/pages/api/programs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetProgramRequest } from "@/redux-saga/action/programsAction";
import config from "@/config/config";
import { useRouter } from "next/router";
import Search from "./Search";
import Header from "./Header";
import Slider from "./Carousel";
import { Carousel } from "flowbite-react";

const ProgramBootcamp = () => {
  const router = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [Input, setInput] = useState({
    search: query.search || "",
    orderBy: "Popular",
    page: 1,
  });

  const { program } = useSelector((state: any) => state.programState);

  useEffect(() => {
    dispatch(GetProgramRequest(Input));
  }, [Input.orderBy, Input.page]);

  const handleInput = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setInput({
      ...Input,
      [event.target.name]: value,
    });
  };

  const onClick = () => {
    dispatch(GetProgramRequest(Input));
  };

  const handleSearch = (event: any) => {
    dispatch(GetProgramRequest(Input));
  };

  const handleReset = () => {
    setInput({
      ...Input,
      search: "",
      orderBy: "Popular",
      page: 1,
    });
    dispatch(GetProgramRequest(Input));
  };

  let pageNumber: any[] = [];
  let totalPages: number = Math.ceil(program.totalCount / program.limit);
  let currentPage: number = program.page;

  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumber.push(i);
  }

  return (
    <>
      <Header></Header>
      <Slider></Slider>
      <div>
        <div className="flex justify-center my-3 p-3 pb-5 shadow-md  ">
          <div className="flex flex-row">
            <Search
              label="Search"
              value={Input.search}
              onChange={handleInput}
              onClick={handleSearch}
            ></Search>
          </div>
          <div className="mx-5">
            <select
              name="orderBy"
              id="orderBy"
              value={Input.orderBy}
              onChange={handleInput}
            >
              <option value="Popular">Popular</option>
              <option value="Latest">Latest</option>
              <option value="Online/Offline">Online/Offline</option>
            </select>
          </div>
          <div className="pt-2">
            {/* <Link href={"/app/programs"} onClick={handleReset}>
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Link> */}
            <button onClick={handleReset}>
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 justify-items-center">
          {program.data &&
            program.data.map((item: any) => {
              return (
                <div
                  key={item.progEntityId}
                  className="shadow-xl mr-2 my-5 p-3 rounded-2xl border border-slate-200 items-center w-80 min-h-100"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={`${config.domain}/programs/image/${item.progImage}`}
                      height={300}
                      width={300}
                      alt={"gambar bootcamp"}
                      className=" max-h-40 "
                    />
                  </div>
                  <div>
                    <h4 className="mt-2 font-bold text-xl">{item.progTitle}</h4>
                    <p className="mt-2">{item.progHeadline}</p>
                    <p className="mt-2">
                      {"Durasi : " +
                        item.progDuration +
                        " " +
                        item.progDurationType}
                    </p>
                    <p className="mt-2">
                      {"Pembelajaran : " + item.progLearningType}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="mr-5 mt-1">
                      {"Price : " +
                        item.progPrice.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                    </p>
                    <button
                      className="p-1 text-white bg-slate-800 items-center w-28 "
                      onClick={() => {
                        // router.push({
                        //   pathname: "/app/programs/[DetailBootcamp]",
                        //   query: { DetailBootcamp: item.progEntityId },
                        // });
                        router.push(`programs/${item.progEntityId}`);
                      }}
                    >
                      Curriculum
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-center">
          {pageNumber.map((page) => (
            <Link
              key={page}
              onClick={() => {
                setInput({
                  ...Input,
                  page: page,
                }),
                  // onClick(page);
                  onClick();
              }}
              href={`/app/programs`}
              className="m-3 mb-5"
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProgramBootcamp;
