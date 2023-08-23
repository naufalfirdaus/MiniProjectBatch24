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

const UpdateStatus = async (payload: any) => {
  try {
    const result = await axios.put(`${config.domain}/api/bootcamp/candidate/switchstatus?userentity=${payload.userId}`, payload.data); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getPassedCandidate = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/forbootcamp`, {params: {program: payload.program, month:payload.month, year:payload.year, page: payload.page, limit:payload.limit}})
    return result.data;
  } catch (error) {
    return error;
  }
}

const getCandidateByProgram = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/candidate/program`, {params: {programId: payload.program, batchId: payload.batch}})
    return result.data;
  } catch (error) {
    return error;
  }
}

export default { getByStatusAndDate, UpdateStatus, getPassedCandidate, getCandidateByProgram };