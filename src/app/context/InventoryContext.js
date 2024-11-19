"use client";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { addShop, addCustomer, addSale, addPayment, updatePayments } from '../models/firebaseUserData';
// Initial State
const initialState = {
    user: {},
    shop: 'default',
    customer: 'default',
    inventory: '',
    Payments: [],
    totalPayments: {
        credit: 0,
        debit: 0,
        remian: 0
    }
};

// Reducer function
const inventoryReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                inventory: [...state.inventory, action.payload]
            };
        case 'ADD_PAYMENT':
            return {
                ...state,
                Payments: [...action.payload]
            };
        case 'UPDATE_PAYMENT':
            const { totalDebits, totalCredits, remainingAmount } = action.payload;
            return {
                ...state,
                totalPayments: {
                    credit: totalCredits,
                    debit: totalDebits,
                    remain: remainingAmount
                }
            };
        case 'SIMPLIFY_PAYMENT':
            const { debits, credits } = action.payload;

            // Update Debits in inventory
            const updatedDebitArray = state.inventory.map((debit) => {
                const updatedDebit = debits.find(item => item.id === debit.id);
                return updatedDebit ? { ...debit, ...updatedDebit } : debit;
            });

            // Update Payments
            const updatedCreditArray = state.Payments.map((credit) => {
                const updatedCredit = credits.find(item => item.id === credit.id);
                return updatedCredit ? { ...credit, ...updatedCredit } : credit;
            });

            // Dispatch the new updated arrays to your store
            return {
                ...state,
                inventory: updatedDebitArray,
                Payments: updatedCreditArray,
            };

        case 'ADD_USER': {
            return {
                ...state,
                user: action.payload
            }
        }
        default:
            return state;
    }
};

// Context creation
const InventoryContext = createContext();
const provider = new GoogleAuthProvider();

// Provider component with useReducer
export const InventoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(inventoryReducer, initialState);

    const addUser = (i) => {
        dispatch({ type: 'ADD_USER', payload: i })
    }
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const updatePayment = () => {
        // // Sum up all debits
        // const totalDebits = state.Payments
        //     .filter(item => item.type === 'debit') // Filtering debits
        //     .reduce((sum, debit) => sum + debit.sale, 0);

        // // Sum up all credits
        // const totalCredits = state.Payments
        //     .filter(item => item.type === 'credit') // Filtering credits
        //     .reduce((sum, credit) => sum + credit.payment, 0);

        // // const remainingAmount = totalDebits - totalCredits;

        const totals = state.Payments.reduce(
            (acc, item) => {
                if (item.type === 'debit') {
                    acc.totalDebits += item.sale || 0;
                } else if (item.type === 'credit') {
                    acc.totalCredits += item.payment || 0;
                }
                return acc;
            },
            { totalDebits: 0, totalCredits: 0 }
        )

        // Calculate remaining amount
        const remainAmount = totals.totalDebits - totals.totalCredits

        dispatch({
            type: 'UPDATE_PAYMENT',
            payload: {
                totalDebits: Number(totals.totalDebits),
                totalCredits: Number(totals.totalCredits),
                remainingAmount: Number(remainAmount),
            }
        });
    };


    const storePayment = (amount) => {
        dispatch({ type: 'ADD_PAYMENT', payload: amount });
    };

    function convertTimestampToDate(timestampInSeconds) {
        // Convert seconds to milliseconds
        const milliseconds = timestampInSeconds * 1000;

        const now = new Date(milliseconds);
        const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad
        const year = now.getFullYear(); // Get the full year

        // Format date as dd/mm/yyyy
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    useEffect(() => {
        updatePayment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Payments])

    const siplexTxn = (i) => {
        // Select the debit and credit objects you want to adjust
        const selectedDebits = i.filter(txn => txn.type === 'debit');
        const selectedCredits = i.filter(txn => txn.type === 'credit');

        const adjustTransactions = (debits, credits) => {
            let remainingCredits = credits.slice(); // Copy of credits to adjust

            debits.forEach(debit => {
                while (debit.remaining > 0 && remainingCredits.length > 0) {
                    const credit = remainingCredits[0];

                    if (credit.remaining > 0) {
                        // Calculate the amount to adjust
                        const amountToAdjust = Math.min(debit.remaining, credit.remaining);

                        // Adjust the debit and credit
                        debit.remaining -= amountToAdjust;
                        credit.remaining -= amountToAdjust;

                        // Update the status
                        if (credit.remaining === 0) {
                            credit.status = 'Adjusted'; // Mark credit as adjusted
                        } else {
                            credit.status = 'Partially Paid'; // Mark credit as partially paid
                        }

                        if (debit.remaining === 0) {
                            debit.status = 'Paid'; // Mark debit as paid
                        }
                    }

                    // Remove the credit if it's fully adjusted
                    if (credit.remaining === 0) {
                        remainingCredits.shift(); // Remove the first credit
                    }
                }
            });

            return [...debits, ...credits];
        };
        const list = adjustTransactions(selectedDebits, selectedCredits);
        handleUpdate(list)
        // dispatch({ type: 'SIMPLIFY_PAYMENT', payload: { debits, credits } });
    };

    const handleGoogleSignIn = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Reference to the user document in Firestore
            const userDocRef = doc(firestore, 'users', user.uid);

            // Check if the user document already exists
            const userDoc = await getDoc(userDocRef);

            // If the user document does not exist, create it
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                });
            } else {
                // Update the last login time if the user document exists
                await setDoc(
                    userDocRef,
                    { lastLogin: serverTimestamp() },
                    { merge: true } // Only update lastLogin without overwriting other fields
                );
            }
        } catch (error) {
            // Handle errors and set error state
            console.error("Error signing in with Google:", error);
        }
    };
    // console.log(state.Payments)
    const fetchUser = async (i) => {
        const { uid } = i
        try {
            const userDocRef = doc(firestore, 'users', uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                addUser(userDoc.data());
            } else {
                addUser(i)
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const handleAddShop = async (shopName) => {
        await addShop(state.user.uid, shopName);
        // setShopName(''); // Clear the input field
    };
    const handleAddCustomer = async (i) => {
        await addCustomer();
        setShopName(''); // Clear the input field
    };
    const handlePayment = async (i) => {
        await addPayment(state.user.uid, state.shop, state.customer, i);
    };
    const handleUpdate = async (i) => {
        await updatePayments(state.user.uid, state.shop, state.customer, i);
    };

    const listenToCustomerPayments = () => {
        const paymentsRef = query(collection(firestore, `users/${state.user.uid}/shops/${state.shop}/customers/${state.customer}/payments`), orderBy('date', 'desc')) // Sort by timestamp in descending order );

        return onSnapshot(paymentsRef, (snapshot) => {
            const paymentsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            storePayment(paymentsList); // Dispatch to Redux store
        });
    };
    return (
        <InventoryContext.Provider
            value={{ ...state, addItem, updatePayment, convertTimestampToDate, addPayment, siplexTxn, addUser, fetchUser, handleGoogleSignIn, handleAddShop, handleAddCustomer, handlePayment, listenToCustomerPayments }}
        >
            {children}
        </InventoryContext.Provider>
    );
};

// Custom hook to use the context
export const useInventory = () => {
    return useContext(InventoryContext);
};
