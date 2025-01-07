import { useInventory } from "../context/InventoryContext";

export default function Sum() {
  const { totalPayments, formatToRupee } = useInventory()
  const {
    debit,
    credit,
    remain,
    ordered,
    delivered,
    paid,
    orderQty,
    deliveredQty,
    paidQty,
    debitsQty,
    creditsQty
  } = totalPayments
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* First Section */}
      <div className="bg-[#E6F7FF] shadow-md rounded-lg p-4 sm:p-6 flex justify-between">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#0074CC] text-xs sm:text-sm font-medium">
            On The Way
            <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-[#0074CC] bg-blue-200 rounded-full">
              {orderQty}
            </span>
          </div>
          <div className="text-base sm:text-xl font-bold text-[#0074CC]">
            {formatToRupee(ordered)}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm font-medium">
            Delivered
            <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
              {deliveredQty}
            </span>
          </div>
          <div className="text-base sm:text-xl font-bold text-black">
            {formatToRupee(delivered)}
          </div>
        </div>

        {/* Divider */}
        <div className="border-l border-gray-300 h-auto mx-4"></div>

        {/* Right Section */}
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="text-xs sm:text-sm font-medium text-gray-500">
            Net Balance
          </div>
          {remain >= 0 ? (
            <div className="text-base sm:text-xl font-bold text-[#FF4D4D]">
              {formatToRupee(Math.abs(remain))} <span className="text-gray-500 text-xs sm:text-sm">Dr</span>
            </div>
          ) : (
            <div className="text-base sm:text-xl font-bold text-[#29A744]">
              {formatToRupee(Math.abs(remain))} <span className="text-gray-500 text-xs sm:text-sm">Cr</span>
            </div>
          )}
          <div className="text-gray-500 text-xs sm:text-sm font-medium">
            Fully Paid
            <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-purple-800 bg-purple-200 rounded-full">
              {paidQty}
            </span>
          </div>
          <div className="text-base sm:text-xl font-bold text-black">
            {formatToRupee(paid)}
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="bg-[#F5F5FF] shadow-md rounded-lg p-4 sm:p-6 flex justify-between">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#6C5CE7] text-xs sm:text-sm font-medium">
            Total Sale
            <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-indigo-800 bg-indigo-200 rounded-full">
              {debitsQty - orderQty}
            </span>
          </div>
          <div className="text-base sm:text-xl font-bold text-[#6C5CE7]">
            {formatToRupee(debit)}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#6C5CE7] text-xs sm:text-sm font-medium">
            Total Payment
            <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-teal-800 bg-teal-200 rounded-full">
              {creditsQty}
            </span>
          </div>
          <div className="text-base sm:text-xl font-bold text-[#10AC84]">
            {formatToRupee(credit)}
          </div>
        </div>
      </div>

    </div>

  );
}
