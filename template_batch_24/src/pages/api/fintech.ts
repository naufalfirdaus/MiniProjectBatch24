import axios from 'axios';
import config from '../config/config';

const getData = async (page: any = 1, searchTerm: any = '') => {
  try {
    const result = await axios.get(
      `${config.domain}/api/fintech/fintech/search`,
      {
        params: { page, name: searchTerm },
      }
    );
    return result.data;
  } catch (error) {
    return error;
  }
};

const getSelect = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/fintech/fintech/all`);
    return result.data;
  } catch (error) {
    return error;
  }
};

const createFintech = async (payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/fintech/fintech/create`,
      payload
    );
    return result.data;
  } catch (error) {
    return await error;
  }
};

const updateFintech = async (payload: any, id: string) => {
  try {
    const result = axios.put(
      `${config.domain}/api/fintech/fintech/update/${id}`,
      payload
    );
    return result;
  } catch (error) {
    return await error;
  }
};

const exportFunc = {
  getData,
  getSelect,
  createFintech,
  updateFintech,
};

export default exportFunc;
