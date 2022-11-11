import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        transaction: transactionReducer,
    },
});
