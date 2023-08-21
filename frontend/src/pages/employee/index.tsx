import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/layout/Layout';
import { GetEmployeeReq } from "@/redux-saga/action/employeeAction";
import Link from 'next/link';
import employee from '../api/employee';

export default function Employee(props: any) {
    const dispatch = useDispatch();
    const [display, setDisplay] = useState<any>(false);
    const [refrash, setRefrash] = useState<any>(false);
    const { employee } = useSelector((state: any) => state.employeeState);

    useEffect(() => {
        dispatch(GetEmployeeReq(''));
    }, [refrash]);

    const onClick =(page: number)=> {
        const payload = {
            page: page,
            name: name,
            status: status,
        };
        dispatch(GetEmployeeReq(payload))
    }

    let pageNumber: any[] = [];
    let totalPages: number = employee?.meta?.totalPages;
    let currentPage: number = employee?.meta?.currentPage;

    for (let i: number = currentPage - 3; i <= currentPage + 3; i++) { 
        if (i < 1) continue; if (i> totalPages)
            break;
        pageNumber.push(i);
    }

    const [active, setActive] = React.useState(1);
    return (
        <Layout>
            <div className="grid grid-flow-col">
                <div className="col-span-8">

                    <form className="border-b-2 border-gray-300 pb-2">
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
                                        type="text" id="search" placeholder="employee name.." />
                                </div>
                            </div>

                            <div className="ms-5 pt-1">
                                <select id="search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Active</option>
                                    <option value="">Inactive</option>
                                </select>
                            </div>

                            <div className="ms-5 pt-1.5">
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
                                        <Link href="/employee/createPage">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                                            Add
                                            </button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">sss</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">ss</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">sss</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">sss</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">sss</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">dd</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href="/employee/editPage">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                                            Edit
                                            </button>
                                        </Link>
                                        </td>
                                    </tr>
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='join flex justify-center py-5'>
                {pageNumber.map((page, index) => (
                <Link key={index} className={page===currentPage ? 'join-item btn btn-active' : 'join-item btn' }
                    href={`/employee`} onClick={()=> onClick(page)}
                >
                {page}
                </Link>
                ))}
            </div>
        </Layout>
    );
}