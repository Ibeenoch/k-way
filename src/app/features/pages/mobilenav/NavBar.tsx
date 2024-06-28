import { useEffect, useState } from 'react'
import { ReactComponent as HomeLogo } from '../../../../assets/homelogo.svg';
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/plusLogo.svg';
import { ReactComponent as BellLogo } from '../../../../assets/notificationLogo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { openpostForm, selectPost } from '../home/PostSlice';
import { selectUser, setActivePage } from '../auth/authSlice';


const NavBar = () => {
    const [mobileIconModal, setMobileIconModal] = useState<boolean>(true);
    const [isHome, setisHome] = useState<boolean>(false);
    const [isTrend, setIsTrend] = useState<boolean>(false);
    const [isNotify, setisnotify] = useState<boolean>(false);
    const [ispost, setispost] = useState<boolean>(false);
    const [isprofile, setisProfile] = useState<boolean>(false);
    const [postModal, setPostModal] = useState<boolean>(false);
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { active } = useAppSelector(selectUser);
    

    const showFullMobileScreen = () => {
        setMobileIconModal(true);
      };
    
      const hideFullMobileScreen = () => {
        setMobileIconModal(false);
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
    navigate('/trendlist');
  };
  
  const goNotify = () => {
    setisHome(false);
    setIsTrend(false);
    setisnotify(true);
    setisProfile(false);
    setispost(false);
    dispatch(setActivePage('notification'));
    navigate('/notification');
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
    navigate(`/profile/${userId}`);
  };
  
  
  
  // useEffect(() => {
  //   const getPageActive = JSON.parse(localStorage.getItem('pageactive') as any);
  
  //   switch(getPageActive){
  //     case 'homepage':
  //       goHome();
  //       break;
  //     case 'trendpage':
  //       goTrend();
  //       break;
  //     case 'notifypage':
  //       goNotify();
  //       break;
  //     case 'profilepage':
  //       goProfile();
  //       break;
      
  //       default:
  //         goHome();
  //         break;
  //   }
  // }, []);

  
  const showPostModal = () => {
    setPostModal(true);
   setisHome(false);
   setIsTrend(false);
   setisnotify(false);
   setispost(true);
   dispatch(openpostForm(true));
   dispatch(setActivePage('post'))
  };


  return (
    <div>
      
      {mobileIconModal ? (
        <div className="fixed bottom-0 bg-black pr-3 pl-3 py-2 w-full rounded-full sm:hidden">

          <div className="flex gap-2 justify-around items-center">
            <HomeLogo onClick={goHome} className={`w-9 h-9 ${ active === 'home' ? 'stroke-purple-600 fill-purple-600' : 'stroke-white fill-white' } `} />
            
            {/* <SearchLogo className="w-9 h-9 fill-white stroke-white"/> */}
            <GlobalTrendLogo onClick={goTrend} className={`w-9 h-9 ${ active === 'trend' ? 'fill-purple-600 stroke-purple-600' : 'fill-white stroke-white'} `} />

            <div onClick={showPostModal} className={` ${active === 'post' ? 'bg-purple-600 p-4 border-2 border-white rounded-full' : 'p-4 bg-black border-2 border-white rounded-full'} `} >
               <PlusIcon className="w-9 h-9 stroke-2 fill-white stroke-white"/>
            </div>

              <BellLogo onClick={goNotify} className={`w-11 h-11 ${active === 'notification' ? 'stroke-purple-600' : 'stroke-white'} `} />

            <img
            onClick={goProfile}
              src={ getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url ? getUser._doc.profilePhoto.url : `${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className={`w-12 h-12 rounded-full cursor-pointer border-[3px] ${ active === 'profile' ? 'border-purple-600' : 'border-white'} `}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div
          onClick={showFullMobileScreen}
          className="fixed bottom-0 left-[40%] sm:hidden cursor-pointer"
        >
          <div className="flex justify-around items-center">
            {/* bg-[#dcfe5f] */}
            <div className="p-4 bg-black border border-white rounded-full">
              <svg
                className="w-8 h-8 fill-white stroke-white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 256 256"
                enable-background="new 0 0 256 256"
              >
                <metadata>
                  {" "}
                  Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                </metadata>
                <g>
                  <g>
                    <g>
                      <path d="M124.1,10.8c-1,0.6-2.6,1.9-3.4,3l-1.5,2L119,67.4l-0.1,51.6H68c-56.6,0-53.2-0.2-56.4,3.9c-2.2,2.9-2.2,7.6,0,10.5c3.1,4.1-0.3,3.9,56.4,3.9h50.9V188c0,56.6-0.2,53.2,3.9,56.4c2.9,2.2,7.6,2.2,10.5,0c4.1-3.1,3.9,0.3,3.9-56.4v-50.9H188c56.6,0,53.2,0.2,56.4-3.9c2.2-2.9,2.2-7.6,0-10.5c-3.1-4.1,0.3-3.9-56.4-3.9h-50.9V68c0-56.5,0.2-53.2-3.8-56.3C130.8,9.9,126.8,9.4,124.1,10.8z" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default NavBar
