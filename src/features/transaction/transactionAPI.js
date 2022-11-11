import axiosInstance from "../../utils/axiosInstance";

export const getTransactions = async () => {
    const response = await axiosInstance.get('/transactions');
    return response.data;
};

export const addTransaction = async (data) => {
    const response = await axiosInstance.post('/transactions', data);
    return response.data;
}

export const editTransaction = async (id, data) => {
    const response = await axiosInstance.put(`/transactions/${id}`, data);
    return response.data;
}

export const deleteTransaction = async (id, data) => {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
}