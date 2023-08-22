import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import EditBankModal from '@/component/bank/EditBankModal';
import {
  GetUsersReq,
  GetUsersSelectReq,
} from '@/redux-saga/action/usersAccountAction';
import { GetBankSelectReq } from '@/redux-saga/action/bankAction';
import PaginationUsers from '@/component/usersAcc/PaginationUsers';
import AddUsersModal from '@/component/usersAcc/AddUsersModal';
import {
  GetFintechReq,
  GetFintechSelectReq,
} from '@/redux-saga/action/fintechAction';
import Layout from '@/component/_layout';
import EditUsersModal from '@/component/usersAcc/EditUsersModal';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { getCookie } from 'cookies-next';

export default function Payment() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [dataProfile, setDataProfile] = React.useState('');
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedUsersAcc, setSelectedUsersAcc] = React.useState(null);
  const { users_acc } = useSelector((state: any) => state.usersAccState);
  const { fintech } = useSelector((state: any) => state.fintechState);
  const { bank } = useSelector((state: any) => state.bankState);
  const [refresh, setRefresh] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination

  function formatCurrency(amount: number) {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);

    return formatted.replace(/(\.|,)00$/, '');
  }

  const handlePageChange = (page: number, accNumber: string) => {
    setCurrentPage(page);
    dispatch(GetUsersReq(page, accNumber));
  };

  const router = useRouter();

  useEffect(() => {
    const userToken = getCookie('access_token');

    if (typeof userToken === 'string') {
      const fetchData = async () => {
        const decodedData: any = jwt_decode(userToken);
        setDataProfile(decodedData);
        dispatch(GetUsersReq(1, decodedData.userid));
      };
      fetchData();
    } else {
      router.push('/signin');
    }

    dispatch(GetBankSelectReq());
    dispatch(GetFintechSelectReq());
  }, [dispatch, refresh, router]);

  return (
    <Layout>
      <div className="flex flex-row text-black min-h-screen w-fit py-12">
        <div className="mx-2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
            <table className="w-full text-sm text-gray-900 dark:text-gray-400 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th>Account Number</th>
                  <th>Desc</th>
                  <th>Saldo</th>
                  <th>Type</th>
                  <th>
                    <button
                      type="button"
                      className="ml-1 inline-block rounded bg-slate-700 px-3 py-2 text-xs font-medium uppercase leading-normal text-white transition"
                      onClick={() => setShowModal(true)}
                    >
                      + Add
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {users_acc &&
                  users_acc.items &&
                  users_acc.items.map((item: any) => (
                    <React.Fragment key={item.usacUsersEntityId}>
                      <tr>
                        <th>{item.usacAccountNumber}</th>
                        <td>
                          {(Array.isArray(bank) &&
                            bank.find(
                              (bankItem: any) =>
                                bankItem.bankEntityId === item.usacBankEntityId
                            )?.bankCode) ||
                            (Array.isArray(fintech) &&
                              fintech.find(
                                (fintItem: any) =>
                                  fintItem.fintEntityId ===
                                  item.usacBankEntityId
                              )?.fintCode) ||
                            null}
                        </td>
                        <td>{formatCurrency(item.usacSaldo)}</td>

                        <td>{item.usacType}</td>
                        <td>
                          <button
                            type="button"
                            className="ml-1 inline-block roundedpx-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition opacity-50 hover:opacity-80"
                            onClick={() => {
                              setShowEditModal(true);
                              setSelectedUsersAcc(item.usacAccountNumber);
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
                        selectedUsersAcc === item.usacAccountNumber && (
                          <tr key={`edit-${item.usacAccountNumber}`}>
                            <td colSpan={3}>
                              <EditUsersModal
                                setShowEditModal={setShowEditModal}
                                setRefresh={setRefresh}
                                setBank={bank}
                                setFintech={fintech}
                                setUsersAcc={item.usacAccountNumber}
                                setType={item.usacType}
                                setCode={item.usacBankEntityId}
                                setSaldo={item.usacSaldo}
                                setDataProfile={dataProfile}
                              />
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          {users_acc.meta && users_acc.meta.totalPages && (
            <PaginationUsers
              totalPages={users_acc.meta.totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {/* {users_select.map((item:any) => {
        item.
      })} */}
      {showModal ? (
        <AddUsersModal
          setShowModal={setShowModal}
          setRefresh={setRefresh}
          setBank={bank}
          setFintech={fintech}
          setDataProfile={dataProfile}
        />
      ) : null}
    </Layout>
  );
}
