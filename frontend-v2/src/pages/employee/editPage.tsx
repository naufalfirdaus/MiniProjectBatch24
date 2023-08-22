import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/layout/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from 'react-icons/fi';
import { GetEmployeeReq } from "@/redux-saga/action/employeeAction";
import Link from 'next/link';
import Image from 'next/image';

export default function Create(props: any) {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    };

    return (
    <Layout>
        <div className="grid grid-flow-col p-5">
            <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12">
                <figure
                    className="flex flex-col p-5 bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-2 font-bold text-gray-900 dark:text-white pb-5">General</h2>
                    <form>
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
                                <label htmlFor="nationalId"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">National
                                    Id</label>
                                <input type="" id="NationalId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="22222222" disabled></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="fullName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                                    Name</label>
                                <input type="text" id="fullName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled value="Dindaaa"></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="datePicker">
                                    Birth Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <DatePicker selected={selectedDate} onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <FiCalendar className="text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="datePicker">
                                    Hire Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <DatePicker selected={selectedDate} onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <FiCalendar className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="marital status"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marital
                                    Status</label>
                                <select id="MaritalStatus"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a status</option>
                                    <option value="Married"> M = Married</option>
                                    <option value="Single"> S = Single</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="Gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Gender</option>
                                    <option value="Male"> M = Male</option>
                                    <option value="Female"> F = Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="visitors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VocationHours</label>
                                <input type="number" id="visitors"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" required></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="visitors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SickLeaveHours</label>
                                <input type="number" id="visitors"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" required></input>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="job Role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job
                                    Role</label>
                                <select id="JobRole"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Job Role</option>
                                    <option value="Married"> </option>
                                    <option value="Single"> </option>
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
                                <label htmlFor="visitors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                                <input type="number" id="salary"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="" required></input>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="salary"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frequecy</label>
                                <select id="Salary"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a frequency</option>
                                    <option value="Hourly"> 0 = Hourly</option>
                                    <option value="Monthly"> 1 = Monthly</option>
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
                                <label htmlFor="department"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <select id="department"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a Department</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="datePicker">
                                    Start Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <DatePicker selected={selectedDate} onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <FiCalendar className="text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="datePicker">
                                    End Date
                                </label>
                                <div className="flex items-center space-x-4">
                                    <DatePicker selected={selectedDate} onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                    <FiCalendar className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </form>
                </figure>
                <div className="flex justify-end space-x-4 p-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">
                        Cancel
                    </button>
                    <button onClick={() => props.setDisplay(false)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </Layout>
    );
    }