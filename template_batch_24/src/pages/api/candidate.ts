import axios from "axios";
import config from "@/config/config";

const getByStatusAndDate = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/filterby`, {params: {status: payload.status, month: payload.month, year: payload.year}}); 
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

const getPassedCandidate = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/forbootcamp`, {params: {program: payload.program, month:payload.month, year:payload.year}})
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

export default { getByStatusAndDate, UpdateStatus, getPassedCandidate, getCandidateByProgram };