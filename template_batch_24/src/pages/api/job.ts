import axios from "axios";
import { domain } from "../config/config";

const GetJobs = async () => {
  try {
    const result = await axios.get(`${domain}/jobs`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetJopoNumber = async () => {
  try {
    const result = await axios.get(`${domain}/jobs/generate/jopoNumber`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetJobCategory = async () => {
  try {
    const result = await axios.get(`${domain}/job-category`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const CreateJobPost = async (payload: any) => {
  try {
    const result = await axios.post(`${domain}/jobs/posting/create`, payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const GetJobPostById = async (id: string) => {
  try {
    const result = await axios.get(
      `${domain}/jobs/posting/view?jopoentityid=${id}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

const UpdateJobPost = async (id: string, payload: any) => {
  try {
    const result = await axios.put(`${domain}/jobs/posting/update/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export default {
  GetJobs,
  GetJopoNumber,
  GetJobCategory,
  CreateJobPost,
  GetJobPostById,
  UpdateJobPost,
};
