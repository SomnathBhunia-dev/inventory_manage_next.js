import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import Modal from './Modal';
import Customer from './Customer';

const ShopName = ({ empty=false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {empty ?
        <div className="flex items-center justify-center p-4" onClick={() => setIsOpen(true)} >
          <div
            className="relative overflow-hidden w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl transition-all duration-300 cursor-pointer hover:scale-102"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)"
            }}
            role="button"
            aria-label="Add new customer"
            tabIndex={0}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-50" />

            <div className="relative z-10 flex flex-col items-center space-y-4 transform transition-transform duration-200 hover:-translate-y-1">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-transform duration-300 hover:rotate-180">
                <FaUserPlus className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add Customer
              </h2>

              <p className="text-gray-600 text-center text-sm">
                Click to add a new customer to your database
              </p>

              <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 transition-transform duration-300 hover:scale-110" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        </div>
        :
        <div className="fixed bottom-8 right-8">

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaPlus />
        </button>
        </div>
      }
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Customer"
      >
        <Customer onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default ShopName;
