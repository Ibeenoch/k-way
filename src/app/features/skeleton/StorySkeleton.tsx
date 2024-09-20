import React from 'react'
import SkeletonBox from './SkeletonBox'
import Skeleton from 'react-loading-skeleton'

const StorySkeleton = () => {
  return (
    <div className='relative w-[150px] h-[180px] sm:w-[180px] sm:h-[220px]'>
        <SkeletonBox className='w-[150px] h-[180px] sm:w-[180px] sm:h-[220px] overflow-hidden'>
            <Skeleton height={220}  style={{ borderRadius: '12px'}} />
        </SkeletonBox>
      
    </div>
  )
}

export default StorySkeleton
