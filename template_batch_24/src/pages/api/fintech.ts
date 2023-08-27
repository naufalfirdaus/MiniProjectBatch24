/* eslint-disable import/no-anonymous-default-export */
import config from '@/config/config';
import axios from 'axios';

const getFintech = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/fintech/`, payload);
    return result;
  } catch (error) {
    return error;
  }
};
const verifyFintech = async (accountNumber: any) => {
  try {
    // const result = await axios.post(
    //   `${config.domain}/api/fintech/verify?accountNumber=${accountNumber}`
    // );
    const result = await axios({
      url: `${config.domain}/api/fintech/verify?accountNumber=${accountNumber}`,
      method: 'POST',
    });
    return result;
  } catch (error) {
    return error;
  }
};
const getFintechByAccountNumber = async (accountNumber: any) => {
  try {
    const result = await axios.get(
      `${config.domain}/api/fintech/accounts?accountNumber=${accountNumber}`,
      accountNumber
    );
    return result;
  } catch (error) {
    return error;
  }
};

export default { getFintech, verifyFintech, getFintechByAccountNumber };
