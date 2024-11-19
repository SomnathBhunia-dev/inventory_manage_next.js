"use client"

import { useState, useEffect } from "react";
import {  onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useInventory } from "../context/InventoryContext";

const Google = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const {user, addUser, handleGoogleSignIn, fetchUser} = useInventory()

  const router = useRouter();

  useEffect(() => {
    // Set Firebase auth persistence to "local" for automatic session restoration
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            // If user exists, fetch their data from MongoDB using `uid`
            fetchUser(currentUser)
          } else {
            // No user is signed in
            addUser(null);
          }
          setLoading(false); // Done loading once we have auth state
        });
        // Clean up the listener on component unmount
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (user?.uid !== undefined) {
      const timer = setTimeout(() => {
        router.push('/inventory');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, router]);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center w-full max-w-md">
        {!user ? (
          <>
            <p className="text-gray-500 mb-8">
              Sign in with your Google account to access the dashboard.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 font-semibold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.08 0 5.83 1.06 8.02 2.8l6.05-6.05C34.33 3.65 29.35 1.5 24 1.5 14.73 1.5 6.91 7.82 3.92 16.07l7.52 5.85C13.44 15.41 18.29 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M47.88 24.54c0-1.64-.14-3.14-.41-4.64H24v9.09h13.46c-.66 3.34-2.61 6.17-5.51 8.08l8.42 6.52c4.87-4.5 7.7-11.14 7.7-18.05z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.92 16.07C2.56 19.24 1.76 22.82 1.76 26.5c0 3.68.8 7.26 2.16 10.43l7.52-5.85c-.91-2.44-1.38-5.11-1.38-7.88s.47-5.44 1.38-7.88L3.92 16.07z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c5.35 0 10.33-1.76 14.18-4.78l-7.52-5.85c-1.97 1.3-4.4 2.04-6.66 2.04-5.71 0-10.55-5.91-12.06-13.43l-7.52 5.85C6.91 38.18 14.73 44.5 24 44.5z"
                />
              </svg>
              Sign in with Google
            </button> </>)
          :
          (
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back!</h1>
              <p className="text-3xl font-bold mb-6 text-gray-800">{user.name}</p>
              <p>Redirecting to Your <b>Inventory...</b></p>
            </div>
          )}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      </div>
    </div>
  )
}
export default Google;