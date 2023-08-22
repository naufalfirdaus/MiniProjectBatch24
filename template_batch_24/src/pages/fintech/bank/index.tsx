import { GetBankReq } from '@/redux-saga/action/bankAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import AddBankModal from '@/component/bank/AddBankModal';
import EditBankModal from '@/component/bank/EditBankModal';
import PaginationBank from '@/component/bank/PaginationBank';
import Layout from '@/component/_layout';

export default function Payment() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedBankId, setSelectedBankId] = React.useState(null);
  const { bank } = useSelector((state: any) => state.bankState);
  const [refresh, setRefresh] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination

  const handleSearch = () => {
    dispatch(GetBankReq(1, searchTerm));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(GetBankReq(page, searchTerm)); // Fetch data for the new page
  };

  useEffect(() => {
    dispatch(GetBankReq(1, ''));
  }, [dispatch, refresh, searchTerm]);

  return (
    <Layout>
      <div className="flex flex-row text-black min-h-screen w-fit py-12">
        <div className="mx-2">
          <div className="my-4">
            <label>Search Bank</label>
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
                  <th>Bank Code</th>
                  <th>Bank Name</th>
                  <th>
                    <button
                      type="button"
                      className="ml-1 inline-block rounded bg-slate-700 px-3 py-2 text-xs font-medium uppercase leading-normal text-white transition hover:bg-slate-700"
                      onClick={() => setShowModal(true)}
                    >
                      + Add
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bank &&
                  bank.items &&
                  bank.items.map((item: any) => (
                    <React.Fragment key={item.bankEntityId}>
                      <tr>
                        <th>{item.bankCode}</th>
                        <td>{item.bankName}</td>
                        <td>
                          <button
                            type="button"
                            className="ml-1 inline-block rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition hover:fill-slate-700 opacity-50 hover:opacity-80"
                            onClick={() => {
                              setShowEditModal(true);
                              setSelectedBankId(item.bankEntityId);
                            }}
                          >
                            <Image
                              src="/dots.png"
                              className=""
                              alt=""
                              width={20}
                              height={20}
                            />
                          </button>
                        </td>
                      </tr>
                      {showEditModal &&
                        selectedBankId === item.bankEntityId && (
                          <tr key={`edit-${item.bankEntityId}`}>
                            <td colSpan={3}>
                              <EditBankModal
                                setShowEditModal={setShowEditModal}
                                setBankCode={item.bankCode}
                                setBankName={item.bankName}
                                setId={item.bankEntityId}
                              />
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          {bank.meta && bank.meta.totalPages && (
            <PaginationBank
              totalPages={bank.meta.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {showModal ? (
        <AddBankModal setShowModal={setShowModal} setRefresh={setRefresh} />
      ) : null}
    </Layout>
  );
}
