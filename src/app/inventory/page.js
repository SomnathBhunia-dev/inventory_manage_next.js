"use client"
import React, { useEffect } from 'react'
import ItemForm from '../componenet/ItemForm';
import Payment from '../componenet/Payment';
import List from '../componenet/List';
import { useRouter } from 'next/navigation';
import { useInventory } from '../context/InventoryContext';
const Page = () => {
    const {user} = useInventory()
    const router = useRouter();
    useEffect(() => {
        if (!user || Object.keys(user).length === 0 || !user.uid) {
          const timer = setTimeout(() => {
            router.push('/user');
          });
          return () => clearTimeout(timer);
        }
      }, [user, router]);
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="bg-gray-100 min-h-screen">
                    <ItemForm />
                    <Payment />
                    <List />
                </div>
            </div>
        </>
    )
}

export default Page