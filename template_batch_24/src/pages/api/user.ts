import axios from "axios";
import { domain } from "../config/config";

const GetUserApply = async (token: string) => {
  try {
    const result = await axios.get(`${domain}/users/apply`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetUserResume = async (token: string) => {
  try {
    const result = await axios.get(`${domain}/users/resume`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetUserApply,
  GetUserResume,
};
