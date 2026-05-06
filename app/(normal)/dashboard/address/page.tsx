"use client"
import React, { useState } from 'react'
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EditAddressPage from '@/components/address/EditAddressPage'
// Import your edit component

const addresses = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+91 XXXXXX6958",
    address: "123 Downtown Street, apt 4B, Jaipur, Rajasthan, 302019",
    isDefault: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+91 XXXXXX6958",
    address: "123 Downtown Street, apt 4B, Jaipur, Rajasthan, 302019",
    isDefault: false
  }
]

const AddressPage = () => {
  // State to manage view toggle
  const [isEditing, setIsEditing] = useState(false);

  // Agar user edit mode mein hai, toh EditAddressPage dikhao
  if (isEditing) {
    return (
      <div className="space-y-4">
        {/* Back button optional hai, par navigation ke liye acha rehta hai */}
        <Button 
          variant="ghost" 
          onClick={() => setIsEditing(false)}
          className="text-[#FDB813] hover:text-[#FDB813]/80 hover:bg-transparent gap-2 px-0 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Address Book
        </Button>
        
        <EditAddressPage />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden px-4 md:px-0 space-y-8 pb-20">
      <h1 className="text-2xl md:text-3xl font-semibold font-montserrat tracking-tight text-white pt-4">
        Address Book
      </h1>

      {/* Header Section */}
      <Card className="bg-[#141414] border-zinc-900 overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-montserrat text-white">Address Book</h2>
            <p className="text-sm text-zinc-500 font-inter">Manage your delivery addresses</p>
          </div>
          {/* CALL COMPONENT HERE: Click par state update */}
          <Button 
            onClick={() => setIsEditing(true)}
            className="w-full font-inter md:w-auto bg-[#FDB813] hover:bg-[#e6a600] text-black h-12 px-8 text-[11px] font-bold uppercase tracking-widest gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add New Address
          </Button>
        </CardContent>
      </Card>

      {/* Address Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((item) => (
          <Card key={item.id} className="bg-[#141414] border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
            <CardContent className="p-6 md:p-8 flex flex-col justify-between min-h-[300px]">
              
              <div className="space-y-4">
                {item.isDefault && (
                  <Badge className="bg-[#FDB813] text-black hover:bg-[#FDB813] px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border-none">
                    Default Address
                  </Badge>
                )}
                
                <div className="space-y-2 min-w-0">
                  <h3 className="text-xl font-bold font-montserrat text-white tracking-wide truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-zinc-400 font-inter font-medium">{item.phone}</p>
                  <p className="text-sm text-zinc-500 font-inter leading-relaxed max-w-sm">
                    {item.address}
                  </p>
                </div>
              </div>

              {/* Responsive Action Buttons */}
              <div className="flex flex-wrap items-center font-inter gap-3 pt-8 mt-auto">
                {!item.isDefault && (
                  <Button 
                    variant="outline" 
                    className="flex-1  border-[#FDB813] text-[#FDB813] hover:bg-[#FDB813]/5 bg-transparent h-11 text-[11px] font-bold uppercase tracking-widest"
                  >
                    Set Default
                  </Button>
                )}
                
                {/* CALL COMPONENT HERE: Edit click par bhi dikhega */}
                <Button 
                  onClick={() => setIsEditing(true)}
                  className={`${item.isDefault ? 'w-full' : 'flex-1'} bg-[#FDB813] hover:bg-[#e6a600] text-black h-11 text-[11px] font-bold font-inter uppercase tracking-widest transition-all`}
                >
                  Edit
                </Button>

                {!item.isDefault && (
                  <Button 
                    variant="outline" 
                    className="w-11 h-11 p-0 border-zinc-800 bg-transparent text-[#FF0000] hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AddressPage