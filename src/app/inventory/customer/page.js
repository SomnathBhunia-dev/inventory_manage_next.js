'use client'
import ItemForm from "@/app/componenet/ItemForm";
import List from "@/app/componenet/List";
import { LoadingSpinner } from "@/app/componenet/Loading";
import Modal from "@/app/componenet/Modal";
import Payment from "@/app/componenet/Payment";
import { useInventory } from "@/app/context/InventoryContext";
import React, { useEffect, useState } from "react";
import { FaPlus, FaDollarSign } from "react-icons/fa";


const SlugPage = () => {
    const [showSaleModal, setShowSaleModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const { listenToCustomerPayments, LoadingStatus } = useInventory()

    useEffect(() => {
        const unsubscribe = listenToCustomerPayments();
        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    return (
        <>
        <LoadingSpinner isLoading={LoadingStatus} />
            <div className="md:p-6 p-2 min-h-screen">
                <div className="p-6 space-y-4 mt-12">
                    <div className="flex space-x-4 justify-center">
                        <button
                            onClick={() => setShowSaleModal(true)}
                            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <FaPlus className="mr-2" />
                            Add Sale
                        </button>
                        <button
                            onClick={() => setShowPaymentModal(true)}
                            className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            <FaDollarSign className="mr-2" />
                            Payments
                        </button>
                    </div>

                    <Modal
                        isOpen={showSaleModal}
                        onClose={() => setShowSaleModal(false)}
                        title="Add Sale"
                    >
                        <ItemForm onClose={() => setShowSaleModal(false)} />

                    </Modal>

                    <Modal
                        isOpen={showPaymentModal}
                        onClose={() => setShowPaymentModal(false)}
                        title="Add Payment"
                    >
                        <Payment onClose={() => setShowPaymentModal(false)} />
                    </Modal>
                </div>
                <List />
            </div>
        </>
    );
};

export default SlugPage;
