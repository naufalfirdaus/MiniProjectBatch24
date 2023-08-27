import config from '@/config/config';
import axios from 'axios';

const getData = async (data: any) => {
  try {
    const result = await axios.get(
      `${config.domain}/api/programs/sales/cart?userentityid=${data}`,
      data
    );
    return result;
  } catch (error) {
    return error;
  }
};

const remove = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/programs/sales/cart/${id}`
    );
    if (result.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    return error;
  }
};

const addDiscount = async ({ disc }: any) => {
  try {
    const response = await axios.post(
      `${config.domain}/api/programs/sales/cart/discount`,
      { disc }
    );
    if (response.status === 201) {
      window.location.reload();
      return response;
    }
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData, remove, addDiscount };
