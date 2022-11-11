import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransaction, deleteTransaction, editTransaction, getTransactions} from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    errorMsg: ''
}

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    return await getTransactions();
});

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    return await addTransaction(data);
});

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({id, data}) => {
    return await editTransaction(id, data);
});

export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id) => {
    return await deleteTransaction(id);
});

// create Slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
                state.isError = false;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.transactions = [];
                state.isError = true;
                state.errorMsg = action.error?.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions.push(action.payload);
                state.isError = false;
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.transactions = [];
                state.isError = true;
                state.errorMsg = action.error?.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                const indexToUpdate = state.transactions
                    .findIndex(transaction => transaction.id === transaction.payload.id)
                state.transactions[indexToUpdate] = action.payload;
                state.isError = false;
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.transactions = [];
                state.isError = true;
                state.errorMsg = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = state.transactions.filter((t) => t.id !== action.payload);
                state.isError = false;
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.transactions = [];
                state.isError = true;
                state.errorMsg = action.error?.message;
            })
    }
})

export default transactionSlice.reducer;