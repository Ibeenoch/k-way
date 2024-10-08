import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { addNotification, getAllNotificationForAUser, getAllUser, selectUser } from '../auth/authSlice'
import { getAllPosts } from './PostSlice';
import { socket } from '../../../../index'
import Loading from '../../../Loading';
import FullPageSkeleton from '../../../../FullPageSkeleton';
const Left = lazy(() =>import('./Left'));
const Middle = lazy(() =>import('./Middle'));
const Right = lazy(() =>import('./Right'));

const Home = () => {
  const dispatch = useAppDispatch();
  const [userUpdated] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { mode } = useAppSelector(selectUser);
 

  useEffect(() => {
    dispatch(getAllUser())
  }, [userUpdated, dispatch])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [userUpdated, dispatch])

  useEffect(() => {
    const handlePostLiked = (data: any) => {
      dispatch(addNotification(data)).then((res: any) => {
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId };

        dispatch(getAllNotificationForAUser(note));
      })
    };
  
    socket.on('postLiked', handlePostLiked);
  
    return () => {
      socket.off('postLiked', handlePostLiked);
    };
  }, [socket]);
  
  useEffect(() => {
    const handlepostBookmarked = (data: any) => {
      dispatch(addNotification(data)).then((res: any) => {
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId }

        dispatch(getAllNotificationForAUser(note));
      });
    };
  
    socket.on('postBookmarked', handlepostBookmarked);
  
    return () => {
      socket.off('postBookmarked', handlepostBookmarked);
    };
  }, [socket]);
  
  useEffect(() => {
    const handlepostReshared = (data: any) => {
      dispatch(addNotification(data)).then((res: any) => {
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId }

        dispatch(getAllNotificationForAUser(note));
      });
    };
  
    socket.on('postReshared', handlepostReshared);
  
    return () => {
      socket.off('postReshared', handlepostReshared);
    };
  }, [socket]);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9 h-min ${ mode === 'light' ? 'bg-gray-100' : 'bg-gray-900'} `}>
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
       <Suspense fallback={<div></div>}>
        <Left />
       </Suspense>
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
      <Suspense fallback={<div></div>}>
        <Middle/>
        </Suspense>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
      <Suspense fallback={<div></div>}>
        <Right />
      </Suspense>
      </div>
    </div>
  )
}

export default Home
