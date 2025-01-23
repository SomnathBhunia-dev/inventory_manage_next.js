"use client";
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { addShop, addCustomer, addPayment, updatePayments, updateDue } from '../models/firebaseUserData';
// Initial State
const initialState = {
    user: {},
    shop: 'default',
    customer: 'default',
    customerList: [],
    inventory: '',
    Payments: [],
    totalPayments: {
        credit: 0,
        debit: 0,
        remian: 0
    },
    LoadingStatus: false
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
        case "LOADING_ON":
            return {
                ...state,
                LoadingStatus: true
            }
        case "LOADING_OFF":
            return {
                ...state,
                LoadingStatus: false
            }
        case 'UPDATE_PAYMENT':
            const { totalDebits, totalCredits, remainingAmount, ordered, delivered, paid, creditsQty, debitsQty, orderQty, deliveredQty, paidQty } = action.payload;
            return {
                ...state,
                totalPayments: {
                    credit: totalCredits,
                    debit: totalDebits,
                    remain: remainingAmount,
                    ordered,
                    delivered,
                    paid,
                    orderQty,
                    deliveredQty,
                    paidQty,
                    debitsQty,
                    creditsQty
                }
            };
        case 'ADD_USER': {
            return {
                ...state,
                user: action.payload
            }
        }
        case 'ADD_CUSTOMER_LIST': {
            return {
                ...state,
                customerList: action.payload
            }
        }
        case 'SELECT_CUSTOMER': {
            return {
                ...state,
                customer: action.payload
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
        const totals = state.Payments.reduce(
            (acc, item) => {
                switch (item.type) {
                    case 'debit':
                        acc.totalDebits += item.amount || 0;
                        acc.totalDebitsQty++
                        break;
                    case 'credit':
                        acc.totalCredits += item.amount || 0;
                        acc.totalCreditsQty++
                        break;
                    default:
                }

                switch (item.status) {
                    case 'Ordered':
                        acc.ordered += item.amount || 0;
                        acc.orderQty++
                        break;
                    case 'Delivered':
                        acc.delivered += item.amount || 0;
                        acc.deliveredQty++
                        break;
                    case 'Paid':
                        acc.paid += item.amount || 0;
                        acc.paidQty++
                        break;
                    default:
                }
                return acc;
            },
            {
                totalDebits: 0,
                totalCredits: 0,
                ordered: 0,
                orderQty: 0,
                delivered: 0,
                deliveredQty: 0,
                paid: 0,
                paidQty: 0,
                totalCreditsQty: 0,
                totalDebitsQty: 0
            }
        );

        // Calculate remaining amount
        const remainAmount = (totals.paid + totals.delivered  )- totals.totalCredits

        dispatch({
            type: 'UPDATE_PAYMENT',
            payload: {
                totalDebits: Number(totals.totalDebits),
                totalCredits: Number(totals.totalCredits),
                ordered: Number(totals.ordered),
                delivered: Number(totals.delivered),
                paid: Number(totals.paid),
                remainingAmount: Number(remainAmount),
                orderQty: totals.orderQty,
                deliveredQty: totals.deliveredQty,
                paidQty: totals.paidQty,
                creditsQty: totals.totalCreditsQty,
                debitsQty: totals.totalDebitsQty,
            }
        });
    };

    const storePayment = (amount) => {
        dispatch({ type: 'ADD_PAYMENT', payload: amount });
    };
    const storeCustomerList = (i) => {
        dispatch({ type: 'ADD_CUSTOMER_LIST', payload: i });
    };

    const selectCustomer = (i) => {
        dispatch({ type: 'SELECT_CUSTOMER', payload: i })
    }

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

    const timeFromNow = (timestamp) => {
        if (!timestamp) return "Invalid date";

        // Convert Firestore Timestamp to JavaScript Date
        const date = timestamp.toDate();
        const now = Date.now();

        // Calculate the difference in milliseconds
        const diffInMs = now - date.getTime();

        // Convert the difference to seconds
        const diffInSeconds = Math.floor(diffInMs / 1000);

        // Determine the appropriate unit
        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return `${diffInMinutes} minutes ago`;
        } else if (diffInSeconds < 86400) {
            const diffInHours = Math.floor(diffInSeconds / 3600);
            return `${diffInHours} hours ago`;
        } else {
            const diffInDays = Math.floor(diffInSeconds / 86400);
            return `${diffInDays} days ago`;
        }
    };

    const formatToRupee = (amount) => {
        if (isNaN(amount)) return 0;

        // Convert to Indian Rupee format
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    useEffect(() => {
        updatePayment()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Payments])

    useEffect(() => {
        if (state.user?.uid !== undefined) {
            handleCustomerUpdate(state.totalPayments.remain)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.totalPayments])

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


                        // Update the status and styles
                        if (credit.remaining === 0) {
                            credit.status = 'Cleared'; // Fully paid credit
                            credit.style = {
                                bgStyle: 'bg-purple-200',
                                textStyle: 'text-purple-700'
                            };
                        } else {
                            credit.status = 'Adjusted'; // Partially paid or adjusted credit
                            credit.style = {
                                bgStyle: 'bg-yellow-200',
                                textStyle: 'text-yellow-700'
                            };
                        }

                        if (debit.remaining === 0) {
                            debit.status = 'Paid'; // Fully paid debit
                            debit.style = {
                                bgStyle: 'bg-blue-200',
                                textStyle: 'text-blue-700'
                            };
                        } else {
                            debit.status = 'Delivered'; // Partially paid or adjusted debit
                            debit.style = {
                                bgStyle: 'bg-red-100',
                                textStyle: 'text-black'
                            };
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

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Signed Out Successfully!!')
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

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
        await addCustomer(state.user.uid, state.shop, i);
    };
    const handleCustomerUpdate = async (i) => {
        await updateDue(state.user.uid, state.shop, state.customer, i);
    };
    const handlePayment = async (i) => {
        await addPayment(state.user.uid, state.shop, state.customer, i);
    };
    const handleUpdate = async (i) => {
        await updatePayments(state.user.uid, state.shop, state.customer, i);
    };

    const LoadingStatus = (i) => {
        dispatch({ type: i ? "LOADING_ON" : "LOADING_OFF" })
    }

    const listenToCustomerPayments = () => {
        LoadingStatus(true)
        const paymentsRef = query(collection(firestore, `users/${state.user.uid}/shops/${state.shop}/customers/${state.customer}/payments`), orderBy('date', 'desc')) // Sort by timestamp in descending order );

        return onSnapshot(paymentsRef, (snapshot) => {
            const paymentsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            storePayment(paymentsList); // Dispatch to Redux store
            LoadingStatus(false)
        });
    };
    const listenToCustomerList = () => {
        LoadingStatus(true)
        const paymentsRef = query(collection(firestore, `users/${state.user.uid}/shops/${state.shop}/customers`), orderBy('lastUpdated', 'desc')) // Sort by timestamp in descending order );

        return onSnapshot(paymentsRef, (snapshot) => {
            const customerList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            storeCustomerList(customerList); // Dispatch to Redux store
            LoadingStatus(false)
        });
    };

    const groupByDate = (i) => {
        return i.reduce((acc, item) => {
            const dateKey = convertTimestampToDate(item.date?.seconds);
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(item);
            return acc;
        }, {});
    };


    return (
        <InventoryContext.Provider
            value={{ ...state, addItem, updatePayment, convertTimestampToDate, addPayment, siplexTxn, addUser, fetchUser, handleGoogleSignIn, handleSignOut, handleAddShop, handleAddCustomer, handlePayment, listenToCustomerPayments, listenToCustomerList, timeFromNow, selectCustomer, handleCustomerUpdate, formatToRupee, groupByDate }}
        >
            {children}
        </InventoryContext.Provider>
    );
};

// Custom hook to use the context
export const useInventory = () => {
    return useContext(InventoryContext);
};
