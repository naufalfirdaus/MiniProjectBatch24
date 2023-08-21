import axios from "axios";
import config from "@/config/config";

const GetEmployee = async (payload: any) => {
    try {
        const { pageno = 1, pagesize = 4} = payload;
        const result = await axios.get(`${config.domain}/hr/employee/paging?pageno=${pageno}&pagesize=${pagesize}`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const searchEmployee = async (payload: any) => {
    try {
        const { pageno = 1, pagesize = 10, name = '', status = ''} = payload;
        const result = await axios.get(`${config.domain}/hr/employee/paging?pageno=${pageno}&pagesize=${pagesize}&name=${name}&status=${status}`);
        return result.data;
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
    searchEmployee, 
    findOneEmployee, 
    getSalary, 
    getDepartmentHistory
};