// components/ItemForm.js
"use client"
import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const ItemForm = ({onClose}) => {
    const { handlePayment } = useInventory();
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('Delivered');

    // console.log(inventory)

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePayment({
            product,
            sale: Number(price),
            status,
            remaining: Number(price),
            type: 'debit'
        });
        setProduct('');
        setPrice('');
        onClose()
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Amount
                </label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    id="product"
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Product Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                    <option value="ordered">Ordered</option>
                    <option value="delivered">Delivered</option>
                    <option value="paid">Paid</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
                Submit Sale
            </button>
        </form>

    );
};

export default ItemForm;
