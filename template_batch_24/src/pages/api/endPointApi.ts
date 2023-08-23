import axios from "axios";
import { domain } from "../config/config";

const userSignUp = async (payload: any) => {
  try {
    const result = await axios.post(`${domain}/signup`, payload);
    return result;
  } catch (error) {
    return await error;
  }
};

const getAllUser = async () => {
  try {
    const result = await axios.get(`${domain}`);
    return result;
  } catch (error) {
    return await error;
  }
};

const getOneUser = async (id: any) => {
  try {
    const result = await axios.get(`${domain}/${id}`);
    return result;
  } catch (error) {
    return await error;
  }
};

const employeeSignUp = async (payload: any) => {
  try {
    const result = await axios.post(
      `${domain}/signupEmployee`,
      payload
    );
    return result;
  } catch (error) {
    return await error;
  }
};

const getAllEmployee = async () => {
  try {
    const result = await axios.get(`${domain}/users/employees`);
    return result;
  } catch (error) {
    return await error;
  }
};

const userLogin = async (payload: any) => {
  try {
    const result = await axios.post(`${domain}/signin`, payload);
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const changePassword = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${domain}/users/profile/password/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addEmail = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${domain}/users/profile/email/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updateEmail = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${domain}/users/profile/email/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deleteEmail = async (id: any) => {
  try {
    const result = await axios.delete(
      `${domain}/users/profile/email/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addPhone = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${domain}/api/users/profile/phone/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

export default {
  userSignUp,
  getAllUser,
  employeeSignUp,
  getAllEmployee,
  userLogin,
  getOneUser,
  changePassword,
  addEmail,
  updateEmail,
  deleteEmail,
  addPhone,
};
