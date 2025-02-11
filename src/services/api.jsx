import axios from "axios";

const baseUrl = 'https://dummyjson.com/products';

export const getProducts = async (limit = 10, skip = 0) => {
    try {
        const response = await axios.get(`${baseUrl}?limit=${limit}&skip=${skip}`);
        return response.data.products; 
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};