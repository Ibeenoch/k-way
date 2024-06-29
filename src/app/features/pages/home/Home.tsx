import React, { useEffect, useState } from 'react'
import Left from './Left'
import Middle from '../home/Middle'
import Right from '../home/Right'
import { useAppDispatch } from '../../../hooks'
import { getAUser } from '../auth/authAPI'
import { getAllUser, updateNotification } from '../auth/authSlice'
import { io, Socket } from 'socket.io-client'

const Home = () => {
  const dispatch = useAppDispatch();
  const [userUpdated, setUserUpdated] = useState<boolean>(false);
  const socket: Socket = io('http://localhost:5800');

  useEffect(() => {
    socket.on('connection', (data) => {
      console.log('data liked post  ', data);

      socket.on('postLiked', (data: any) => {
        console.log('data liked post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('postBookmarked', (data: any) => {
        console.log('data postBookmarked post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('postReshared', (data: any) => {
        console.log('data postReshared post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('postComment', (data: any) => {
        console.log('data postComment post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('commentReplied', (data: any) => {
        console.log('data commentReplied post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('commentLiked', (data: any) => {
        console.log('data commentLiked post  ', data);
        dispatch(updateNotification(data))
      });

      socket.on('foloowed', (data: any) => {
        console.log('data foloowed post  ', data);
        dispatch(updateNotification(data))
      });

      // postLiked
      // postBookmarked
      // postReshared
      // postComment
      // commentReplied
      // commentLiked
      //foloowed


    })
  
    socket.on('postLiked', (data) => {
      console.log('data liked post  ', data);
    })
  }, [])

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
