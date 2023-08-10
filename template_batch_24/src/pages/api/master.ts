import axios from "axios";
import { domain } from "../config/config";

const GetAddress = async () => {
  try {
    const result = await axios.get(`${domain}/master/address`);

    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetJobType = async () => {
  try {
    const result = await axios.get(`${domain}/master/jobtype`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetIndustry = async () => {
  try {
    const result = await axios.get(`${domain}/master/industry`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetEducation = async () => {
  try {
    const result = await axios.get(`${domain}/master/education`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetAddress,
  GetJobType,
  GetIndustry,
  GetEducation,
};
