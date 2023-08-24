import { useRouter } from 'next/router';
import Page from '../../component/commons/Page';
import Pagination from '../../component/commons/Pagination';
import AppLayout from '../../component/layout/AppLayout';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteBatchTry, getBatchFetch, getByNameAndStatusFetch, updateBatchStatusTry } from '@/redux/slices/batchSlices';
import { getPassedCandidateBootcampFetch } from '@/redux/slices/candidateSlices';
import batch from '@/pages/api/batch';

export default function Batch() {
  const dispatch = useDispatch();
  const batchs = useSelector((state: any) => state.batchs.batchs);
  const batchLoad = useSelector((state: any) => state.batchs.status);
  const user = useSelector((state: any) => state.users.user);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getBatchFetch(''));
    dispatch(getPassedCandidateBootcampFetch(0));
    setReload(false);
  }, [reload, Object.keys(batch).length]);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const navigate = useRouter()
  const formik = useFormik({
    initialValues: {
       keyword: '',
       status: '',
    },
    onSubmit: (values) => {
      dispatch(getByNameAndStatusFetch({batch:values.keyword, status:values.status}))
    },
  });

  const handleEditButton = (e: any, id: number) => {
    e.preventDefault();
    navigate.push(`/app/batch/${id}`);
  }

  const handleDeleteButton = (e: any, id: number) => {
    e.preventDefault();
    dispatch(deleteBatchTry(id));
    setReload(true);
  }

  const handleEvaluationButton = (e:any, id: number) => {
    e.preventDefault();
    navigate.push({pathname: `/app/batch/evaluation`, query: {batchid: id}});
  }

  const handleStatusButton = (id: number, status: string) => {
    if(status == 'Running'){
      dispatch(updateBatchStatusTry({ batchId: id, status:'Running' }));
    } else {
      dispatch(updateBatchStatusTry({ batchId: id, status:'Close' }));
    }
    setReload(true);
  }

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
                <input type="text" id="keyword" name='keyword' required value={formik.values.keyword} onChange={formik.handleChange} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search by batch, technology, trainer"/>
              </div>
            </div>
            <div>
              <select id="status" name="status" required value={formik.values.status} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
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
              {Object.keys(batchs).length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>Loading...</td></tr> : batchs.data.length == 0 ? <tr><td colSpan={7} className='text-center py-3 font-bold'>No batchs found</td></tr> : batchs.data.map((batch: any) => 
                <tr key={batch.batchId} className="bg-white">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {batch.batchName}
                  </th>
                  <td className="px-6 py-4">
                    {batch.batchEntity.progTitle}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {batch.batchTrainees.length == 0 ? 'No members yet' :  batch.batchTrainees.map((trainees: any) => 
                        <img key={trainees.batrId} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={trainees.batrTraineeEntity.userPhoto} className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-6"/>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {`${new Date(batch.batchStartDate).toLocaleDateString('id-ID', options as any)} - ${new Date(batch.batchEndDate).toLocaleDateString('id-ID', options as any)}`}
                  </td>
                  <td className="px-6 py-4">
                    {Object.keys(batchs).length != 0 && batch.instructorPrograms[0].inproEmpEntity.empEntity.userName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full mr-2 ${batch.batchStatus.status == 'New' ? 'bg-sky-500' : batch.batchStatus.status == 'Running' ? 'bg-green-500' : 'bg-red-500'}`}></div> {batch.batchStatus.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                  <Menu as='div' className='relative'>
                    <Menu.Button>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15"> <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>
                    </Menu.Button>
                    <Menu.Items className='absolute z-10 text-sm w-32 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {user && user.roles == 'Recruiter' &&
                        <>
                          <Menu.Item>
                              <Link href='#' onClick={(e) => handleEditButton(e, batch.batchId)} className="block px-4 py-2 hover:bg-gray-100">Edit</Link>
                          </Menu.Item>
                          <Menu.Item>
                              <a href="#" onClick={(e) => handleDeleteButton(e, batch.batchId)} className="block px-4 py-2 hover:bg-gray-100">Delete</a>
                          </Menu.Item>
                        </>
                      }
                      {user && user.roles == 'Instructor' &&
                        <>
                          <Menu.Item>
                              <a href="#" onClick={() => handleStatusButton(batch.batchId, 'Close')} className="block px-4 py-2 hover:bg-gray-100">Closed Batch</a>
                          </Menu.Item>
                          <Menu.Item>
                              <a href="#"  onClick={() => handleStatusButton(batch.batchId, 'Running')} className="block px-4 py-2 hover:bg-gray-100">Set To Running</a>
                          </Menu.Item>
                        </>
                      }
                      <Menu.Item>
                          <Link href='#' onClick={(e) => handleEvaluationButton(e, batch.batchId)} className="block px-4 py-2 hover:bg-gray-100">Evaluation</Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <Pagination /> */}
      </Page>
    </AppLayout>
  )
}
