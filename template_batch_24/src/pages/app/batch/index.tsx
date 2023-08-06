import { useRouter } from 'next/router';
import Page from '../../component/commons/Page';
import Pagination from '../../component/commons/Pagination';
import AppLayout from '../../component/layout/AppLayout';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useFormik } from 'formik';

export default function Batch() {
  const navigate = useRouter()
  const formik = useFormik({
    initialValues: {
       keyword: '',
       status: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <AppLayout>
      <Page title='Batch' titleButton='Create' onClick={() => navigate.push('/app/batch/new')}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center items-center gap-3 mb-3">
              <div>
                <label htmlFor="keyword" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input type="text" id="keyword" name='keyword' value={formik.values.keyword} onChange={formik.handleChange} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by batch, technology, trainer"/>
                </div>
              </div>
              <div>
                <select id="status" name="status" value={formik.values.status} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <option value='' disabled>Select status</option>
                    <option value='New'>New</option>
                    <option value='Running'>Running</option>
                    <option value='Closed'>Closed</option>
                </select>
              </div>
            <button type='submit' className="bg-blue-500 text-white py-1.5 px-2 rounded-md hover:bg-blue-600">Search</button>
          </div>
        </form>
        <div className="relative overflow-x-visible shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Batch
                </th>
                <th scope="col" className="px-6 py-3">
                    Technology
                </th>
                <th scope="col" className="px-6 py-3">
                    Members
                </th>
                <th scope="col" className="px-6 py-3">
                    Priode
                </th>
                <th scope="col" className="px-6 py-3">
                    Trainer
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Option</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Batch#15
                </th>
                <td className="px-6 py-4">
                  NodeJS
                </td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <img src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg" alt="..." className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"/>
                    <img src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" alt="..." className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"/>
                    <img src="https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg" alt="..." className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"/>
                    <img src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png" alt="..." className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"/>
                  </div>
                </td>
                <td className="px-6 py-4">
                  24 May 2023 - 24 Agustus 2023
                </td>
                <td className="px-6 py-4">
                  Mas Naufal
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Running
                  </div>
                </td>
                <td className="px-6 py-4">
                <Menu as='div' className='relative'>
                  <Menu.Button>
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15"> <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>
                  </Menu.Button>
                  <Menu.Items className='absolute z-10 text-sm w-32 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                        <Link href={`/app/batch/${12}`} className="block px-4 py-2 hover:bg-gray-100">Edit</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Delete</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Closed Batch</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Set To Running</a>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={{ pathname: '/app/batch/evaluation', query: {batchId: 20} }} className="block px-4 py-2 hover:bg-gray-100">Evaluation</Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <Pagination /> */}
      </Page>
    </AppLayout>
  )
}
