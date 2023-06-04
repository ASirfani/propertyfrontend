import axios from 'axios';
const url = 'http://localhost:1111/'

const Admin = axios.create({
    baseURL: `${url}`,
});
const Supplier = axios.create({
    baseURL: `${url}suppliers`,
});

const Clients = axios.create({
    baseURL: `${url}clients`
})

export { Clients ,Supplier };