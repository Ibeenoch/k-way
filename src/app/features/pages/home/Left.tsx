import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addCountHistory, checkIfNoteIsLoading, getAUser, getAllNotificationForAUser, getAllUser, getOtherUser, markAllNotificationForAUser, resetSearchUser, selectUser, setActivePage, setProfileType } from '../auth/authSlice';
import { useAppContext } from '../home/homeContext'
import { ReactComponent as Home } from '../../../../assets/homelogo.svg';
import { ReactComponent as Envelope } from '../../../../assets/messageLogo.svg';
import { ReactComponent as GlobalTrend } from '../../../../assets/globeTrend.svg';
import { ReactComponent as Bell } from '../../../../assets/notificationLogo.svg';
import { ReactComponent as VerifyMark } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as LoginLogo } from '../../../../assets/login.svg';
import { getAllPosts, resetSearchPost, setWhichPost } from './PostSlice';
import SkeletonMenu from '../../skeleton/SkeletonMenu';


const Left = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { active, mode } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { refresh } = useAppContext();
  const { unViewednotificationCount, unreadChatCount, whoToNotify, notificationCountHistory, allUserStatus } = useAppSelector(selectUser);
  
  const newsFeedActive = () => {
    dispatch(setActivePage('home'));
    navigate('/');
  };
  
  useEffect(() => {
    dispatch(addCountHistory(unViewednotificationCount));

  }, [unViewednotificationCount])

 useEffect(() => {
  if(refresh){
    if(!getUser)return;
    const userId = getUser && getUser._doc && getUser._doc._id;
    dispatch(getAUser(userId))
  }
 }, [refresh]);
 

  const messageActive = () => {
    dispatch(setActivePage('message'));
    navigate('/message');

  }

  const notificationActive = () => {
    dispatch(checkIfNoteIsLoading(true));
    dispatch(setActivePage('notification'));
    navigate('/notification');
   
   
  }

  const trendsActive = () => {
    dispatch(setActivePage('trend'));
    dispatch(resetSearchPost());
    dispatch(resetSearchUser());
    navigate('/trends');
  }

 const loginUser = () => {
  navigate('/login');
 }

  const viewProfile = () => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    dispatch(setWhichPost('none'))
    dispatch(setProfileType('local'));
    const userId = getUser && getUser._doc && getUser._doc._id;
    dispatch(getOtherUser(userId)).then((res: any) => {
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
    <div className={`p-2 fixed w-[22vw] top-4 ${ mode === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className={`flex ${ mode === 'light' ? 'bg-white' : 'bg-black'} flex-col rounded-tl-3xl   rounded-tr-3xl justify-center p-6`}>
      {
        allUserStatus === 'loading' ? (
          <div className={` ${ mode === 'light' ? 'bg-white' : 'bg-black'} h-svh`}>

          <SkeletonMenu />
          </div>
        ) : (

     <>
      <div >
        <div  className='mx-auto pb-4'>
          <Link to='/'>
            <CompanyLogo className='w-12 h-12' />
          </Link>
        </div>
     
        
        <div className='flex gap-2 items-center justify-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url && (
            <img onClick={viewProfile} className='rounded-full border fixed-size object-center border-purple-500 w-[100px] h-[100px] cursor-pointer -ml-4' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="profileurl" />

          ) 
        }
        </div>

        {
          getUser && getUser._doc && getUser._doc.fullname && (
            <>
            
           
        <div className='flex flex-col text-center justify-center'>
            <div className="flex gap-1 justify-center items-center pt-2">
              <VerifyMark className="w-5 h-5 fill-purple-500" />
              <h1 className={`${ mode === 'light' ? 'text-black' : 'text-white'} font-bold  cursor-pointer text-md`} >{getUser && getUser._doc && getUser._doc.fullname}</h1>
            </div>
            <p className='text-gray-500 text-xs'>@{getUser && getUser._doc && getUser._doc.handle}</p>
            <p className='text-gray-500 text-xs'>{getUser && getUser._doc && getUser._doc.profession}</p>
            <p className='text-gray-500 text-xs'>{getUser && getUser._doc && getUser._doc.address}</p>
        </div>

        <div className='flex gap-1 mt-3 justify-center'>
          <div className={`flex flex-col justify-center px-1 border-r-2 border-gray-400 ${mode === 'light' ? 'text-black' : 'text-white'} `}>
            <h1 className={`text-center ${mode === 'light' ? 'text-black' : 'text-white' } font-semibold text-[9px]`} >{getUser && getUser._doc && getUser._doc.followers && getUser._doc.followers.length}</h1>
            <p className='text-[9px] text-gray-500'>Followers</p>
          </div>
          <div className='flex flex-col justify-center px-1 border-r-2 border-gray-400'>
            <h1 className={`text-center font-semibold text-[9px] ${ mode === 'light' ? 'text-black' : 'text-white' }`}>{getUser && getUser._doc && getUser._doc.following && getUser._doc.following.length}</h1>
            <p className='text-[9px] text-gray-500'>Following</p>
          </div>
          <div className='flex flex-col justify-center px-1'>
            <h1 className={`text-center font-semibold text-[9px] ${ mode === 'light' ? 'text-black' : 'text-white' }`}>{getUser && getUser._doc && getUser._doc.posts && getUser._doc.posts.length }</h1>
            <p className='text-[9px] text-gray-500'>Posts</p>
          </div>
        </div>
          </>
          )
        }

        {
          getUser && getUser._doc && !getUser._doc.fullname && (
            <>
            <div onClick={() =>editProfile(getUser && getUser._doc && getUser._doc._id)} className={`flex gap-2 justify-center items-center rounded-2xl cursor-pointer border border-purple-600 group hover:bg-purple-600 border hover:border-purple-600 sm:mx-2 lg:mx-8 py-2 ${ mode === 'light' ? 'bg-white border border-purple-600' : 'bg-black'}`}>
              <h2 className={`${ mode === 'light' ? 'text-purple-600' : 'text-purple-600'} text-[11px] font-semibold text-center group-hover:text-purple-600`} >Edit Profile</h2> 
              <EditLogo className={`w-4 h-4 ${mode === 'light' ? 'stroke-purple-600 fill-purple-600 group-hover:stroke-white group-hover:fill-white' : 'stroke-purple-600 fill-purple-600 group-hover:stroke-white group-hover:fill-white'}`} />
            </div>
            </>
          )
        }
        {
           getUser === null && (
            <div onClick={loginUser} className={`flex gap-2 justify-center items-center rounded-2xl cursor-pointer group stroke-purple-600 group-hover:stroke-white border  border-purple-600 sm:mx-2 lg:mx-8 py-2 ${ mode === 'light' ? 'bg-white group-hover:bg-purple-600 text-purple-600' : 'bg-black group-hover:bg-purple-600 text-purple-600 group-hover:text-white'}`} >
            <LoginLogo className='w-5 h-5 ' />
            <h2 className='text-[11px] font-semibold text-center'>Login</h2> 
          </div>
          )
        }
            
      
      </div>
       {/* nav icons desktop  */}
      <div className={`flex flex-col pt-4 ${ mode === 'light'? 'bg-white text-black fill-black' : 'bg-black text-white fill-white' } dark:bg-dark pt-2 pl-2 pr-2 pb-[150px]`} >
        
        <div onClick={newsFeedActive} className={`group flex cursor-pointer justify-between p-2  ${ active === 'home' ? 'border-r-[3px] border-l-[3px] border-purple-600': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
           <Home className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'home' ? 'fill-purple-500 dark:fill-purple-500': ''}`}/>
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'home' ? 'text-purple-500 dark:text-purple-500': ''}`}> News Feed</p>
          </div>
        <div></div>
        </div>
        
        <div onClick={messageActive} className={`group flex cursor-pointer justify-between p-2 ${active === 'message' ? 'border-r-[3px] border-l-[3px] border-purple-600': 'border-0' } group-hover:text-purple`}>
          <div className='flex gap-1 items-center'>
            <Envelope className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'message' ? 'fill-purple-500 stroke-purple-500 dark:fill-purple-500': ''}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'message' ? 'text-purple-500': ''}`}> Messages</p>
          </div>
          {
            unreadChatCount > 0 && (
            <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${active === 'message' ? 'bg-purple-500 border-purple-500 text-white': 'border border-black'} font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
              {unreadChatCount}
            </div>  
            )
          }
        
        </div>
        
        <div onClick={notificationActive} className={`group flex cursor-pointer justify-between p-2 ${active === 'notification' ? 'border-r-[3px] border-l-[3px] border-purple-600': 'border-0' } group-hover:text-purple`}>
        <div className='flex gap-1 items-center'>
          <Bell className={`w-5 h-5 -ml-1 group-hover:fill-purple-500 ${active === 'notification' ? 'fill-purple-500 dark:fill-purple-500': ''}`}/>
      
      <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'notification' ? 'text-purple-500': ''}`}> Notification</p>
      </div>
      {
       whoToNotify === me && unViewednotificationCount && unViewednotificationCount > 0 ? (
        <div className={`group-hover:text-purple-500 group-hover:rounded-full group-hover:bg-purple-500 ${active === 'notification' ? 'bg-purple-500 border-purple-500 text-white' : unViewednotificationCount > 0 ? 'bg-purple-500 border-purple-500 text-white' : 'dark:text-white '} ${ mode === 'light' ? 'border border-black' : 'border border-white' } font-semibold group-hover:border group-hover:border-purple-500 group-hover:bg-white p-1 group-hover:text-black w-4 h-4 flex items-center justify-center text-[9px] rounded-full`}>
          { whoToNotify === me && unViewednotificationCount && unViewednotificationCount}
        </div>
        
        ) : (<></> )
      }  
        </div>
        
        
        <div onClick={trendsActive} className={`group flex cursor-pointer justify-between p-2 ${active === 'trend' ? 'text-purple-500 border-purple-600 border-r-[3px] border-l-[3px]': '' } group-hover:text-purple-500`}>
          <div className='flex gap-1 items-center'>
           <GlobalTrend  className={`w-4 h-4 group-hover:fill-purple-500 ${active === 'trend' ? 'fill-purple-500': ''}`} />
          <p className={`text-xs font-semibold group-hover:text-purple-500 ${active === 'trend' ? 'text-purple-500': ''}`}> Trends</p>
          </div>
        <div></div>
        </div>
   
      </div>
      </>
       )
      }
      </div>
    </div>
  )
}

export default Left
