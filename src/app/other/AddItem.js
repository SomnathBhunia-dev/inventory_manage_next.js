import React, { useState } from 'react';

function AddItem({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!itemName || quantity <= 0 || unitPrice <= 0) {
      alert('Please fill in all required fields.');
      return;
    }
    const itemId = Date.now().toString();
    // Create item object
    const newItem = {
      itemId,
      itemName,
      quantity,
      unitPrice,
      totalValue: quantity * unitPrice,
    };

    // Call onAddItem callback to add item to inventory
    onAddItem(newItem);

    // Clear form fields
    setItemName('');
    setQuantity(0);
    setUnitPrice(0);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Item Name:</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity:</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Unit Price:</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;