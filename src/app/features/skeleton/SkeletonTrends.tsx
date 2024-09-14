import React from 'react'
import SkeletonBox from './SkeletonBox'
import Skeleton from 'react-loading-skeleton'

const SkeletonTrends = () => {
  return (
    <div  className='w-full px-4'>
        <div className='flex justify-between'>
            <SkeletonBox className='w-12' >
                <Skeleton height={20} style={{marginBottom: '3px', borderRadius: '8px'}} />
            </SkeletonBox>

            <SkeletonBox className='w-12' >
                <Skeleton height={20} style={{marginBottom: '3px', borderRadius: '8px'}}/>
            </SkeletonBox>
        </div>
        <div className='flex justify-between w-full'>
        <SkeletonBox className='w-1/4' >
        <Skeleton height={30} count={8} style={{ marginBottom: '3px', borderRadius: '8px'}} />
      </SkeletonBox>

      <SkeletonBox className='w-1/4' >
        <Skeleton height={30} count={8} style={{ marginBottom: '3px', borderRadius: '8px'}} />
      </SkeletonBox>
      </div>                        
     
    </div>
  )
}

export default SkeletonTrends
