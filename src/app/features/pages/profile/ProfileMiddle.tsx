import NavBar from "../mobilenav/NavBar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {  getAllUser, getOtherUser, setProfileType, userFollowing, getFollowers, getFollowing, addNotification, getAllNotificationForAUser, selectUser, userFollowers, setIsVewingProfile, findChatIdForTwoUsers, fetchChat, changeMode } from "../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from '../../../../index'
import { ReactComponent as LogoutLogo } from '../../../../assets/logout.svg';
import { allImagesUserAPost, getAllUserPosts,  setWhichPost,  shouldWeHideMobileNav } from '../home/PostSlice';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { allCommentForAPost, bookmarkPost, commentOnPost, deletePost, getAPost, getAllPosts, getBookmarkforaPost, getLikesforaPost, getresharedforaPost, likePost, rePost, selectPost,  } from "../home/PostSlice";
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as LightModeLogo } from '../../../../assets/lighmode.svg';
import { ReactComponent as DarkModeLogo } from '../../../../assets/darkmode.svg';
import { ReactComponent as MenuLogo } from '../../../../assets/threeDot.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { useAppContext } from "../home/homeContext";
import Post from "../../../../utils/Post";

interface IPost {
  _id: string;
  reShared?: boolean;
  reShare?: Array<any>;
  allReshare?: Array<any>;
  owner: {
    _id: string;
    profilePhoto?: {
      url: string;
    };
    fullname: string;
    handle: string;
  };
  bookmark: Array<string>;
  likes: Array<string>;
  comments: Array<string>;
  createdAt: string;
  content: string;
  photos?: Array<{ url: string }>;
  video?: { url: string };
}


const ProfileMiddle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState<boolean>(false);
    const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
    const [mobileModal, setMobileModal] = useState<boolean>(false);
    const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);
    const [postModal, setPostModal] = useState<boolean>(false);
    const [showfeed, setShowFeed] = useState<boolean>(true);
    const [showupload, setShowupload] = useState<boolean>(false);
    const [showfollowers, setShowFollowers] = useState<boolean>(false);
    const [showfollowing, setShowFollowing] = useState<boolean>(false);
    const { user, followers, following, otherperson, mode } = useAppSelector(selectUser);
    const [currentPostId, setCurrentPostId] = useState<string>("");
    const [displayImage, setDisplayImage] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [toRefresh, setToRefresh] = useState<boolean>(false);
    const { posts, imageUpload, usersPosts } = useAppSelector(selectPost);
    const { viewingProfile } = useAppSelector(selectUser);

  
    const getUser = JSON.parse(localStorage.getItem('user') as any);


    const getPost = (currentPostId: string) => {
      dispatch(getAPost(currentPostId)).then((res: any) => {
        if(res && res.payload !== undefined){
          dispatch(allCommentForAPost(currentPostId))
           
        }
      })
    };
  
  
    useEffect(() => {
      getPost(currentPostId);
    }, [toRefresh]);
  
  
  
    useEffect(() => {
       dispatch(shouldWeHideMobileNav(false));
       setDesktopMenu(false);
       setMenu(false);
    }, [postModal])
  
    
    const hideDeskTopMenu = (e: MouseEvent) => {
     if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        setDesktopMenu(false);
        dispatch(shouldWeHideMobileNav(false));
      }
    };

  
    const showUploadedMobileModal = (img: any) => {
      dispatch(shouldWeHideMobileNav(true));
      setDisplayImage(img);
      setMobileModal(true);
    };
    
  
    useEffect(() => {
      dispatch(shouldWeHideMobileNav(false));
     const hideMobileMenu = (e: MouseEvent) => {
      if ( mobileMenuRef.current && !mobileMenuRef.current.contains(e.currentTarget as Node)) {
        setMenu(false);
      }
    };
          
      document.addEventListener("mousedown", hideMobileMenu);
  
      return () => {
        document.removeEventListener("mousedown", hideMobileMenu);
      };
    }, [mobileMenuRef]);
  
    useEffect(() => {
      if(hideDeskTopMenu){
        document.addEventListener("mousedown", hideDeskTopMenu);
      }else{
        document.addEventListener("mousedown", hideDeskTopMenu);
          };
  
      return () => {
        document.removeEventListener("mousedown", hideDeskTopMenu);
      };
    }, [hideDeskTopMenu]);
  
  
 
      const userStored = JSON.parse(localStorage.getItem('user') as any);
   
    const me = userStored && userStored._doc && userStored._doc._id;
    const fetchFeeds = () => {
      if(id){
          dispatch(setWhichPost('none'));
          dispatch(getAllUserPosts(id))
      }
      
    };

    const activateFeed = () => {
        setShowFeed(true);
        setShowupload(false);
        setShowFollowers(false);
        setShowFollowing(false);
        fetchFeeds();
    }

    const activateUpload = () => {
        setShowFeed(false);
        setShowupload(true);
        setShowFollowers(false);
        setShowFollowing(false);
        const userId = id;
        const data = { userId };
        dispatch(allImagesUserAPost(data));
    }
    const getFollower = (id: string) => {
      dispatch(getFollowers(id))
    };

    const activateFollowers = ( ) => {
        setShowFeed(false);
        setShowupload(false);
        setShowFollowers(true);
        setShowFollowing(false);
        if(id){
          getFollower(id);
        }
    }

    const gettheFollowing = (uid: string) => {
      dispatch(getFollowing(uid))
    };

    const activateFollowing = () => {
        setShowFeed(false);
        setShowupload(false);
        setShowFollowers(false);
        setShowFollowing(true);
        if(id){
          gettheFollowing(id);
        }
    }
  
  
    const hideFullScreen = () => {
      setFullVideoScreen(false);
      dispatch(shouldWeHideMobileNav(false));
    };
  
 

    const logoutUser = () => {
      localStorage.clear();
      navigate('/login');
    }
  
 

    const handleFollow = () => {
      const token = userStored && userStored.token;
      const userId = otherperson && otherperson._doc && otherperson._doc._id;
      const follow = { token, userId };
      dispatch(setProfileType('local'));
      dispatch(userFollowers(follow))
    };

    useEffect(() => {
      const handlefollowed = (data: any) => {
        dispatch(addNotification(data)).then((res: any) => {
          const userId = res && res.payload && res.payload.receiver;
          const token = userStored && userStored.token;
  
          const note = { userId, token }
  
          dispatch(getAllNotificationForAUser(note))
        });
      };
    
      socket.on('followed', handlefollowed);
    
      return () => {
        socket.off('followed', handlefollowed);
      };
    }, [socket]);
  
  
  
    const hideMobileMenu = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        let mobile = document.getElementById("mobilemenu");
        if (mobile) {
          console.log("not mobile");
          setMenu(false);
        }
      }
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        let desktop = document.getElementById("desktopmenu");
        if (desktop) {
          console.log("not desktop");
          dispatch(shouldWeHideMobileNav(false));
          setDesktopMenu(false);
        }
      }
    };
  
    const hideMobileModal = () => {
      dispatch(setIsVewingProfile(false));
      setMobileModal(false);        
      dispatch(shouldWeHideMobileNav(false));
    };

    useEffect(() => {
      document.addEventListener("mousedown", hideMobileMenu);
  
      return () => {
        document.removeEventListener("mousedown", hideMobileMenu);
      };
    }, []);
    
   

    const handleChat = (userId: string) => {
      const getUser = JSON.parse(localStorage.getItem('user') as any);
      const myId = getUser && getUser._doc && getUser._doc._id;
      const token = getUser && getUser.token;
      const findChatid = { token, userId, myId };

      dispatch(findChatIdForTwoUsers(findChatid)).then((res: any) => {
        if(res && res.payload !== undefined){
          const chatId = res && res.payload
        socket.emit('joinChat', chatId);
        const data = { token, chatId };
        dispatch(fetchChat(data)).then((res: any) => {
          if(res && res.payload !== undefined){
            navigate(`/chatroom/${userId}/${myId}/${chatId}`)
          }
        });

        }
        

      })

    }
  

    useEffect(() => {
      fetchFeeds()
    }, [])
  
    const editProfile = () => {
      if(otherperson && otherperson._doc && otherperson._doc._id === id ){
        navigate(`/profile/create/${otherperson && otherperson._doc && otherperson._doc._id}`);
      }
    }

    if(otherperson && otherperson._doc && !otherperson._doc.fullname){
      navigate(`/profile/create/${otherperson && otherperson._doc && otherperson._doc._id}`);
    }
   const firstUser =  otherperson && otherperson._doc && otherperson._doc._id;
   const secondUser = userStored && userStored._doc && userStored._doc._id;
   const checkmyFollower = getUser && getUser._doc && getUser._doc.followers && getUser._doc.followers.includes(firstUser);

   const handleGoBack = () => {
    navigate(-1);
  };

  const changeToDarkMode = () => {
    dispatch(changeMode('dark'));
  }

  const changeToLightMode = () => {
    dispatch(changeMode('light'));
  }

  const handleViewImage = (img: string, id: string) => {
    dispatch(shouldWeHideMobileNav(true));
    dispatch(setIsVewingProfile(true))
    setDisplayImage(img);
    setDisplayImage(img);
    setMobileModal(true);
};



return (
  <div>
    <div className={` h-min max-w-md sm:mt-10 sm:max-w-full ${mode === 'light' ? 'bg-white text-black fill-black' : 'bg-black text-white fill-white' } sm:rounded-tl-3xl sm:rounded-tr-3xl`}>
      
      <div className='sm:flex flex justify-between gap-2 p-2 sm:p-4 cursor-pointer'>
      <div onClick={handleGoBack} className='flex items-center py-4 pl-3 gap-3 cursor-pointer'>
        <ArrowLeftIcon className='w-5 h-5 stroke-[3px] cursor-pointer' />
        <h2 className='text-sm font-semibold'>Go Back</h2>
      </div>

        <div className="flex p-4">
          {
            mode === 'light' ? (
              <>
              <LightModeLogo onClick={changeToDarkMode} className={`cursor-pointer w-6 h-6 ${ mode === 'light' ? 'fill-black' : 'fill-white'}`} />
              </>
            ) : (
              <>
              <DarkModeLogo onClick={changeToLightMode} className={`cursor-pointer w-6 h-6 ${ mode === 'dark' ? 'fill-white' : 'fill-black'}`} />
              </>
            )
          }
        </div>
      </div>

      <div className={`flex flex-col rounded-tl-3xl justify-center items-center ${ mode === 'light' ? 'bg-white' : 'bg-black'} p-6`}>
        
        <div className='flex gap-2 items-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
          otherperson && otherperson._doc && otherperson._doc.profilePhoto && otherperson._doc.profilePhoto.url ? (
            <>
            <div className="relative">
            <img onClick={() => handleViewImage(otherperson && otherperson._doc && otherperson._doc.profilePhoto && otherperson._doc.profilePhoto.url, otherperson && otherperson._doc && otherperson._doc._id)} className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={otherperson && otherperson._doc && otherperson._doc.profilePhoto && otherperson._doc.profilePhoto.url} alt="img" />
             {
              otherperson && otherperson._doc && otherperson._doc._id === id  && (
                <>
                <div onClick={editProfile} className="absolute bottom-0 right-9 cursor-pointer">
                <EditLogo className={`w-5 h-5 ${ mode === 'dark' ? 'fill-white' : 'fill-black'}`}/>              
                </div> 
                </>
                
              )
             }
             
            </div>
            
            </>
          ) : (
            <>
            <div className="relative">
             <img className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
             {
              otherperson && otherperson._doc && otherperson._doc._id === id  && (
                <>
                <div onClick={editProfile} className="absolute bottom-0 right-9 cursor-pointer">
                <EditLogo className={`w-5 h-5 ${ mode === 'dark' ? 'fill-white' : 'fill-black'}`}/>              
                </div> 
                </>
                
              )
             }
            </div>
            
            </>
          )
        }      
         
        </div>
        {
        firstUser !== secondUser && checkmyFollower && (
          <div className="flex justify-center mt-2">

          <p className={`text-gray-500 text-[11px] ${ mode === 'light' ? 'bg-gray-100 bg-opacity-50' : 'bg-gray-100 bg-opacity-80'}  rounded-xl px-2 sm:py-2`}>Follows you</p>
          </div>
        )
      }


        <div className='flex flex-col text-center justify-center'>
            <div className="flex gap-1 justify-center items-center pt-2">
              <VerifyMarkLogo className="w-7 h-7 fill-purple-600"/>
            <h1 className={`${ mode === 'light' ? 'text-black' : 'text-white'} font-bold  cursor-pointer text-md`}>{otherperson && otherperson._doc && otherperson._doc.fullname}</h1>
            </div>
            <p className='text-gray-500 text-xs'>@{otherperson && otherperson._doc && otherperson._doc.handle}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.profession}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.address}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.dateOfBirth}</p>
            <p className='text-gray-500 text-xs max-w-sm'>{otherperson && otherperson._doc && otherperson._doc.bio}</p>
        </div>

        <div className={`flex gap-1 mt-3 ${ mode === 'light' ? 'text-black' : 'text-white'} `} >
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.followers && otherperson._doc.followers.length  }</h1>
            <p className='text-xs text-gray-400'>Followers</p>
          </div>
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.following && otherperson._doc.following.length }</h1>
            <p className='text-xs text-gray-400'>Following</p>
          </div>
          <div className='flex flex-col justify-center px-3'>
            <h1 className='text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.posts && otherperson._doc.posts.length }</h1>
            <p className='text-xs text-gray-400'>Posts</p>
          </div>
        </div>
      </div>
     
        { firstUser !== secondUser ? (
      <div className={`mx-auto flex justify-center gap-6 py-4 ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'} `}>
        <button onClick={handleFollow} className={`bg-black text-white hover:bg-purple-600 hover:text-white duration-200 hover:border-white hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1`}>{
      user && user._doc && user._doc.following &&  user._doc.following.includes(otherperson && otherperson._doc && otherperson._doc._id) ? 'Following' : 'Follow'
      }
      </button>
        <button onClick={() =>handleChat(otherperson && otherperson._doc && otherperson._doc._id)} className="text-white bg-black hover:bg-purple-600 hover:text-white duration-200 hover:border-white hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1">Chat</button>
      </div>    
          ) : (
            <div className="mx-auto flex justify-center gap-6 py-4 ">
            <button onClick={logoutUser} className="text-white bg-black hover:bg-purple-600 hover:text-white duration-200 hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1 flex gap-0 items-center"> <LogoutLogo className="w-5 h-5 stroke-white fill-none" /> <p>Logout</p></button>
          </div> 
          )
        }

 

    <div className={`flex justify-around px-2 mb-4 ${ mode === 'light' ? 'text-black': 'text-white'} `}>
    <h1 onClick={activateFeed} className={`text-lg cursor-pointer font-bold ${showfeed ? 'text-purple-500 border-b-2 border-purple-500': '' } pl-3`}>
      Feeds
    </h1>
    <h1 onClick={activateFollowers} className={`text-lg cursor-pointer font-bold ${showfollowers ? 'text-purple-500  border-b-2 border-purple-500': '' } pl-3`}>
      Followers
    </h1>
    <h1 onClick={activateFollowing} className={`text-lg cursor-pointer font-bold ${showfollowing ? 'text-purple-500  border-b-2 border-purple-500': '' } pl-3`}>
      Following
    </h1>
    <h1 onClick={activateUpload} className={`text-lg cursor-pointer font-bold ${showupload ? 'text-purple-500  border-b-2 border-purple-500': '' } pl-3`}>
      Uploads
    </h1>
    </div>
      <div className={`pb-[85px] h-min ${mode === 'light' ? 'bg-white' : 'bg-black'} `}>
        { showfeed  ? (
          <>
           {

            usersPosts && Array.isArray(usersPosts) && usersPosts.map((post: IPost, index: number) => (       
            <Post post={post} key={post._id} />
            ))
            
            }
            </>
        ) : 
        showfollowers && Array.isArray(followers) && followers.length > 0 ? followers.map((follower: any, index: number) => (
          <>
          {/* followers  */}

     <div key={index} className={`w-full ${ mode === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} mt-[0.9px] rounded-3xl p-4`} >
       {/* people */}

       <div className='flex justify-between items-center my-2 px-4'>
         <div className='flex gap-2'>
           <img className='w-9 h-9 rounded-full' src={follower && follower.profilePhoto && follower.profilePhoto.url} alt="followers" />
         <div>
           <h1 className='text-sm dark:text-white font-semibold'>{follower && follower.fullname}</h1>
           <p className='text-xs text-gray-600'>@{follower && follower.handle}</p>
         </div>
         </div>
         
         <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>{
        follower && follower.following && follower.following.includes(me) ? 'Unfollow' : 'Follow'
        }</button>
       </div>
   </div>
         </>
        )) :
        showfollowing && following && following.length > 0 ? following.map((follow: any, index: number) => (
          <>
          {/* followers  */}

     <div key={index} className={`w-full ${ mode === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} mt-[0.9px] rounded-3xl p-4`}>
       {/* people */}

       <div className='flex justify-between items-center my-2 px-4'>
         <div className='flex gap-2'>
           <img className='w-9 h-9 rounded-full' src={follow && follow.profilePhoto && follow.profilePhoto.url} alt="following" />
         <div>
           <h1 className='text-sm  dark:text-white font-semibold'>{follow && follow.fullname}</h1>
           <p className='text-xs text-gray-600'>@{follow && follow.handle}</p>
         </div>
         </div>
         
         <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>{
        follow && follow.followers && follow.followers.includes(me) ? 'Unfollow' : 'Follow'
        }</button>
       </div>
   </div>
         </>
        )) : 
        showupload && imageUpload && imageUpload.length > 0  ?
        (
            <>
            <div className="grid gap-1 grid-cols-4 sm:grid-cols-6">
  {imageUpload &&
    imageUpload.length > 0 &&
    imageUpload.map((post: any, index: number) => {
      let widthClass = "";
      let heightClass = "";

      if (index % 4 === 0) {
        // First image in every set of four
        widthClass = "col-span-1 sm:col-span-1";
        heightClass = "h-full";
      } else if (index % 4 === 1) {
        // Second image in every set of four
        widthClass = "col-span-2 sm:col-span-2";
        heightClass = "h-[90%]";
      } else if (index % 4 === 2) {
        // Third image in every set of four
        widthClass = "col-span-1 sm:col-span-1";
        heightClass = "h-full";
      } else if (index % 4 === 3) {
        // Fourth image in every set of four
        widthClass = "col-span-2 sm:col-span-2";
        heightClass = "h-[90%]";
      }

      return (
        <>
        <img
          key={index}
          src={post && post.url}
          onClick={() => showUploadedMobileModal(post && post.url)}
          className={`rounded-xl ${widthClass} ${heightClass}`}
          alt="imageupload"
        />

                      {/* picture modal  */}
                      <div
            className={`${
            mobileModal ? "flex" : "hidden"
            } fixed top-0 left-0 bg-black w-full h-full justify-center items-center`}
            >
            <div className={`w-full sm:px-[25%] h-full sm:max-h-sm sm:bg-gray-900`}>
            <div className="flex justify-between items-center p-2 ">
              <MenuLogo className={` w-3 h-3  z-40 fill-white mt-3 ml-3 cursor-pointer`} />
            
              {/* cancel or close  */}
              <CancelLogo onClick={hideMobileModal}  className={` w-3 h-3 fill-white z-40 mt-4 mr-4 cursor-pointer`} />
            </div>         
             
            <div className="fixed z-5 inset-0 flex justify-center items-center">
              <div className="pt-1"></div>
             <div className="z-40"  > 
              <img
               
                className="max-w-[600px] cursor-pointer z-40"
                src={displayImage}
                alt=""
              />
              </div>
            
              {/* show image  */}
             
            </div>
            </div>
            </div>
            
            
            {/* video view modal  */}
            
            <div
            className={`${
            fullvideoScreen ? "flex" : "hidden"
            } fixed top-0 left-0 bg-black  w-full h-full overflow-y-auto flex-cols justify-center items-center`}
            >
            <video
            className="w-full h-screen object-cover"
            controls
            src={videoUrl}
            ></video>
            
           
            
            {/* cancel or close  */}
            <div className="absolute top-5 right-5 flex justify-between items-center">
            {/* cancel or close  */}
            <CancelLogo onClick={hideFullScreen}
              className="w-4 h-4 fill-white cursor-pointer"/>
            </div>
            
            </div>
</>
      );
    })}
</div>


          
  
            </>
         ) :
         (
          <>
          <p className="text-sm text-center mt-5" >No Result for now</p>
          </>
         )
    }
    </div>
       

     <NavBar />

  </div>
  </div>
  )
}

export default ProfileMiddle
