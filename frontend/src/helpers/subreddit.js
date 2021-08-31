import { base_url } from '../config.json';
import axios from 'axios';


export const getSubReddit = async (subreddit) => {
    let formData = {"subreddit":subreddit}

    const response = await axios({
        url: `${base_url}/search/test`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: formData
    })
    return response.data;
}
