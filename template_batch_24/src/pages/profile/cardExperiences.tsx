"use client";
import { Card } from "flowbite-react";
import React, { useEffect } from "react";
import { Timeline } from "flowbite-react";
import { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import CardAddExperience from "./add/cardAddExperience";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { deleteExperienceRequest } from "@/redux-saga/action/experienceAction";
import { useDispatch, useSelector } from "react-redux";
import CardEditExperiences from "./edit/cardEditExperience";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      delete: "hover:bg-red-400 text-slate-900 outline-none",
      edit: "hover:bg-yellow-300 text-slate-900 outline-none",
      add: "hover:bg-emerald-300 text-slate-900 outline-none",
    },
  },
};
export const CardExperiences = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [UsexId, setId] = useState("");
  const [tittle, setTittle] = useState("");
  const [headline, setHeadline] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [start, setStart] = useState("");
  const [startyear, setStartYear] = useState("");
  const [end, setEnd] = useState("");
  const [endyear, setEndYear] = useState("");
  const [industry, setIndustry] = useState("");
  const [emptype, setEmptype] = useState("");
  const [extype, setExtype] = useState("");
  const [current, setCurrent] = useState("");
  const [description, setDesc] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [dataProfile, setDataProfile] = React.useState("");
  const dataUser = useSelector((state: any) => state.user.oneUser);

  const onDelete = (id: any) => {
    window.alert("Data Successfully Deleted");
    dispatch(deleteExperienceRequest(id));

    window.location.reload();
    setRefresh(true);
  };

  const router = useRouter();
  useEffect(() => {
    const userToken = getCookie("access_token");
    if (typeof userToken === "string") {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        setDataProfile(decodedData);
      };
      console.log(fetchData());
    } else {
      router.push("/signin");
    }
  }, [router]);
  return (
    <Card>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Experinces
        </h1>
        <span className="flex items-center">
          <Flowbite theme={{ theme: customTheme }}>
            <Button
              color="add"
              className="w-5 h-5"
              onClick={() => props.setOpenModal("form-add-experience")}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
            <Modal
              show={props.openModal === "form-add-experience"}
              size="5xl"
              popup
              onClose={() => props.setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <CardAddExperience
                  setOpenModal={setOpenModal}
                  setRefresh={setRefresh}
                  setDataProfile={dataProfile}
                />
              </Modal.Body>
            </Modal>
          </Flowbite>
        </span>
      </div>

      <Timeline>
        {dataUser &&
          dataUser.map((item: any, index: number) => (
            <div key={index}>
              {item.userExperience.map(
                (
                  experienceOBJ: {
                    UsexId: string;
                    Tittle: any;
                    Headline: any;
                    Company: any;
                    City: any;
                    Start: any;
                    StartYear: any;
                    End: any;
                    EndYear: any;
                    Industry: any;
                    Emptype: any;
                    Extype: any;
                    Current: any;
                    Description: any;
                  },
                  exindex: number
                ) => (
                  <div key={exindex} className="flow-root">
                    {" "}
                    <Timeline.Item>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>February 2022</Timeline.Time>
                        <Timeline.Title>
                          <div className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white flex justify-between items-center">
                            <span>{experienceOBJ.Tittle}</span>
                            <div className="flex items-center space-x-2">
                              <Flowbite theme={{ theme: customTheme }}>
                                <Button
                                  color="edit"
                                  className="w-5 h-5"
                                  onClick={() => {
                                    setId(experienceOBJ.UsexId);
                                    setTittle(experienceOBJ.Tittle);
                                    setHeadline(experienceOBJ.Headline);
                                    setCompany(experienceOBJ.Company);
                                    setCity(experienceOBJ.City.cityName);
                                    setStart(experienceOBJ.Start);
                                    setStartYear(experienceOBJ.StartYear);
                                    setEnd(experienceOBJ.End);
                                    setEndYear(experienceOBJ.EndYear);
                                    setEmptype(experienceOBJ.Emptype);
                                    setDesc(experienceOBJ.Description);
                                    setExtype(experienceOBJ.Extype);
                                    setCurrent(experienceOBJ.Current);
                                    setOpenModalEdit(true);
                                  }}
                                >
                                  <svg
                                    className="w-3 h-4 text-black"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
                                  </svg>
                                </Button>
                                <Modal
                                  show={
                                    openModalEdit &&
                                    UsexId === experienceOBJ.UsexId &&
                                    tittle === experienceOBJ.Tittle &&
                                    headline === experienceOBJ.Headline &&
                                    company === experienceOBJ.Company &&
                                    city === experienceOBJ.City.cityName &&
                                    start === experienceOBJ.Start &&
                                    startyear === experienceOBJ.StartYear &&
                                    end === experienceOBJ.End &&
                                    endyear === experienceOBJ.EndYear &&
                                    emptype === experienceOBJ.Emptype &&
                                    extype === experienceOBJ.Extype &&
                                    current === experienceOBJ.Current &&
                                    description === experienceOBJ.Description
                                  }
                                  size="5xl"
                                  popup
                                  onClose={() => setOpenModalEdit(false)}
                                >
                                  <Modal.Header />
                                  <Modal.Body>
                                    <CardEditExperiences
                                      setOpenModalEdit={setOpenModalEdit}
                                      setRefresh={setRefresh}
                                      setId={experienceOBJ.UsexId}
                                      setTittle={experienceOBJ.Tittle}
                                      setHeadline={experienceOBJ.Headline}
                                      setCity={experienceOBJ.City.cityName}
                                      setCompany={experienceOBJ.Company}
                                      setStart={experienceOBJ.Start}
                                      setStartYear={experienceOBJ.StartYear}
                                      setEnd={experienceOBJ.End}
                                      setEndYear={experienceOBJ.EndYear}
                                      setIndustry={experienceOBJ.Industry}
                                      setEmptype={experienceOBJ.Emptype}
                                      setDesc={experienceOBJ.Description}
                                      setExtype={experienceOBJ.Extype}
                                      setCurrent={experienceOBJ.Current}
                                    />
                                  </Modal.Body>
                                </Modal>
                              </Flowbite>
                              <Flowbite theme={{ theme: customTheme }}>
                                <Button
                                  color="delete"
                                  className="w-5 h-5"
                                  onClick={() => onDelete(experienceOBJ.UsexId)}
                                >
                                  <svg
                                    className="w-2 h-2 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                </Button>
                              </Flowbite>
                            </div>
                          </div>
                        </Timeline.Title>

                        <Timeline.Body>
                          <p className="text-sm">{experienceOBJ.Description}</p>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  </div>
                )
              )}
            </div>
          ))}
      </Timeline>
    </Card>
  );
};
