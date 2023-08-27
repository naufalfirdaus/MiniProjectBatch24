import { AcademicCapIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function CandidateTable (props: any) {
    return (
        <table className="w-full text-sm lg:text-base text-left text-gray-500">
            <tbody>
                {Object.keys(props.candidates).length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>Loading...</td></tr> : props.paginatedData.length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>No candidates found</td></tr> : props.paginatedData.map((candidate: any, i: number) => 
                    <tr key={candidate.prapUserEntityId} className={`bg-white hover:bg-gray-50 ${props.paginatedData.length - 1 != i && 'border-b'}`}>
                        <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <Image width={50} height={50} className="w-10 h-10 rounded-full" src="/assets/images/candidate.png" alt="Candidate image"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">{candidate.prapUserEntity.userFirstName}</div>
                                <div className="font-normal text-gray-500">{candidate.prapUserEntity.usersEmails[0].pmailAddress}</div>
                            </div>  
                        </td>
                        <td className="px-6 py-4 font-sans">
                            {candidate.prapUserEntity.usersEducations[0].usduSchool}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center whitespace-nowrap">
                                <AcademicCapIcon className="w-5 h-5 mr-2"/> Lulus {new Date(candidate.prapUserEntity.usersEducations[0].usduEndDate).getFullYear()}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <PhoneIcon className="w-4 h-4 mr-2"/> {candidate.prapUserEntity.usersPhones[0].uspoNumber}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className='px-3 py-1 bg-teal-200 text-teal-500 rounded-xl'>
                                {candidate.prapProgEntity.progTitle}
                            </span>
                        </td>
                        <td className="px-4 py-4">
                            <div className="flex flex-col whitespace-nowrap">
                                <h1>Applied on {new Date(candidate.prapModifiedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h1>
                                <h1>{candidate.prapStatus.status}</h1>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => props.handleStatusChange(candidate.prapUserEntityId, candidate.prapProgEntityId,candidate.prapUserEntity.userFirstName)}>
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15"> <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}