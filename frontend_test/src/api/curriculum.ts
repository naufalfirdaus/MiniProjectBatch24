import { Result } from './../../node_modules/arg/index.d';
import axios from "axios";
import config from "@/config/config";

const getCurriculum = async (payload: any) => {
    try {
        const { page = 1, limit = 10} = payload;
        const result = await axios.get(`${config.domain}/curriculum/paging?page=${page}&limit=${limit}`);

        return result;
    } catch (error) {
        return error;
    }
}

const searchCurriculum = async (payload: any) => {
    try {
        const {page = 1, limit = 10, name = '', status = ''} = payload
        const result = await axios.get(`${config.domain}/curriculum/search?page=${page}&limit=${limit}&name=${name}&status=${status}`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteCurriculum = async (payload: any) => {
    try {
        await axios.delete(`${config.domain}/curriculum/delete/${payload}`);
        return payload;
    } catch (error) {
        return error;
    }
}

export default {
    getCurriculum,
    searchCurriculum,
    deleteCurriculum,
}