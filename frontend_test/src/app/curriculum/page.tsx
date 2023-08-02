"use client";

import { GetCurriculumReq } from '@/redux-saga/action/curriculumAction';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function Curriculum() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<any>(false);
  const [refresh, setRefresh] = useState<any>(false);
  const { curriculum } = useSelector((state: any) => state.curriculumState);

  useEffect(() => {
    const payload = {}
    dispatch(GetCurriculumReq(payload));
  }, [dispatch, refresh]);

  const onClick = (isi: any) => {
    const payload = {
      page: isi || 1
    }
    dispatch(GetCurriculumReq(payload))
  }

  let pageNumber: any[] = [];
  let totalPage: number = Math.ceil(curriculum?.totalCount / curriculum?.limit);
  let currentPage: number = curriculum?.page;

  for (let i: number = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageNumber.push(i);
  }

  return (
    <div className='py-10 px-10'>
      <div className='py-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex justify-start'>Curriculum</div>
          <div className='flex justify-end'><button className="btn btn-primary my-auto">Create Curriculum</button></div>
        </div>
      </div>
      <div className="flex justify-center py-5">
        <label htmlFor="searchInput" className='my-auto mr-5'>Search by Category</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mr-5 my-auto"
        />
        <div className="dropdown my-auto mr-5">
          <label tabIndex={0} className="btn btn-outline m-1">Pilih Status</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Online</a></li>
            <li><a>Offline</a></li>
          </ul>
        </div>
        <button className="btn btn-primary my-auto">Button</button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table w-full bg-gray-900'>
          <thead>
            <tr>
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
                  <td>{program.progTitle}</td>
                  <td>{program.progHeadline}</td>
                  <td>{program.progDuration}</td>
                  <td>{program.progTotalTrainee}</td>
                  <td>{program.progLearningType}</td>
                  <td>{program.progRating}</td>
                  <td className="flex">
                    <div className="mr-1">
                      edit
                    </div>
                    <div>delete</div>
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
              <Link className="join-item btn bg-gray-700" key={index} href={`/curriculum`} onClick={()=> onClick(page)}>{page}</Link>
            ) : (
              <Link className="join-item btn bg-gray-900" key={index} href={`/curriculum`} onClick={()=> onClick(page)}>{page}</Link>
            )
          ))}
      </div>
    </div>
  )
}
