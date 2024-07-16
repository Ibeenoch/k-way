import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PlusIcon, HeartIcon,  } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { changeMode, getAllUser, getOtherUser, selectUser, setProfileType, userFollowers, userFollowing } from "../auth/authSlice";
import { allCommentForAPost, bookmarkPost, commentOnPost, createPost, createStory, deletePost, getAPost, getAllPosts, getAllUserStories, getAvailableStories, getBookmarkforaPost, getLikesforaPost, getresharedforaPost, likePost, openpostForm, rePost, resetEditCommentStatus, selectPost, setWhichPost, shouldWeHideMobileNav, updatePost, updateViewingStatus } from "./PostSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../mobilenav/NavBar";
import './home.css';
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as SignalLogo } from '../../../../assets/signal.svg';
import { ReactComponent as PlayLogo } from '../../../../assets/play.svg';
import { ReactComponent as LikeLogo } from '../../../../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as DarkModeLogo } from '../../../../assets/darkmode.svg';
import { ReactComponent as LightModeLogo } from '../../../../assets/lighmode.svg';
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
import { ReactComponent as VideoLogo } from '../../../../assets/videoLogo.svg';
import { ReactComponent as ImageLogo } from '../../../../assets/imagesLogo.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ArrowDownLogo } from '../../../../assets/arrowDownLogo.svg';
import { ReactComponent as PlusLogo } from '../../../../assets/plusLogo.svg';
import { ReactComponent as UndoLogo } from '../../../../assets/undo.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useAppContext } from "./homeContext";
import useOnClickOutside from "../../../../utils/ClickOut";
import { FixedSizeList } from "react-window";

const Middle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refresh, toggleRefresh } = useAppContext();
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
  const [desktopCommentMenu, setDesktopCommentMenu] = useState<boolean>(false);
  const [mobileModal, setMobileModal] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);
  const [desktopmodal, setdeskTopModal] = useState<boolean>(false);
  const [mobileIconModal, setMobileIconModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isHome, setisHome] = useState<boolean>(false);
  const [isTrend, setIsTrend] = useState<boolean>(false);
  const [isNotify, setisnotify] = useState<boolean>(false);
  const [ispost, setispost] = useState<boolean>(false);
  const [isprofile, setisProfile] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [commemtClicked, setCommentClicked] = useState<string>('');
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [mobileCommentModal, setMobileCommentModal] = useState<boolean>(false);
  const [postClicked, setPostClicked] = useState<string>("");
  const [content, setcontent] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [commentErr, setCommentErr] = useState<string>("");
  const [currentPostId, setCurrentPostId] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>('public');
  const [displayImage, setDisplayImage] = useState<string>('');
  const [storyActive, setStoryActive] = useState<boolean>(false);
  const [touchstart, setTouchStart] = useState<number>();
  const [touchend, setTouchEnd] = useState<number>();
  const [displayProfileImage, setDisplayProfileImage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [toRefresh, setToRefresh] = useState<boolean>(false);
  const [isOpenStories, setIsOpenStories] = useState<boolean>(false);
  const [startShowingIndex, setStartShowingIndex] = useState<any>(1);

  const {  mode,  } = useAppSelector(selectUser);
  const { posts, storyNumberOfViews, openPostForm, whichPost, stories, story, viewstories, storyOwner } = useAppSelector(selectPost);

  const fileRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageInput, setImageInput] = useState<File[]>([]);
  const [images, setImages] = useState<any>([]);
  const [video, setVideo] = useState<string>('');
  const [videoUploaded, setVideoUploaded] = useState<boolean>(false);
  const [isvideoUploaded, setIsVideoUploaded] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [toggleControls, setToggleControls] = useState<boolean>(false);
  const [clickedStatusIndex, setClickedStatusIndex] = useState<number>(0);
  const [statusViewerId, setStatusViewerId] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [personalPost, setPersonalPost] = useState<any>();
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { id } = useParams();

  const handleFileClick = () => {
    if(fileRef && fileRef.current){
       fileRef.current?.click();
    }
  }

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      // if there a image file selected remove it, as we cannot upload image and video in the same post
      if(imageInput.length > 0){
        setImageInput([]);
      };

      const file = Array.from(e.target.files);
      setFileInput(file);
      setVideoUploaded(true);
      setIsVideoUploaded(true);
      
    }
  }
  const handleImageClick = () => {
    if(imageRef && imageRef.current){
       imageRef.current?.click() 
    }
  }


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      // if there a video selected remove it, as we cannot upload image and video in the same post
      if(fileInput.length > 0){
        setFileInput([]);
      };

      const img = Array.from(e.target.files);
      setImageInput(img);
      
    }
  }

  const viewPost = (postId: string) => {
    navigate(`/post/${postId}`);
  }

 const getPrivacy = (e: ChangeEvent<HTMLSelectElement>) => {
  setPrivacy(e.target.value)

 };

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


const handlePostSubmit = async() => {
  setIsPosting(true);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  if(getUser === null){
    navigate('/login');
    return;
  };
  if(getUser === null){
    navigate('/login');
    return;
  };
  if(content === ''){
    setIsPosting(false);
    return;
  }
  const userId = getUser._doc._id;
  const data = { content, privacy,  };
  let postData = new FormData();
  postData.append('content', content);
  postData.append('privacy', 'public');
  
  if( imageInput.length > 0){
    imageInput.forEach((image: any) => {
      postData.append('image', image)
    }) 
  }
  
  if( fileInput.length > 0){
    fileInput.forEach((video: any) => {
      postData.append('video', video)
    })
  }
  const token = getUser.token;
  

  setFileInput([]);
  setImageInput([]);
 
if(id){
 const post = {
    postData, 
    token,
    _id: id,
  };

  if(post){
    dispatch(updatePost(post)).then((res: any) => {
      if(res.payload !== undefined){
      setcontent('');
      setIsUpdated(true);
      hidePostModal();
      setdeskTopModal(false);
      navigate('/');
      window.scrollTo(0, 0);
     }

    })
  }
}else{

  const post = {
    postData, 
    token
  };

  setFileInput([]);
  setImageInput([]);

  if(post){
    if( whichPost === 'story'){

      dispatch(createStory(post)).then((res: any) => {
        console.log('story created ', res)
        if(res && res.payload !== undefined){
           dispatch(getAvailableStories()).then((res: any) => {
            setcontent('');
            toggleRefresh();
            setIsPosting(false);
            hidePostModal();
            setdeskTopModal(false);
            navigate('/');
            window.scrollTo(0, 0);
        });
        }
       
      });
    }else{
    dispatch(createPost(post)).then((res: any) => {
      if(res.payload !== undefined){
         dispatch(getAllPosts()).then((res: any) => {
          setcontent('');
          toggleRefresh();
          setIsPosting(false);
          hidePostModal();
          setdeskTopModal(false);
          navigate('/');
          window.scrollTo(0, 0);
      });
      }
     
    });
  
  }
  }
}
}


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
  dispatch(getLikesforaPost(postId)).then((res: any) => {
    if(res && res.payload !== undefined){
      navigate(`/post/like/${postId}`);
    }
  })
};

const viewWhoBookmarkPost = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
  e.stopPropagation();
  dispatch(getBookmarkforaPost(postId)).then((res: any) => {
    if(res && res.payload !== undefined){
      navigate(`/post/bookmark/${postId}`);
    }
  })
};

const viewWhoResharedPost = (e: React.MouseEvent<HTMLDivElement>, postId: string) => {
  e.stopPropagation();
  dispatch(getresharedforaPost(postId)).then((res: any) => {
    if(res && res.payload !== undefined){
      navigate(`/post/reshare/${postId}`);
    }
  })
};



const viewAProfile = (userId: string) => {

  dispatch(getOtherUser(userId)).then((res) => {
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
  dispatch(rePost(postReshare))
};

const goToPost = async (id: string) => {
  if(!getUser || getUser === null){
    navigate('/login');
    return;
  };
  
  dispatch(getAPost(id)).then((res: any) => {
    if(res && res.payload !== undefined){
      dispatch(allCommentForAPost(id)).then((res: any) => {
        if(res && res.payload !== undefined){
          navigate(`/post/${id}`);
          window.scrollTo(0, 0);
        }
      })
       
    }
  })
 
}

useEffect(() => {
  dispatch(getAvailableStories());
}, [])

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


  const me = getUser && getUser._doc && getUser._doc._id;

  const showPostModal = () => {
    dispatch(setWhichPost('post'));
    dispatch(shouldWeHideMobileNav(true));
    setPostModal(true);
    setisHome(false);
    setIsTrend(false);
    setisnotify(false);
    setispost(true);
  };

 

  useEffect(() => {
     setDesktopMenu(false);
     setMenu(false);
  }, [postModal])

  const hidePostModal = () => {
    dispatch(setWhichPost('none'));
    setPostModal(false);
    dispatch(openpostForm(false));
    dispatch(updateViewingStatus(false));
    dispatch(shouldWeHideMobileNav(false));
  };

  const showFullScreen = (id: string, video: string): void => {
    setFullVideoScreen(true);
    setVideoUrl(video);
    const findPost = posts.find((p: any) => p._id === id);
    console.log('personal post currently ', findPost);
    setPersonalPost(findPost);
  };

  const hideFullScreen = () => {
    setFullVideoScreen(false);
    dispatch(shouldWeHideMobileNav(false));
  };


  const handleDesktopPost = () => {
    setdeskTopModal(false);
  };

  const showDeskTopModal = () => {
    setdeskTopModal(true);
  };

  const onEmojiClick = (emojiObject: any) => {
    setcontent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };


  const handlechange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };


  useOnClickOutside(desktopCommentMenuRef, (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetElement = target.closest('.flex.gap-2.items-center.cursor-pointer.pt-4');
    

    if (targetElement) {
      console.log('Clicked inside the specific div!', e.target);
    } else {
      console.log('Clicked outside the button!', e.target);
      setDesktopMenu(false);
    }
  });

 
 
  const hideMobileModal = () => {
    dispatch(shouldWeHideMobileNav(false));
    setMobileModal(false);
    dispatch(setWhichPost('none'));
  };

  const viewUserProfile = (userId: string) => {
    dispatch(getOtherUser(userId)).then((res: any) => {
      if(res && res.payload !== undefined){
        if(getUser === null){
          dispatch(setProfileType('foreign'));
          navigate(`/profile/${userId}`);
          window.scrollTo(0, 0);
        } else{ 
          const userId = getUser && getUser._doc && getUser._doc._id;
          if(res && res.payload && res.payload._doc && res.payload._doc._id === userId){
          dispatch(setProfileType('local'))
          navigate(`/profile/${userId}`);
        }else{
          dispatch(setProfileType('foreign'))
          navigate(`/profile/${userId}`);
        }
        }
      }
    })
  }

  const showMobileModal = (img: any, id: any) => {
    dispatch(setWhichPost('post'))
    const post = posts.find((item: any) => item._id === id );
    setDisplayImage(img);
    setDisplayProfileImage(post.owner.profilePhoto.url);
    setMobileModal(true);
    setCurrentPostId(id);
    setPersonalPost(post);
    dispatch(shouldWeHideMobileNav(true))
  };

  const showStoriesModal = () => {
    dispatch(updateViewingStatus(true))
    const imageIndex = viewstories[0]
    setDisplayImage(imageIndex);
    setMobileModal(true);
  }

  const viewStories = (userId: string, index: number) => {
    setClickedStatusIndex(index);
    setStatusViewerId(userId); // get the other person userId
    setStoryActive(true);
    dispatch(getAllUserStories(userId)).then((res: any) => {
      if(res && res.payload !== undefined){
        showStoriesModal();
      }
    })
  };

  useEffect(() => {
      if(storyActive){
        if(startShowingIndex === viewstories.length ){

          if(stories[clickedStatusIndex + 1]){
            let user = stories[clickedStatusIndex + 1];
            let userAId = user._id;
            viewStories(userAId, clickedStatusIndex + 1);
            setStartShowingIndex(0);
          }else{
            hideMobileModal();
            setStoryActive(false);
            setStartShowingIndex(0);
            dispatch(updateViewingStatus(false));
            return;
          }
          
        }else{
       let imageInterval = setInterval(() => {
      setStartShowingIndex( startShowingIndex + 1)
      setDisplayImage(viewstories[startShowingIndex])
    }, 3000)
   
    return () => clearInterval(imageInterval)   
        }
    
    }
  }, [storyActive, startShowingIndex]);


  useLayoutEffect(() => {
    dispatch(shouldWeHideMobileNav(false));
  }, [])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

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

  const cancelReshared = (id: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    console.log('ehj ', id)
    const getConfirmation = window.confirm("You Really want to Unshare this post?");
    if(getConfirmation){
    const token = getUser.token;
    const post = { id, token };
    dispatch(deletePost(post))
  }

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

  
  const viewProfile = () => {
    if(getUser && getUser._doc  && getUser._doc.fullname){
      dispatch(getOtherUser(getUser && getUser._doc && getUser._doc._id)).then((res) => {
        if(res && res.payload !== undefined){
          navigate(`/profile/${getUser && getUser._doc && getUser._doc._id}`)
          window.scrollTo(0, 0);
        }
      })
    }else{
      navigate(`/profile/create/${getUser && getUser._doc && getUser._doc._id}`)
    }
  };

 const handleStory = () => {
    if(getUser === null || getUser === undefined){
      navigate('/login');
      return;
    };
    dispatch(setWhichPost('story'));
    dispatch(shouldWeHideMobileNav(true));
    setPostModal(true);
    setisHome(false);
    setIsTrend(false);
    setisnotify(false);
    setispost(true);
  };
  console.log('the post is ', whichPost)
  
  const changeToDarkMode = () => {
    dispatch(changeMode('dark'));
  }

  const changeToLightMode = () => {
    dispatch(changeMode('light'));
  }

 
  return (
    <div className={`sm:mt-10 sm:rounded-tl-3xl ${ mode === 'light' ? 'bg-white' : 'bg-black' } sm:rounded-tr-3xl max-w-md sm:max-w-full`} >
      <div className="pt-4 pl-4 pr-4">
      <Link to='/'>
            <CompanyLogo className='w-16 h-16' />
          </Link>
      </div>
      <div className={`p-2 flex sm:rounded-t-3xl justify-between ${ mode === 'light' ? `${desktopMenu || menu ? 'bg-gray-200' : ''}` : 'bg-black' }  `}>
        <h1 className={`text-md font-bold ${ mode === 'light' ? 'text-black' : 'text-white'} pt-3 pl-4`}>
          Stories
        </h1>
        <div className="flex p-3">
        {
            mode === 'light' ? (
              <>
              <LightModeLogo  onClick={changeToDarkMode} className={`cursor-pointer w-6 h-6 ${ mode === 'light' ? 'fill-purple-600' : 'fill-white'}`} />
              </>
            ) : (
              <>
              <DarkModeLogo onClick={changeToLightMode} className={`cursor-pointer w-6 h-6 ${ mode === 'dark' ? 'fill-white' : 'fill-black'}`} />
              </>
            )
          }
        </div>
      </div>
      {/* stories */}
      <div className={`py-4 ${ mode === 'light' ? `${desktopMenu || menu ? 'bg-gray-200' : ''}` : 'bg-black' }   `}>
        <div className="flex max-w-full overflow-x-auto hide-scrollbar">
          {/* add a story  */}
          <div  onClick={handleStory} className="relative inline-block mx-1 flex-none">
          {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url && (
            <img className="w-[180px] h-[220px] rounded-3xl border-2 opacity-60 border-purple-500 cursor-pointer" src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

          ) 
        }
            {
                getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url && (
            <PlusIcon
              width="30"
              height="30"
              className="absolute inset-0 m-auto z-8 stroke-[2px] fill-gray-400 stroke-white cursor-pointer"
              strokeWidth="1"
            >
           </PlusIcon>
                
                )
            }
            <p className={`text-[10px] ${ mode === 'light' ? 'text-black' : 'text-white'} text-center`} >
            { getUser && getUser._doc && getUser._doc.fullname && 'Your story' }  
            </p>
          </div>
          <div className="flex gap-2 ">
            {/* view stories  */}
            {
              stories && stories.length > 0 && stories.map((story: any, index: number) => (
                <div onClick={() =>viewStories(story && story._id, index)} className="flex-none  relative text-center">
                <img
                  className="w-[180px] h-[220px] rounded-3xl border-2 border-purple-500 cursor-pointer"
                  src={stories && stories[index] && stories[index].stories && stories[index].stories[0] && stories[index].stories[0].photos && stories[index].stories[0].photos[0]  && stories[index].stories[0].photos[0].url }
                  alt=''
                />
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-600 rounded-2xl flex gap-1 items-center py-1 px-2">
                      <SignalLogo className="w-3 h-3 fill-white stroke-white" />
                      <p className="text-white text-[9px]">Live</p>
                    </div>
                    <div className="bg-[#a9a9a9] bg-opacity-50 rounded-2xl flex gap-[1px] items-center py-1 px-2">
                      <PlayLogo className="w-2 h-2 fill-white stroke-white" />
                      <p className="text-white text-[9px]">{story && story.followers && story.followers.length}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-3 bg-[#a9a9a9] bg-opacity-50 p-2 rounded-2xl">
                  <div className="flex gap-1">
                  <img className="w-7 h-7 rounded-full" src={story && story && story.profilePhoto && story.profilePhoto.url} alt="" />
                  <div className="flex flex-col justify-start items-start">
                  <h2 className="text-white font-semibold text-[10px]">{story && story.fullname}</h2>
                  <p className="text-gray-400 text-[9px]">{story && story.followers && story.followers.length}&nbsp;followers</p>
                  </div>
                  </div>

                </div>
               
                <p className={`text-[10px] ${ mode === 'light' ? 'text-black' : 'text-white'} dark:text-white`}>{story && story.fullname}</p>
              </div>

              ))
            }
           

          </div>
        </div>
      </div>

      <h1 className={`text-lg font-bold ${ mode === 'light' ?  `${desktopMenu || menu ? 'bg-gray-200 text-black' : 'bg-white text-black'}` : 'text-white' } pl-4`} >
        Feeds
      </h1>
      {/* desktop post  */}
      {desktopmodal ? (
        <div className={`hidden sm:block fixed mx-auto bottom-0 z-5 sm:rounded-xl ${mode === 'light' ? 'sm:bg-gray-300' : 'sm:bg-gray-800'} sm:pr-3 sm:pl-3 sm:pb-3 sm:max-w-sm md:max-w-sm lg:max-w-lg xl:max-w-xl`} >
          <div className="flex justify-center sm:pb-2">
            <ArrowDownLogo onClick={handleDesktopPost}
              className="w-4 h-4 cursor-pointer"/>
           
          </div>

          <div className={`hidden sm:flex ${ mode === 'light' ? 'sm:bg-white' : 'sm:bg-gray-600'} sm:items-center sm:max-h-[30px] sm:p-2 sm:rounded-2xl`} >
          {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url ? (
            <img onClick={viewProfile} className='w-8 h-8 rounded-full cursor-pointer' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

          ) : (
            <img onClick={viewProfile} className='w-8 h-8 rounded-full cursor-pointer' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
          )
        }
            <input
              onClick={showPostModal}
              type="text"
              value={content}
              className={`hidden sm:block sm:text-xs sm:w-[700px] sm:h-[30px] ${mode === 'light' ? 'sm:bg-white' : 'sm:bg-gray-600'} sm:border-0`}
              placeholder="Share something"
              name=""
              id="text"
              required
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="sm:text-black cursor-pointer"
            >
              🙂
            </button>
            {showEmojiPicker && (
              <div className="absolute z-5">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <div className="hidden sm:flex sm:justify-between sm:items-center gap-2">
            <div className="hidden pt-4 sm:flex gap-6">
              <div className="flex cursor-pointer items-center">
                <VideoLogo className="w-3 h-3 fill-black dark:fill-white"/>
                <p className="text-xs text-black dark-text-white font-semibold">
                  Video
                </p>
              </div>

              <div className="flex cursor-pointer items-center">
                <ImageLogo className="w-3 h-3 fill-black dark:fill-white" />
                <p className="text-xs text-black dark-text-white font-semibold">
                  image
                </p>
              </div>

             

              <div className="flex cursor-pointer items-center">
                <GlobalTrendLogo  className="w-3 h-3 fill-black dark:fill-white"/>
                <p className="text-xs text-black dark-text-white font-semibold">
                  Public
                </p>
              </div>
            </div>

            <button className="text-[9px] mt-3 text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden sm:block sm:fixed sm:bottom-0 sm:right-[50%] sm:rounded-xl sm:p-3 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-xl">
          <div className="sm:p-3 rounded-full bg-black hover:bg-purple-600 border border-white">
            <PlusLogo onClick={showDeskTopModal}
              className="w-7 h-7 cursor-pointer"/>
           
          </div>
        </div>
      )}

      {/* mobile post  */}
      <NavBar />

      <div className="pb-[73px] sm:pb-[100px]">
      {/* feeds */}

      {

posts && Array.isArray(posts) && posts.map((post: any, index: number) => (       
<div key={index} className={`rounded-full py-1 p-3 max-w-full ${ mode === 'light' ? `${ desktopMenu || menu ? 'bg-gray-200' : 'bg-white'} border-gray-300 border-opacity-80 text-black fill-black` : 'bg-black text-white fill-white border-gray-200 border-opacity-50' } border rounded-lg`} >
{
post.reShared &&  (
<div className={`flex justify-between px-2 items-center border-b border-b-gray-300 border-opacity-40`}>
<div className="flex items-center pb-4">
 <img onClick={() => viewAProfile(post && post.reShare && post.reShare[0] && post.reShare[0].user && post.reShare[0].user._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post && post.reShare && post.reShare[0] && post.reShare[0].user  && post.reShare[0].user.profilePhoto && post.reShare[0].user.profilePhoto.url} alt=""/>
  <p className="text-xs font-medium px-1">{post && post.reShare && post.reShare[0]  && post.reShare[0].user  && post.reShare[0].user.fullname}</p>
  <p className="text-gray-500 text-xs font-semibold px-3">Reshared this post</p>
</div>

{
  post && post.reShare && post.reShare[0] && post.reShare[0].user && post.reShare[0].user._id  === me && (
    <UndoLogo onClick={() => cancelReshared(post && post._id)} className="w-3 h-3 cursor-pointer" />
  )
}
</div>
) 
}
<div className="flex items-center gap-2 w-full">
<img onClick={() => viewUserProfile(post && post.owner && post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" key={index} src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt='' />
<div  className="w-full cursor-pointer flex items-center justify-between gap-1">
  <div  onClick={() => goToPost(post._id)} className="flex items-center">
    <div className="mt-3">
      <h1 className="text-sm font-semibold">
        {post && post.owner && post.owner.fullname}
      </h1>
    <p className={`${ mode === 'light' ? 'text-gray-900' : 'text-gray-300'} text-[8px] `}> {post && formatCreatedAt(post.createdAt)} </p>
    </div>
    <VerifyMarkLogo className="w-5 h-5 fill-purple-500"/>
 
    <p className={`${ mode === 'light' ? 'text-gray-700' : 'text-gray-300'} text-[10px] `}>@{post && post.owner && post.owner.handle}</p>
  </div>
  {/* three dot icon  */}
  <div onClick={() => menuShow(post._id)} className="cursor-pointer ">
    <div className="relative" >
      <MenuLogo className="w-[12px] h-[12px]"/>
     
      {/* desktop menu  */}
      <div
        ref={desktopMenuRef}
        id="desktopmenu"
        className={`hidden ${
          desktopMenu && post._id === postClicked ? "sm:block" : "sm:hidden"
        } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] ${mode === 'light' ? 'bg-white fill-black stroke-black text-black' : 'bg-gray-900 fill-white stroke-white text-white' } h-auto rounded-3xl mx-auto  p-2`}
      >
        {
        getUser !== undefined && getUser && getUser._doc && getUser._doc._id  === post.owner._id ? (
            <>
          <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
            <EditLogo  className="w-3 h-3"/>
            <p className="text-[10px]">Edit Post</p>
          </div>
          <div onClick={() =>handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
            <TrashLogo className="w-5 h-5"/>
            <p className="text-[10px]">Delete Post</p>
          </div>
            </>
          ) : (
            <>
            {
              getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(post.owner._id) && (
                <>
                <div onClick={() => handleFollowing(post && post.owner && post.owner._id )} className="flex gap-2 cursor-pointer items-center pt-4">
                  <AddContactLogo  className="w-3 h-3"/>
                  <p className="text-[10px]">Follow @{post && post.owner && post.owner.handle }</p>
                </div>
                </>
              )
            }
          

        <div className="flex gap-2 items-center pt-4  cursor-pointer">
          <BlockContactLogo  className="w-3 h-3"/>
          <p className="text-[10px]">Block @{post && post.owner && post.owner.handle }</p>
        </div>

        <div className="flex gap-2 items-center cursor-pointer pt-4">
          <ReportContactLogo  className="w-3 h-3"/>
          <p className="text-[10px]">Report Post</p>
        </div>

        <div className="flex gap-2 cursor-pointer items-center pt-4">
          <MuteContactLogo   className="w-3 h-3"/>
          <p className="text-[10px]">Mute @{post && post.owner && post.owner.handle }</p>
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
<p className="text-[11px] ">
  {post.content.length > 200 ? (
   <>
   <p className="text-justify text-wrap text-[11px]">{post.content.slice(0, 500)} <strong className="cursor-pointer text-purple-600 text-xs">read more</strong></p>
   </> 
     ) : post.content}
</p>
</div>

{/* mobile menu  */}
<div
ref={desktopMenuRef}
id="desktopmenu"
className={`fixed sm:hidden ${ desktopMenu && post._id === postClicked ? "block" : "hidden"} bottom-0 left-0  ${mode === 'light' ? 'bg-white fill-black stroke-black text-black' : 'bg-gray-900 fill-white stroke-white text-white' } pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
>
{
 getUser !== undefined && getUser && getUser._doc && getUser._doc._id  === post.owner._id ? (
            <>
          <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 items-center cursor-pointer pt-4">
            <EditLogo  className="w-4 h-4"/>
            <p className="text-lg">Edit Post</p>
          </div>
          <div  onClick={() =>handleDeletePost(post._id)} className="flex gap-2 items-center cursor-pointer pt-4">
            <TrashLogo className="w-6 h-6"/>
            <p className="text-lg">Delete Post</p>
          </div>
            </>
          ) : (
            <>
             <div className="flex gap-2 items-center cursor-pointer pt-4">
          <AddContactLogo  className="w-5 h-5"/>
          <p className="text-lg">Follow @{ post && post.owner && post.owner.handle} </p>
        </div>

        <div className="flex gap-2 items-center cursor-pointer pt-4">
          <BlockContactLogo  className="w-5 h-5"/>
          <p className="text-lg">Block @{ post && post.owner && post.owner.handle}</p>
        </div>

        <div className="flex gap-2 items-center cursor-pointer pt-4">
          <ReportContactLogo  className="w-5 h-5"/>
          <p className="text-lg">Report Post</p>
        </div>

        <div className="flex gap-2 items-center cursor-pointer pt-4">
          <MuteContactLogo   className="w-5 h-5"/>
          <p className="text-lg">Mute @{ post && post.owner && post.owner.handle}</p>
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
    <img onClick={() => viewAProfile(storyActive ? storyOwner && storyOwner._id : personalPost && personalPost.owner && personalPost.owner._id )} className='w-9 h-9 rounded-full cursor-pointer z-40' src={storyActive ? storyOwner && storyOwner.profilePhoto && storyOwner.profilePhoto.url : displayProfileImage} alt="" />
  <div className="z-40">
    <h1 className='text-sm text-white font-semibold'>{storyActive ? storyOwner && storyOwner.fullname : personalPost && personalPost.owner && personalPost.owner.fullname}</h1>
    <p className='text-xs text-gray-300'>@{storyActive ? storyOwner && storyOwner.handle : personalPost && personalPost.owner && personalPost.owner.handle}</p>
  </div>
  </div>

{
  !storyActive && (
  <button onClick={() => handleFollowing(post && post.owner && post.owner._id)} className='text-xs px-4 py-1 bg-black z-40 dark:bg-white rounded-full border border-white text-white dark:text-black transform-transition duration-100 hover:scale-110'>
    { getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(post.owner._id) ? 'Following' : "Follow" }
  </button>
  )
}  
  
</div>



<div className="fixed z-5 inset-0 flex justify-center items-center">
  <div className="pt-1"></div>
 <div className="z-40"  onClick={toggleImageControls} onTouchStart={handleTouchStart}  onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} > 
  <img
   
    className="max-w-[600px] cursor-pointer z-40"
    src={displayImage}
    alt="displayimage"
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
      className="w-full h-[310px] bg-white rounded-3xl object-cover cursor-pointer"
      src={post && post.photos[0] && post.photos[0].url}
     alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
  </div>
) : post && post.photos && post.photos.length === 2 ? (
  <div className="flex overflow-hidden">
     <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
      className="fixed-size w-1/2 rounded-l-3xl h-[293px] border-r border-white cursor-pointer object-cover"
      src={post && post.photos[0] && post.photos[0].url}
     alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
     
     <img onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
       className="fixed-size w-1/2 h-[293px] border-l rounded-r-3xl border-white object-cover cursor-pointer"
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
       className="w-full h-[144px]  border-r border-b border-white rounded-tl-3xl fixed-size object-cover cursor-pointer"
       src={post && post.photos[0] && post.photos[0].url}
     alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

     <img onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
        className="w-full h-[144px] border-l border-b border-white rounded-tr-3xl fixed-size object-cover cursor-pointer"
        src={post && post.photos[1] && post.photos[1].url}
     alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

     <img onClick={() => showMobileModal(post && post.photos[2] && post.photos[2].url, post && post._id)}
       className="w-full h-[144px] border-t border-r border-white rounded-bl-3xl fixed-size object-cover cursor-pointer"
       src={post && post.photos[2] && post.photos[2].url}
     alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

     <img onClick={() => showMobileModal(post && post.photos[3] && post.photos[3].url, post && post._id)}
       className="w-full h-[144px] border-t border-l border-white rounded-br-3xl fixed-size object-cover cursor-pointer"
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
  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}> {post.likes.length}</p>

  <div  onClick={(e) =>viewWhoResharedPost(e, post._id)} className="p-[5px] bg-green-600 rounded-full">
    <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
  </div>
  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}>{post.reShare.length}</p>

  <div  onClick={(e) =>viewWhoBookmarkPost(e, post._id)} className="p-[5px] bg-sky-600 rounded-full">
    <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
  </div>

  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}>{post.bookmark.length}</p>
</div>

<p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[10px] mt-3 `}>{post.comments.length} Comments</p>
</div>
{/* icons */}
<div className="flex justify-between items-center">
<div className="flex items-center pl-9 sm:gap-1 mt-4">
  <div  onClick={() =>handleLike(post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
    <p className="text-white text-[10px] pl-1">
      Like
    </p>
  </div>

  <div onClick={() =>handleReShare(post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white"/>
    <p className="text-white text-[10px] pl-1">
      ReShare
    </p>
  </div>

  <div onClick={() => goToPost(post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <CommentLogo  className={`w-[12px] h-[12px] ${ mode === 'light' ? 'fill-white' : 'fill-white'} `} />
    <p className={`${ mode === 'light' ? 'text-white' : 'text-white'} text-[10px] pl-1`} >
      Comment
    </p>
  </div>

  <div></div>
  <div></div>
</div>

<div  onClick={() =>handleBookmark(post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} stroke-white fill-white flex cursor-pointer items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg`} >
  <BookMarkLogo   className="w-[12px] h-[12px]"/>
</div>
</div>
</div>
))

}
      
      </div>
      
      {/* post form modal  */}
      <div
        className={`${
          postModal || openPostForm  ? "flex" : "hidden"
        } fixed top-0 left-0 bg-black sm:px-[30%]  w-full h-full justify-center items-center`}
      >
        <div className={`w-full h-full  ${mode === 'light' ? 'bg-white text-black fill-black' : 'bg-gray-800 text-white fill-white'}`}>
          <div className="flex justify-between items-center p-2">
          <img className='rounded-full w-7 h-7 cursor-pointer' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

            {/* cancel or close  */}
            <CancelLogo  onClick={hidePostModal}
              className={`w-3 h-3 ${ mode === 'light' ? 'fill-black' : 'fill-white'} z-40 mr-2 cursor-pointer`}/>
            
          </div>

          <textarea
            onChange={handlechange}
            value={content}
            name="content"
            id="content"
            className={`${mode === 'light' ? 'bg-white' : 'bg-gray-800 text-white'} resize-none flex-none w-full h-[85vh] text-xs border-none focus:ring-0`}
            placeholder={`${ whichPost === 'post' ? 'share a post' : 'share a story'} `}
          ></textarea>

          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
              <div onClick={handleFileClick} className="flex cursor-pointer items-center">
                {/* file  */}
               <VideoLogo className="w-3 h-3" />
                <p className="text-xs dark-text-white font-semibold">
                  Video
                </p>
                <input hidden ref={fileRef} onChange={handleFileChange} type="file" accept="video/*" name="video" id="video" />
              </div>

              <div onClick={handleImageClick} className="flex cursor-pointer pl-2 items-center">
                <ImageLogo  className="w-3 h-3"/>
                <p className="text-xs font-semibold">
                  image
                </p>
                <input hidden ref={imageRef} onChange={handleImageChange} type="file" multiple accept="image/*" name="image" id="image" />

              </div>

            

              <div className="flex cursor-pointer pl-2 items-center">
                <GlobalTrendLogo className="w-3 h-3" />
               
                <select onChange={getPrivacy} value={privacy} className={`text-xs ${ mode === 'light' ?  'bg-white text-black':'bg-gray-800 text-white' } text-black dark-text-white p-2 appearance-none font-semibold border border-0`} name="public" id="public">
                  <option className="text-xs font-semibold border border-0" value="public">Public</option>
                  <option className="text-xs font-semibold border border-0" value="private">Private</option>
                </select>
                
              </div>
            </div>


            <button onClick={handlePostSubmit} className={`text-[9px] ${ mode === 'light' ? 'bg-black text-white' : 'border border-gray-900 bg-gray-900'} font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110`}>
             {
              isPosting ? (
                <div className="flex items-center"><ProcessingLogo className="w-5 h-5 fill-white stroke-[5px] stroke-white" /> <p>Posting...</p></div>
              ) : (
                <SendLogo className="w-5 h-5 fill-white"/>
              )
             } 
            </button>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default Middle;
