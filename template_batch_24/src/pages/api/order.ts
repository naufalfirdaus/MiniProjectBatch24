/* eslint-disable import/no-anonymous-default-export */
import config from '@/config/config';
import axios, { HttpStatusCode } from 'axios';

const getSumOrder = async (poNumber: any) => {
  try {
    const result = await axios.get(
      `${config.domain}/api/sales/summaryOrder?orderNumber=${poNumber}`,
      poNumber
    );
    return result;
  } catch (error) {
    return error;
  }
};

const addOrder = async (data: any) => {
  try {
    const response = await axios.post(
      `${config.domain}/api/sales/createOrder/?user=${data}`
    );
    localStorage.setItem('cart', JSON.stringify(response.data));

    if (response.status === HttpStatusCode.Created) {
      console.log(response.data);
      return response.data;
    } else if (response.status === HttpStatusCode.BadRequest) {
      return 'err';
    }
  } catch (error) {
    return error;
  }
};

const getOrder = async () => {
  try {
    const response = await axios.get(`${config.domain}/api/sales/sum`);
    return response;
  } catch (error) {
    return error;
  }
};
export default { getSumOrder, addOrder, getOrder };
