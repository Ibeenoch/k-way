import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAUser, selectUser } from '../auth/authSlice';
import { AppContext, useAppContext } from '../home/homeContext'
import { ReactComponent as Home } from '../../../../assets/homelogo.svg';
import { ReactComponent as Envelope } from '../../../../assets/messageLogo.svg';
import { ReactComponent as GlobalTrend } from '../../../../assets/globeTrend.svg';
import { ReactComponent as Bell } from '../../../../assets/notificationLogo.svg';
import { ReactComponent as VerifyMark } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';


const Left = () => {
  const [isNews, setIsNews] = useState<boolean>(true);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const [isNotification, setisNotifications] = useState<boolean>(false);
  const [isTrends, setIsTrends] = useState<boolean>(false);
  const [isMedia, setIsMedia] = useState<boolean>(false);
  const navigate = useNavigate();
  const { profile } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { refresh, toggleRefresh } = useAppContext();
  const newsFeedActive = () => {
    localStorage.setItem('active', JSON.stringify('newsActive'));
    setIsNews(true); setIsMessage(false); setisNotifications(false); setIsTrends(false); setIsMedia(false);
    navigate('/');
  };

const dispatch = useAppDispatch();
 useEffect(() => {
  if(refresh){
    if(!getUser)return;
    const userId = getUser && getUser._doc && getUser._doc._id;
    dispatch(getAUser(userId)).then((res: any) => {
      console.log('logging update ', res);
    })
  }
 }, [refresh]);
    console.log('to refresh ', refresh);

    useEffect(() => {
      const activePage =  JSON.parse( localStorage.getItem('active') as any);
      if(activePage === 'newsActive'){
         newsFeedActive();
      }else if( activePage === 'messageActive'){
         messageActive();
      }else if( activePage === 'notificationActive'){
         notificationActive();
      }else if( activePage === 'trendsActive'){
         trendsActive();
      }else{
         console.log('none');
      }
     
    }, [])
  

  const messageActive = () => {
    localStorage.setItem('active', JSON.stringify('messageActive'));
    setIsNews(false); setIsMessage(true); setisNotifications(false); setIsTrends(false); setIsMedia(false);
    navigate('/message')
  }

  const notificationActive = () => {
    localStorage.setItem('active', JSON.stringify('notificationActive'));
    setIsNews(false); setIsMessage(false); setisNotifications(true); setIsTrends(false); setIsMedia(false);
    navigate('/notification')
  }

  const trendsActive = () => {
    localStorage.setItem('active', JSON.stringify('trendsActive'));
    setIsNews(false); setIsMessage(false); setisNotifications(false); setIsTrends(true); setIsMedia(false);
    navigate('/trendlist')
  }

  const mediaActive = () => {
    localStorage.setItem('active', JSON.stringify('mediaActive'));
    setIsNews(false); setIsMessage(false); setisNotifications(false); setIsTrends(false); setIsMedia(true);
  }

  const viewProfile = () => {
    if(getUser === null){
      navigate('/login');
      return;
    }
    navigate(`/profile/${getUser && getUser._doc && getUser._doc._id}`)
  }

  return (
    <div className='p-2 sticky top-0'>
      <div className='flex flex-col rounded-tl-3xl justify-center bg-white p-6'>
        <div className='mx-auto pb-4'>
          <Link to='/' >
        <CompanyLogo className='w-12 h-12' />
          </Link>
        </div>
        <div className='flex gap-2 items-center justify-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url && (
            <img onClick={viewProfile} className='rounded-full border border-purple-500 w-[100px] h-[100px] cursor-pointer -ml-4' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

          ) 
        }
        </div>

        {
          getUser && getUser._doc && getUser._doc && (
            <>
            
           
        <div className='flex flex-col text-center justify-center'>
            <div className="flex gap-1 justify-center items-center pt-2">
              <VerifyMark className="w-5 h-5 fill-purple-500" />
              <h1 className='text-black font-bold  cursor-pointer text-md'>{getUser && getUser._doc && getUser._doc.fullname}</h1>
            </div>
            <p className='text-gray-500 text-xs'>@{getUser && getUser._doc && getUser._doc.handle}</p>
            <p className='text-gray-500 text-xs'>{getUser && getUser._doc && getUser._doc.profession}</p>
            <p className='text-gray-500 text-xs'>{getUser && getUser._doc && getUser._doc.address}</p>
        </div>

        <div className='flex gap-1 mt-3 justify-center'>
          <div className='flex flex-col justify-center px-1 border-r-2 border-gray-400'>
            <h1 className='text-black text-center font-semibold text-[9px]'>{getUser && getUser._doc && getUser._doc.followers && getUser._doc.followers.length}</h1>
            <p className='text-[9px] text-gray-400'>Followers</p>
          </div>
          <div className='flex flex-col justify-center px-1 border-r-2 border-gray-400'>
            <h1 className='text-black dark:text-white text-center font-semibold text-[9px]'>{getUser && getUser._doc && getUser._doc.following && getUser._doc.following.length}</h1>
            <p className='text-[9px] text-gray-400'>Following</p>
          </div>
          <div className='flex flex-col justify-center px-1'>
            <h1 className='text-black dark:text-white text-center font-semibold text-[9px]'>{getUser && getUser._doc && getUser._doc.posts && getUser._doc.posts.length }</h1>
            <p className='text-[9px] text-gray-400'>Posts</p>
          </div>
        </div>
          </>
          )
        }
      </div>
       {/* nav icons destop  */}
      <div className='flex flex-col pt-4 bg-white dark:bg-dark p-2'>
        
        <div onClick={newsFeedActive} className={`group flex cursor-pointer justify-between p-2 text-black ${isNews ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
           <Home className={`w-4 h-4 group-hover:fill-purple-500 ${isNews ? 'fill-purple-500 dark:fill-purple-500': 'fill-black'}`}/>
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${isNews ? 'text-purple-500 dark:text-purple-500': 'text-black'}`}> News Feed</p>
          </div>
        <div></div>
        </div>
        
        <div onClick={messageActive} className={`group flex cursor-pointer justify-between p-2 text-black ${isMessage ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
            <Envelope className={`w-4 h-4 group-hover:fill-purple-500 ${isMessage ? 'fill-purple-500 stroke-purple-500 dark:fill-purple-500': 'fill-black'}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${isMessage ? 'text-purple-500': 'text-black'}`}> Messages</p>
          </div>
        <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${isMessage ? 'bg-purple-500 border-purple-500 text-white': 'text-black dark:text-white border border-black'} font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
          2
        </div>
        </div>
        
        <div onClick={notificationActive} className={`group flex cursor-pointer justify-between p-2 text-black ${isNotification ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
        <div className='flex gap-1 items-center'>
          <Bell className={`w-5 h-5 group-hover:fill-purple-500 ${isNotification ? 'fill-purple-500 dark:fill-purple-500': 'fill-black'}`}/>
      
      <p className={`text-xs font-semibold group-hover:text-purple-500 ${isNotification ? 'text-purple-500': 'text-black'}`}> Notification</p>
      </div>
        <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${isNotification ? 'bg-purple-500 border-purple-500 text-white': 'text-black dark:text-white border border-black'} font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
          2
        </div>
        </div>
        
        
        <div onClick={trendsActive} className={`group flex cursor-pointer justify-between p-2 ${isTrends ? 'text-purple-500 border-purple-500 border-r-2': 'text-black bg-transparent' } group-hover:text-purple-500`}>
          <div className='flex gap-1 items-center'>
           <GlobalTrend  className={`w-4 h-4 group-hover:fill-purple-500 ${isTrends ? 'fill-purple-500': 'fill-black'}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${isTrends ? 'text-purple-500': 'text-black'}`}> Trends</p>
          </div>
        <div></div>
        </div>
   
      </div>
    </div>
  )
}

export default Left
