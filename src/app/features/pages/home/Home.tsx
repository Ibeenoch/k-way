import React, { useEffect, useState } from 'react'
import Left from './Left'
import Middle from '../home/Middle'
import Right from '../home/Right'
import { useAppDispatch } from '../../../hooks'
import { getAUser } from '../auth/authAPI'
import { getAllUser } from '../auth/authSlice'

const Home = () => {
  const dispatch = useAppDispatch();
  const [userUpdated, setUserUpdated] = useState<boolean>(false);

  // useEffect(() => {
  //   dispatch(getAllUser())
  // }, [])

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
