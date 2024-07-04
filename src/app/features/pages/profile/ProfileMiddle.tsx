import NavBar from "../mobilenav/NavBar";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {  getAllUser, getOtherUser, setProfileType, userFollowing, getFollowers, getFollowing, addNotification, getAllNotificationForAUser, selectUser, userFollowers } from "../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from '../../../../index'
import { ReactComponent as LogoutLogo } from '../../../../assets/logout.svg';
import { ReactComponent as BackLogo } from '../../../../assets/arrowBack.svg';
import { ReactComponent as SearchLogo } from '../../../../assets/searchBar.svg';
import { ReactComponent as SettingLogo } from '../../../../assets/setting.svg';
import { getAllUserPosts, searchForPost } from '../home/PostSlice';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { allCommentForAPost, bookmarkPost, commentOnPost, deletePost, getAPost, getAllPosts, getBookmarkforaPost, getLikesforaPost, getresharedforaPost, likePost, rePost, selectPost,  } from "../home/PostSlice";
import { ReactComponent as LikeLogo } from '../../../../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../../../../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../../../../assets/bookmark.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { ReactComponent as ArrowPreviousLogo } from '../../../../assets/arrowPrevious.svg';
import { ReactComponent as ArrowNextLogo } from '../../../../assets/arrowNext.svg';
import { ReactComponent as MenuLogo } from '../../../../assets/threeDot.svg';
import { ReactComponent as BlockContactLogo } from '../../../../assets/blockContact.svg';
import { ReactComponent as ReportContactLogo } from '../../../../assets/reportContact.svg';
import { ReactComponent as AddContactLogo } from '../../../../assets/addContact.svg';
import { ReactComponent as MuteContactLogo } from '../../../../assets/muteContact.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useAppContext } from "../home/homeContext";


const ProfileMiddle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const [onePic, setOnePic] = useState<boolean>(false);
    const [twoPics, setTwoPics] = useState<boolean>(false);
    const [threePics, setThreePics] = useState<boolean>(false);
    const [fourPics, setFourPics] = useState<boolean>(true);
    const [playvideo, setPlayVideo] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
    const [mobileModal, setMobileModal] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);
    const [desktopmodal, setdeskTopModal] = useState<boolean>(false);
    const [mobileIconModal, setMobileIconModal] = useState<boolean>(false);
    const [postModal, setPostModal] = useState<boolean>(false);
    const [showfeed, setShowFeed] = useState<boolean>(true);
    const [showupload, setShowupload] = useState<boolean>(false);
    const [showfollowers, setShowFollowers] = useState<boolean>(false);
    const [showfollowing, setShowFollowing] = useState<boolean>(false);
    const [inputStr, setInputStr] = useState<string>("");
    const { user, followers, following, otherperson,  } = useAppSelector(selectUser);
    const { refresh, toggleRefresh } = useAppContext();
    const [isTrend, setIsTrend] = useState<boolean>(false);
    const [isNotify, setisnotify] = useState<boolean>(false);
    const [ispost, setispost] = useState<boolean>(false);
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [postClicked, setPostClicked] = useState<string>("");
    const [content, setcontent] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [isHome, setisHome] = useState<boolean>(false);
    const [commentErr, setCommentErr] = useState<string>("");
    const [currentPostId, setCurrentPostId] = useState<string>("");
    const [displayImage, setDisplayImage] = useState<string>('');
    const [touchstart, setTouchStart] = useState<number>();
    const [touchend, setTouchEnd] = useState<number>();
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [displayProfileImage, setDisplayProfileImage] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [toRefresh, setToRefresh] = useState<boolean>(false);
  
    const [searchWord, setSearchWord] = useState('');
    const { posts, searchPosts, usersPosts } = useAppSelector(selectPost);
    const { users, } = useAppSelector(selectUser);
  
  
    const viewTrendsPage = () => {
      navigate('/trends')
    }
  
    useEffect(() => {
      getAllPosts()
    }, [dispatch])
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('search key ', searchWord);
      dispatch(searchForPost(searchWord)).then((res: any) => {
        console.log('searched post are ', res)
      })
    };
  
    const thesearchPost = () => {
      if(searchWord && searchWord !== ''){
      console.log('search key ', searchWord);
      dispatch(searchForPost(searchWord)).then((res: any) => {
        console.log('searched post are ', res)
      })
      }
    };
  
    const [toggleControls, setToggleControls] = useState<boolean>(false);
    const [personalPost, setPersonalPost] = useState<any>();
    const getUser = JSON.parse(localStorage.getItem('user') as any);
  
  
    useEffect(() => {
      dispatch(getAllUser())
    }, []);
  
  
  
    const viewPost = (postId: string) => {
      navigate(`/post/${postId}`);
    }
  
  
   const handleFollowing = (auserId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
   
    const token = getUser && getUser.token;
    const follow = { token, auserId };
    dispatch(userFollowing(follow)).then((res: any) => {
      if(res && res.payload !== undefined){
        dispatch(getAllPosts()).then((res: any) => {
          toggleRefresh();
        })
      }
    })
   };
  
  
  
  const handleLike = async (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const findpost = posts.find((p: any) => p._id === postId);
    const postOwnerId = findpost && findpost.owner && findpost.owner._id;
  
    const token = getUser && getUser.token;
    const userId =  getUser && getUser._doc._id;
    const postLike = {
      token,
      userId,
      postId
    };
    dispatch(likePost(postLike)).then((res: any) => {
      setPersonalPost(res && res.payload && res.payload);
    })
  };
  
  const viewWhoLikePost = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
    e.stopPropagation();
    console.log('postid ', postId);
    dispatch(getLikesforaPost(postId)).then((res: any) => {
      console.log('liked post are ', res);
      if(res && res.payload !== undefined){
        navigate(`/post/like/${postId}`);
      }
    })
  };
  
  const viewWhoBookmarkPost = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
    e.stopPropagation();
    dispatch(getBookmarkforaPost(postId)).then((res: any) => {
      console.log('bookmark post are ', res);
      if(res && res.payload !== undefined){
        navigate(`/post/bookmark/${postId}`);
      }
    })
  };
  
  const viewWhoResharedPost = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
    e.stopPropagation();
    dispatch(getresharedforaPost(postId)).then((res: any) => {
      console.log('reshared post are ', res);
      if(res && res.payload !== undefined){
        navigate(`/post/reshare/${postId}`);
      }
    })
  };
  
  
  
  const viewAProfile = (userId: string) => {
  
    dispatch(getOtherUser(userId)).then((res) => {
      console.log(' other user ', res);
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
        window.scrollTo(0, 0);
      }
    })
  };
  
  const handleBookmark = async (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const findpost = posts.find((p: any) => p._id === postId);
    const postOwnerId = findpost && findpost.owner && findpost.owner._id;
  
    const token = getUser && getUser.token;
    const userId =  getUser && getUser._doc._id;
    const postBooked = {
      token,
      userId,
      postId
    };
    dispatch(bookmarkPost(postBooked)).then((res: any) => {
      if(res && res.payload !== undefined){
        setPersonalPost(res && res.payload && res.payload);
      }
    });
  };
  
  const handleReShare = async (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const findpost = posts.find((p: any) => p._id === postId);
    const postOwnerId = findpost && findpost.owner && findpost.owner._id;
  
    const token = getUser && getUser.token;
    const userId =  getUser && getUser._doc._id;
    const postReshare = {
      token,
      userId,
      postId
    };
    dispatch(rePost(postReshare)).then((res: any) => {
      console.log('reshared post ', res)
    });
  };
  
  const goToPost = async (id: string) => {
    dispatch(getAPost(id)).then((res: any) => {
      if(res && res.payload !== undefined){
        dispatch(allCommentForAPost(id)).then((res: any) => {
          if(res && res.payload !== undefined){
            navigate(`/post/${id}`);
          }
        })
         
      }
    })
   
  }
  
  
  const toggleImageControls = () => {
  setToggleControls((prev) => !prev);
  }
  
  
  
  const handleTouchStart = (e : React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e : React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = (e : React.TouchEvent<HTMLDivElement>) => {
    if(!touchstart || !touchend) return;
  
    const distance = touchstart - touchend;
    const minimumSwipeDistance = 50;
  
      const findPost = posts.find((p: any) => p._id === currentPostId);
      const picsLength = findPost.photos.length;
      const findIndex = findPost.photos.findIndex((img: any) => img.url === displayImage);
  
      if(distance > minimumSwipeDistance){
      // swipe left = next
      setDisplayImage(findPost.photos[findIndex === picsLength - 1 ? picsLength - 1 : findIndex + 1].url)
    }else if(distance < -minimumSwipeDistance){
      //swipe right = prev
      setDisplayImage(findPost.photos[findIndex <= 0 ? 0 : findIndex - 1].url);
  
    };
  
   
  }
  
   const handleCommentSubmit = (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
      setIsCommenting(true);
      if(comment === ''){
        setIsCommenting(false);
        setCommentErr('No comment has been added, please add a comment');
        setTimeout(() => { setCommentErr('');}, 5000);
        return;
      }
        const userId = getUser && getUser._doc && getUser._doc._id;
        const token = getUser && getUser.token;
    
        const comments = {
          id: postId,
          token,
          userId,
          comment
        };    
    
      dispatch(commentOnPost(comments)).then((res: any) => {
        if(res && res.payload !== undefined){
          setIsCommenting(false);
          setToRefresh(true);
        }
      })
    }
  
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
       setDesktopMenu(false);
       setMenu(false);
    }, [postModal])
  
   
    const showFullScreen = (id: string, video: string)=> {
      setFullVideoScreen(true);
      setVideoUrl(video);
      const findPost = posts.find((p: any) => p._id === id);
      console.log('personal post currently ', findPost);
      setPersonalPost(findPost);
    };
  
  
  
    const hideDeskTopMenu = (e: MouseEvent) => {
     if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        setDesktopMenu(false);
      }
    };

  
    const viewUserProfile = (userId: string) => {
      dispatch(getOtherUser(userId)).then((res: any) => {
        if(res && res.payload !== undefined){
          if(getUser === null){
            dispatch(setProfileType('foreign'));
            navigate(`/profile/${userId}`);
          } else{ 
            const userId = getUser && getUser._doc && getUser._doc._id;
            if(res && res.payload && res.payload._doc && res.payload._doc._id === userId){
            console.log('type profile local ', res.payload._doc._id)
            dispatch(setProfileType('local'))
            navigate(`/profile/${userId}`);
          }else{
            console.log('type foreign profile ', res.payload._doc._id)
            dispatch(setProfileType('foreign'))
            navigate(`/profile/${userId}`);
          }
          }
        }
      })
    }
  
    const showMobileModal = (img: any, id: any) => {
      const post = posts.find((item: any) => item._id === id );
      setDisplayImage(img);
      setDisplayProfileImage(post.owner.profilePhoto.url);
      setMobileModal(true);
      setCurrentPostId(id);
      setPersonalPost(post);
    };
    
  
    useEffect(() => {
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
  
  
    const menuShow = (id: string) => {
      setPostClicked(id);
      setIsPosting(false);
      setMenu((prev) => !prev);
      setDesktopMenu(true);
    };
  
   
  const viewPrevImage = () => {
    const findPost = posts.find((p: any) => p._id === currentPostId);
    const picsLength = findPost.photos.length;
    const findIndex = findPost.photos.findIndex((img: any) => img.url === displayImage);
    setDisplayImage(findPost.photos[findIndex <= 0 ? 0 : findIndex - 1].url);
  
  };
  
  const viewNextImage = () => {
    const findPost = posts.find((p: any) => p._id === currentPostId);
    const picsLength = findPost.photos.length;
    const findIndex = findPost.photos.findIndex((img: any) => img.url === displayImage);
    setDisplayImage(findPost.photos[findIndex === picsLength - 1 ? picsLength - 1 : findIndex + 1].url);
  
  };

  const showPostModal = () => {
    setPostModal(true);
   setisHome(false);
   setIsTrend(false);
   setisnotify(false);
   setispost(true);
  };

  
    const handleEditPost = (id: string) => {
      if(getUser === null){
        navigate('/login');
        return;
      };
      const findPost = posts.find((p: any) => p._id === id);
      setcontent(findPost.content);
      navigate(`/${findPost._id}`)
      showPostModal()
    };
  
    const handleDeletePost = (id: string) => {
      if(getUser === null){
        navigate('/login');
        return;
      };
      const getConfirmation = window.confirm("Are you sure Your want to delete this post? This action cannot be undo");
      if(getConfirmation){
      const token = getUser.token;
      const post = { id, token };
      dispatch(deletePost(post))
    }
  
    };
  
  
      const userStored = JSON.parse(localStorage.getItem('user') as any);
   
    const me = userStored && userStored._doc && userStored._doc._id;
    const fetchFeeds = () => {
      if(id){
          dispatch(getAllUserPosts(id)).then((res: any) => {
          console.log('all posts fetched ', res);
        });
      }
      
    };

    if(followers){
      console.log('this are my folowers ', followers)
    }
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
    }
    const getFollower = (id: string) => {
      dispatch(getFollowers(id)).then((res: any) => {
        console.log('followers are ', res);
      });
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
      dispatch(getFollowing(uid)).then((res: any) => {
        console.log('following are ', res);
      });
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
    };
  
    const showFullMobileScreen = () => {
      setMobileIconModal(true);
    };
  
    const hideFullMobileScreen = () => {
      setMobileIconModal(false);
    };
    const handleDesktopPost = () => {
      setdeskTopModal(false);
    };
  
    const showDeskTopModal = () => {
      setdeskTopModal(true);
    };

    const logoutUser = () => {
      localStorage.clear();
      navigate('/login');
    }
  
    const onEmojiClick = (emojiObject: any) => {
      console.log("events emoji ", emojiObject);
      setInputStr((prev) => prev + emojiObject.emoji);
      setShowEmojiPicker(false);
    };

    const handleFollow = () => {
      const token = userStored && userStored.token;
      const userId = otherperson && otherperson._doc && otherperson._doc._id;
      const follow = { token, userId };
      dispatch(setProfileType('local'));
      dispatch(userFollowers(follow)).then((res: any) => {
        console.log('fllow ', res)
      })
    };

    useEffect(() => {
      const handlefollowed = (data: any) => {
        console.log('data followed post ', data);
        dispatch(addNotification(data)).then((res: any) => {
          console.log('ress    ', res)
          const userId = res && res.payload && res.payload.receiver;
          const token = userStored && userStored.token;;
  
          const note = { userId, token }
  
          dispatch(getAllNotificationForAUser(note)).then((res: any) => {
            console.log('all note ', res)
          })
        });
      };
    
      socket.on('followed', handlefollowed);
    
      return () => {
        socket.off('followed', handlefollowed);
      };
    }, [socket]);
  
    const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputStr(e.target.value);
    };
  
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
          setDesktopMenu(false);
        }
      }
    };
  
    const hideMobileModal = () => {
      setMobileModal(false);
    };
  
   
  
    useEffect(() => {
      document.addEventListener("mousedown", hideMobileMenu);
  
      return () => {
        document.removeEventListener("mousedown", hideMobileMenu);
      };
    }, []);
    
  
    const showDesktopMenu = () => {
      setDesktopMenu(false);
    };

    // const viewProfile = () => {
    //   navigate(`/profile/${otheruser && otheruser._doc && otheruser._doc._id}`)
    // }

    const handleChat = () => {
      const getUser = JSON.parse(localStorage.getItem('user') as any);
      const me = getUser && getUser._doc && getUser._doc._id;
      const token = getUser && getUser.token;

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

   const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mt-10 max-w-md sm:max-w-full bg-white">
      
      <div onClick={handleGoBack} className=' sm:fixed flex gap-3 py-2 cursor-pointer'>
          <BackLogo  className='w-4 h-4 cursor-pointer stroke-2 sm:fill-white fill-black' />
        <h2 className='text-xs font-medium text-black sm:text-white'>Go Back</h2>
        </div>

      <div className='flex flex-col rounded-tl-3xl justify-center items-center bg-white p-6'>
        
        <div className='flex gap-2 items-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
          otherperson && otherperson._doc && otherperson._doc.profilePhoto && otherperson._doc.profilePhoto.url ? (
            <>
            <div className="relative">
            <img className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={otherperson && otherperson._doc && otherperson._doc.profilePhoto && otherperson._doc.profilePhoto.url} alt="" />
             <div onClick={editProfile} className="absolute bottom-0 right-9 cursor-pointer">
                <svg className="w-5 h-5" fill="none"  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div> 
            </div>
            
            </>
          ) : (
            <>
            <div className="relative">
             <img className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
             <div onClick={editProfile} className="absolute bottom-0 right-9 cursor-pointer">
                <svg className="w-5 h-5" fill="none"  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div> 
            </div>
            
            </>
          )
        }      
         
        </div>

        <div className='flex flex-col text-center justify-center'>
            <div className="flex gap-1 justify-center items-center pt-2">
            <svg fill="none" className="w-5 h-5" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="m21.5609 10.7386-1.36-1.58001c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57004 1.37c-.3.25-.87.46-1.26.46h-1.73c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59001c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58004 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83c-.14.14-.33.22-.53.22s-.39-.08-.53-.22l-2.42004-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89004 1.89 4.3-4.30001c.29-.29.77-.29 1.06 0s.29.77 0 1.06001z" fill="purple"/></svg>
            <h1 className='text-black font-bold  cursor-pointer text-md'>{otherperson && otherperson._doc && otherperson._doc.fullname}</h1>
            </div>
            <p className='text-gray-500 text-xs'>@{otherperson && otherperson._doc && otherperson._doc.handle}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.profession}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.address}</p>
            <p className='text-gray-500 text-xs'>{otherperson && otherperson._doc && otherperson._doc.dateOfBirth}</p>
            <p className='text-gray-500 text-xs max-w-sm'>{otherperson && otherperson._doc && otherperson._doc.bio}</p>
        </div>

        <div className='flex gap-1 mt-3'>
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.followers && otherperson._doc.followers.length  }</h1>
            <p className='text-xs text-gray-400'>Followers</p>
          </div>
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.following && otherperson._doc.following.length }</h1>
            <p className='text-xs text-gray-400'>Following</p>
          </div>
          <div className='flex flex-col justify-center px-3'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otherperson && otherperson._doc && otherperson._doc.posts && otherperson._doc.posts.length }</h1>
            <p className='text-xs text-gray-400'>Posts</p>
          </div>
        </div>
      </div>

        { firstUser !== secondUser ? (
      <div className="mx-auto flex justify-center gap-6 py-4 bg-white">
        <button onClick={handleFollow} className="text-white bg-black hover:bg-purple-600 hover:text-white duration-200 hover:border-white hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1">{
      user && user._doc && user._doc.following &&  user._doc.following.includes(otherperson && otherperson._doc && otherperson._doc._id) ? 'Unfollow' : 'Follow'
      }
      </button>
        <button onClick={handleChat} className="text-white bg-black hover:bg-purple-600 hover:text-white duration-200 hover:border-white hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1">Chat</button>
      </div>    
          ) : (
            <div className="mx-auto flex justify-center gap-6 py-4 bg-white">
            <button onClick={logoutUser} className="text-white bg-black hover:bg-purple-600 hover:text-white duration-200 hover:scale-105 rounded-2xl border border-white font-semibold text-center px-4 py-1 flex gap-0 items-center"> <LogoutLogo className="w-5 h-5 stroke-white fill-none" /> <p>Logout</p></button>
          </div> 
          )
        }

    <div className="flex justify-around px-4 mb-4">
    <h1 onClick={activateFeed} className={`text-lg cursor-pointer font-bold ${showfeed ? 'text-purple-500 border-b-2 border-purple-500': 'text-black' }  dark:text-white pl-4`}>
      Feeds
    </h1>
    <h1 onClick={activateFollowers} className={`text-lg cursor-pointer font-bold ${showfollowers ? 'text-purple-500  border-b-2 border-purple-500': 'text-black' }  dark:text-white pl-4`}>
      Followers
    </h1>
    <h1 onClick={activateFollowing} className={`text-lg cursor-pointer font-bold ${showfollowing ? 'text-purple-500  border-b-2 border-purple-500': 'text-black' }  dark:text-white pl-4`}>
      Following
    </h1>
    <h1 onClick={activateUpload} className={`text-lg cursor-pointer font-bold ${showupload ? 'text-purple-500  border-b-2 border-purple-500': 'text-black' }  dark:text-white pl-4`}>
      Uploads
    </h1>
    </div>
    
        { showfeed  ? (
          <>
           {

            usersPosts && Array.isArray(usersPosts) && usersPosts.map((post: any, index: number) => (       
            <div key={index} className="rounded-full my-1 p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">
            {
            post.reShared &&  (
            <>
            <div className="flex border-b border-b-gray-300 pb-4">
             <img onClick={() => viewAProfile(post && post.reShare && post.reShare[0] && post.reShare[0].user && post.reShare[0].user._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post && post.reShare && post.reShare[0] && post.reShare[0].user  && post.reShare[0].user.profilePhoto && post.reShare[0].user.profilePhoto.url} alt=""/>
              <p className="text-black dark:text-white text-xs font-medium px-1">{post && post.reShare && post.reShare[0]  && post.reShare[0].user  && post.reShare[0].user.fullname}</p>
              <p className="text-gray-500 text-xs font-semibold px-3">Reshared this post</p>
            </div>
            </>
            ) 
            }
            <div className="flex items-center gap-2 w-full">
            <img onClick={() => viewUserProfile(post && post.owner && post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" key={index} src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt='' />
            <div  className="w-full cursor-pointer flex items-center justify-between gap-1">
              <div  onClick={() => goToPost(post._id)} className="flex items-center">
                <div className="mt-3">
                  <h1 className="text-black dark:text-white text-sm font-semibold">
                    {post && post.owner && post.owner.fullname}
                  </h1>
                <p className="text-gray text-[8px]"> {post && formatCreatedAt(post.createdAt)} </p>
                </div>
                <VerifyMarkLogo className="w-5 h-5 fill-purple-500 stroke-white"/>
             
                <p className="text-gray-600 text-[10px] ">@{post && post.owner && post.owner.handle}</p>
              </div>
              {/* three dot icon  */}
              <div onClick={() => menuShow(post._id)} className="cursor-pointer ">
                <div className="relative" >
                  <MenuLogo className="w-[12px] h-[12px] fill-black stroke-black dark:fill-white dark:stroke-white"/>
                 
                  {/* desktop menu  */}
                  <div
                    ref={desktopMenuRef}
                    id="desktopmenu"
                    className={`hidden ${
                      desktopMenu && post._id === postClicked ? "sm:block" : "sm:hidden"
                    } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] h-auto rounded-3xl mx-auto bg-white  p-2`}
                  >
                    {
                    getUser !== undefined && getUser && getUser._doc && getUser._doc._id  === post.owner._id ? (
                        <>
                      <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
                        <EditLogo  className="stroke-black w-3 h-3"/>
                        <p className="text-black text-[10px]">Edit Post</p>
                      </div>
                      <div onClick={() =>handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
                        <TrashLogo className="fill-black stroke-black w-5 h-5"/>
                        <p className="text-black text-[10px]">Delete Post</p>
                      </div>
                        </>
                      ) : (
                        <>
                        {
                          getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(post.owner._id) && (
                            <>
                            <div onClick={() => handleFollowing(post && post.owner && post.owner._id )} className="flex gap-2 cursor-pointer items-center pt-4">
                              <AddContactLogo  className="fill-black stroke-black w-3 h-3"/>
                              <p className="text-black text-[10px]">Follow @{post && post.owner && post.owner.handle }</p>
                            </div>
                            </>
                          )
                        }
                      
            
                    <div className="flex gap-2 items-center pt-4  cursor-pointer">
                      <BlockContactLogo  className="fill-black stroke-black w-3 h-3"/>
                      <p className="text-black text-[10px]">Block @{post && post.owner && post.owner.handle }</p>
                    </div>
            
                    <div className="flex gap-2 items-center cursor-pointer pt-4">
                      <ReportContactLogo  className="fill-black stroke-black w-3 h-3"/>
                      <p className="text-black text-[10px]">Report Post</p>
                    </div>
            
                    <div className="flex gap-2 cursor-pointer items-center pt-4">
                      <MuteContactLogo   className="fill-black stroke-black w-3 h-3"/>
                      <p className="text-black text-[10px]">Mute @{post && post.owner && post.owner.handle }</p>
                    </div>
                        </>
                      )
                    }
                   
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* post text  */}
            <div onClick={() => goToPost(post._id)} className="ml-9">
            <p className="text-[11px] text-gray-600">
              {post.content.length > 200 ? (
               <>
               <p className="text-justify text-wrap text-[11px] text-gray-600">{post.content.slice(0, 500)} <strong className="cursor-pointer text-purple-600 text-xs">read more</strong></p>
               </> 
                 ) : post.content}
            </p>
            </div>
            
            {/* mobile menu  */}
            <div
            ref={mobileMenuRef}
            id="mobilemenu"
            className={`fixed ${
            menu && post._id === postClicked ? "block" : "hidden"
            } bottom-0 left-0 bg-white pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
            >
            {
             getUser !== undefined && getUser && getUser._doc && getUser._doc._id  ===   post && post.owner && post.owner._id ? (
                        <>
                      <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center py-4">
                        <EditLogo  className="stroke-black w-4 h-4"/>
                        <p className="text-black text-lg">Edit Post</p>
                      </div>
                      <div  onClick={() =>handleDeletePost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center py-4">
                        <TrashLogo className="fill-black stroke-black w-6 h-6"/>
                        <p className="text-black text-lg">Delete Post</p>
                      </div>
                        </>
                      ) : (
                        <>
                         <div className="flex gap-2 cursor-pointer items-center px-2 py-4">
                      <AddContactLogo  className="fill-black stroke-black w-5 h-5"/>
                      <p className="text-black text-lg">Follow @texilola😎</p>
                    </div>
            
                    <div className="flex gap-2 items-center px-2 py-4  cursor-pointer">
                      <BlockContactLogo  className="fill-black stroke-black w-5 h-5"/>
                      <p className="text-black text-lg">Block @texilola😎</p>
                    </div>
            
                    <div className="flex gap-2 items-center cursor-pointer px-2 py-4">
                      <ReportContactLogo  className="fill-black stroke-black w-5 h-5"/>
                      <p className="text-black text-lg">Report Post</p>
                    </div>
            
                    <div className="flex gap-2 cursor-pointer items-center px-2 py-4">
                      <MuteContactLogo   className="fill-black stroke-black w-5 h-5"/>
                      <p className="text-black text-lg">Mute @texilola😎</p>
                    </div>
                        </>
                      )
                    }
            
            </div>
            
            
            
            {/* picture modal  */}
            <div
            className={`${
            mobileModal ? "flex" : "hidden"
            } fixed top-0 left-0 bg-black w-full h-full justify-center items-center`}
            >
            <div className={`w-full sm:px-[25%] h-full sm:max-h-sm sm:bg-gray-900`}>
            <div className="flex justify-between items-center p-2 ">
              <MenuLogo className={`${toggleControls ? 'block': 'hidden'} w-3 h-3  z-40 fill-white mt-3 ml-3 cursor-pointer`} />
            
              {/* cancel or close  */}
              <CancelLogo onClick={hideMobileModal}  className={`${toggleControls ? 'block': 'hidden'} w-3 h-3 fill-white z-40 mt-4 mr-4 cursor-pointer`} />
            </div>
            
            <div className={`${toggleControls ? 'flex': 'hidden'} justify-between items-center z-14 my-2 px-4`}>
              <div className='flex gap-2'>
                <img onClick={() => viewAProfile(personalPost && personalPost.owner && personalPost.owner._id )} className='w-9 h-9 rounded-full cursor-pointer z-40' src={displayProfileImage} alt="" />
              <div className="z-40">
                <h1 className='text-sm text-white font-semibold'>{personalPost && personalPost.owner && personalPost.owner.fullname}</h1>
                <p className='text-xs text-gray-300'>@{personalPost && personalPost.owner && personalPost.owner.handle}</p>
              </div>
              </div>
              
              <button onClick={() => handleFollowing(post && post.owner && post.owner._id)} className='text-xs px-4 py-1 bg-black z-40 dark:bg-white rounded-full border border-white text-white dark:text-black transform-transition duration-100 hover:scale-110'>
                { getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(post.owner._id) ? 'UnFollow' : "Follow" }
              </button>
            </div>
            
            
            
            <div className="fixed z-5 inset-0 flex justify-center items-center">
              <div className="pt-1"></div>
             <div className="z-40"  onClick={toggleImageControls} onTouchStart={handleTouchStart}  onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} > 
              <img
               
                className="max-w-[600px] cursor-pointer z-40"
                src={displayImage}
                alt=""
              />
              </div>
            
              {/* show image  */}
            <div className={`hidden sm:z-[20px] sm:px-[10%] ${ toggleControls ? 'sm:fixed' : 'sm:hidden'} inset-0 sm:flex justify-between items-center`}>
              <ArrowPreviousLogo onClick={() => viewPrevImage()} className="w-9 h-9 fill-white cursor-pointer" /> 
              <ArrowNextLogo  onClick={() =>viewNextImage()} className="w-9 h-9 fill-white cursor-pointer" />
            </div>
            
              <div className={`fixed bottom-11 ${toggleControls ? 'flex' : 'hidden'}  justify-between items-center`}>
              <div className="flex justify-between items-center">
            <div className="flex ml-9 mt-4 gap-8 items-center">
              <div className="p-[5px] flex gap-1 cursor-pointer">
                <HeartIcon onClick={() =>handleLike(post._id)} className="w-5 h-5 fill-white stroke-white"/>             
              <p className="text-xs text-white">{post && post.likes && post.likes.length}</p>
              </div>
            
              <div className="p-[5px] flex gap-1 cursor-pointer">
                <RetweetLogo  onClick={() =>handleReShare(post._id)}   className="w-5 h-5 fill-white stroke-white"/>
              <p className="text-xs text-white">{post && post.allReshare && post.allReshare.length}</p>
              </div>
            
              <div className="p-[5px] flex gap-1 cursor-pointer">
                <BookMarkLogo  onClick={() =>handleBookmark(post._id)} className="w-5 h-5 fill-white stroke-white"/>
               
              <p className="text-xs text-white">{post && post.bookmark && post.bookmark.length}</p>
              </div>
            
            </div>
            
            </div>
              </div>
              
              <div className={`fixed bottom-0 ${toggleControls ? 'flex' : 'hidden' } z-40 border border-white rounded-xl`}>
               <input
                    type="text"
                    className="rounded-md border-0 border-none focus:ring-0 focus:ring-inset focus:ring-none bg-transparent w-[70vw] sm:left-[25%] sm:w-[42vw] mx-auto left-0 py-2 text-white shadow-sm placeholder:text-white  sm:text-xs"
                    placeholder="start typing here"
                    name=""
                    id=""
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  /> 
                  <button onClick={() => handleCommentSubmit(post._id)} className="text-white font-medium text-xs rounded-xl py-2 px-4">
                  {
                isCommenting ? (
                  <>
                 <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-[9px] text-white'> Commenting...</p></div> 
                 </>
                ) : (
                  <SendLogo className="w-6 h-6 fill-white" />
                )
              }  
                  </button>
                  </div>
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
            
            {/* video icons controls */}
            <div className="absolute z-30 bottom-14 right-0 flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center">
              <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
                <div className="p-2 w-8 h-8 bg-red-500 mt-2 rounded-full flex justify-center items-center">
                  <HeartIcon onClick={() =>handleLike(personalPost._id)} color="white" className="w-12 h-12 fill-white" />
                </div>
                <p className="text-xs text-white">{personalPost && personalPost.likes && personalPost.likes.length}</p>
              </div>
            
              <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
                <div  onClick={() =>handleReShare(personalPost._id)}  className="p-2 w-9 h-9 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                 <ReplyLogo className="w-15 h-15 fill-white stroke-white" />
                </div>
                <p className="text-xs text-white">{personalPost && personalPost.reShare && personalPost.reShare.length}</p>
              </div>
            
              <div  onClick={() => goToPost(personalPost._id)} className="flex flex-col cursor-pointer justify-end items-center pr-4">
                <div  className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                 <CommentLogo className="w-4 h-4 fill-white stroke-white" />
                </div>
                <p className="text-xs text-white">{personalPost && personalPost.comments && personalPost.comments.length}</p>
              </div>
            
              <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
              <div className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                 <BookMarkLogo  onClick={() =>handleBookmark(personalPost._id)} className="w-4 h-4 fill-white stroke-white" />
                </div>
                <p className="text-xs text-white">{personalPost && personalPost.bookmark && personalPost.bookmark.length}</p>
              </div>
            </div>
            </div>
            
            {/* cancel or close  */}
            <div className="absolute top-5 right-5 flex justify-between items-center">
            {/* cancel or close  */}
            <CancelLogo onClick={hideFullScreen}
              className="w-4 h-4 fill-white cursor-pointer"/>
            </div>
            
            
            
            {/* add your comment  */}
            
            <div className="fixed bottom-0 flex border border-white rounded-xl">
               <input
               onClick={() =>viewPost(personalPost && personalPost._id)}
                    type="text"
                    className="rounded-md border-0 bg-transparent w-[70vw] sm:left-[25%] sm:w-[42vw] mx-auto left-0 py-2 text-white shadow-sm placeholder:text-white  sm:text-xs"
                    placeholder="comment here"
                    name="video"
                    id="video"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  /> 
                  <button onClick={() => handleCommentSubmit(post._id)} className="text-white font-medium text-xs rounded-xl py-2 px-4">
                  {
                isCommenting ? (
                  <>
                 <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-[9px] text-white'> Posting...</p></div> 
                 </>
                ) : (
                  <SendLogo className="w-6 h-6 fill-white" />
                )
              }  
                  </button>
                  </div>
            </div>
            
            
            {/* post images  */}
            
            { post && post.photos && post.photos.length > 0 ? (
            <div  className="mt-2 pl-9 cursor-pointer">
            { post && post.photos && post.photos.length === 1 ? (
              <div className="rounded-3xl overflow-hidden">
            <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                  className="w-[520px] h-[310px] bg-white rounded-3xl object-cover cursor-pointer"
                  src={post && post.photos[0] && post.photos[0].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
              </div>
            ) : post && post.photos && post.photos.length === 2 ? (
              <div className="flex overflow-hidden">
                 <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                  className="fixed-size w-[258px]  rounded-l-3xl h-[293px] border-r border-white cursor-pointer object-cover"
                  src={post && post.photos[0] && post.photos[0].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
                 
                 <img onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                   className="fixed-size w-[258px] h-[293px] border-l rounded-r-3xl border-white object-cover cursor-pointer"
                   src={post && post.photos[1] && post.photos[1].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
              </div>
            ) : post && post.photos && post.photos.length === 3 ? (
              <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
                 <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                   className="w-full h-[146px] col-span-2 border-b border-b-white cursor-pointer rounded-tl-3xl rounded-tr-3xl object-cover"
                   src={post && post.photos[0] && post.photos[0].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            
                 <img onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                   className="w-full h-[146px] border-t border-r border-b-white  rounded-bl-3xl cursor-pointer object-cover"
                   src={post && post.photos[1] && post.photos[1].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            
                 <img onClick={() => showMobileModal(post && post.photos[2] && post.photos[2].url, post && post._id)}
                   className="w-full h-[146px]  border-t  border-l border-white cursor-pointer rounded-br-3xl object-cover"
                   src={post && post.photos[2] && post.photos[2].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
              </div>
            ) :   post && post.photos && post.photos.length === 4 ? (
              <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
                <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                   className="w-[259px] h-[144px]  border-r border-b border-white rounded-tl-3xl fixed-size object-cover cursor-pointer"
                   src={post && post.photos[0] && post.photos[0].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            
                 <img onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                    className="w-[259px] h-[144px] border-l border-b border-white rounded-tr-3xl fixed-size object-cover cursor-pointer"
                    src={post && post.photos[1] && post.photos[1].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            
                 <img onClick={() => showMobileModal(post && post.photos[2] && post.photos[2].url, post && post._id)}
                   className="w-[259px] h-[144px] border-t border-r border-white rounded-bl-3xl fixed-size object-cover cursor-pointer"
                   src={post && post.photos[2] && post.photos[2].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            
                 <img onClick={() => showMobileModal(post && post.photos[3] && post.photos[3].url, post && post._id)}
                   className="w-[259px] h-[144px] border-t border-l border-white rounded-br-3xl fixed-size object-cover cursor-pointer"
                   src={post && post.photos[3] && post.photos[3].url}
                 alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
              </div>
            ) : (
              <></>
            )}
            </div>
            ) : post && post.video ? (
            <div  className="rounded-3xl cursor-pointer overflow-hidden z-20">
              <video
                onClick={() => showFullScreen(post && post._id, post && post.video && post.video.url)}
                className="w-full cursor-pointer object-cover h-[200px]"
                controls
                muted
                src={post && post.video && post.video.url}
              ></video>
            </div>
            )  : (<> </> )}
            
            <div onClick={() => goToPost(post._id)} className="flex cursor-pointer justify-between items-center">
            <div className="flex ml-9 mt-4 gap-1 items-center">
              <div onClick={(e) =>viewWhoLikePost(e, post._id)} className="p-[5px] bg-red-600 rounded-full">
                <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
              </div>
              <p className="text-[8px] text-gray-600"> {post.likes.length}</p>
            
              <div  onClick={(e) =>viewWhoResharedPost(e, post._id)} className="p-[5px] bg-green-600 rounded-full">
                <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
              </div>
              <p className="text-[8px] text-gray-600">{post.reShare.length}</p>
            
              <div  onClick={(e) =>viewWhoBookmarkPost(e, post._id)} className="p-[5px] bg-sky-600 rounded-full">
                <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
              </div>
            
              <p className="text-[8px] text-gray-600">{post.bookmark.length}</p>
            </div>
            
            <p className="text-[10px] mt-3 text-gray-600">{post.comments.length} Comments</p>
            </div>
            {/* icons */}
            <div className="flex justify-between items-center">
            <div className="flex items-center pl-9 sm:gap-1 mt-4">
              <div  onClick={() =>handleLike(post._id)} className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
                <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
                <p className="text-white dark:text-black text-[10px] pl-1">
                  Like
                </p>
              </div>
            
              <div onClick={() =>handleReShare(post._id)} className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
                <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
                <p className="text-white dark:text-black text-[10px] pl-1">
                  ReShare
                </p>
              </div>
            
              <div onClick={() => goToPost(post._id)} className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
                <CommentLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
                <p className="text-white dark:text-black text-[10px] pl-1">
                  Comment
                </p>
              </div>
            
              <div></div>
              <div></div>
            </div>
            
            <div  onClick={() =>handleBookmark(post._id)} className="bg-black flex cursor-pointer items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg">
              <BookMarkLogo   className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
            </div>
            </div>
            </div>
            ))
            
            }
            </>
        ) : 
        showfollowers && Array.isArray(followers) && followers.length > 0 ? followers.map((follower: any, index: number) => (
          <>
          {/* followers  */}

     <div key={index} className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
       {/* people */}

       <div className='flex justify-between items-center my-2 px-4'>
         <div className='flex gap-2'>
           <img className='w-9 h-9 rounded-full' src={follower && follower.profilePhoto && follower.profilePhoto.url} alt="" />
         <div>
           <h1 className='text-sm text-black dark:text-white font-semibold'>{follower && follower.fullname}</h1>
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

     <div key={index} className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
       {/* people */}

       <div className='flex justify-between items-center my-2 px-4'>
         <div className='flex gap-2'>
           <img className='w-9 h-9 rounded-full' src={follow && follow.profilePhoto && follow.profilePhoto.url} alt="" />
         <div>
           <h1 className='text-sm text-black dark:text-white font-semibold'>{follow && follow.fullname}</h1>
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
        (
            <></>
         )
    }

       

     <NavBar />

  </div>
  )
}

export default ProfileMiddle
