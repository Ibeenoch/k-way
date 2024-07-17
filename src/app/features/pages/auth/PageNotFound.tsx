import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks'
import { selectUser } from './authSlice'

const PageNotFound = () => {
    const { mode } = useAppSelector(selectUser)
  return (
    <div className='bg-gray-800'>
        <div className={`h-screen ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'} w-full flex flex-col p-4 justify-center items-center max-w-lg mx-auto`}>
        <img src={`${process.env.PUBLIC_URL}/images/noresultfound1.png`} alt="nosearchresultfound" className='w-full h-full' />
        <h1 className='text-sm font-bold'>Oops, the Page Is Not Found</h1>

        <Link to='/'>
        <button className='text-purple-600 my-8 px-4 py-1 border border-purple-600 rounded-xl hover:bg-purple-600 hover:text-white'>

        Return to Home Page
        </button>
        </Link>

        </div>
    </div>
  )
}

export default PageNotFound
