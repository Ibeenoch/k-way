import React from 'react'
import SkeletonBox from './SkeletonBox'
import Skeleton from 'react-loading-skeleton'

const StorySkeleton = () => {
  return (
    <div className='relative w-[180px]'>
        <SkeletonBox className='w-[180px] overflow-hidden'>
            <Skeleton height={220}  style={{ borderRadius: '12px'}} />
        </SkeletonBox>
      
    </div>
  )
}

export default StorySkeleton
