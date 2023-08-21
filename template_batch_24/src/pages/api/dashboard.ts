import axios from "axios";
import config from "@/config/config";

const getDashboardSummary = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/dashboard/summary`); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getDashboardChart = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/dashboard/chart`); 
    return result.data;
  } catch (error) {
    return error;
  }
};

export default { getDashboardSummary, getDashboardChart };