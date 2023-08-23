import { GetFintechReq } from '@/redux-saga/action/fintechAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import AddFintechModal from '@/component/fintech/AddFintechModal';
import EditFintechModal from '@/component/fintech/EditFintechModal';
import PaginationFintech from '@/component/fintech/PaginationFintech';
import Layout from '@/component/_layout';

export default function Payment() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedFintechId, setSelectedFintechId] = React.useState(null);
  const { fintech } = useSelector((state: any) => state.fintechState);
  const [refresh, setRefresh] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination

  const handleSearch = () => {
    dispatch(GetFintechReq(1, searchTerm));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(GetFintechReq(page, searchTerm)); // Fetch data for the new page
  };

  useEffect(() => {
    dispatch(GetFintechReq(1, ''));
  }, [dispatch, refresh, searchTerm]);

  return (
    // Start
    <Layout>
      <div className="flex flex-row text-black min-h-screen py-12 w-[80%] bg-gray-100 justify-center">
        <div className="w-full mx-2">
          <div className="my-4 mx-auto flex items-center justify-center">
            <label>Search Fintech</label>
            <input
              placeholder="Search"
              value={searchTerm}
              className="ml-2 border-2 rounded-md px-2 py-1"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
            >
              Search
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
            <table className="w-full text-smtext-gray-900 dark:text-gray-400 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th>Fintech Code</th>
                  <th>Fintech Name</th>
                  <th>
                    <button
                      type="button"
                      className="ml-1 inline-block rounded px-3 py-2 font-medium uppercase leading-normal text-xs text-slate-900 transition hover:bg-slate-700 hover:text-white"
                      onClick={() => setShowModal(true)}
                    >
                      + Add
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fintech &&
                  fintech.items &&
                  fintech.items.map((item: any) => (
                    <React.Fragment key={item.fintEntityId}>
                      <tr>
                        <th>{item.fintCode}</th>
                        <td>{item.fintName}</td>
                        <td>
                          <button
                            type="button"
                            className="ml-1 inline-block rounded  px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition opacity-50 hover:opacity-80"
                            onClick={() => {
                              setShowEditModal(true);
                              setSelectedFintechId(item.fintEntityId);
                            }}
                          >
                            <Image
                              src="/dots.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                          </button>
                        </td>
                      </tr>
                      {showEditModal &&
                        selectedFintechId === item.fintEntityId && (
                          <tr key={`edit-${item.fintEntityId}`}>
                            <td colSpan={3}>
                              <EditFintechModal
                                setShowEditModal={setShowEditModal}
                                setFintCode={item.fintCode}
                                setFintName={item.fintName}
                                setId={item.fintEntityId}
                              />
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          {fintech.meta && fintech.meta.totalPages && (
            <PaginationFintech
              totalPages={fintech.meta.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {showModal ? (
        <AddFintechModal setShowModal={setShowModal} setRefresh={setRefresh} />
      ) : null}
    </Layout>
  );
}
