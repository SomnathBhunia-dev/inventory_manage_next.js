// components/ItemForm.js
"use client"
import React, { useEffect, useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const ItemForm = () => {
    const { handlePayment, inventory, listenToCustomerPayments } = useInventory();
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
    };

    useEffect(() => {
        const unsubscribe = listenToCustomerPayments();
        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);
    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
                    Product Name
                </label>
                <input
                    id="product"
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Product Name"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Delivered">Delivered</option>
                    <option value="Ordered">Ordered</option>
                    <option value="Received">Received</option>
                </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Add Item
            </button>
        </form>
    );
};

export default ItemForm;
