import axios from "axios";
import config from "@/config/config";

const GetEmployee = async (payload: any) => {
    try {
        const { pageno = 1, pagesize = 10} = payload;
        const result = await axios.get(`${config.domain}/hr/employee/paging?pageno=${pageno}&pagesize=${pagesize}`);
        return result;
    } catch (error) {
        return error;
    }
}

const GetJobRole = async () => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/joro`);
        return result;
    } catch (error) {
        return error;
    }
}

const GetDepartment = async () => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/dept`);
        return result;
    } catch (error) {
        return error;
    }
}

const SearchEmployee = async (payload: any) => {
    try {
        const { pageno = 1, pagesize = 4, name = '', status = ''} = payload;
        const result = await axios.get(`${config.domain}/hr/employee/search?pageno=${pageno}&pagesize=${pagesize}&name=${name}&status=${status}`);
        return result;
    } catch (error) {
        return error;
    }
}

const CreateEmployee = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/create`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const findOneEmployee = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const getSalary = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/salaryhistory/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const getDepartmentHistory = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/hr/employee/depthistory/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    GetEmployee,
    GetJobRole,
    GetDepartment,
    SearchEmployee,
    CreateEmployee,
    findOneEmployee, 
    getSalary, 
    getDepartmentHistory
};