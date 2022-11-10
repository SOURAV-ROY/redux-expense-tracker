import React from 'react';
import EditImage from "../assets/images/edit.svg";
import DeleteImage from "../assets/images/delete.svg";

function TransactionItem() {
    return (
        <li className="transaction income">
            <p>Earned this month</p>
            <div className="right">
                <p>৳ 100</p>
                <button className="link">
                    <img
                        className="icon"
                        src={EditImage}
                        alt='Edit'/>
                </button>
                <button className="link">
                    <img
                        className="icon"
                        src={DeleteImage}
                        alt='Delete'/>
                </button>
            </div>
        </li>
    );
}

export default TransactionItem;