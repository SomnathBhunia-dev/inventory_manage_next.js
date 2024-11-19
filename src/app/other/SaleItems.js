import React, { useState } from 'react';

function SaleItems({ items, onSelectItem, onRemoveItem, payments }) {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log( payments.paymentList)

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleRemoveItem = (itemId) => {
    onRemoveItem(items, itemId);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Sale Items</h2>
      <ul className="list-disc">
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
            />
            {item.itemName} - {item.quantity} x {item.unitPrice} = {item.totalValue}
            <button
              className="ml-2 text-red-500"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
        {payments.paymentList?.map((i)=> (
            <li key={i.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(i.id)}
              onChange={() => handleSelectItem(i.id)}
            />
            {i.amount}
            <button
              className="ml-2 text-red-500"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SaleItems;