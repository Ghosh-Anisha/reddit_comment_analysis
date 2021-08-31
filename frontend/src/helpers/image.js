import { base_url } from '../config.json';
import axios from 'axios';


export const uploadImage = async (subReddit) => {
    let formData = new FormData();

    formData.append("subReddit", subReddit);

    const response = await axios({
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    return response.data;
}
