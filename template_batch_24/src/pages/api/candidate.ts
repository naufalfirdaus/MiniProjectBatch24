import axios from "axios";
import config from "@/config/config";

const GetByStatus = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/filterby/status`, {params: {status: payload}}); 
    return result.data;
  } catch (error) {
    return error;
  }
};


const UpdateStatus = async (status: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/filterby/status`, {params: {status: status}}); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getPassedCandidate = async (program: number) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/forbootcamp`, {params: {program: program}})
    return result.data;
  } catch (error) {
    return error;
  }
}

const getCandidateByProgram = async (program: number) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/program`, {params: {id: program}})
    return result.data;
  } catch (error) {
    return error;
  }
}

export default { GetByStatus, UpdateStatus, getPassedCandidate, getCandidateByProgram };