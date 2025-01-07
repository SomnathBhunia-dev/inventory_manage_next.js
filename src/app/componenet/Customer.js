"use client"
import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const CustomerAdd = ({ onClose }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const { handleAddCustomer, } = useInventory();

    const storeCustomer = (e) => {
        e.preventDefault();
        handleAddCustomer({
            name: name,
            contact: number
        });
        onClose()
    };
    return (
        <form onSubmit={storeCustomer} className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hastar Jee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact No.
                </label>
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
            </div>
            <button
                type='submit'
                className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
            >
                Add
            </button>
        </form>
    )
}

export default CustomerAdd;