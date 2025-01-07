"use client"
import React, { useState } from 'react'
import { useInventory } from '../context/InventoryContext'
import Sum from './Sum'
import ItemForm from './ItemForm'
import Modal from './Modal'
import Payment from './Payment'

const List = () => {
    const { Payments, siplexTxn, convertTimestampToDate } = useInventory()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTxn, setselectedTxn] = useState([])
    const [editSaleTxn, setEditSaleTxn] = useState(false);
    const [editPaymentTxn, setEditPaymentTxn] = useState(false);

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
            <div className="py-4 px-4 md:p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
                <Sum />
                <div className="flex flex-row justify-between items-center mb-4">
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
                        <tbody className="text-gray-600 text-xs sm:text-sm font-light">
                            {Payments?.map((item, index) => (
                                <tr
                                    key={index} onClick={(e) => item.remaining === item.amount ? handleEdit(item) : e.stopPropagation()}
                                    className={`border-b border-gray-200 transition-all duration-500 ease-out transform animate-fadeIn 
                                    ${item.remaining === item.amount ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}
                                    `}
                                >
                                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-left font-bold">
                                        {convertTimestampToDate(item.date?.seconds)}
                                        <div className="block sm:hidden">
                                            <span className="font-normal">{item.product || item.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-left hidden sm:table-cell">
                                        {item.product || item.description}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-left text-red-600 font-bold ">
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
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                        {item.remaining === 0 ? (
                                            <div className="block md:hidden">
                                                <span
                                                    className="py-1 px-2 rounded-full text-xs bg-green-200 text-green-700"
                                                >
                                                    {item.status}
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
                        </tbody>
                    </table>
                </div>
            </div>
            {editSaleTxn 
            ?
            <Modal
            isOpen={isOpen}
            onClose={() => {setIsOpen(false); setEditSaleTxn(false)}}
            title="Update Sales"
            >
                <ItemForm updateItem={editSaleTxn} onClose={() => setIsOpen(false)} />
            </Modal>
            :
            <Modal
            isOpen={isOpen}
            onClose={() => {setIsOpen(false); setEditPaymentTxn(false)}}
            title="Update Payments"
            >
                <Payment updateItem={editPaymentTxn} onClose={() => setIsOpen(false)} />
            </Modal>
            }
        </>
    );
}



export default List