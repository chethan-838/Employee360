import axios from "axios";

const API = axios.create({
    baseURL:"https://employee360.onrender.com/api/"
});

export default API;
