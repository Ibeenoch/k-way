import { useEffect, useState } from 'react'
import { ReactComponent as HomeLogo } from '../../../../assets/homelogo.svg';
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/plusLogo.svg';
import { ReactComponent as BellLogo } from '../../../../assets/notificationLogo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { openpostForm, selectPost, shouldWeHideMobileNav } from '../home/PostSlice';
import { getAllNotificationForAUser, getOtherUser, markAllNotificationForAUser, selectUser, setActivePage } from '../auth/authSlice';


const NavBar = () => {
    const [mobileIconModal, setMobileIconModal] = useState<boolean>(true);
    const [isHome, setisHome] = useState<boolean>(false);
    const [isTrend, setIsTrend] = useState<boolean>(false);
    const [isNotify, setisnotify] = useState<boolean>(false);
    const [ispost, setispost] = useState<boolean>(false);
    const [isprofile, setisProfile] = useState<boolean>(false);
    const [postModal, setPostModal] = useState<boolean>(false);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { active, unViewednotificationCount, whoToNotify, viewingProfile, notification, mode } = useAppSelector(selectUser);
    const { whichPost, hideMobileNav } = useAppSelector(selectPost);
    const { viewingStory } = useAppSelector(selectPost);
    
    const me = getUser && getUser._doc && getUser._doc._id;

    const showFullMobileScreen = () => {
        setMobileIconModal(true);
      };
    
      const hideFullMobileScreen = () => {
        setMobileIconModal(false);
        dispatch(shouldWeHideMobileNav(false));
      };

      const goHome = () => {
        setisHome(true);
        setIsTrend(false);
        setisnotify(false);
        setisProfile(false);
        setispost(false);
        dispatch(openpostForm(false));
        dispatch(setActivePage('home'));
        navigate('/');
      };

      
const goTrend = () => {
    setisHome(false);
    setIsTrend(true);
    setisnotify(false);
    setisProfile(false);
    setispost(false);
    dispatch(setActivePage('trend'));
    navigate('/trends');
  };
  
  const goNotify = () => {
    setisHome(false);
    setIsTrend(false);
    setisnotify(true);
    setisProfile(false);
    setispost(false);
    dispatch(setActivePage('notification'));
    navigate('/notification');
    const postId = notification && notification.post;
    console.log('post id for notification ', postId);
    const userId = getUser && getUser._doc && getUser._doc._id;
    const token = getUser && getUser.token;
    const note = { userId, token, postId };

    dispatch(markAllNotificationForAUser(note)).then((res: any) => {
      
      dispatch(getAllNotificationForAUser(note)).then((res: any) => {
        console.log('get not ', res);
        if(res && res.payload !== undefined){
          
        }
      })
    })
  };
  
  const goProfile = () => {
    setisHome(false);
    setIsTrend(false);
    setisnotify(false);
    setisProfile(true);
    setispost(false);
    dispatch(setActivePage('profile'));
    if(!getUser)return;
    const userId = getUser && getUser._doc && getUser._doc._id;
    dispatch(getOtherUser(userId)).then((res: any) => {
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
      }
    })
  };
  
  
  const showPostModal = () => {
    dispatch(shouldWeHideMobileNav(true));
    navigate('/');
    setPostModal(true);
   setisHome(false);
   setIsTrend(false);
   setisnotify(false);
   setispost(true);
   dispatch(openpostForm(true));
   dispatch(setActivePage('post'))
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      
      {mobileIconModal ? (
        <div className={`fixed ${postModal || viewingStory || viewingProfile || whichPost === 'post' || whichPost === 'story' || hideMobileNav  ? 'z-0' : 'z-40'} left-0 bottom-0 ${mode === 'light' ? 'fill-white bg-black'   : 'bg-gray-800'} pr-3 pl-3 py-2 w-full rounded-full sm:hidden`} >

          <div className="flex gap-2 justify-around items-center">
            <HomeLogo onClick={goHome} className={`w-7 h-7 ${ active === 'home' ? 'stroke-purple-600 fill-purple-600' : 'stroke-white fill-white' } ${mode === 'light' ? 'fill-white' : 'fill-black' }`} />
            
            <GlobalTrendLogo onClick={goTrend} className={`w-7 h-7 ${ active === 'trend' ? 'fill-purple-600 stroke-purple-600' : 'fill-white stroke-white'} ${mode === 'light' ? 'fill-white' : 'fill-black' }`} />

            <div onClick={showPostModal} className={` ${active === 'post' ? 'bg-purple-600 p-3 border-2 border-white rounded-full' : 'p-3 bg-black border-2 border-white rounded-full'} ${mode === 'light' ? 'fill-white' : 'fill-black' }`} >
               <PlusIcon className="w-7 h-7 stroke-2 fill-white stroke-white"/>
            </div>
            <div className='relative flex items-center'>
              <BellLogo onClick={goNotify} className={`w-9 h-9 ${active === 'notification' ? 'stroke-purple-600' : 'stroke-white'} ${mode === 'light' ? 'fill-white' : 'fill-black' }`} />
             {
              whoToNotify === me && unViewednotificationCount && unViewednotificationCount > 0 && (
              <div className='text-white bg-purple-600 rounded-full absolute px-2 py-[0.8px] top-0 right-0 text-sm font-semibold'>
              { whoToNotify === me && unViewednotificationCount && unViewednotificationCount} 
              </div> 
              )
             }
              
            </div>
            <img
            onClick={goProfile}
              src={ getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url ? getUser._doc.profilePhoto.url : `${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className={`w-10 h-10 rounded-full cursor-pointer border-[3px] ${ active === 'profile' ? 'border-purple-600' : 'border-white'} `}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div
          onClick={showFullMobileScreen}
          className="fixed bottom-0 left-5 sm:hidden cursor-pointer"
        >
          <div className="flex justify-around items-center">
            <div className="p-4 bg-black border border-white rounded-full">
             <PlusIcon  className="w-8 h-8 fill-white stroke-white"/>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default NavBar
