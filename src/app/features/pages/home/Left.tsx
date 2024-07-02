import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAUser, getAllNotificationForAUser, getAllUser, getOtherUser, markAllNotificationForAUser, selectUser, setActivePage, setProfileType } from '../auth/authSlice';
import { AppContext, useAppContext } from '../home/homeContext'
import { ReactComponent as Home } from '../../../../assets/homelogo.svg';
import { ReactComponent as Envelope } from '../../../../assets/messageLogo.svg';
import { ReactComponent as GlobalTrend } from '../../../../assets/globeTrend.svg';
import { ReactComponent as Bell } from '../../../../assets/notificationLogo.svg';
import { ReactComponent as VerifyMark } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as LoginLogo } from '../../../../assets/login.svg';
import { getAllPosts } from './PostSlice';


const Left = () => {
  const dispatch = useAppDispatch();
  const [isNews, setIsNews] = useState<boolean>(true);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const [isNotification, setisNotifications] = useState<boolean>(false);
  const [isTrends, setIsTrends] = useState<boolean>(false);
  const [isMedia, setIsMedia] = useState<boolean>(false);
  const navigate = useNavigate();
  const { active } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { refresh, toggleRefresh } = useAppContext();
  const { notifications, notification, unViewednotificationCount, unreadChatCount, whoToNotify } = useAppSelector(selectUser);

  const newsFeedActive = () => {
    dispatch(setActivePage('home'));
    dispatch(getAllPosts()).then((res: any) => {
      if(res && res.payload !== undefined){
        navigate('/');
      }
    })
  };
  

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
 

  const messageActive = () => {
    dispatch(setActivePage('message'));
    dispatch(getAllUser()).then((res: any) => {
      if(res && res.payload !== undefined){
        console.log('llll ', res);
        navigate('/message');
      }
    } )
  }

  const notificationActive = () => {
    dispatch(setActivePage('notification'));
    const postId = notification && notification.post;
    console.log('post id for notification ', postId);
    const userId = getUser && getUser._doc && getUser._doc._id;
    const token = getUser && getUser.token;
    const note = { userId, token, postId };
    dispatch(markAllNotificationForAUser(note)).then((res: any) => {
      
      dispatch(getAllNotificationForAUser(note)).then((res: any) => {
        console.log('get not ', res);
        if(res && res.payload !== undefined){
          navigate('/notification');
        }
      })
    })
  }

  const trendsActive = () => {
    dispatch(setActivePage('trend'));
    navigate('/trendlist')
  }

  console.log('getuser ', getUser);
 const loginUser = () => {
  navigate('/login');
 }

  const viewProfile = () => {
    if(getUser === null){
      navigate('/login');
      return;
    }
    dispatch(setProfileType('local'));
    const userId = getUser && getUser._doc && getUser._doc._id;
    dispatch(getOtherUser(userId)).then((res) => {
      console.log(' other user ', res);
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
      }
    })
    
  }

  const editProfile = (userId: string) => {
    navigate(`/profile/create/${userId}`)
  }
const me = getUser && getUser._doc && getUser._doc._id;
  return (
    <div className='p-2 sticky top-0'>
      <div className='flex flex-col rounded-tl-3xl justify-center bg-white p-6'>
        <div  className='mx-auto pb-4'>
        <CompanyLogo className='w-12 h-12' />
        </div>
        <div className='flex gap-2 items-center justify-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url && (
            <img onClick={viewProfile} className='rounded-full border fixed-size object-center border-purple-500 w-[100px] h-[100px] cursor-pointer -ml-4' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

          ) 
        }
        </div>

        {
          getUser && getUser._doc && getUser._doc.fullname && (
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

        {
          getUser && getUser._doc && !getUser._doc.fullname && (
            <>
            <div onClick={() =>editProfile(getUser && getUser._doc && getUser._doc._id)} className='flex gap-2 justify-center items-center rounded-2xl cursor-pointer group hover:bg-white border hover:border-black sm:mx-2 lg:mx-8 py-2 bg-black'>
              <h2 className='text-white text-[11px] font-semibold text-center group-hover:text-black'>Edit Profile</h2> 
              <EditLogo className='w-4 h-4 stroke-white group-hover:stroke-black' />
            </div>
            </>
          )
        }
        {
           getUser === null && (
            <div onClick={loginUser} className='flex gap-2 justify-center items-center rounded-2xl cursor-pointer group hover:bg-white border hover:border-black sm:mx-2 lg:mx-8 py-2 bg-black'>
            <LoginLogo className='w-5 h-5 stroke-white group-hover:stroke-black' />
            <h2 className='text-white text-[11px] font-semibold text-center group-hover:text-black'>Login</h2> 
          </div>
          )
        }
      </div>
       {/* nav icons desktop  */}
      <div className='flex flex-col pt-4 bg-white dark:bg-dark p-2'>
        
        <div onClick={newsFeedActive} className={`group flex cursor-pointer justify-between p-2 text-black ${ active === 'home' ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
           <Home className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'home' ? 'fill-purple-500 dark:fill-purple-500': 'fill-black'}`}/>
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'home' ? 'text-purple-500 dark:text-purple-500': 'text-black'}`}> News Feed</p>
          </div>
        <div></div>
        </div>
        
        <div onClick={messageActive} className={`group flex cursor-pointer justify-between p-2 text-black ${active === 'message' ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
            <Envelope className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'message' ? 'fill-purple-500 stroke-purple-500 dark:fill-purple-500': 'fill-black'}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'message' ? 'text-purple-500': 'text-black'}`}> Messages</p>
          </div>
          {
            unreadChatCount > 0 && (
            <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${active === 'message' ? 'bg-purple-500 border-purple-500 text-white': 'text-black dark:text-white border border-black'} font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
              {unreadChatCount}
            </div>  
            )
          }
        
        </div>
        
        <div onClick={notificationActive} className={`group flex cursor-pointer justify-between p-2 text-black ${active === 'notification' ? 'border-r-2 border-r-purple-500': 'border-0' } group-hover:text-purple`}>
        <div className='flex gap-1 items-center'>
          <Bell className={`w-5 h-5 -ml-1 group-hover:fill-purple-500 ${active === 'notification' ? 'fill-purple-500 dark:fill-purple-500': 'fill-black'}`}/>
      
      <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'notification' ? 'text-purple-500': 'text-black'}`}> Notification</p>
      </div>
      {
       whoToNotify === me && unViewednotificationCount && unViewednotificationCount > 0 ? (
        <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${active === 'notification' ? 'bg-purple-500 border-purple-500 text-white' : unViewednotificationCount > 0 ? 'bg-purple-500 border-purple-500 text-white' : 'text-black dark:text-white border border-black'} font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
          { whoToNotify === me && unViewednotificationCount && unViewednotificationCount}
        </div>
        
        ) : (<></> )
      }  
        </div>
        
        
        <div onClick={trendsActive} className={`group flex cursor-pointer justify-between p-2 ${active === 'trend' ? 'text-purple-500 border-purple-500 border-r-2': 'text-black bg-transparent' } group-hover:text-purple-500`}>
          <div className='flex gap-1 items-center'>
           <GlobalTrend  className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'trend' ? 'fill-purple-500': 'fill-black'}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'trend' ? 'text-purple-500': 'text-black'}`}> Trends</p>
          </div>
        <div></div>
        </div>
   
      </div>
    </div>
  )
}

export default Left
