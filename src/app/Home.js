import React from 'react'
import Link from 'next/link';

const Home = () => {
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="bg-gray-100 min-h-screen">
                    {/* Hero Section */}
                    <section className="bg-blue-600 text-white py-20 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Efficient Inventory Management
                            </h1>
                            <p className="text-lg md:text-xl mb-8">
                                Streamline your inventory with real-time tracking, automated updates, and seamless integrations.
                            </p>
                            <Link href="/user">
                                <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {/* Feature 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">Real-Time Tracking</h3>
                                    <p className="text-gray-600">
                                        Monitor inventory levels in real-time, ensuring you’re always up-to-date with stock movements.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">Automated Alerts</h3>
                                    <p className="text-gray-600">
                                        Receive automated alerts for low stock levels, upcoming shipments, and restock requirements.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
                                    <p className="text-gray-600">
                                        Generate detailed reports on sales, stock levels, and trends to make informed business decisions.
                                    </p>
                                </div>

                                {/* Feature 4 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">Multi-Location Support</h3>
                                    <p className="text-gray-600">
                                        Manage inventory across multiple locations with a unified dashboard for streamlined control.
                                    </p>
                                </div>

                                {/* Feature 5 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
                                    <p className="text-gray-600">
                                        Integrate with popular e-commerce and accounting platforms for seamless data flow.
                                    </p>
                                </div>

                                {/* Feature 6 */}
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <h3 className="text-xl font-semibold mb-3">User-Friendly Dashboard</h3>
                                    <p className="text-gray-600">
                                        Intuitive and easy-to-use dashboard designed to simplify inventory management for everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gray-200 py-16 px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Inventory?</h2>
                            <p className="text-gray-700 mb-8">
                                Start today and experience efficient, hassle-free inventory management.
                            </p>
                            <Link href="/user">
                                <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home