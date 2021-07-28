import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:81/rest-api-php/public_html/api"
});

export default api;