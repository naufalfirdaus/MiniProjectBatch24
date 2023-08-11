import axios from "axios";
import { domain } from "../config/config";

const GetUser = async (userId: number) => {
  try {
    const result = await axios.get(`${domain}/users/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetUserResume = async (userId: number) => {
  try {
    const result = await axios.get(`${domain}/users/${userId}/resume`);
    console.log(result);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetUser,
  GetUserResume,
};
