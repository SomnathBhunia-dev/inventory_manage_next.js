// lib/firebaseUserData.js
import { collection, doc, addDoc, serverTimestamp, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
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
export const addCustomer = async (userId, shopId, customerNameObj) => {
  try {
    const customerRef = collection(firestore, `users/${userId}/shops/${shopId}/customers`);

    // Query for customers with names starting with the base name
    const q = query(customerRef, where("name", ">=", customerNameObj.name.trim()), where("name", "<=", customerNameObj.name.trim() + "\uf8ff"));
    const querySnapshot = await getDocs(q);

    let finalName = customerNameObj.name.trim();

    // Generate a unique name by appending a number if matches are found
    if (!querySnapshot.empty) {
      const existingNames = querySnapshot.docs.map((doc) => doc.data().name);
      let suffix = 1;

      // Keep incrementing the suffix until a unique name is found
      while (existingNames.includes(`${customerNameObj.name.trim()}-${suffix}`)) {
        suffix++;
      }
      finalName = `${customerNameObj.name.trim()}-${suffix}`;
    }

    // Add the new customer with the unique name
    await addDoc(customerRef, {
      name: finalName,
      contact: customerNameObj.contact || "",
      Fund: customerNameObj.Fund || "",
      lastUpdated: serverTimestamp(),
    });

    return {
      status: "success",
      message: `Customer "${finalName}" added successfully.`,
    };
  } catch (error) {
    console.error("Error adding customer:", error);
    return {
      status: "error",
      message: "An error occurred while adding the customer. Please try again.",
    };
  }
};

// Add Payment Function
export const addPayment = async (userId, shopId, customerId, amount) => {
  try {
    const paymentsRef = collection(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/payments`);
    if (amount.id) {
      // Update existing document
      const docRef = doc(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/payments/${amount.id}`);
      await updateDoc(docRef, {
        ...amount,
      });
      console.log("Document updated successfully");
    } else {
      await addDoc(paymentsRef, {
        ...amount,
        date: serverTimestamp(),
      });
      console.log("Document added successfully");
    }
  } catch (error) {
    console.error('Error adding payment:', error);
  }
};

export const updatePayments = async (userId, shopId, customerId, paymentsList) => {

  try {
    // Create an array of promises, one for each update operation
    const updatePromises = paymentsList.map(({ id, status, remaining, style }) => {
      const paymentRef = doc(firestore, `users/${userId}/shops/${shopId}/customers/${customerId}/payments`, id);
      return updateDoc(paymentRef, {
        'status': status,
        'remaining': remaining,
        'style': style
      });
    });

    // Execute all updates in parallel
    await Promise.all(updatePromises);
    console.log('All payments updated successfully');
  } catch (error) {
    console.error('Error updating payments:', error);
  }
};

export const updateDue = async (userId, shopId, customerId, due) => {
  try {
    const customerRef = doc(firestore, `users/${userId}/shops/${shopId}/customers`, customerId);

    // Fetch the current document
    const docSnapshot = await getDoc(customerRef);

    if (docSnapshot.exists()) {
      const currentData = docSnapshot.data();

      // Check if the current due is already the same
      if (currentData.Fund === due) {
        console.log("No update needed. Due amount is already correct.");
        return Promise.resolve("No update needed");
      }
    }

    // Perform the update if the due amount is different
    await updateDoc(customerRef, {
      Fund: due,
      lastUpdated: serverTimestamp(),
    });

    console.log("Due amount updated successfully.");
    return Promise.resolve("Updated successfully");
  } catch (error) {
    console.error("Error updating due:", error);
    return Promise.reject(error);
  }
};

// const saveData = async (userId, shopId, data) => {
//   const collectionRef = collection(firestore, `users/${userId}/shops/${shopId}/customers`);
//   try {
//     if (data.id) {
//       // Update existing document
//       const docRef = doc(firestore, `users/${userId}/shops/${shopId}/customers/${data.id}`);
//       await updateDoc(docRef, {
//         ...data,
//         lastUpdated: serverTimestamp(),
//       });
//       console.log("Document updated successfully");
//     } else {
//       // Add new document
//       await addDoc(collectionRef, {
//         ...data,
//         lastUpdated: serverTimestamp(),
//       });
//       console.log("Document added successfully");
//     }
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// };
