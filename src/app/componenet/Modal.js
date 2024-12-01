"use client"
import React, { useEffect, useRef } from "react";
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, isOpen, onClose, title }) => {
    const modalRef = useRef();
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose()
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"></div>
                <div
                    ref={modalRef}
                    className="relative top-20 sm:top-0 z-50 w-full max-w-sm md:max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-in-out"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal