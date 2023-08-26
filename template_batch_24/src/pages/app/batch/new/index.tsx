import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { createBatchTry, getInstructorFetch, getTechnologyFetch, changeToIdle } from "@/redux-saga/slices/batchSlices";
import { getPassedCandidateBootcampFetch } from "@/redux-saga/slices/candidateSlices";
import { Menu } from "@headlessui/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import monthData from '@/helper/month';

export default function CreateBatch() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const candidates = useSelector((state: any) => state.candidates.bootcampCandidates);
  const technologies = useSelector((state: any) => state.batchs.technologies);
  const error = useSelector((state: any) => state.batchs.error);
  const instructors = useSelector((state: any) => state.batchs.instructors);
  const [selectedTech, setSelectedTech] = useState<any>('');
  const [members, setMembers] = useState<object[]>([]);
  const [month, setMonth] = useState<any>();
  const [year, setYear] = useState<any>();

  useEffect(() => {
    if(technologies.length == 0 || instructors.length == 0){
        dispatch(getTechnologyFetch());
        dispatch(getInstructorFetch());
    }
  }, []);

  useEffect(() => {
    if(year && month){
      dispatch(getPassedCandidateBootcampFetch({program: selectedTech, month: month, year: year.getFullYear()}));
    } else if(month){
      dispatch(getPassedCandidateBootcampFetch({program: selectedTech, month: month}));
    } else if(year){
      dispatch(getPassedCandidateBootcampFetch({program: selectedTech, year: year.getFullYear()}));
    }
  }, [year, month]);
  
  const formik = useFormik({
    initialValues: {
       batchName: '',
       batchStartDate: '',
       batchEndDate: '',
       batchInstructorId: '',
       batchCoInstructorId: '',
    },
    onSubmit: (values) => {
        const {  batchStartDate, batchEndDate, ...rest } = values;
        const batchData = {
            ...rest,
            batchEntityId: selectedTech,
            batchStartDate : new Date(values.batchStartDate),
            batchEndDate : new Date(values.batchEndDate),
            trainees: members,
        }
        
        dispatch(createBatchTry(batchData));

        if(!error){
            router.push('/app/batch');
        }
    },
  });

  const onSelectTechChange = (e: any) => {
    setSelectedTech(e.target.value);
    dispatch(getPassedCandidateBootcampFetch({program: e.target.value}))
    if(candidates.length > 0) {
        setMembers([]);
    }
  }
  
  const addMemberHandle = (e: any, id: number, status: string) => {
    e.preventDefault();
    const selectedCandidate = candidates.find((candidate: any) => candidate.prapUserEntityId == id);
    
    if(status == 'add'){
        const findMember = members.find((member: any) => member.prapUserEntityId == selectedCandidate.prapUserEntityId);
        if(!findMember){
            setMembers([...members, selectedCandidate]);
        }
    } else {
        const removedMember = members.filter((member: any) => member.prapUserEntityId !== selectedCandidate.prapUserEntityId);
        setMembers(removedMember);
    }
  }

  const handleFilterYear = (date: Date, e: any) => {
    e.preventDefault();
    setYear(date);
  }

  return (
    <AppLayout>
      <Page title="Create Batch">
        <div className="border border-slate-300 rounded-lg p-5">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="mb-6">
                        <label htmlFor="batchName" className="block mb-2 text-sm font-medium text-gray-900">Batch Name</label>
                        <input type="text" id="batchName" name="batchName" value={formik.values.batchName} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batchEntityId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Technology</label>
                        <select id="batchEntityId" name="batchEntityId" defaultValue='' onChange={(e) => onSelectTechChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" required>
                            <option value='' disabled>Select technology</option>
                            {technologies.length != 0 && technologies.map((technology: any, i: number) => 
                                <option key={i} value={technology.progEntityId}>{technology.progTitle}</option>
                            )}
                        </select>
                    </div>
                    <div className="row-span-3 text-center justify-self-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <h1 className="text-4xl">{members.length}</h1>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batchStartDate" className="block mb-2 text-sm font-medium text-gray-900">Periode (awal)</label>
                        <input type="date" id="batchStartDate"  name="batchStartDate" value={formik.values.batchStartDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batchEndDate" className="block mb-2 text-sm font-medium text-gray-900">Periode (akhir)</label>
                        <input type="date" id="batchEndDate" name="batchEndDate" value={formik.values.batchEndDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batchInstructorId" className="block mb-2 text-sm font-medium text-gray-900">Trainer</label>
                        <select id="batchInstructorId" name="batchInstructorId" defaultValue='' onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" required>
                            <option value='' disabled>Select Trainer</option>
                            {instructors.length != 0 && instructors.map((instructor: any, i: number) => 
                                <option key={i} value={instructor.userEntityId}>{instructor.userFirstName} {instructor.userLastName}</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batchCoInstructorId" className="block mb-2 text-sm font-medium text-gray-900">Co Trainer</label>
                        <select id="batchCoInstructorId" name="batchCoInstructorId" defaultValue='' onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" required>
                            <option value='' disabled>Select Co Trainer</option>
                            {instructors.length != 0 && instructors.map((instructor: any, i: number) => 
                                <option key={i} value={instructor.userEntityId}>{instructor.userFirstName} {instructor.userLastName}</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* Bootcamp Member */}
                <h1 className="uppercase font-medium mt-4">Recommended Bootcamp Member</h1>
                <div className="flex justify-center gap-3 mt-5">
                    <Menu as='div' className='relative'>
                        <Menu.Button className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5'> Month
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </Menu.Button>
                        <Menu.Items className='absolute grid grid-cols-3 z-10 text-sm w-36 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-x divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {monthData.map((month: any) => 
                            <Menu.Item key={month.value}>
                                <Link href='#' onClick={() => setMonth(month.value)} className="block p-2 text-center hover:bg-gray-100">{month.name}</Link>
                            </Menu.Item>
                        )}
                        </Menu.Items>
                    </Menu>
                    <DatePicker
                        className='ml-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm py-1.5 w-16 text-center'
                        selected={year}
                        placeholderText="Year"
                        onChange={(date: Date, e) => handleFilterYear(date, e)}
                        dateFormat="yyyy"
                        showYearPicker
                    />
                </div>
                <div className="grid md:grid-cols-3 mt-7 gap-3">
                    {candidates.length == 0 ? <h1 className="text-center">Tidak ada kandidat</h1> : candidates.map((candidate: any) =>
                    <div key={candidate.prapUserEntityId} className={`inline-flex border gap-2 items-center justify-between border-slate-500 py-2 px-3 rounded-xl ${members.find((member:any) => member.prapUserEntityId == candidate.prapUserEntityId) && 'bg-green-300 border-none'}`}>
                        <div className="inline-flex gap-3">
                            <Image width={50} height={50} className="w-14 h-14 bg-gray-100 object-cover rounded-full flex-shrink-0" src="/assets/images/user.png" alt=""/>
                            <div>
                                <h1 className="font-bold">{candidate.prapUserEntity.userFirstName} {candidate.prapUserEntity.userLastName}</h1>
                                <h1 className="text-gray-400">{candidate.prapUserEntity.usersEducations[0].usduSchool}</h1>
                            </div>
                        </div>
                        {members.find((member:any) => member.prapUserEntityId == candidate.prapUserEntityId) ? 
                            <button onClick={(e) => addMemberHandle(e, candidate.prapUserEntityId, 'remove')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button> :
                            <button onClick={(e) => addMemberHandle(e, candidate.prapUserEntityId, 'add')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </button>
                        }
                    </div>
                    )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="submit" className={`bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}>Save</button>
                    <button onClick={(e) => {e.preventDefault(); router.back()}} className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Cancel</button>
                </div>
            </form>
        </div>
      </Page>
    </AppLayout>
  );
}
