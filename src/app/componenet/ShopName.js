import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const ShopName = () => {
  const [isOpen, setIsOpen] = useState(false);
const {handleAddShop} = useInventory()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button
        onClick={()=> handleAddShop('trial')}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        +
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-2">
          <button className="bg-white text-blue-600 rounded-full p-4 shadow-lg hover:bg-gray-200 focus:outline-none">
            A
          </button>
          <button className="bg-white text-blue-600 rounded-full p-4 shadow-lg hover:bg-gray-200 focus:outline-none">
            B
          </button>
          <button className="bg-white text-blue-600 rounded-full p-4 shadow-lg hover:bg-gray-200 focus:outline-none">
            C
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopName;
