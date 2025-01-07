// components/ItemForm.js
"use client"
import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { MdLocalShipping, MdCheckCircle } from "react-icons/md";

const ItemForm = ({ onClose, updateItem = {} }) => {
  const { handlePayment } = useInventory();
  const [product, setProduct] = useState(updateItem.product || "");
  const [price, setPrice] = useState(updateItem.amount || "");
  const [status, setStatus] = useState(updateItem.status || "");
  const statuses = [
    {
      id: "ordered",
      label: "Ordered",
      value: "Ordered",
      icon: <MdLocalShipping className="text-blue-600" size={20} />
    },
    {
      id: "delivered",
      label: "Delivered",
      value: "Delivered",
      icon: <MdCheckCircle className="text-green-600" size={20} />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment({
      ...(updateItem?.id ? { id: updateItem.id } : {}),
      product,
      amount: Number(price),
      status,
      remaining: Number(price),
      type: 'debit',
      style: {
        bgStyle: 'bg-red-200',
        textStyle: 'text-red-700'
      }
    });
    setProduct('');
    setPrice('');
    onClose()
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md text-gray-700 rounded-lg max-w-md mx-auto">
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Status
        </label>
        <div className="flex flex-wrap items-center gap-4">
          {statuses.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="radio"
                id={item.id}
                value={item.value}
                checked={status === item.value}
                onChange={() => setStatus(item.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
                aria-label={`Select ${item.label} status`}
              />
              <label
                htmlFor={item.id}
                className="ml-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                {item.label}
                {item.icon}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!status
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        disabled={!status}
      >
        Submit Sale
      </button>
    </form>

  );
};

export default ItemForm;
