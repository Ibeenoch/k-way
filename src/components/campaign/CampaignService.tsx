import axios from 'axios';
const API = 'https://infinion-test-int-test.azurewebsites.net/api/Campaign';

export const getCampaigns = async() => {
    try {
        const res = await axios.get(`${API}`);
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getACampaignById = async(id: number) => {
    try {
        const res = await axios.get(`${API}/${id}`);
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteACampaignById = async(id: number) => {
    try {
        const res = await axios.delete(`${API}/${id}`);
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createACampaign = async(campaign: any) => {
    try {
        const res = await axios.post(`${API}`, campaign, { headers: {
                "Content-Type": 'application/json'
            }});
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateACampaignById = async(id: number, campaign: any) => {
    try {
        const res = await axios.put(`${API}/${id}`, campaign, { headers: {
                "Content-Type": 'application/json'
            }});
        const { data } = res;
        return data;
    } catch (error) {
        console.log(error);
    }
}