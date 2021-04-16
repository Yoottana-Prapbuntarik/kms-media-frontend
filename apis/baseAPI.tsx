import axios from 'axios'
import join from 'url-join'
import { env } from "../config-project.json";

const contentTypeJson = { 'content-type': 'application/json' }
export const service = axios.create({
    baseURL: env.BASE_API,
    headers: contentTypeJson
})


axios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access-token');
    const isHasToken = token !== "" && token !== null
    if (isHasToken) {
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: "Token " + token
        }
    }
    config.url = join(env.BASE_API, config.url)

    return config
})


export const serviceToken = axios;