import React, { useEffect, useState } from 'react';
import Layout from '../_layout';
import { useDispatch, useSelector } from 'react-redux';
import { GetTransactionReq } from '@/redux-saga/action/trpaAction';
import { useRouter } from 'next/router';
import Pagination from '../layout/Pagination';
import moment from 'moment';

export default function TransactionList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [refresh, setRefresh] = useState<any>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { transactions } = useSelector((state: any) => state.trpaState);

  const accountId = router.query.accountId
    ? (router.query.accountId as string)
    : '';

  useEffect(() => {
    setSearchQuery(accountId);

    dispatch(
      GetTransactionReq({
        accountid: accountId,
        paymentType: selectedOption,
        page: currentPage,
        size: itemsPerPage,
      })
    );
  }, [dispatch, refresh, accountId, selectedOption, currentPage]);

  const handleSearch = () => {
    router.push(
      `/payment/accounts?accountId=${encodeURIComponent(searchQuery)}`
    );

    dispatch(
      GetTransactionReq({ accountId: searchQuery, paymentType: selectedOption })
    );
  };

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      GetTransactionReq({
        accountId: searchQuery,
        paymentType: selectedOption,
        pageno: page,
      })
    ); // Fetch data for the new page
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-row text-black max-w-screen-lg py-12 h-full w-full">
          <div className="mx-2">
            <div className="my-4">
              <label>Search</label>
              <input
                placeholder="Transaction Number"
                name="target"
                value={searchQuery}
                className="ml-2 border-2 rounded-md px-2 py-1"
                onChange={handleInputChange}
              />
              <button
                className="bg-green-600 text-white mx-2 px-4 py-1.5 rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
              <select
                className="mx-2 px-4 py-1.5 rounded-md w-46 h-9"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="">Payment Type</option>
                <option value="SD">Saldo</option>
                <option value="TP">TopUp</option>
                <option value="TR">Transfer</option>
                <option value="RF">Refund</option>
                <option value="OD">Order</option>
              </select>
            </div>
            <div className="relative max-w-screen-lg w-full overflow-x-auto shadow-md sm:rounded-lg mb-12">
              <table className="max-w-screen-lg h-full w-full text-sm text-left text-gray-900 dark:text-gray-400 text-center">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Transaction Number</th>
                    <th className="px-6 py-3">Trx Date</th>
                    <th className="px-6 py-3">Debit</th>
                    <th className="px-6 py-3">Credit</th>
                    <th className="px-6 py-3">Note</th>
                    <th className="px-6 py-3">Order Number</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Transaction Ref</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">User</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.data?.map((item: any, index: number) => (
                    <tr key={index} className="text-center">
                      <td className="px-6 py-3">{item.trpaCodeNumber}</td>
                      <td className="px-6 py-3">
                        {moment(item.trpaModifiedDate).format(
                          'DD/MM/YYYY HH:mm'
                        )}
                      </td>
                      <td className="px-6 py-3">{item.trpaDebit}</td>
                      <td className="px-6 py-3">{item.trpaCredit}</td>
                      <td className="px-6 py-3">{item.trpaNote}</td>
                      <td className="px-6 py-3">{item.trpaOrderNumber}</td>
                      <td className="px-6 py-3">{item.trpaSourceId}</td>
                      <td className="px-6 py-3">{item.trpaTargetId}</td>
                      <td className="px-6 py-3">{'-'}</td>
                      <td className="px-6 py-3">{item.trpaType}</td>
                      <td className="px-6 py-3">
                        {item.users
                          ? item.users.userFirstName +
                            ' ' +
                            item.users.userLastName
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {transactions && transactions.totalPages && (
              <Pagination
                totalPages={transactions.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
