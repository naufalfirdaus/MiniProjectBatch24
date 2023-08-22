import axios from "axios";
import { domain } from "../config/config";

const GetUserApply = async (userId: number) => {
  try {
    const result = await axios.get(`${domain}/users/${userId}/apply`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetUserResume = async (userId: number) => {
  try {
    const result = await axios.get(`${domain}/users/${userId}/resume`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetUserApply,
  GetUserResume,
};
