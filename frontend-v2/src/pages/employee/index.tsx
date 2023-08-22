import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/layout/Layout';
import { GetEmployeeReq, SearchEmployeeReq } from "@/redux-saga/action/employeeAction";
import Link from 'next/link';
import { Menu, Dialog, Transition } from '@headlessui/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { IconButton, Typography } from "@material-tailwind/react";
import employee from '../api/employee';
import CreatePage from './createPage';

export default function Employee(props: any) {
    const dispatch = useDispatch();

    // Fetch Employee
    const { employees } = useSelector((state: any) => state.employeeState);
    console.log("Employee : ", employees);

    useEffect(() => {
        dispatch(SearchEmployeeReq({}));
        dispatch(GetEmployeeReq({}));
    }, [dispatch]);

    const [active, setActive] = React.useState(1);

    let totalPages: number = Math.ceil(employees?.totalCount / employees?.limit);
    console.log("totalPages : ", totalPages);
    
    const getCurrentPageData = () => {
        const startIndex = (active - 1) * (employees?.limit || 0);
        const endIndex = startIndex + (employees?.limit || 0);
        return employees?.data?.slice(startIndex, endIndex) || [];
      };

    const next = () => {
        if (active < totalPages) {
            setActive(active + 1);
        }
    };

    const prev = () => {
        if (active > 1) {
            setActive(active - 1);
        }
    };

    // set display create
    const [createDisplay, setCreateDisplay] = useState(false);

    // Display Search
    const [searchDisplay, setSearchDisplay] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [status, setStatus] = useState('');
    const [statusLabel, setStatusLabel] = useState('Pilih Status');
    const [dropdownStatusOpen, setDropdownStatusOpen] = useState(false);

    const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
          name: searchValue,
          status: status,
        };
        dispatch(SearchEmployeeReq(payload));
        setSearchDisplay(true);
    };

    const onClick = (page: number) => {
        const payload = {
          page: page,
          name: searchValue,
          status: status,
        };
        if (searchDisplay) {
          dispatch(SearchEmployeeReq(payload));
        } else {
          dispatch(GetEmployeeReq(payload));
        }
    };

    return (
        <Layout>
            <>
            {createDisplay ? (
            <CreatePage
              setDisplay={setCreateDisplay}
            />
          ) : (
            <>
            <div className="grid grid-flow-col">
                <div className="col-span-8">
                    <form onSubmit={onSearch} className="border-b-2 border-gray-300 pb-2">
                        <div className="flex h-20 p-4 justify-center me-20">
                            <div className="p-4 text-sm sm:text-md">
                                <p>Search</p>
                            </div>
                            <div className="m-1">
                                <div
                                    className="border border-gray-300 relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                    <div className="grid place-items-center h-full w-12 text-gray-300 bg-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>

                                    <input
                                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-gray-50"
                                        type="text" id='searchInput' placeholder="employee name.." value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}/>
                                </div>
                            </div>
                            <div className="relative inline-block text-left m-2">
                                <button
                                    onClick={() => setDropdownStatusOpen(!dropdownStatusOpen)}
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    aria-haspopup="true"
                                >
                                     {statusLabel}
                                </button>
                                {dropdownStatusOpen && (
                                    <div className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                                            <li>
                                            <button type='button' onClick={() => { setStatus('Semua'); setStatusLabel('Semua'); }}>
                                                Contract
                                            </button>
                                            </li>
                                            <li>
                                            <button type='button' onClick={() => { setStatus('active'); setStatusLabel('Active'); }}>
                                                Active
                                            </button>
                                            </li>
                                            <li>
                                            <button type='button' onClick={() => { setStatus('inactive'); setStatusLabel('Inactive'); }}>
                                                Inactive
                                            </button>
                                            </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="pt-1.5">
                                <button type="submit"
                                    className="p-4 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Search</button>
                            </div>
                        </div>
                    </form>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        EmpId
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NationalId
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        FullName
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        BirthDate
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        HireDate
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200" onClick={() => setCreateDisplay(true)}>
                                            Add
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {/* { employees&&employees?.data?.map((employee: any) =>  */}
                                <>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {employee.empEntityId} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {employee.empNationalId} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {employee.empEntity.userFirstName}&nbsp;{employee.empEntity.userLastName} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {employee.BirthDate} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {employee.HireDate} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {employee.employeeClientContracts.eccoStatus} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Menu as="div">
                                                <Menu.Button className="dropdots inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:bg-gray-200" type="button"> 
                                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                                    </svg>
                                                </Menu.Button>
                                
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="z-50 absolute mt-4 -ms-48 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="px-1 py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={`/employee/editPage/`}>
                                                                        <button
                                                                            className={`${
                                                                            active ? 'bg-gray-600 text-white' : 'text-gray-900'
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={``}>
                                                                            <button
                                                                                className={`${active ? 'bg-gray-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                            >
                                                                                Salary History
                                                                            </button>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={``}>
                                                                            <button
                                                                                className={`${active ? 'bg-gray-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                            >
                                                                                Department History
                                                                            </button>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>  
                                                 </Transition>
                                            </Menu>
                                        </td>
                                    </tr>
                                </>
                                {/* )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 justify-center">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    hidden={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 -mt-2 -ms-2" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">{totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    hidden={active === totalPages || totalPages === 1}
                >
                    <ArrowRightIcon strokeWidth={2} className="-mt-2 -ms-2 h-4 w-4" />
                </IconButton>
            </div>
            </>
            )}
            </>
        </Layout>
    );
}