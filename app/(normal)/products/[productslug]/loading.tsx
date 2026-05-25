import LandingSectionSkleton from '@/components/LandingSectionSkleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className=' bg-black w-full gap-6 px-10 py-5 grid grid-cols-2'>
            <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
            <div className='  w-full flex gap-3 flex-col'>
                <Skeleton className='bg-gray-800 h-6 max-w-xs w-full'></Skeleton>
                <Skeleton className='bg-gray-800 h-6 w-full max-w-md'></Skeleton>
                <Skeleton className='bg-gray-800 h-6 w-full max-w-xs'></Skeleton>
            </div>
        </div>
    )
}

export default Loading