import { Supplier } from '../Instance'

const getSupplier = async () => {
    try {
        const response = await Supplier.get('');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};


const createSupplier = async (supplier) => {
    try {
        const response = await Supplier.post('/save', supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);

    }

}

const supplierLogin = async (supplier) => {
    try {
        const response = await Supplier.post('/login', supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);

    }

}



const getSupplierById = async(supplierId) => {
    try {
        const response = await Supplier.get(`/${supplierId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }

}


const updateSupplier = async (supplierId, supplier) => {
    try {
        const response = await Supplier.put(`/update/${supplierId}`, supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


const deleteSupplier = async (supplierId) => {
    try {
        const response = await Supplier.delete(`/delete/${supplierId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


export { getSupplier, createSupplier, updateSupplier, getSupplierById, deleteSupplier,supplierLogin };