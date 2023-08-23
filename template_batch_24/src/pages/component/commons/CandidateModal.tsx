import { updateCandidateStatusTry } from "@/redux/slices/candidateSlices";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import { useDispatch } from "react-redux";

export default function CandidateModal(props: any) {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [review, setReview] = useState('');
    const [score, setScore] = useState(0);

    const handleSubmitStatus = (e: any, userId: number, progId: number) => {
        e.preventDefault();
        dispatch(updateCandidateStatusTry({userId, data: {status: selectedStatus, progId, review, score }}));
        console.log(selectedStatus, userId, progId);
        props.setReload(true);
        props.setIsOpen(false);
    }

    const handleScoreChange = (e: any) => {
        const score = e.target.valueAsNumber;
        if(score < 25){
            setSelectedStatus('Failed');
        } else if (score >= 25 && score < 50){
            setSelectedStatus('Recommendation');
        } else {
            setSelectedStatus('Passed');
        }
        setScore(score);
    }
    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setIsOpen(false)}>
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
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-4 px-5 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h5" className="text-lg font-medium leading-6 text-gray-900">
                                    Switch Status
                                </Dialog.Title>
                                <p className="text-sm text-gray-700 py-2">Candidate: {props.candidate.username}</p>
                                {props.tabs == 'Ready Test' ? 
                                <>
                                    <div className="flex items-center justify-start space-x-2">
                                        <label htmlFor="score" className="text-sm font-medium text-gray-900">Score Filtering Test : </label>
                                        <input type="number" id="Score" className="w-16 p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500" min={0} max={100} onChange={(e) => handleScoreChange(e)}/>
                                    </div>
                                    {selectedStatus && <p className="text-sm font-medium text-gray-900 mt-1">Status: {selectedStatus}</p> }
                                    <div className="mt-2">
                                        <textarea name="review" id="review" className="w-full mt-1 rounded-md" rows={4} value={review} placeholder="Review" onChange={(e) => setReview(e.target.value)}></textarea>
                                    </div>
                                </>
                                :
                                    <div className="mt-2">
                                        <select name="switch" id="switch" onChange={(e) => setSelectedStatus(e.target.value)} defaultValue='' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'>
                                            <option value="" disabled>Select Status</option>
                                            <option value="Ready Test">Ready Test</option>
                                            <option value="Contract">Contracted</option>
                                            {/* <option value="Passed">Passed</option>
                                            <option value="Recommendation">Recommendation</option> */}
                                        </select>
                                    </div>
                                }
                                <div className="mt-4 flex justify-end gap-2">
                                    <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => props.setIsOpen(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={(e) => handleSubmitStatus(e, props.candidate.userId, props.candidate.progId)}>
                                        Submit
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
