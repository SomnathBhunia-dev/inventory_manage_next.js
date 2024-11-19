import React, { useState } from 'react';

function Payment({ onAddPayment }) {
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    // Create payment object
    const newPayment = {
      amount: paymentAmount,
    };

    // Call onAddPayment callback to add payment
    onAddPayment(newPayment);

    // Clear payment amount
    setPaymentAmount(0);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Payment Amount:</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Payment
        </button>
      </form>
{/* 
          {{paymentAmount}?.map((i) => {
              <div>{i.amount}</div>
          })} */}
    </div>
  );
}

export default Payment;