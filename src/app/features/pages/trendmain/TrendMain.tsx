import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { currentSearchTrend, selectPost, topPostTrending } from '../home/PostSlice'
import { selectUser, topUserTrending } from '../auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ReactComponent as Settings } from '../../../../assets/setting.svg'
import NavBar from '../mobilenav/NavBar'

const TrendMain = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { trendingPost } = useAppSelector(selectPost);
  const { mode } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(topPostTrending())
  }, [])

  useEffect(() => {
    dispatch(topUserTrending())
  }, [])

  const viewTrend = (trend: string) => {
    dispatch(currentSearchTrend(trend));
    navigate('/trendlist')
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={`sm:mt-10 sm:rounded-xl ${mode === 'light' ? 'bg-white' : 'bg-black' } h-min `}  >
       <div className={`w-full ${ mode === 'light' ? 'bg-white text-black fill-black' : 'bg-black text-white fill-white' } h-screen rounded-3xl p-4`}>
       <div onClick={goBack} className='flex items-center py-4 gap-3 cursor-pointer'>
        <ArrowLeftIcon className='w-5 h-5 stroke-[3px] cursor-pointer' />
        <h2 className='text-sm font-semibold'>Go Back</h2>
      </div>

<div className='flex justify-between my-2 items-center px-4'>
  <div>
    <h1 className='text-sm font-semibold'>Currently Trending</h1>
  </div>

  <div>
    <Settings className='w-[12px] h-[12px]'/>
  </div>
</div>

  <h1 className='text-gray-400 pl-4 text-xs'>Trending in Nigeria</h1>
  {/* trends  */}
  
  {
    trendingPost && Array.isArray(trendingPost) && trendingPost.map((trend: any) => (
<div onClick={() =>viewTrend(trend._id)} className='flex cursor-pointer border-b border-gray-200 justify-between my-2 items-center px-4'>
  <div>
    <h1 className='text-sm font-semibold'>#{trend._id}</h1>
    <p className='text-gray-400 text-xs'>{trend.count} posts</p>
  </div>

  <div onClick={() =>viewTrend(trend._id)}>
    <button className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black' }`}> View </button>
  </div>
</div>
    ))
  }
  

</div>
<NavBar />
    </div>
  )
}

export default TrendMain
