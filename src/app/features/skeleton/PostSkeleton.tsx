import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"
import SkeletonBox from './SkeletonBox'

const PostSkeleton = () => {
  return (
    <div className={`rounded-xl p-3 w-full border border-gray-200 border-opacity-30`} >
        <div className='flex gap-2 w-full'>
            <SkeletonBox className=''>
                    <Skeleton height={40} width={40} circle />
            </SkeletonBox>

            <div className='w-full mb-1'>
                <SkeletonBox className='mb-2 w-full  overflow-hidden '>
                    <Skeleton height={30}  count={2} style={{ borderRadius: '9px', marginBottom: "3px"}} />
                </SkeletonBox>
                <div className='mb-2'>
                <SkeletonBox className=' w-full  overflow-hidden '>
                    <Skeleton  height={250} style={{ borderRadius: '12px'}} />
                </SkeletonBox>
                </div>

                <div className='flex justify-between pl-6 pr-6 mb-1'>
                    <Skeleton width={80} height={15} style={{ borderRadius: '9px'}}/>
                    <Skeleton width={80} height={15} style={{ borderRadius: '9px'}}/>
                </div>

                <div className='flex justify-between pl-6 pr-6 mb-1'>
                    <Skeleton width={150} height={20} style={{ borderRadius: '9px'}}  />
                    <Skeleton width={40} height={15} style={{ borderRadius: '9px'}} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostSkeleton
