import axios from "axios";
import config from "@/config/config";
import { getCookie } from "cookies-next";

const signin = async (params: any) => {
  try {
    const result = await axios.post(`${config.domain}/users/signin`, params);
    return result;
  } catch (error) {
    return error;
  }
};

const profile = async () => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${getCookie("access-token")}`,
  };
  try {
    const result = await axios.get(`${config.domain}/users/profile`);
    return result;
  } catch (error) {
    return error;
  }
};

const uploadImage = async (userId: string, payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/programs/apply-regular/upload-photo`,
      payload,
      {
        params: { userEntityId: userId },
      }
    );
    return result;
  } catch (error) {}
};

const getData = async (payload: any) => {
  try {
    const result = await axios.get(`${config.domain}/users/user-data`, {
      params: { userEntityId: payload },
    });
    return result;
  } catch (error) {}
};

export default {
  signin,
  profile,
  uploadImage,
  getData,
};
