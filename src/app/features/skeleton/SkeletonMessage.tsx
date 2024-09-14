import React from 'react'
import SkeletonBox from './SkeletonBox'
import Skeleton from 'react-loading-skeleton'

const SkeletonMessage = () => {
  return (
    <div className='w-full'>
        <SkeletonBox className='w-[50px] mb-1' >
            <Skeleton height={20} style={{ borderRadius: '8px', marginBottom: "3px"}} />
        </SkeletonBox>

        <SkeletonBox className='w-[90px] mb-2' >
            <Skeleton height={30} style={{ borderRadius: '8px', marginBottom: "3px"}} />
        </SkeletonBox>

       <div className='w-full flex gap-1'>
            <SkeletonBox className='w-full' >
                <Skeleton height={40} count={10} style={{ borderRadius: '12px', marginBottom: "3px"}} />
            </SkeletonBox>
       </div>
      
    </div>
  )
}

export default SkeletonMessage
