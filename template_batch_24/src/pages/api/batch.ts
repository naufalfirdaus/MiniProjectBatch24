import axios from "axios";
import config from "@/config/config";

const getAll = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/paging`, {params: {page: payload.page, limit:payload.limit}}); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getByNameAndStatus = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/search`, {params: {batch: payload.batch, status: payload.status, page: payload.page, limit:payload.limit}}); 
    return result.data;
  } catch (error) {
    return error;
  }
}

export default { getAll, getByNameAndStatus };