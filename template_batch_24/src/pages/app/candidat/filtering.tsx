import Pagination from '@/pages/component/commons/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateFetch } from '@/redux/slices/candidateSlices';
import { Menu, Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { paginate } from '@/helper/paginate';

export default function Filtering(){
    const dispatch = useDispatch();
    const candidates = useSelector((state: any) => state.candidates.candidates);
    const candidateLoad = useSelector((state: any) => state.candidates.status);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{userId: number; progId: number; username: string;}>({userId: 0, username: '', progId:0});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (candidateLoad === "idle") {
          dispatch(getCandidateFetch('Filtering'));
        }
        setCurrentPage(candidates.page);
    }, [candidateLoad, dispatch]);

    const handleStatusChange = (userId: number, progId: number, username: string) => {
        setIsOpen(true);
        setSelectedData({userId, progId, username});
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedPosts = Object.keys(candidates).length != 0 && paginate(candidates.data, currentPage, candidates.limit);
    
    return (
        <>
            <div className="relative overflow-x-visible border border-t-0">
                <div className="flex items-center justify-end gap-2 px-3 py-4 bg-white">
                    <Menu as='div' className='relative'>
                        <Menu.Button className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5'> Filter by month
                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                        </Menu.Button>
                        <Menu.Items className='absolute z-10 text-sm w-32 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bulan1</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bulan2</a>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                    <Menu as='div' className='relative'>
                        <Menu.Button className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5'> Year
                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                        </Menu.Button>
                        <Menu.Items className='absolute z-50 text-sm text-gray-600 right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Tahun1</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Tahun2</a>
                        </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                University
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Graduate
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Bootcamp
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(candidates).length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>Loading...</td></tr> : paginatedPosts.length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>No candidates found</td></tr> : paginatedPosts.map((candidate: any, i: number) => 
                            <tr key={candidate.prapUserEntityId} className={`bg-white hover:bg-gray-50 ${paginatedPosts.length - 1 != i && 'border-b'}`}>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                    <Image width={50} height={50} className="w-10 h-10 rounded-full" src="/assets/images/candidate.png" alt="Candidate image"/>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{candidate.prapUserEntity.userFirstName}</div>
                                        <div className="font-normal text-gray-500">{candidate.prapUserEntity.usersEmails[0].pmailAddress}</div>
                                    </div>  
                                </th>
                                <td className="px-6 py-4">
                                    {candidate.prapUserEntity.usersEducations[0].usduSchool}
                                </td>
                                <td className="px-6 py-4">
                                    Lulus {new Date(candidate.prapUserEntity.usersEducations[0].usduEndDate).getFullYear()}
                                </td>
                                <td className="px-6 py-4">
                                    {candidate.prapUserEntity.usersPhones[0].uspoNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {candidate.prapProgEntity.progTitle}
                                </td>
                                <td className="px-6 py-4">
                                    {candidate.roac.roacName}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleStatusChange(candidate.prapUserEntityId, candidate.prapProgEntityId,candidate.prapUserEntity.userFirstName)}>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15"> <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            { Object.keys(candidates).length != 0 && <Pagination items={candidates.data.length} pageSize={candidates.limit} currentPage={currentPage} onPageChange={onPageChange}/> }
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-3 px-4 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title as="h5" className="text-lg font-medium leading-6 text-gray-900">
                                Switch Status
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">{selectedData.username}</p>
                                <select name="switch" id="switch" defaultValue='' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'>
                                    <option value="" disabled>Select Status</option>
                                    <option value="Filtering Test">Ready Test</option>
                                </select>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpen(false)}>
                                    Submit
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}