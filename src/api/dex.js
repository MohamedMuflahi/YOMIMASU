import axios from "axios";

export default axios.create({
    baseURL: 'https://api.mangadex.org',
    headers: {'Content-Type': 'application/json'}
});