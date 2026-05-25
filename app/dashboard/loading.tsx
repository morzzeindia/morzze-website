import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className=' w-full'>
            <Skeleton className=' bg-gray-800 rounded w-full h-96'></Skeleton>
        </div>
    )
}

export default Loading