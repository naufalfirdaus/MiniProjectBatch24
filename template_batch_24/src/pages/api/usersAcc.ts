import axios from 'axios';
import config from '../config/config';
import { getCookie } from 'cookies-next';

const getData = async (page: any = 1, accNumber?: any = '') => {
  try {
    const result = await axios.get(
      `${config.domain}/api/fintech/accounts/${accNumber}`,
      {
        params: { page },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

const getSelect = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/fintech/accounts/all`);
    return result.data;
  } catch (error) {
    return error;
  }
};

const createUsers = async (payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/fintech/accounts`,
      payload
    );
    return result.data;
  } catch (error) {
    return await error;
  }
};

const updateUsers = async (payload: any, id: string) => {
  try {
    const result = axios.put(
      `${config.domain}/api/fintech/accounts/${id}`,
      payload
    );
    return result;
  } catch (error) {
    return await error;
  }
};

const getUserAccountByAuthAndBankFintech = async (payload: any) => {
  try {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('access_token')}` }
    const result = await axios.get(`${config.domain}/api/fintech/account/search?bankFintech=${payload.bankFintech}`);



    return result;
  } catch (error) {
    return error;
  }
}

const exportFunc = {
  getData,
  createUsers,
  updateUsers,
  getSelect,
  getUserAccountByAuthAndBankFintech
};

export default exportFunc;
