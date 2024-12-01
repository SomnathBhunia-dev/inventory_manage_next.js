import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import Image from "next/image";

export default function page() {

    const inventoryItems = [
        {
            id: 1,
            title: "Smart Inventory Tracking",
            description: "Real-time tracking of your inventory levels with smart analytics",
            image: "images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3"
        },
        {
            id: 2,
            title: "Automated Reordering",
            description: "Set up automatic reordering when stock reaches minimum levels",
            image: "images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3"
        },
        {
            id: 3,
            title: "Multi-location Management",
            description: "Manage inventory across multiple warehouses efficiently",
            image: "images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3"
        },
        {
            id: 4,
            title: "Advanced Analytics",
            description: "Detailed insights and reports for better decision making",
            image: "images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 hover:translate-y-[-4px]">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Smart Inventory Management</span>
                        <span className="block text-blue-600">for Modern Business</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Streamline your inventory operations with our powerful management solution. Track, analyze, and optimize your stock levels in real-time.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Link href="/user">
                                <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inventory Showcase */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {inventoryItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
                            >
                                <div className="h-48 w-full overflow-hidden">
                                    <Image
                                        src={`https://${item.image}`}
                                        alt={item.title}
                                        width={500} // Set your desired width
                                        height={500} // Set your desired height
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                    <p className="mt-2 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="Facebook">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="Twitter">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="Instagram">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300" aria-label="LinkedIn">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-base text-gray-400">&copy; 2024 InventoryPro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
