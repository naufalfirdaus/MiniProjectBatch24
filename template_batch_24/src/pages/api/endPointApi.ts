import axios from "axios";
import config from "../config/config";

const userSignUp = async (payload: any) => {
  try {
    const result = await axios.post(`${config.domain}/api/signup`, payload);
    return result;
  } catch (error) {
    return await error;
  }
};

const getAllUser = async () => {
  try {
    const result = await axios.get(`${config.domain}/api`);
    return result;
  } catch (error) {
    return await error;
  }
};

const getOneUser = async (id: any) => {
  try {
    const result = await axios.get(`${config.domain}/api/${id}`);
    return result;
  } catch (error) {
    return await error;
  }
};

const employeeSignUp = async (payload: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/signupEmployee`,
      payload
    );
    return result;
  } catch (error) {
    return await error;
  }
};

const getAllEmployee = async () => {
  try {
    const result = await axios.get(`${config.domain}/api/users/employees`);
    return result;
  } catch (error) {
    return await error;
  }
};

const userLogin = async (payload: any) => {
  try {
    const result = await axios.post(`${config.domain}/api/signin`, payload);
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const changePassword = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/password/${id}`,
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
      `${config.domain}/api/users/profile/email/${id}`,
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
      `${config.domain}/api/users/profile/email/${id}`,
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
      `${config.domain}/api/users/profile/email/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addPhone = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/users/profile/phone/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updatePhone = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/phone/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deletePhone = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/users/profile/phone/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addAddress = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/users/profile/address/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updateAddress = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/address/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deleteAddress = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/users/profile/address/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addEducation = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/users/profile/education/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updateEducation = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/education/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deleteEducation = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/users/profile/education/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addSkill = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/users/profile/skill/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updateSkill = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/skill/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deleteSkill = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/users/profile/skill/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const addExperience = async (payload: any, id: any) => {
  try {
    const result = await axios.post(
      `${config.domain}/api/users/profile/experience/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const updateExperience = async (payload: any, id: any) => {
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/experience/${id}`,
      payload
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const deleteExperience = async (id: any) => {
  try {
    const result = await axios.delete(
      `${config.domain}/api/users/profile/experience/${id}`
    );
    return result;
  } catch (error: any) {
    return error.response;
  }
};

const editProfile = async (payload: any) => {
  const formData = new FormData();
  formData.append("id", payload.id);
  formData.append("username", payload.username);
  formData.append("firstName", payload.firstName);
  formData.append("lastName", payload.lastName);
  formData.append("birthdate", payload.birthdate);
  formData.append("file", payload.file); // Menambahkan file ke FormData

  console.log(formData);
  try {
    const result = await axios.put(
      `${config.domain}/api/users/profile/edit/${payload.id}`,
      formData
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
  updatePhone,
  deletePhone,
  addAddress,
  updateAddress,
  deleteAddress,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addExperience,
  updateExperience,
  deleteExperience,
  editProfile,
};
