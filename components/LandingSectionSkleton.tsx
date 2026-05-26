import React from 'react'
import { Skeleton } from './ui/skeleton'

const LandingSectionSkleton = () => {
    return (
        <div className=' w-full bg-black px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-6'>
            <Skeleton className=' bg-gray-800 rounded-md w-full max-w-xs h-96' />
            <Skeleton className=' bg-gray-800 rounded-md w-full max-w-xs h-96' />
            <Skeleton className=' bg-gray-800 rounded-md w-full max-w-xs h-96' />
        </div>
    )
}

export default LandingSectionSkleton;