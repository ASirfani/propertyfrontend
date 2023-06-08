import axios from 'axios';
import { getToken } from './token-service/token';
const url = 'http://localhost:1111/'

axios.interceptors.request.use((req)=>{
    req.headers={
        Authorization: getToken(),
    }
    return req;
});

const Supplier = axios.create({
    baseURL: `${url}suppliers`,
});

const Clients = axios.create({
    baseURL: `${url}clients`
})

export { Clients ,Supplier };