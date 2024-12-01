"use client"

import { useState, useEffect } from "react";
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useInventory } from "../context/InventoryContext";
import LoadingAnimation from "../componenet/Loading";
import { FcGoogle } from "react-icons/fc";


const Google = () => {
  const [error, setError] = useState(null);

  const { user, addUser, handleGoogleSignIn, fetchUser } = useInventory()

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
  // if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {!user ? (
        <>
          <div className="bg-white p-10 rounded-lg shadow-xl text-center w-full max-w-sm md:max-w-md">
            <p className="text-gray-500 mb-8">
              Sign in with your Google account to access the dashboard.
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </>)
        :
        <LoadingAnimation />}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

    </div>
  )
}
export default Google;