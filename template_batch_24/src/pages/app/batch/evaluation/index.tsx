import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { getBatchByIdFetch, getBatchEvaluationFetch, updateTraineeEvalutaionReviewTry } from "@/redux/slices/batchSlices";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BatchEvaluation(){
    const [studentData, setStudentData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenR, setIsOpenR] = useState(false);
    const [resign, setResign] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const status = useSelector((state: any) => state.batchs.status);
    const batch = useSelector((state: any) => state.batchs.batch);
    const batchEvaluation = useSelector((state: any) => state.batchs.evaluations);
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    
    useEffect(() => {
        if(router.query.batchid){
            dispatch(getBatchByIdFetch(router.query.batchid));
            dispatch(getBatchEvaluationFetch(router.query.batchid));
        }

        if(batchEvaluation.length != 0 || reload){
            setStudentData(batchEvaluation)
        }
        setReload(false);
        
    }, [router, batchEvaluation.length, reload]);

    useEffect(() => {
        if(!isOpen || !isOpenR){
            setResign('');
            setStudentData(batchEvaluation);
        }
    },[isOpen, isOpenR]);
    
    const handleReviewClick = (id: number) => {
        const findStudent = studentData.find((student: any) => student.batrTraineeEntity.userEntityId == id);
        setSelectedStudent(findStudent);
        setIsOpen(true);
    }

    const handleResignClick = (id: number) => {
        const findStudent = studentData.find((student: any) => student.batrTraineeEntity.userEntityId == id);
        setSelectedStudent(findStudent);
        setIsOpenR(true);
    }

    const handleReviewChange = (e: any) => {
        const selectedData = {...selectedStudent};
        selectedData.batrReview = e.target.value;
        setSelectedStudent(selectedData);
    }

    const handleSubmitReview = (e: any) => {
        e.preventDefault();
        dispatch(updateTraineeEvalutaionReviewTry({userId: selectedStudent.batrTraineeEntity.userEntityId, data: { review:selectedStudent.batrReview }}));
        setReload(true);
        setIsOpen(false);
    }

    const handleSubmitResign = (e: any) => {
        e.preventDefault();
        dispatch(updateTraineeEvalutaionReviewTry({userId: selectedStudent.batrTraineeEntity.userEntityId, data: { review: selectedStudent.batrReview, status: 'Resign' }}))
        setReload(true);
        setIsOpenR(false);
    }

    const handleEvaluationButton = (e: any, userId: number) => {
        e.preventDefault();
        router.push(`/app/batch/evaluation/${userId}`);
    }
    
    return (
        <AppLayout>
            <Page title={`Batch#${router.query.batchid} ${Object.keys(batch).length != 0 && batch.batchEntity.progTitle} `} titleButton='Back' onClick={() => router.push('/app/batch')}>
                <div className="border border-slate-300 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4">
                        {batchEvaluation.length == 0 ? <h1 className="text-center col-span-4">No trainee yet.</h1> : batchEvaluation.map((student: any, i: number) => 
                            <div key={i} className="w-full max-w-xs py-2 bg-white border border-gray-200 rounded-lg shadow">
                                <div className="flex justify-end px-4">
                                    <Menu as='div' className='relative'>
                                        <Menu.Button className='text-gray-500'>
                                            <span className="sr-only">Open dropdown</span>
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3"><path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg>
                                        </Menu.Button>
                                        <Menu.Items className='absolute z-10 text-sm w-32 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <Menu.Item>
                                                <Link href='#' onClick={(e) => handleEvaluationButton(e, student.batrTraineeEntity.userEntityId)} className="block px-4 py-2 hover:bg-gray-100">Evaluation</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href='#' className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleReviewClick(student.batrTraineeEntity.userEntityId)}>Review</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleResignClick(student.batrTraineeEntity.userEntityId)}>Resign</Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                                <div className="flex flex-col items-center pb-5">
                                    <img className="w-32 h-32 mb-3 rounded-full" src="/assets/images/candidate.png" alt="User image"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{student.batrTraineeEntity.userFirstName} {student.batrTraineeEntity.userLastName}</h5>
                                    <span className={`text-sm text-white px-2 py-1 rounded-lg ${student.batrStatus == 'Running' ? 'bg-green-400' : student.batrStatus == 'Resign' ? 'bg-red-400' : 'bg-black'}`}>{student.batrStatus}</span>
                                    <h1 className="mt-3 text-md font-medium">Total Score: {student.batrTotalScore}</h1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Page>

            {/* Modal Review */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
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
                                    Review
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">Kandidat {selectedStudent?.batrTraineeEntity.userFirstName} {selectedStudent?.batrTraineeEntity.userLastName}</p>
                                    <textarea name="review" id="review" className="w-full mt-1 rounded-md" rows={4} value={selectedStudent?.batrReview || ''} onChange={(e) => handleReviewChange(e)}  placeholder="Review"></textarea>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={(e) => handleSubmitReview(e)}>
                                        Submit
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Modal Resign */}
            <Transition appear show={isOpenR} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={()=>setIsOpenR(false)}>
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
                                    <p className="text-sm text-gray-600">Kandidat {selectedStudent?.batrTraineeEntity.userFirstName} {selectedStudent?.batrTraineeEntity.userLastName}</p>
                                    <select name="switch" id="switch" defaultValue='' onChange={(e) => setResign(e.target.value)} className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'>
                                        <option value="" disabled>Select Status</option>
                                        <option value="Resign">Resign</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <textarea name="review" id="review" className="w-full mt-1 rounded-md" rows={4} value={selectedStudent?.batrReview || ''} onChange={(e) => handleReviewChange(e)}  placeholder="Review"></textarea>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpenR(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={resign == '' ? true : false} onClick={(e) => handleSubmitResign(e)}>
                                        Submit
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </AppLayout>
    )
}