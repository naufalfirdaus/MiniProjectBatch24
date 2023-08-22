import React from 'react';
import { useRouter } from 'next/router';
import TransactionList from '@/component/payment/transaction-list';
import Accounts from '@/component/payment/accounts';
const AccountsPage = () => {
    const router = useRouter();
    const { query } = router;

    // Extract accountId from query parameters
    const accountId = query.accountId;

    return (
        <div>
            {accountId ? <TransactionList /> : <Accounts />}
        </div>
    );
};

export default AccountsPage;
