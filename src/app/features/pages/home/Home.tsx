import React, { useEffect, useState } from 'react'
import Left from './Left'
import Middle from '../home/Middle'
import Right from '../home/Right'
import { useAppDispatch } from '../../../hooks'
import { getAUser } from '../auth/authAPI'
import { addNotification, getAllNotificationForAUser, getAllUser,  } from '../auth/authSlice'
import { getAllPosts } from './PostSlice';
import { socket } from '../../../../index'

const Home = () => {
  const dispatch = useAppDispatch();
  const [userUpdated, setUserUpdated] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem('user') as any);

  useEffect(() => {
    dispatch(getAllUser())
  }, [userUpdated, dispatch])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [userUpdated, dispatch])

  useEffect(() => {
    const handlePostLiked = (data: any) => {
      console.log('data liked post ', data);
      dispatch(addNotification(data)).then((res: any) => {
        console.log('ress    ', res)
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId };

        dispatch(getAllNotificationForAUser(note)).then((res: any) => {
          console.log('all note ', res)
        })
      })
    };
  
    socket.on('postLiked', handlePostLiked);
  
    return () => {
      socket.off('postLiked', handlePostLiked);
    };
  }, [socket]);
  
  useEffect(() => {
    const handlepostBookmarked = (data: any) => {
      console.log('data postBookmarked post ', data);
      dispatch(addNotification(data)).then((res: any) => {
        console.log('ress    ', res)
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId }

        dispatch(getAllNotificationForAUser(note)).then((res: any) => {
          console.log('all note ', res)
        })
      });
    };
  
    socket.on('postBookmarked', handlepostBookmarked);
  
    return () => {
      socket.off('postBookmarked', handlepostBookmarked);
    };
  }, [socket]);
  
  useEffect(() => {
    const handlepostReshared = (data: any) => {
      console.log('data postReshared post ', data);
      dispatch(addNotification(data)).then((res: any) => {
        console.log('ress    ', res)
        const userId = res && res.payload && res.payload.receiver;
        const postId = res && res.payload && res.payload.post;
        const token = getUser && getUser.token;

        const note = { userId, token, postId }

        dispatch(getAllNotificationForAUser(note)).then((res: any) => {
          console.log('all note ', res)
        })
      });
    };
  
    socket.on('postReshared', handlepostReshared);
  
    return () => {
      socket.off('postReshared', handlepostReshared);
    };
  }, [socket]);
  



  return (
    <div className='grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9'>
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
        <Left />
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
        <Middle/>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
        <Right />
      </div>
    </div>
  )
}

export default Home
