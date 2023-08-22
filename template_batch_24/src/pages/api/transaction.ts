import axios from 'axios';
import config from '../config/config';
import { getCookie } from 'cookies-next';

const getAllTransactions = async (payload: any) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('access_token')}` }
        const result = await axios.post(`${config.domain}/api/fintech/transaction/view?accountId=${payload.accountid}&pageno=${payload.page}&pagesize=${payload.size}`, {
            paymentType: payload.paymentType,
        });

        return result;
    } catch (error) {
        return error;
    }
}

const topup = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/api/fintech/topup`,
            {
                sourceCode: payload.source,
                targetCode: payload.target,
                amount: payload.amount
            });

        return result;
    } catch (error) {
        return error;
    }
}

const allFunction = {
    getAllTransactions,
    topup
}

export default allFunction
