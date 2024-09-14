import React, { lazy, Suspense } from 'react'
import { useAppSelector } from '../../../hooks';
import { selectUser } from '../auth/authSlice';
const Left = lazy(() => import('../home/Left'));
const Right = lazy(() => import('../home/Right'));
const NotificationMain = lazy(() => import('./NotificationMain'));
const Loading = lazy(() => import('../../../Loading'));

const Notification = () => {
  const { mode, notifications } = useAppSelector(selectUser);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9 ${ notifications && Array.isArray(notifications) && notifications.length > 6 ? 'h-min' :  'h-screen' } ${mode === 'light' ? '' : 'bg-gray-900'} `}>
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
       <Suspense fallback={<div />} >
        <Left />
       </Suspense>
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
      <Suspense fallback={<div />} >
        <NotificationMain/>
        </Suspense>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
      <Suspense fallback={<div />} >
        <Right />
        </Suspense>
      </div>
    </div>
  )
}

export default Notification
