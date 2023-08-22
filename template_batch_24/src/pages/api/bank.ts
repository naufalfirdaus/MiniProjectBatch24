import axios from 'axios';
import config from '../config/config';

const getData = async (page: any = 1, searchTerm: any = ''): Promise<any> => {
  try {
    const result = await axios.get(`${config.domain}/api/fintech/bank/search`, {
      params: { page, name: searchTerm },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

const getSelect = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/fintech/bank/all`);
    return result.data;
  } catch (error) {
    return error;
  }
};

const createBank = async (payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/fintech/bank/create`,
      payload
    );
    return result.data;
  } catch (error) {
    return await error;
  }
};

const updateBank = async (payload: any, id: string) => {
  try {
    const result = axios.put(
      `${config.domain}/api/fintech/bank/update/${id}`,
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
  createBank,
  updateBank,
};

export default exportFunc;
