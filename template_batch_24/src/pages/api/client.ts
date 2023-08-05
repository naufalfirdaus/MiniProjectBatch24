import axios from "axios";
import { domain } from "../config/config";

const GetClients = async () => {
  try {
    const result = await axios.get(`${domain}/client`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetClients,
};
