import api from "./api";


interface CreateAdvertisementData {
    title: string;
    description: string;
    category: string;
    item_type: string;
    localization: string;
    price: number;
    email: string;
    phone: string;
    user_id: string;
}

export function apiAdvertisement(){

    async function createAdvertisement(bodyData: CreateAdvertisementData) {
        return await api.post('/advertisements', bodyData)
    }

    return {
        createAdvertisement
    }

}