"use client"
import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import ShopName from '../componenet/ShopName';
import { useInventory } from "../context/InventoryContext";
import Link from "next/link";


const Welcome = ({ userName }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { listenToCustomerList, customerList, selectCustomer, timeFromNow } = useInventory()

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsFixed(true);
        }, 1500);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSignOut = () => {
        console.log("User signed out");
    };

    useEffect(() => {
        const unsubscribe = listenToCustomerList();
        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div
                className={`transition-all duration-500 ease-in-out bg-gradient-to-br to-blue-50 from-purple-50 ${isFixed
                    ? "fixed top-16 left-0 right-0 z-50"
                    : "flex items-center justify-center min-h-screen"
                    }`}
            >
                <div
                    className={`bg-white rounded-lg shadow-xl  md:mx-auto max-w-3xl w-full transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        } ${isFixed ? "transition-transform" : "transition-all"} ${isScrolled ? "py-2 px-4" : "p-6"
                        } duration-500 ease-in-out`}
                    role="banner"
                    aria-label="Welcome message"
                >
                    <div className="flex items-center justify-between">
                        <div className={`space-y-${isScrolled ? "0" : "2"} transition-all duration-300`}>
                            <h1
                                className={`${isScrolled ? "text-xl" : "text-3xl"
                                    } whitespace-nowrap font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300`}
                            >
                                Welcome back,
                                <span className={`ml-2  ${isScrolled ? "text-lg" : "text-2xl max-sm:block"} font-semibold text-gray-800 transition-all duration-300`}>
                                    {userName}
                                </span>
                            </h1>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label="Sign out"
                        >
                            <FiLogOut className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors duration-300" />
                        </button>
                    </div>

                    {!isScrolled && (
                        <div className="mt-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                <p className="text-gray-600">
                                    Your Inventory dashboard is ready. Explore your latest updates and activities.
                                </p>
                            </div>
                        </div>
                    )}

                    {isFixed && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-lg" />
                    )}
                    {/* {isFixed && (
                        <ShopList />

                    )} */}
                </div>
            </div>
            <div className={`${isFixed ? "mt-40" : ""} p-6 pt-40 md:p-20`}>
                <div className="max-w-3xl mx-auto space-y-6">
                    {customerList.length !== 0 ?
                        <>
                            {customerList?.map((customer, index) => (
                                <div key={index} onClick={() => selectCustomer(customer.id)}
                                    className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in cursor-pointer`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animationFillMode: "both",
                                    }}
                                >
                                    <Link href={`/inventory/customer`} >
                                        <div className="flex justify-between items-center">
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    {customer.name}
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                {customer.Fund >= 0
                                                    ? <div className="text-base sm:text-xl font-bold text-red-500">
                                                        {Math.abs(customer.Fund)} <p className="text-sm text-gray-500">Due Amount</p>
                                                    </div>
                                                    : <div className="text-base sm:text-xl font-bold text-green-500">
                                                        {Math.abs(customer.Fund)} <p className="text-sm text-gray-500">Extra Amount</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Last Activity</span>
                                                <span className="text-gray-700">{timeFromNow(customer?.lastUpdated)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                                <ShopName />

                        </>
                        :
                        <>
                            <ShopName empty={true} />
                        </>
                    }
                </div>
            </div>

        </div>
    );
};

export default Welcome;