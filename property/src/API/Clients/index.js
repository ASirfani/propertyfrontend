import { Clients } from '../Instance';
import { getToken } from '../token-service/token';

const getClients = async () => {
    try {
        const response = await Clients.get('', {
            headers: {
                Authorization: getToken(),
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const createClient = async (client) => {
    try {
        const response = await Clients.post('/save', client);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const getClientById = async (clientId) => {
    try {
        const response = await Clients.get(`/${clientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const updateClient = async (clientId, client) => {
    try {
        const response = await Clients.put(`/${clientId}`, client);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteClient = async (clientId) => {
    try {
        const response = await Clients.delete(`/${clientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export { getClients, createClient, getClientById, updateClient, deleteClient };
