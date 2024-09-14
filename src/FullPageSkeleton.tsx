import React from 'react'
import Skeleton from 'react-loading-skeleton'

const FullPageSkeleton = () => {
  return (
    <div className='flex flex-col items-center p-4'>
        {/* header skeleton  */}
        <Skeleton width={300} height={50} />
       {/* Simulate multiple rows for content */}
       <div className="w-full mt-4">
        <Skeleton height={200} width="100%" />
        <Skeleton height={200} width="100%" className="mt-4" />
        <Skeleton height={200} width="100%" className="mt-4" />
      </div>
      
      {/* Simulate footer skeleton */}
      <Skeleton height={50} width={300} className="mt-8" />
    </div>
  )
}

export default FullPageSkeleton
