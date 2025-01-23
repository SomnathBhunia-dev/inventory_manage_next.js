"use client"
import React, { useState } from 'react'
import { useInventory } from '../context/InventoryContext'
import Sum from './Sum'
import ItemForm from './ItemForm'
import Modal from './Modal'
import Payment from './Payment'

const List = () => {
    const { Payments, siplexTxn, convertTimestampToDate, groupByDate } = useInventory()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTxn, setselectedTxn] = useState([])
    const [editSaleTxn, setEditSaleTxn] = useState(false);
    const [editPaymentTxn, setEditPaymentTxn] = useState(false);

    const PaymentsList = groupByDate(Payments);

    const toggleSelectTransaction = (transaction) => {
        setselectedTxn(prev => {
            if (prev.find(t => t.id === transaction.id)) {
                // If already selected, remove it
                return prev.filter(t => t.id !== transaction.id);
            } else {
                // If not selected, add it
                return [...prev, transaction];
            }
        });
    };

    const simplyfy = () => {
        siplexTxn(selectedTxn)
        setselectedTxn([])
    }
    const handleEdit = (i) => {
        setIsOpen(true)
        if (i?.type === 'credit') {
            setEditPaymentTxn(i)
        } else setEditSaleTxn(i)
    }

    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
                <Sum />
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 text-black ">Sales</h2>
                    {selectedTxn?.length !== 0 && (
                        <button
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                            onClick={simplyfy}
                        >
                            Simplyfy
                        </button>
                    )}
                </div>
                <div className="overflow-hidden">
                    <table className="table-auto w-full bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Date</th>
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left hidden sm:table-cell">Description</th>
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Sales</th>
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-left">Payment</th>
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-center hidden sm:table-cell">Status</th>
                                <th className="py-2 px-2 sm:py-3 sm:px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        {Object.keys(PaymentsList).map((date, index) => (
                            <tbody key={index} className="text-gray-600 text-xs sm:text-sm font-light border-b-2 border-purple-400">
                                <>
                                    {/* Group Header */}
                                    <tr className='flex py-2'>
                                        <td
                                            className="py-1 md:px-4 font-bold text-gray-700 bg-purple-200 px-2 rounded-full text-xs text-center"
                                        >
                                            {date}
                                        </td>
                                    </tr>
                                    {/* Grouped Rows */}
                                    {PaymentsList[date]?.map((item, index) => (
                                        <tr
                                            key={index} onClick={(e) => item.remaining === item.amount ? handleEdit(item) : e.stopPropagation()}
                                            className={`border-b border-gray-300 transition-all duration-500 ease-out transform animate-fadeIn 
                                    ${item.remaining === item.amount ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'} ${item.status === 'Paid' || item.status === 'Cleared' ? ' bg-gray-100 text-gray-400 opacity-50' : ''} ${item.status === 'Ordered' ? 'bg-[#E6F7FF]' : ''} `}>
                                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-left font-bold">
                                                {/* {convertTimestampToDate(item.date?.seconds)} */}
                                                <div className="block sm:hidden">
                                                    <span className="font-normal">{item.product || item.description}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-left hidden sm:table-cell">
                                                {item.product || item.description}
                                            </td>
                                            <td className={`py-2 px-2 sm:py-3 sm:px-4 text-left ${item.status === 'Ordered' ? 'text-[#0074CC]' : 'text-red-600 '} font-bold `}>
                                                {item.type === 'debit'
                                                    ? <span>{item.amount?.toFixed(2)}{item.amount !== item.remaining && item.remaining !== 0
                                                        ? <span className='text-indigo-600'> ({item.remaining.toFixed(2)})</span>
                                                        : ""
                                                    }</span>
                                                    : "-"}
                                            </td>
                                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-left text-green-600 font-bold">
                                                {item.type === 'credit'
                                                    ? <span>{item.amount?.toFixed(2)}{item.amount !== item.remaining && item.remaining !== 0
                                                        ? <span className='text-indigo-600'> ({item.remaining.toFixed(2)})</span>
                                                        : ""
                                                    }</span>
                                                    : "-"}
                                            </td>
                                            <td className={`py-2 px-2 sm:py-3 sm:px-4 text-center hidden sm:table-cell`}>
                                                <span
                                                    className={`py-1 px-2 rounded-full text-xs whitespace-nowrap ${item.style?.bgStyle} ${item.style?.textStyle}`}
                                                >
                                                    {item.status === 'Delivered' ? item.amount - item.remaining !== 0 ? "Adjusted" : item.status : item.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                {item.remaining === 0 ? (
                                                    <div className="block md:hidden">
                                                        <span
                                                            className={`py-1 px-2 rounded-full text-xs ${item.style?.bgStyle} ${item.style?.textStyle}`}
                                                        >
                                                            {item.status === 'Delivered' ? item.amount - item.remaining !== 0 ? "Adjusted" : item.status : item.status}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="block md:hidden">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTxn.some(t => t.id === item.id)}
                                                            onChange={() => toggleSelectTransaction(item)}
                                                            className="form-checkbox h-4 w-4 text-indigo-600"
                                                        />
                                                    </div>
                                                )}
                                                <div className="hidden md:block">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTxn.some(t => t.id === item.id)}
                                                        onChange={() => toggleSelectTransaction(item)}
                                                        className="form-checkbox h-4 w-4 text-indigo-600 "
                                                        disabled={item.remaining === 0}
                                                    />
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            {editSaleTxn
                ?
                <Modal
                    isOpen={isOpen}
                    onClose={() => { setIsOpen(false); setEditSaleTxn(false) }}
                    title="Update Sales"
                >
                    <ItemForm updateItem={editSaleTxn} onClose={() => setIsOpen(false)} />
                </Modal>
                :
                <Modal
                    isOpen={isOpen}
                    onClose={() => { setIsOpen(false); setEditPaymentTxn(false) }}
                    title="Update Payments"
                >
                    <Payment updateItem={editPaymentTxn} onClose={() => setIsOpen(false)} />
                </Modal>
            }
        </>
    );
}



export default List