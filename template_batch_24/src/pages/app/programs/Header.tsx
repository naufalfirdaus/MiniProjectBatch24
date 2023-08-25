import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import Avatar from "@mui/material/Avatar";
import config from "@/config/config";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { UserDataRequest } from "@/redux-saga/action/userAction";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { getDataOneUserReq } from "@/redux-saga/action/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { UserProfile } = useSelector((state: any) => state.userState);
  // const UserData = useSelector((state: any) => state.userState.data);
  const UserData = useSelector((state: any) => state.userState.oneUser);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const userToken = getCookie("access_token");
    if (typeof userToken === "string") {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        console.log('INI DECODED DATA', decodedData)
        setUserId(decodedData.userid)
        dispatch(getDataOneUserReq(userId));
      };
      console.log(fetchData());
    } else {
      router.push("/signin");
    }
    console.log('INI USER ID', userId)
  }, [dispatch, router, userId]);

  return (
    <nav className="bg-white shadow" role="navigation">
      <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
        <div className="mr-4 md:mr-8">
          <a className="w-10 h-10" href="#" rel="home">
            <Image
              src={"/static/images/code-colored.jpg"}
              alt="home"
              width={100}
              height={100}
            ></Image>
            {/* <svg className="w-10 h-10 text-purple-600" width="54" height="54" viewBox="0 0 54 54" xmlns="/static/images/code-colored.jpg">
              <title>TailwindCSS</title>
              <path fill="currentColor" d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
            </svg> */}
          </a>
        </div>
        <div className="ml-auto md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded"
            type="button"
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
            <li>
              <Link
                className="block px-4 py-1 md:p-2 lg:px-4"
                href="/app/programs"
                title="Link"
              >
                Programs
              </Link>
            </li>
            <li>
              <a
                className="block px-4 py-1 md:p-2 lg:px-"
                href="#"
                title="Active Link"
              >
                Online Course
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-1 md:p-2 lg:px-4"
                href="#"
                title="Link"
              >
                Job Hiring
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-1 md:p-2 lg:px-4"
                href="#"
                title="Link"
              >
                About
              </a>
            </li>
          </ul>
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
            <li>
              <Dropdown sx={{ border: 0 }}>
                <MenuButton>
                  {UserData?.oneUSerData?.userPhoto ? (
                    <Avatar
                      alt="User Image"
                      src={`${config.domain}/programs/image/${UserData?.oneUSerData?.userPhoto}`}
                    />
                  ) : (
                    <Avatar
                      alt="User Image"
                      src={`/static/images/user-image-not-found.jpg`}
                    />
                  )}
                </MenuButton>
                <Menu>
                  <MenuItem>
                    {" "}
                    <Link
                      className="block px-4 py-1 md:p-2 lg:px-4"
                      href="/app/programs/dashboard"
                      title="Link"
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
