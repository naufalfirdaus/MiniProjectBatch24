import Page from "@/pages/component/commons/Page";
import AppLayout from "@/pages/component/layout/AppLayout";
import { Menu } from "@headlessui/react";
import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";

const dummy_candidates = [
    {
        name: 'Roman',
        university: 'Oxford',
        added: false,
    },
    {
        name: 'Sira',
        university: 'Harvard',
        added: false,
    },
    {
        name: 'Rara',
        university: 'Cambridge',
        added: false,
    },
    {
        name: 'Mira',
        university: 'University A',
        added: false,
    },
    {
        name: 'Tes',
        university: 'University B',
        added: false,
    },
    {
        name: 'Loop',
        university: 'University C',
        added: false,
    }
];

export default function CreateBatch() {
    const [candidates, setCandidates] = useState(dummy_candidates);
  const formik = useFormik({
    initialValues: {
       batch_name: '',
       prap_prog_entity_id: '',
       batch_start_date: '',
       batch_end_date: '',
       batch_instructor_id: '',
       batch_co_instructor:'',
    },
    onSubmit: (values) => {
      const recommended = candidates.filter(el => el.added == true);
      console.log({...values, members: recommended});
    },
  });


  const addMemberHandle = (e: any, i: number, status: string) => {
    e.preventDefault();
    const listCandidate = [...candidates];
    if(status == 'remove'){
        listCandidate[i]['added'] = false;
    } else {
        listCandidate[i]['added'] = true;
    }
    setCandidates(listCandidate);
  }

  return (
    <AppLayout>
      <Page title="Create Batch">
        <div className="border border-slate-300 rounded-lg p-5">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="mb-6">
                        <label htmlFor="batch_name" className="block mb-2 text-sm font-medium text-gray-900">Batch Name</label>
                        <input type="text" id="batch_name" name="batch_name" value={formik.values.batch_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="prap_prog_entity_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Technology</label>
                        <select id="prap_prog_entity_id" name="prap_prog_entity_id" defaultValue='' onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full">
                            <option value='' disabled>Select technology</option>
                            <option value={1}>NodeJS</option>
                            <option value={2}>Java Technology</option>
                            <option value={3}>Flutter</option>
                        </select>
                    </div>
                    <div className="row-span-3 text-center justify-self-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <h1 className="text-4xl">3</h1>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batch_start_date" className="block mb-2 text-sm font-medium text-gray-900">Periode (awal)</label>
                        <input type="date" id="batch_start_date"  name="batch_start_date" value={formik.values.batch_start_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batch_end_date" className="block mb-2 text-sm font-medium text-gray-900">Periode (akhir)</label>
                        <input type="date" id="batch_end_date" name="batch_end_date" value={formik.values.batch_end_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batch_instructor_id" className="block mb-2 text-sm font-medium text-gray-900">Trainer</label>
                        <input type="text" id="batch_instructor_id" name="batch_instructor_id" value={formik.values.batch_instructor_id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="batch_co_instructor" className="block mb-2 text-sm font-medium text-gray-900">Co Trainer</label>
                        <input type="text" id="batch_co_instructor" name="batch_co_instructor" value={formik.values.batch_co_instructor} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={formik.handleChange} />
                    </div>
                </div>

                {/* Bootcamp Member */}
                <h1 className="uppercase font-medium mt-4">Recommended Bootcamp Member</h1>
                <div className="flex justify-center gap-3 mt-5">
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
                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Search Candidate</button>
                </div>
                <div className="grid md:grid-cols-3 mt-7 gap-3">
                    {candidates.map((candidate, i) =>
                    <div key={i} className={`inline-flex border gap-2 items-center justify-between border-slate-500 py-2 px-3 rounded-xl ${candidate.added && 'bg-green-300'}`}>
                        <div className="inline-flex gap-3">
                            <Image width={50} height={50} className="w-14 h-14 bg-gray-100 object-cover rounded-full flex-shrink-0" src="/assets/images/user.png" alt=""/>
                            <div>
                                <h1 className="font-bold">{candidate.name}</h1>
                                <h1 className="text-gray-400">{candidate.university}</h1>
                            </div>
                        </div>
                        {candidate.added ? 
                        
                        <button onClick={(e) => addMemberHandle(e, i, 'remove')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button> :
                        <button onClick={(e) => addMemberHandle(e, i, 'add')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        </button>
                    }
                    </div>
                    )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button type="submit" className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600">Save</button>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">Cancel</button>
                </div>
            </form>
        </div>
      </Page>
    </AppLayout>
  );
}
