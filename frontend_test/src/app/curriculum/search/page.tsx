"use client";

import { DeleteCurriculumReq, SearchCurriculumReq } from '@/redux-saga/action/curriculumAction';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function Search() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<any>(false);
  const [refresh, setRefresh] = useState<any>(false);
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('');
  const [statusLabel, setStatusLabel] = useState('Pilih Status');
  const { curriculum } = useSelector((state: any) => state.curriculumState);
  
  // Dropdown
  const [dropdownStatusOpen, setDropdownStatusOpen] = useState(false);
  const toggleDropdownStatus = () => {
    setDropdownStatusOpen((prevIsOpen) => !prevIsOpen);
  };
  
  const [dropdownProgramOpen, setDropdownProgramOpen] = useState(false);
  const toggleDropdownProgram = () => {
    setDropdownProgramOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleStatusSelect = (label: string) => {
    setStatusLabel(label);
    setDropdownStatusOpen(false);
  }

  useEffect(() => {
    const payload = {}
    dispatch(SearchCurriculumReq(payload));
    setRefresh(false);
  }, [dispatch, refresh]);

  const onClick = (isi: any) => {
    const payload = {
      page: isi || 1
    }
    dispatch(SearchCurriculumReq(payload))
  }

  const onSearch = (event: any, name: string, status: string) => {
    event.preventDefault();
    const payload = {
      name: name,
      status: status,
    }
    dispatch(SearchCurriculumReq(payload))
  }

  const onDelete= (id: any) => {
    dispatch(DeleteCurriculumReq(id));
    setRefresh(true);
  }

  let pageNumber: any[] = [];
  let totalPage: number = Math.ceil(curriculum?.totalCount / curriculum?.limit);
  let currentPage: number = curriculum?.page;

  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageNumber.push(i);
  }

  const handleRefresh = () => {
    setSearchValue('');
    setStatus('');
    setStatusLabel('Pilih Status')
    dispatch(SearchCurriculumReq({}));
    setRefresh(true);
  };

  return (
    <div className='py-10 px-10'>
      <div className='py-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-start font-black text-xl'>Curriculum</div>
          <div className='flex justify-end'><button className="btn btn-primary my-auto">Create Curriculum</button></div>
        </div>
      </div>
      <div className="py-5">
        <div className='grid grid-cols-6'>
          <div className='col-start-2 col-span-4'>
            <form onSubmit={(e) => onSearch(e, searchValue, status)} className='w-full flex justify-center'>
              <label htmlFor="searchInput" className="my-auto mr-5">
                Search by Category
              </label>
              <input
                type="text"
                id="searchInput"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs mr-5 my-auto"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="dropdown my-auto mr-5">
                <label tabIndex={0} className="btn btn-outline m-1" onClick={toggleDropdownStatus}>
                  {statusLabel}
                </label>
                {dropdownStatusOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button type="button" onClick={() => {setStatus('online'), handleStatusSelect('Online')}}>
                        Online
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => {setStatus('online'), handleStatusSelect('Offline')}}>
                        Offline
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <button type="submit" className="btn btn-primary my-auto">
                Search
              </button>
            </form>
          </div>
          <div className='col-span-1 flex justify-end'>
            <button className="btn btn-error" onClick={() => onDelete(handleRefresh)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>

      <div className=''>
        <table className='table w-full bg-gray-900'>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>TITLE</th>
              <th>DURATION</th>
              <th>TOTAL</th>
              <th>TYPE</th>
              <th>RATING</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {curriculum.data && curriculum.data.map((program: any, index: number) => {
            return (
                <tr key={program.progEntityId}>
                  <td>{program.progEntityId}</td>
                  <td>{program.progTitle}</td>
                  <td>{program.progHeadline}</td>
                  <td>{program.progDuration}</td>
                  <td>{program.progTotalTrainee}</td>
                  <td>{program.progLearningType}</td>
                  <td>{program.progRating}</td>
                  <td className=''>
                    <div className="dropdown dropdown-hover dropdown-end">
                      <label tabIndex={0} className="btn btn-outline px-2" style={{ border: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </label>
                        <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box grid grid-rows-2 gap-2">
                          <button className="btn btn-active btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button className="btn btn-error" onClick={() => onDelete(program.progEntityId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                    </div>
                  </td>
                </tr>
            )
          })}
        </tbody>
        </table>
      </div>
      <div className="join flex justify-center py-5">
          { pageNumber.map((page, index) => (
            page==currentPage ? (
              <Link className="join-item btn bg-gray-700" key={index} href={`/curriculum/search`} onClick={()=> onClick(page)}>{page}</Link>
            ) : (
              <Link className="join-item btn bg-gray-900" key={index} href={`/curriculum/search`} onClick={()=> onClick(page)}>{page}</Link>
            )
          ))}
      </div>
    </div>
  )
}
