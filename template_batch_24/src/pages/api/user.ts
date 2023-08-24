import axios from "axios";
import config from "@/config/config";

const loginEmployee = async (payload: any) => {
  try {
    const result = await axios.post(`${config.domain}/api/signinemployee`, payload); 
    return result.data;
  } catch (error) {
    return error;
  }
};

export default { loginEmployee };