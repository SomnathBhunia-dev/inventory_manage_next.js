"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useInventory } from '../context/InventoryContext';
import Welcome from '../componenet/Welcome';


const Page = () => {

  const { user } = useInventory()

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
          <Welcome userName={user?.name} />
        </div>
      </div>
    </>
  )
}

export default Page