import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { changeToIdle, getBatchByIdFetch, getBatchEvaluationFetch } from "@/redux/slices/batchSlices";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const dummy_student = [
    {
        name: 'Student 1',
        status: 'Running',
        review: 'good',
        score: 80
    },
    {
        name: 'Student 2',
        status: 'Running',
        review: 'Nice logic',
        score: 83
    },
    {
        name: 'Student 3',
        status: 'Running',
        review: 'Mid',
        score: 78
    },
    {
        name: 'Student 4',
        status: 'Running',
        review: 'good self learning',
        score: 88
    },
]

export default function BatchEvaluation(){
    const [studentData, setStudentData] = useState(dummy_student);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenR, setIsOpenR] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const status = useSelector((state: any) => state.batchs.status);
    const batch = useSelector((state: any) => state.batchs.batch);
    const batchEvaluation = useSelector((state: any) => state.batchs.evaluations);
    const dispatch = useDispatch();
    const router = useRouter();
    
    useEffect(() => {
        if(status == 'idle' && router.query.batchid){
            dispatch(getBatchEvaluationFetch(router.query.batchid));
            dispatch(getBatchByIdFetch(router.query.batchid));
        }
    }, [status, router]);
    
    const handleReviewClick = (e: any, name: string) => {
        const findStudent = studentData.find(el => el.name == name);
        setSelectedStudent(findStudent);
        setIsOpen(true);
    }

    const handleResignClick = (e: any, name: string) => {
        const findStudent = studentData.find(el => el.name == name);
        setSelectedStudent(findStudent);
        setIsOpenR(true);
    }

    const handleReviewChange = (e: any, name: string) => {
        const findIndex = studentData.findIndex(el => el.name == name);
        const listStudent = [...studentData];
        listStudent[findIndex]['review'] = e.target.value;
        setStudentData(listStudent);
    }

    const handleSubmitReview = (e: any, name: string) => {
        e.preventDefault();
        console.log(selectedStudent);
        setIsOpen(false);
    }

    const handleSubmitResign = (e: any, name: string) => {
        e.preventDefault();
        console.log(selectedStudent);
        setIsOpenR(false);
    }

    const handleEvaluationButton = (e: any, userId: number) => {
        e.preventDefault();
        router.push(`/app/batch/evaluation/${userId}`).then(() => dispatch(changeToIdle('')));
    }

    return (
        <AppLayout>
            <Page title={`Batch#${router.query.batchid} ${Object.keys(batch).length != 0 && batch.batchEntity.progTitle} `} titleButton='Back' onClick={() => router.push('/app/batch').then(() => dispatch(changeToIdle('')))}>
                <div className="border border-slate-300 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4">
                        {batchEvaluation.length != 0 && batchEvaluation.map((student: any, i: number) => 
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
                                                <Link href='#' className="block px-4 py-2 hover:bg-gray-100" onClick={(e) => handleReviewClick(e, student.name)}>Review</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100" onClick={(e) => handleResignClick(e, student.name)}>Resign</Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                                <div className="flex flex-col items-center pb-5">
                                    <img className="w-32 h-32 mb-3 rounded-full" src="/assets/images/candidate.png" alt="User image"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{student.batrTraineeEntity.userFirstName} {student.batrTraineeEntity.userLastName}</h5>
                                    <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-lg">{student.batrStatus}</span>
                                    <h1 className="mt-3 text-md font-medium">Total Score: {student.batrTotalScore}</h1>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="submit" className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600">Save</button>
                        <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Cancel</button>
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
                                    <p className="text-sm text-gray-600">Kandidat {selectedStudent?.name}</p>
                                    <textarea name="review" id="review" className="w-full mt-1 rounded-md" rows={4} value={selectedStudent?.review} onChange={(e) => handleReviewChange(e, selectedStudent.name)}  placeholder="Review"></textarea>
                                    {/* <select name="switch" id="switch" defaultValue='' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'>
                                        <option value="" disabled>Select Status</option>
                                        <option value="Filtering Test">Ready Test</option>
                                    </select> */}
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={(e) => handleSubmitReview(e, selectedStudent.name)}>
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
                                    <p className="text-sm text-gray-600">Kandidat {selectedStudent?.name}</p>
                                    <select name="switch" id="switch" defaultValue='' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'>
                                        <option value="" disabled>Select Status</option>
                                        <option value="Resign">Resign</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <textarea name="review" id="review" className="w-full mt-1 rounded-md" rows={4} value={selectedStudent?.review} onChange={(e) => handleReviewChange(e, selectedStudent.name)}  placeholder="Review"></textarea>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                    <button type="button" className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setIsOpenR(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={(e) => handleSubmitResign(e, selectedStudent.name)}>
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