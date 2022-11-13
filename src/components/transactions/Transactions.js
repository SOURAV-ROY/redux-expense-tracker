import React, {useEffect} from 'react';
import TransactionItem from "./TransactionItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchTransactions} from "../../features/transaction/transactionSlice";

function Transactions() {
    const {transactions, isLoading, isError} = useSelector(state => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch])

    let content = '';
    if (isLoading) content = <p>Loading...!!</p>
    if (!isError && isError) content = <p>Some error occurred</p>
    if (!isLoading && !isError && transactions.length === 0) {
        content = <p>No Transaction Found</p>
    }
    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction}/>
        ))
    }
    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}

export default Transactions;