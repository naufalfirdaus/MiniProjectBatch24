import React, { useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetDashboardRequest } from "@/redux-saga/action/ProgramsAction";
import config from "@/config/config";
import { useRouter } from "next/router";
import AppLayout from "@/pages/component/layout/AppLayout";
import Header from "./Header";
const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dashboard = useSelector((state: any) => state.programState.dashboard);
  const { UserProfile } = useSelector((state: any) => state.userState);

  console.log(UserProfile);
  console.log(dashboard);

  useEffect(() => {
    dispatch(GetDashboardRequest(UserProfile.UserId));
  }, []);

  return (
    <>
      {/* <Header></Header> */}
      <AppLayout>
        <div className="grid grid-cols-4 justify-items-center">
          {dashboard &&
            dashboard.map((item: any) => {
              return (
                <div
                  key={item.progEntityId}
                  className="border m-5 p-3 items-center w-60 min-h-100 "
                >
                  <div className="flex items-center">
                    <Image
                      width={300}
                      height={300}
                      alt="Program Image"
                      src={`${config.domain}/programs/image/${item.progImage}`}
                      className=" max-h-40 "
                    ></Image>
                  </div>
                  <div>
                    <h3>{item.progTitle}</h3>
                    <p>{"Apply Date : " + item.prapApplyDate.split("T")[0]}</p>
                    <p>{"Status : " + item.prapStatus}</p>
                    <p>{"Last Progress : " + item.latestProgress}</p>
                  </div>
                  <div>
                    {item.prapStatus === "Failed" ? (
                      <button className="p-3 bg-slate-800 text-white cursor-no-drop w-full" disabled>
                        Check Progress
                      </button>
                    ) : (
                      <button
                        className="p-3 bg-blue-700 text-white"
                        onClick={() =>
                          router.push({
                            pathname: "/app/programs/apply",
                            query: {
                              progId: item.progEntityId,
                              title: item.progTitle,
                            },
                          }, "/app/programs/apply")
                        }
                      >
                        Check Progress
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
