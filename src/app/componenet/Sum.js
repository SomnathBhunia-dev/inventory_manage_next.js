import { useInventory } from "../context/InventoryContext";

export default function Sum() {
  const { totalPayments } = useInventory()
  const { debit, credit, remain } = totalPayments
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex justify-between">
        {/* Left Section */}
        <div className="flex flex-col items-start">
          <div className="text-gray-500 text-xs sm:text-sm">Total Sale</div>
          <div className="text-base sm:text-xl font-bold">{debit}</div>
          <div className="text-gray-500 text-xs sm:text-sm mt-2">Total Payment</div>
          <div className="text-base sm:text-xl font-bold">{credit}</div>
        </div>

        {/* Divider */}
        <div className="border-l border-gray-300 h-16 sm:h-auto mx-4"></div>

        {/* Right Section */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="text-gray-500 text-xs sm:text-sm">Net Balance</div>
          {remain >= 0
            ? <div className="text-base sm:text-xl font-bold text-red-500">
              {Math.abs(remain)} <span className="text-gray-500 text-xs sm:text-sm">Dr</span>
            </div>
            : <div className="text-base sm:text-xl font-bold text-green-500">
              {Math.abs(remain)} <span className="text-gray-500 text-xs sm:text-sm">Cr</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
