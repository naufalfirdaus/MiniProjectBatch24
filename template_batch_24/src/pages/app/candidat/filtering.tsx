import Pagination from '@/pages/component/commons/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateFetch } from '@/redux-saga/slices/candidateSlices';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { paginate } from '@/helper/paginate';
import CandidateModal from '@/pages/component/commons/CandidateModal';

export default function Filtering(props: any){
    const dispatch = useDispatch();
    const candidates = useSelector((state: any) => state.candidates.candidates);
    const candidateLoad = useSelector((state: any) => state.candidates.status);
    const [reload, setReload] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<{userId: number; progId: number; username: string;}>({userId: 0, username: '', progId:0});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCandidateFetch({status: props.status}));
        setCurrentPage(candidates.page);
        setReload(false);
    }, [Object.keys(candidates).length, reload]);

    const handleStatusChange = (userId: number, progId: number, username: string) => {
        setSelectedData({userId, progId, username});
        setIsOpen(true);
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedPosts = Object.keys(candidates).length != 0 && paginate(candidates.data, currentPage, candidates.limit);
    
    return (
        <>
            <div className="relative overflow-x-visible border border-t-0">
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
                                    {candidate.prapStatus.status}
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
            <CandidateModal isOpen={isOpen} setIsOpen={setIsOpen} candidate={selectedData} setReload={setReload} tabs={props.status}/>
        </>
    )
}