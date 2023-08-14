import axios from "axios";
import config from "@/config/config";

const getSection = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/curriculum/section/get/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteSection = async (payload: any) => {
    const {sectProgEntityId, sectId} = payload
    try {
        await axios.delete(`${config.domain}/curriculum/section/delete/${sectProgEntityId}/${sectId}`);
        return payload;
    } catch (error) {
        return error;
    }
}

const createSection = async (data: any) => {
    const sectProgEntityId = data.id;
    const payload = data.data
    try {
        const result = await axios.post(`${config.domain}/curriculum/section/create/${sectProgEntityId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const updateSection = async (data: any) => {
    const sectId = data.sectId;
<<<<<<< HEAD
    const sectProgEntityId = data.sectProgEntityId;
    const payload = data.data;
    // console.log(`TES DOANGGGGG ${data}`)
    try {
        
=======
    const sectProgEntityId = data.progEntityId;
    const payload = data.data;
    
    try {
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
        const result = await axios.put(`${config.domain}/curriculum/section/update/${sectProgEntityId}/${sectId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}
export default {
    getSection,
    deleteSection,
    createSection,
<<<<<<< HEAD
    // getCategory,
=======
>>>>>>> 83cd4321747a6df064a464fc4a892b8a3e8af8dc
    updateSection,
}