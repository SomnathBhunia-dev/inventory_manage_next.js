"use client"
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStore, FaPlus } from "react-icons/fa";
import { MdError } from "react-icons/md";

const ShopList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState("");
  const [shops, setShops] = useState([
    "Fashion Hub",
    "Electronics World",
    "Home Decor Store",
    "Sports Center",
    "Beauty Boutique"
  ]);
  const [newShop, setNewShop] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsAdding(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setIsAdding(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsAdding(false);
    setError("");
  };

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setIsOpen(false);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
  };

  const handleAddShop = () => {
    if (!newShop.trim()) {
      setError("Please enter a shop name");
      return;
    }

    if (shops.includes(newShop.trim())) {
      setError("This shop name already exists");
      return;
    }

    setShops([...shops, newShop.trim()]);
    setSelectedShop(newShop.trim());
    setNewShop("");
    setIsAdding(false);
    setIsOpen(false);
    setError("");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        ref={dropdownRef}
        className="relative w-full max-w-md"
        onKeyDown={handleKeyDown}
      >
        <button
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="w-full px-4 py-3 text-left bg-white rounded-lg shadow-md flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <FaStore className="text-blue-500" />
            <span className="text-gray-700">
              {selectedShop || "Select a Shop"}
            </span>
          </div>
          {isOpen ? (
            <IoIosArrowUp className="text-gray-400" />
          ) : (
            <IoIosArrowDown className="text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
            <ul
              role="listbox"
              className="py-2"
              aria-label="Shop selection dropdown"
            >
              {shops.map((shop, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={selectedShop === shop}
                  onClick={() => handleShopSelect(shop)}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                    selectedShop === shop
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaStore
                    className={`${
                      selectedShop === shop ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  {shop}
                </li>
              ))}
              <li
                role="option"
                onClick={handleAddNew}
                className="px-4 py-2 cursor-pointer flex items-center gap-2 text-blue-600 hover:bg-gray-50 border-t"
              >
                <FaPlus className="text-blue-500" />
                Add More Shop Name
              </li>
            </ul>
          </div>
        )}

        {isAdding && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-20 p-4">
            <div className="space-y-4">
              <input
                type="text"
                value={newShop}
                onChange={(e) => setNewShop(e.target.value)}
                placeholder="Enter shop name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <MdError />
                  {error}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setError("");
                    setNewShop("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddShop}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;
