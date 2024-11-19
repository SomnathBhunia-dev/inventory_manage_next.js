// components/Payment.js
"use client"
import React, { useEffect, useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const Payment = () => {
    const { handlePayment, listenToCustomerPayments } = useInventory();
    const [amount, setAmount] = useState('');
    const handlePaymentStore = (e) => {
        e.preventDefault();
        handlePayment({
            payment: Number(amount),
            status: 'Received',
            remaining: Number(amount),
            type: 'credit'
        });
        setAmount('');
    };
    useEffect(() => {
          const unsubscribe = listenToCustomerPayments();
          return () => unsubscribe(); // Cleanup listener on component unmount
      }, []);
    
    return (
        <form onSubmit={handlePaymentStore} className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Payment Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Payment Amount"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>
            <button
                type='submit'
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
                Add Payment
            </button>
        </form>
    );
}


export default Payment;
