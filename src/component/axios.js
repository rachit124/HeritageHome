import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/heritage-homes-2ff7f/us-central1/api' //the api (cloud function) url
})

export default instance;