import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeTransaction, createTransaction} from '../features/transaction/transactionSlice';

function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const {isLoading, isError} = useSelector(state => state.transaction);
    const {editing} = useSelector(state => state.transaction) || {};

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }

    useEffect(() => {
        const {id, name, amount, type} = editing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [editing])

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: Number(amount)
        }));
        reset();
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing?.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }
        }));
        setEditMode(false);
        reset();
    }

    const cancelEditMode = () => {
        reset();
        setEditMode(false);
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={e => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type='submit'>
                    {editMode ? 'Update Transaction' : 'Add Transaction'}
                </button>

                {!isLoading && isError && <p>There was an error occurred</p>}

            </form>

            {editMode && <button className="btn cancel_edit" onClick={cancelEditMode}>Cancel Edit</button>}
        </div>
    );
}

export default Form;