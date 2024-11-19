import React, { useState } from 'react';

function AdjustPayments({ selectedItems, payments, onAdjustPayments }) {
  const [adjustedPayments, setAdjustedPayments] = useState({});

  const handleAdjustPayment = (itemId, paymentId, amount) => {
    setAdjustedPayments((prevAdjustedPayments) => ({
      ...prevAdjustedPayments,
      [itemId]: {
        ...prevAdjustedPayments[itemId],
        [paymentId]: amount,
      },
    }));
  };

  const handleSubmit = () => {
    // Call onAdjustPayments callback to adjust payments
    onAdjustPayments(selectedItems, adjustedPayments);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Adjust Payments</h2>
      <ul className="list-disc">
        {selectedItems.map((itemId) => {
          const itemPayments = payments[itemId] || {};
          return (
            <li key={itemId}>
              {itemId} - {itemPayments.totalDueAmount}
              <ul className="list-disc ml-4">
                {Object.entries(itemPayments).map(([paymentId, payment]) => (
                  <li key={paymentId}>
                    Payment {paymentId}: {payment.amount}
                    <input
                      type="number"
                      value={adjustedPayments[itemId]?.[paymentId] || 0}
                      onChange={(e) =>
                        handleAdjustPayment(itemId, paymentId, parseInt(e.target.value))
                      }
                    />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleSubmit}
      >
        Adjust Payments
      </button>
    </div>
  );
}

export default AdjustPayments;