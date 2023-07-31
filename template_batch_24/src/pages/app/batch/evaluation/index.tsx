import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const dummy_student = [
    {
        name: 'Student 1',
        status: 'Running',
        score: 80
    },
    {
        name: 'Student 2',
        status: 'Running',
        score: 83
    },
    {
        name: 'Student 3',
        status: 'Running',
        score: 78
    },
    {
        name: 'Student 4',
        status: 'Running',
        score: 88
    },
]

export default function BatchEvaluation(){
    const router = useRouter();
    return (
        <AppLayout>
            <Page title={`Batch#${router.query.batchId}`} titleButton='Back' onClick={() => router.push('/app/batch')}>
                <div className="border border-slate-300 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4">
                        {dummy_student.map((student, i) => 
                            <div key={i} className="w-full max-w-xs py-2 bg-white border border-gray-200 rounded-lg shadow">
                                <div className="flex justify-end px-4">
                                    <Menu as='div' className='relative'>
                                        <Menu.Button className='text-gray-500'>
                                            <span className="sr-only">Open dropdown</span>
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3"><path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg>
                                        </Menu.Button>
                                        <Menu.Items className='absolute z-10 text-sm w-32 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <Menu.Item>
                                                <Link href={`/app/batch/evaluation/${1}`} className="block px-4 py-2 hover:bg-gray-100">Evaluation</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href={`/app/batch/${12}`} className="block px-4 py-2 hover:bg-gray-100">Review</Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Resign</Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                                <div className="flex flex-col items-center pb-5">
                                    <img className="w-32 h-32 mb-3 rounded-full" src="/assets/images/candidate.png" alt="User image"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{student.name}</h5>
                                    <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-lg">{student.status}</span>
                                    <h1 className="mt-3 text-md font-medium">Total Score: {student.score}</h1>
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
        </AppLayout>
    )
}