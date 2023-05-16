import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '34852218-682624240d6257474a10d77b2'

export const getSearchGallery = async (query, page) => { 
    const searchParams = new URLSearchParams({
        page: page,
        q: query,
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12,
    });   
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
    
}