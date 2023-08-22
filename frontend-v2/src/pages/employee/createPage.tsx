import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';
import { AddEmployeeReq, GetDeptReq, GetJoroReq, GetOneEmployeeReq } from "@/redux-saga/action/employeeAction";
import Image from "next/image"
import { useFormik } from 'formik';
import config from '@/config/config';
import { values } from 'core-js/core/array';

export default function Create(props: any) {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [empId, setEmpId] = useState('');

    const { employees } = useSelector((state: any) => state.employeeState);
    const { jobroles } = useSelector((state: any) => state.jobRoleState);
    console.log("jobroles : ", jobroles);
    const { departments } = useSelector((state: any) => state.departmentState);
    console.log("departments : ", departments);

    useEffect(() => {
        dispatch(GetOneEmployeeReq({}));
        dispatch(GetJoroReq({}));
        dispatch(GetDeptReq({}));
        setRefresh(false);
    }, [dispatch, refresh])

    const formik = useFormik({
        initialValues: {
            empNationalId: '',
            empBirthDate: '',
            empHireDate: '',
            empMaritalStatus: '',
            empGender: '',
            empVocationHours: '',
            empSickLeaveHours: '',
            empJoro: '',
            ephiRateSalary: '',
            ephiPayFrequence: '',
            edhiDept: '',
            edhiStartDate: '',
            edhiEndDate: '',
        },

        onSubmit: async (values: any) => {
            const payload = new FormData();
            payload.append("empNationalId", values.empNationalId);
            payload.append("empBirthDate", values.empBirthDate);
            payload.append("empHireDate", values.empHireDate);
            payload.append("empMaritalStatus", values.empMaritalStatus);
            payload.append("empGender", values.empGender);
            payload.append("empVacationHours", values.empVacationHours);
            payload.append("empSickLeaveHours", values.empSickLeaveHours);
            payload.append("empJoro", values.empJoro);
            payload.append("ephiRateSalary", values.ephiRateSalary);
            payload.append("ephiPayFrequence", values.ephiPayFrequence);
            payload.append("edhiDept", values.edhiDept);
            payload.append("edhiStartDate", values.edhiStartDate);
            payload.append("edhiEndDate",values.edhiEndDate);

            dispatch(AddEmployeeReq(payload));
            dispatch(GetOneEmployeeReq(empId));
            props.setRefresh(true);
        }
    })
    return (
        <div className="grid grid-flow-col p-5">
            <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12">
                <figure
                    className="flex flex-col p-5 bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-2 font-bold text-gray-900 dark:text-white pb-5">General</h2>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="grid xl:grid-cols-3 gap-4">
                            <div className=" xl:order-last">
                                <div className="items-center justify-center">
                                    <Image src="" alt="Preview" className="mt-2 w-full h-auto" />
                                    <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    
                                    className="w-full bg-white border border-gray-300 py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empNationalId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">National
                                    Id</label>
                                <input type="" id="empNationalId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="National Id" defaultValue={formik.values.empNationalId} onChange={formik.handleChange}></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="fullName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                                    Name</label>
                                <input type="text" id="fullName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value="Dindaaa"></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="empBirthDate">
                                    Birth Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input type='date' defaultValue={formik.values.empBirthDate} onChange={formik.handleChange}
                                        id="empBirthDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="empHireDate">
                                    Hire Date
                                </label>
                                <div className="flex items-center space-x-4">
                                <input type='date' id="empHireDate" defaultValue={formik.values.empHireDate} onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="empMaritalStatus"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marital
                                    Status</label>
                                <select id="empMaritalStatus" defaultValue={'Marital Status'} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a status</option>
                                    <option value="M"> M = Married</option>
                                    <option value="S"> S = Single</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="empGender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="empGender" defaultValue={'Gender'} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Gender</option>
                                    <option value="M"> M = Male</option>
                                    <option value="F"> F = Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="empVacationHours"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VocationHours</label>
                                <input type="number" id="empVacationHours" defaultValue={formik.values.empVacationHours} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="0" required></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="empSickLeaveHours"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SickLeaveHours</label>
                                <input type="number" id="empSickLeaveHours" defaultValue={formik.values.empSickLeaveHours} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="0" required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="empJoro"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job
                                    Role</label>
                                <select id="empJoro" defaultValue={'job role'} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Job Role</option>
                                        {employees?.data && employees?.data?.map((item: any) => {
                                        return (
                                            <option key={item.joroId} value={item.joroId}>{item.joroName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </form>
                </figure>
                <figure
                    className="flex flex-col p-5 bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-2 font-bold text-gray-900 dark:text-white pb-5">Salary</h2>
                    <form>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="ephiRateSalary"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                <input type="number" id="ephiRateSalary"  defaultValue={formik.values.ephiRateSalary} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="0" required></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="ephiPayFrequence"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequecy</label>
                                <select id="ephiPayFrequence" defaultValue={'ephiPayFrequence'} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a frequency</option>
                                    <option value="0"> 0 = Hourly</option>
                                    <option value="1"> 1 = Monthly</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </figure>
                <figure
                    className="flex flex-col p-5 bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-2 font-bold text-gray-900 dark:text-white pb-5">Assignment</h2>
                    <form>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="edhiDept"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <select id="edhiDept" defaultValue={'department'} onChange={formik.handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Department</option>
                                    {departments?.data && departments?.data?.map((item: any) => {
                                        return (
                                            <option key={item.deptId} value={item.deptId}>{item.deptName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="edhiStartDate">
                                    Start Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input type='date' id="edhiStartDate" defaultValue={formik.values.edhiStartDate} onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="edhiEndDate">
                                    End Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input type='date' id="edhiEndDate" defaultValue={formik.values.edhiEndDate} onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </figure>
                <div className="flex justify-end space-x-4 p-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
    }