import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { getCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import { getDataOneUserReq } from '@/redux-saga/action/userAction';
import { deleteCookie } from 'cookies-next';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleSignOut = () => {
    deleteCookie('access_token');
    window.location.reload();
    router.push('/signin');
  };

  const [dataProfile, setDataProfile]: any = useState({});
  const router = useRouter();
  const dataUser = useSelector((state: any) => state.user.oneUser);

  useEffect(() => {
    const userToken = getCookie('access_token');
    if (typeof userToken === 'string') {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        setDataProfile(decodedData);
        dispatch(getDataOneUserReq(decodedData.userid));
      };
      fetchData();
    } else {
      router.push('/signin');
    }

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [router, dispatch]);

  return (
    <header className="flex bg-white p-4 border-b-2">
      <div className="relative flex items-center">
        <Image
          src="/code-colored.webp"
          alt="CodeID"
          width={262}
          height={78}
          priority
          className="flex-none"
        />
        <h1 className="flex-none text-black text-xl w-36 self-center">
          Realta
        </h1>
      </div>
      <div className="relative ml-auto mt-5" ref={dropdownRef}>
        <div className="flex items-center">
          {' '}
          {/* Container for Welcome text and dropdown */}
          <p className="text-gray-600 mr-4">
            Welcome,{' '}
            {dataUser && dataUser[0] ? dataUser[0].userFirstName : null}
            {dataUser && dataUser[0] ? dataUser[0].userLastName : null}
          </p>
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex mx-2 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              width={100}
              height={100}
              className="w-8 h-8 rounded-full"
              src="/profile.jpg"
              alt="user photo"
            />
          </button>
        </div>
        {isDropdownOpen && (
          <div
            id="dropdownAvatar"
            className="z-10 bg-white rounded-lg shadow w-48 dark:bg-gray-700 absolute right-0 mt-2"
          >
            <div className="py-1">
              {/* <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  router.push('/profile');
                }}
              >
                Profile
              </a> */}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleSignOut()}
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
