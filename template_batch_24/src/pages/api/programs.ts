import axios from "axios";
import config from "@/config/config";

// const getProgram = async (payload: any) => {
const getProgram = async (payload: any) => {
  try {
    const { page, search, orderBy } = payload;
    // if (!page) {
    //   page = 1;
    // }
    // console.log('ini adalah page di api: ', page);
    // console.log('ini adalah search di api: ', search);
    // console.log('ini adalah orderBy di api: ', orderBy);

    const result = await axios.get(`${config.domain}/programs/search`, {
      params: { page: page, search: search, orderBy: orderBy },
    });
    // const result = await axios.get(`${config.domain}/programs/search`);
    return result;
  } catch (error) {
    return error;
  }
};

const getDetail = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/programs/view`, {
      params: { progEntityId: payload },
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getDashboard = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/programs/dashboard`, {
      params: { userEntityId: payload },
    });
    return result;
  } catch (error) {
    return error;
  }
};

const applyRegular = async (userId: string, progId: string, payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/programs/apply-regular`,
      payload,
      {
        params: { userEntityId: userId, progEntityId: progId },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

const getProgress = async (userId: any, progId: any) => {
  try {
    const result = await axios.get(
      `${config.domain}/programs/apply-progress`,
      {
        params: { userEntityId: userId, progEntityId: progId },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export default {
  getProgram,
  getDetail,
  getDashboard,
  applyRegular,
  getProgress
};
