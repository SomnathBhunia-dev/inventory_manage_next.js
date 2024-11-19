// lib/firebaseUserData.js
import { collection, doc, setDoc, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

// Add Shop Function
export const addShop = async (userId, shopName) => {
  try {
    const shopRef = collection(firestore, `users/${userId}/shops`);
    await addDoc(shopRef, {
      name: shopName,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding shop:', error);
  }
};

// Add Customer Function
export const addCustomer = async (userId, shopId, customerName) => {
  try {
    const customerRef = collection(firestore, `users/${userId}/shops/${shopId}/customers`);
    await addDoc(customerRef, {
      name: customerName,
    });
  } catch (error) {
    console.error('Error adding customer:', error);
  }
};

// Add Sale Function
export const addSale = async (userId, shopId, customerId, amount) => {
  try {
    const salesRef = collection(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/sales`);
    await addDoc(salesRef, {
      amount,
      date: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding sale:', error);
  }
};

// Add Payment Function
export const addPayment = async (userId, shopId, customerId, amount) => {
  try {
    const paymentsRef = collection(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/payments`);
    await addDoc(paymentsRef, {
      ...amount,
      date: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding payment:', error);
  }
};

export const updatePayments = async (userId, shopId, customerId, paymentsList) => {

  try {
    // Create an array of promises, one for each update operation
    const updatePromises = paymentsList.map(({ id, status, remaining }) => {
      const paymentRef = doc(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/payments`, id);
      return updateDoc(paymentRef, {
        'status': status,
        'remaining': remaining,
      });
    });

    // Execute all updates in parallel
    await Promise.all(updatePromises);
    console.log('All payments updated successfully');
  } catch (error) {
    console.error('Error updating payments:', error);
  }
};