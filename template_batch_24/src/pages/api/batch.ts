import axios from "axios";
import config from "@/config/config";

const getAll = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/paging`, {params: {page: payload.page, limit:payload.limit}}); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getById = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/batchid`, {params: {id: payload}}); 
    return result.data;
  } catch (error) {
    return error;
  }
};

const getByNameAndStatus = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/search`, {params: {batch: payload.batch, status: payload.status, page: payload.page, limit:payload.limit}}); 
    return result.data;
  } catch (error) {
    return error;
  }
}

const createBatch = async (payload: any) => {
  try {
    const result = await axios.post(`${config.domain}/api/bootcamp/batch/create`, payload)
    return result;
  } catch (error) {
    return error;
  }
}

const updateBatch = async (payload: any) => {
  try {
    const result = await axios.put(`${config.domain}/api/bootcamp/batch/update/batchid?id=${payload.id}`, payload.data);
    return result;
  } catch (error) {
    return error;
  }
}

const getTechnology = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/technology`)
    return result.data;
  } catch (error) {
    return error;
  }
}

const getInstructors = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/instructor`)
    return result.data;
  } catch (error) {
    return error;
  }
}

const getBatchEvaluation = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/evaluation/view`, { params: { batchid : payload } })
    return result.data;
  } catch (error) {
    return error;
  }
}

const getBatchTraineeEvaluation = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/bootcamp/batch/evaluation/scoring`, { params: { userentityid : payload } })
    return result.data;
  } catch (error) {
    return error;
  }
}

const updateTraineeEvaluationScore = async (payload: any) => {
  try {
    const result = await axios.put(`${config.domain}/api/bootcamp/batch/evaluation/scoring/update?userentityid=${payload.userId}`, payload.data);
    return result.data;
  } catch (error) {
    return error;
  }
}

const updateBatchStatus = async (payload: any) => {
  try {
    const result = await axios.put(`${config.domain}/api/bootcamp/batch/update/statusbatch?id=${payload.batchId}&status=${payload.status}`);
    return result.data;
  } catch (error) {
    return error;
  }
}

export default { getAll, getByNameAndStatus, createBatch, getTechnology, getInstructors, getById, updateBatch, getBatchEvaluation, getBatchTraineeEvaluation, updateTraineeEvaluationScore, updateBatchStatus };