import React from 'react'
import { Skeleton } from './ui/skeleton'

const LandingSectionSkleton = () => {
    return (
        <div className=' w-full bg-black px-10 py-4'>
            <Skeleton className=' bg-gray-800 rounded-md w-full max-w-xs h-[500px]' />
        </div>
    )
}

export default LandingSectionSkleton