// components/Payment.js
"use client"
import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const Payment = ({ onClose, updateItem = {} }) => {
    const { handlePayment } = useInventory();
    const [amount, setAmount] = useState(updateItem.amount || "");
    const [description, setDescription] = useState(updateItem.description || "");

    const handlePaymentStore = (e) => {
        e.preventDefault();
        handlePayment({
            ...(updateItem?.id ? { id: updateItem.id } : {}),
            amount: Number(amount),
            description,
            status: 'Received',
            remaining: Number(amount),
            type: 'credit',
            style: {
                bgStyle: 'bg-green-200',
                textStyle: 'text-green-700'
            }
        });
        setAmount('');
        onClose()
    };

    return (
        <form onSubmit={handlePaymentStore} className="mb-4 p-4 bg-white text-gray-700 shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Payment Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    list="payment-suggestions"
                />
            </div>
            <button
                type='submit'
                className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
            >
                Add Payment
            </button>
        </form>
    );
}


export default Payment;
