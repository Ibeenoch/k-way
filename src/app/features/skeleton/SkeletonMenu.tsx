import React from 'react'
import SkeletonBox from './SkeletonBox'
import Skeleton from 'react-loading-skeleton'

const SkeletonMenu = () => {
  return (
    <div className='w-full'>
      <SkeletonBox className='flex justify-center mb-3'>
        <Skeleton width={100} height={100} circle/>
      </SkeletonBox>

    <div className='flex justify-center mb-2'>
      <SkeletonBox  className='w-1/2'>
        <Skeleton height={20} count={3} style={{ borderRadius: "6px", marginBottom: "3px"}} />
      </SkeletonBox>
    </div>

    <div className='w-full'>
        <SkeletonBox  className='w-full'>
        <Skeleton height={30} count={4} style={{ borderRadius: "6px", marginBottom: "3px"}} />
      </SkeletonBox>
    </div>
    </div>
  )
}

export default SkeletonMenu
