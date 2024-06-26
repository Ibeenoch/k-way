import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import pics from "../../../../images/images-74.jpeg";
import { PlusIcon, HeartIcon,  } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAUser, getAllUser, getOtherUser, selectUser, userFollowers, userFollowing } from "../auth/authSlice";
import { allCommentForAPost, bookmarkPost, commentOnPost, createPost, deletePost, getAPost, getAllPosts, likePost, rePost, resetEditCommentStatus, selectPost, updatePost } from "./PostSlice";
import toast, { Toast } from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";
import ImgLazyLoad from "../lazyLoad/ImgLazyLoad";
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
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
import { ReactComponent as VideoLogo } from '../../../../assets/videoLogo.svg';
import { ReactComponent as ImageLogo } from '../../../../assets/imagesLogo.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ArrowDownLogo } from '../../../../assets/arrowDownLogo.svg';
import { ReactComponent as PlusLogo } from '../../../../assets/plusLogo.svg';
import { ReactComponent as ThreeDotVerticalLogo } from '../../../../assets/threeDotVerticalLogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";

const Middle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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
  const [touchstart, setTouchStart] = useState<number>();
  const [touchend, setTouchEnd] = useState<number>();
  const [displayProfileImage, setDisplayProfileImage] = useState<string>('');
  const [toRefresh, setToRefresh] = useState<boolean>(false);

  const { profile } = useAppSelector(selectUser);
  const { posts, comments } = useAppSelector(selectPost);

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
    dispatch(getAllUser()).then((res: any) => {
      console.log('all users ', res)
    })
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


 const getPrivacy = (e: ChangeEvent<HTMLSelectElement>) => {
  setPrivacy(e.target.value)

 };

 const handleFollowing = (auserId: string) => {
  if(getUser === null){
    navigate('/login');
    return;
  };
  if(getUser._doc._id === auserId){
    console.log('the same ', getUser._doc._id, ' and ', auserId);
    return;
  }
  console.log('different');
  const token = getUser && getUser.token;
  const follow = { token, auserId };
  dispatch(userFollowing(follow)).then((res: any) => {
  console.log('just followed ', res)
    if(res && res.payload !== undefined){
      dispatch(getAllPosts()).then((res: any) => {
         console.log('a post ', res); 
      })
    }
  })
 };

 const handleFollower = (userId: string) => {
  if(getUser === null){
    navigate('login');
    return;
  };
  const token = getUser && getUser.token;
  const follow = { token, userId };
  dispatch(userFollowers(follow)).then((res: any) => {
    console.log('user res ', res);
  })
 };


const handlePostSubmit = async() => {
  setIsPosting(true);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  if(getUser === null){
    navigate('/login');
    return;
  };
  const userId = getUser._doc._id;
  const data = { content, privacy,  };
  let postData = new FormData();
  postData.append('content', content);
  postData.append('privacy', privacy);
  
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
  console.log('imglength ', imageInput.length, 'videolength ', fileInput.length )
  const token = getUser.token;
  
  setcontent('');
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
      console.log('the update res ', res)
      if(res.payload !== undefined){
      setIsUpdated(true);
      hidePostModal();
      navigate('/');
      window.scrollTo(0, document.documentElement.scrollHeight);
     }

    })
  }
}else{

  const post = {
    postData, 
    token
  };

  setcontent('');
  setFileInput([]);
  setImageInput([]);

  if(post){
    dispatch(createPost(post)).then((res: any) => {
      console.log('posted   ', res)
      if(res.payload !== undefined){
         dispatch(getAllPosts()).then((res: any) => {
          setIsPosting(false);
          hidePostModal();
          navigate('/');
          window.scrollTo(0, document.documentElement.scrollHeight);
      });
      }
     
    })
  }
}
}


const handleLike = async (postId: string) => {
  if(getUser === null){
    navigate('/login');
    return;
  };
  const token = getUser && getUser.token;
  const userId =  getUser && getUser._doc._id;
  const postLike = {
    token,
    userId,
    postId
  };
  dispatch(likePost(postLike)).then((res: any) => {
    console.log('res ', res)
  })
};

const handleBookmark = async (postId: string) => {
  if(getUser === null){
    navigate('/login');
    return;
  };
  const token = getUser && getUser.token;
  const userId =  getUser && getUser._doc._id;
  const postBooked = {
    token,
    userId,
    postId
  };
  dispatch(bookmarkPost(postBooked)).then((res: any) => {
    console.log('res ', res)
  })
};

const handleReShare = async (postId: string) => {
  if(getUser === null){
    navigate('/login');
    return;
  };
  const token = getUser && getUser.token;
  const userId =  getUser && getUser._doc._id;
  const postReshare = {
    token,
    userId,
    postId
  };
  dispatch(rePost(postReshare)).then((res: any) => {
    console.log('res ', res)
  })
};

const goToPost = async (id: string) => {
  dispatch(getAPost(id)).then((res: any) => {
    console.log('get post', res);
    if(res && res.payload !== undefined){
      dispatch(allCommentForAPost(id)).then((res: any) => {
        console.log('get comment', res);
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
console.log('toggleControls  ', toggleControls)



const handleTouchStart = (e : React.TouchEvent<HTMLDivElement>) => {
  setTouchStart(e.targetTouches[0].clientX)
}

const handleTouchMove = (e : React.TouchEvent<HTMLDivElement>) => {
  setTouchEnd(e.targetTouches[0].clientX)
}

console.log('touch ', touchstart, touchend);
const handleTouchEnd = (e : React.TouchEvent<HTMLDivElement>) => {
  if(!touchstart || !touchend) return;

  const distance = touchstart - touchend;
  const minimumSwipeDistance = 50;

    const findPost = posts.find((p: any) => p._id === currentPostId);
    const picsLength = findPost.photos.length;
    const findIndex = findPost.photos.findIndex((img: any) => img.url === displayImage);
    console.log(' the dist and minswipedist ', distance, minimumSwipeDistance);
  if(distance > minimumSwipeDistance){
    // swipe left = next
    setDisplayImage(findPost.photos[findIndex === picsLength - 1 ? picsLength - 1 : findIndex + 1].url)
  }else if(distance < -minimumSwipeDistance){
    //swipe right = prev
    setDisplayImage(findPost.photos[findIndex <= 0 ? 0 : findIndex - 1].url);

  };

 
}

  const videoUrl = `${process.env.PUBLIC_URL}/video.mp4`;


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
      console.log('comment ', res);
      if(res && res.payload !== undefined){
        setIsCommenting(false);
        setToRefresh(true);
      }
    })
  }

  const getPost = (currentPostId: string) => {
    dispatch(getAPost(currentPostId)).then((res: any) => {
      console.log('get post', res);
      if(res && res.payload !== undefined){
        dispatch(allCommentForAPost(currentPostId)).then((res: any) => {
          console.log('get comment', res);
          
        })
         
      }
    })
  };


  useEffect(() => {
    getPost(currentPostId);
  }, [toRefresh]);

  const hideComment = () => {
    setCommentModal(false)
  }

  const showMobileComment = () => {
    setMobileCommentModal(true)
  }

  const hideMobileComment = () => {
    setMobileCommentModal(false)
  }

  const showPostModal = () => {
    setPostModal(true);
   
  };

  const handleEditIcon = (commentId: string, postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    navigate(`/edit/${postId}/${commentId}`);
  }

  useEffect(() => {
     setDesktopMenu(false);
     setMenu(false);
  }, [postModal])

  const hidePostModal = () => {
    setPostModal(false);
  };

  const showFullScreen = () => {
    setFullVideoScreen(true);
  };

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

  const onEmojiClick = (emojiObject: any) => {
    console.log("events emoji ", emojiObject);
    setcontent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };


  const handlechange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setcontent(e.target.value);
  };
  const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
    setcontent(e.target.value);
  };

  const hideMobileMenu = (e: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target as Node)
    ) {
      
      setMenu(false);
    }
  };

  const hideDeskTopMenu = (e: MouseEvent) => {
   if (
      desktopMenuRef.current &&
      !desktopMenuRef.current.contains(e.target as Node)
    ) {
      setDesktopMenu(false);
    }
  };

  const handleReplyComent = async (commentId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const userId = getUser._doc._id;
    navigate(`/reply/comment/${commentId}/${userId}`)
  }

  const hideMobileModal = () => {
    setMobileModal(false);
  };

  const viewUserProfile = (userId: string) => {
    dispatch(getOtherUser(userId)).then((res: any) => {
      console.log('user profile ', res);
      if(res && res.payload !== undefined){
        navigate(`/profile/${userId}`)
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
    if(hideMobileMenu){
      document.addEventListener("mousedown", hideMobileMenu);
    }else{
      document.addEventListener("mousedown", hideMobileMenu);
        };

    return () => {
      document.removeEventListener("mousedown", hideMobileMenu);
    };
  }, [hideMobileMenu]);

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

  useEffect(() => {
    dispatch(getAllPosts()).then((res: any) => {
      console.log('fetching all post ', res)
    })
  }, [])

  const menuShow = (id: string) => {
    setPostClicked(id);
    setIsPosting(false);
    setMenu((prev) => !prev);
    setDesktopMenu(true);
  };

  const showCommentMenuBar = (id: string) => {
    setCommentClicked(id);
    setDesktopCommentMenu(true);
  };

  const closeCommentMenu = () => {
    setDesktopCommentMenu(false);
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

  const handleDeletePost = (id: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const getConfirmation = window.confirm("Are you sure Your want to delete this post? This action cannot be undo");
    if(getConfirmation){
    const token = getUser.token;
    const post = { id, token };
    dispatch(deletePost(post)).then((res: any) => {
      console.log('is successfully deleted ', res);
    })
  }

  };

  


  const viewProfile = () => {
    console.log('jjj')
    if(getUser !== null){
      // navigate(`/profile/${getUser && getUser._doc && getUser._doc._id}`)
      console.log('okay ', getUser)
    }else{
      navigate('/login');
    }
  };


  return (
    <div className="mt-10 max-w-md sm:max-w-full">
      <h1 className="text-md font-bold text-black dark:text-white pl-4">
        Stories
      </h1>
      {/* stories */}
      <div className="my-4">
        <div className="flex max-w-full overflow-x-auto">
        {/* <img
              className="w-20 h-20 border-2 opacity-80 border-purple-500 rounded-full cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/images-73.jpeg`}
              alt=""
            /> */}
          {/* add a story  */}
          <div  onClick={viewProfile} className="relative inline-block mx-1 flex-none">
          {
         getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url ? (
            <img className="w-20 h-20 border-2 opacity-80 border-purple-500 rounded-full cursor-pointer" src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

          ) : (
            <img className="w-20 h-20 border-2 opacity-80 border-purple-500 rounded-full cursor-pointer" src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
          )
        }
            <PlusIcon
              width="20"
              height="20"
              className="absolute inset-0 m-auto z-8 stroke-[4px] fill-gray-400 stroke-gray-400 cursor-pointer"
              strokeWidth="1"
            >
            </PlusIcon>
            <p className="text-[10px] text-black dark:text-white text-center">
            { getUser !== null && 'Your story' }  
            </p>
          </div>
          <div className="flex gap-2 ">
            {/* view stories  */}

            <div className="flex-none text-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-purple-500 cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`}
                alt=""
              />
              <p className="text-[10px] text-black dark:text-white">Jone. D</p>
            </div>

            <div className="flex-none text-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-purple-500 cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/ladies 7.png`}
                alt=""
              />
              <p className="text-[10px] text-black dark:text-white">Anata. K</p>
            </div>

            <div className="flex-none text-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-purple-500 cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/ladies 6.png`}
                alt=""
              />
              <p className="text-[10px] text-black dark:text-white">Hana. D</p>
            </div>

            <div className="flex-none text-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-purple-500 cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/images-73.jpeg`}
                alt=""
              />
              <p className="text-[10px] text-black dark:text-white">Doris. k</p>
            </div>

            <div className="flex-none text-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-purple-500 cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/ladies 8.png`}
                alt=""
              />
              <p className="text-[10px] text-black dark:text-white">Betta. l</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-lg font-bold text-black dark:text-white pl-4">
        Feeds
      </h1>
      {/* desktop post  */}
      {desktopmodal ? (
        <div className="hidden sm:block fixed mx-auto bottom-0 z-5 sm:rounded-xl sm:bg-gray-300 sm:pr-3 sm:pl-3 sm:pb-3 sm:max-w-sm md:max-w-sm lg:max-w-lg xl:max-w-xl ">
          <div className="flex justify-center sm:pb-2">
            <ArrowDownLogo onClick={handleDesktopPost}
              className="w-4 h-4 cursor-pointer"/>
           
          </div>

          <div className="hidden sm:flex sm:bg-white sm:items-center sm:max-h-[30px] sm:p-2 sm:rounded-2xl">
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
              className="hidden sm:block sm:text-xs sm:w-[700px] sm:h-[30px] sm:bg-white sm:border-0"
              placeholder="Share something"
              name=""
              id=""
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
          <div className="sm:p-3 rounded-full bg-black border border-white">
            <PlusLogo onClick={showDeskTopModal}
              className="w-7 h-7 cursor-pointer"/>
           
          </div>
        </div>
      )}

      {/* mobile post  */}

      {mobileIconModal ? (
        <div className="fixed bottom-5 bg-gray-800 pr-3 pl-3 pb-3 w-full rounded-full sm:hidden">
          <div className="flex justify-center pb-2 mr-5">
            <svg
              onClick={hideFullMobileScreen}
              className="w-7 h-7 cursor-pointer fill-white"
              style={{ strokeWidth: 4 }}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="256"
              height="256"
              viewBox="0 0 256 256"
            >
              <defs></defs>
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>

          <div className="flex gap-2 justify-around items-center">
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
                    <path d="M125.9,10.6c-2.1,1.2-98.3,94.9-98.6,96.1c-0.2,0.6-0.2,29-0.2,63l0.2,61.9l1.4,2.9c1.9,4.1,5.5,7.8,9.6,9.8l3.4,1.6H128h86.3l2.9-1.3c5.3-2.5,9.3-7.2,10.9-12.7c0.7-2.5,0.8-9.6,0.8-63.8c0-33.6-0.2-61.3-0.3-61.8c-0.5-1.2-97.3-95-98.8-95.7C128.1,9.8,127.2,9.8,125.9,10.6z M173.9,66.4l45.3,43.9l-0.1,59.6l-0.2,59.6l-1.2,2c-0.7,1.1-2.2,2.6-3.3,3.3l-2.1,1.4l-22.2,0.2l-22.2,0.2v-44v-43.9H128H88.1v43.9v43.9H66.5c-20,0-21.9-0.1-23.8-1c-2.6-1.1-4.7-3.5-5.4-6.1c-0.3-1.2-0.5-21.8-0.5-60.5v-58.6l45.4-44c24.9-24.2,45.6-44,45.9-43.9C128.3,22.4,149,42.3,173.9,66.4z M158,197.4v39H128H97.9v-39v-39H128H158L158,197.4L158,197.4z" />
                  </g>
                </g>
              </g>
            </svg>

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
                    <path d="M96.1,10.5c-18.4,1.9-36,9.2-50.7,21.1c-4.1,3.3-12.3,11.7-15.2,15.5c-3.9,5-7.8,11.4-10.4,16.6C3.7,96.9,7.6,135,30.2,164.6c2.9,3.9,11.2,12.3,15.2,15.5c34.5,27.8,82.4,28.8,117.6,2.4l5.2-3.9l33.4,33.4c36.3,36.2,34.3,34.5,38.6,33.7c2.2-0.4,5.1-3.4,5.5-5.5c0.8-4.2,2.4-2.3-33.7-38.6l-33.4-33.4l3.9-5.2c26.4-35.2,25.4-83.2-2.4-117.6c-3.3-4.1-11.7-12.3-15.5-15.2C144.7,15,120.4,8,96.1,10.5z M116,25.4c9.6,1.2,17.5,3.6,25.9,7.9c40,20,56.4,68.8,36.5,108.5c-14,27.7-42,45.1-72.6,45.1c-27,0-52.4-13.7-67.6-36.5C18.7,121.3,20.7,82,42.9,54.7c2.7-3.3,9.4-9.9,12.7-12.5C72.2,28.9,95,22.6,116,25.4z" />
                  </g>
                </g>
              </g>
            </svg>

            <div
              onClick={showPostModal}
              className="p-4 bg-black border border-white rounded-full"
            >
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

            <svg
              className="w-12 h-12 fill-white stroke-white"
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
                  <path d="M152.4,138.1c0,0-0.9-0.2-2.7-0.5c-1.5,5.4-11.3,9.5-23.1,9.5c-11.4,0-20.9-3.9-22.9-9c-44.1,10.9-40.9,51.9-40.9,51.9c64.5,19.8,130.7,0,130.7,0S196.6,148.9,152.4,138.1z" />
                  <path
                    fill="white"
                    d="M128,136.1c16.6,0,30.1-15.7,30.1-35.2c0-25.8-13.5-35.2-30.1-35.2c-16.6,0-30.1,9.3-30.1,35.2C97.9,120.4,111.4,136.1,128,136.1z"
                  />
                  <path
                    fill="white"
                    d="M190.8,116.5c14,0,25.4-13.3,25.4-29.7c0-21.8-11.4-29.7-25.4-29.7c-14,0-25.4,7.9-25.4,29.7C165.4,103.2,176.8,116.5,190.8,116.5z"
                  />
                  <path
                    fill="white"
                    d="M211.4,118.1c0,0-0.8-0.2-2.3-0.5c-1.3,4.6-9.5,8-19.5,8c-9.7,0-17.7-3.3-19.4-7.6c-3.4,0.8-6.5,1.9-9.2,3.1c-1.7,3.6-3.9,6.9-6.4,9.8c25.8,6.5,38.1,23,43.3,38.2c28-1.2,48.2-7.2,48.2-7.2S248.7,127.3,211.4,118.1z"
                  />
                  <path
                    fill="white"
                    d="M101.5,131c-2.5-2.9-4.7-6.1-6.4-9.7c-2.8-1.2-5.9-2.3-9.3-3.1c0,0-0.8-0.2-2.3-0.5c-1.3,4.6-9.5,8-19.5,8c-9.7,0-17.7-3.3-19.4-7.6C7.3,127.3,10,162,10,162c16.4,5.1,33,7,48.1,7.3C63.3,154.1,75.6,137.5,101.5,131z"
                  />
                  <path
                    fill="white"
                    d="M65.2,116.5c14,0,25.4-13.3,25.4-29.7c0-21.8-11.4-29.7-25.4-29.7S39.8,65,39.8,86.8C39.8,103.2,51.2,116.5,65.2,116.5z"
                  />
                </g>
              </g>
            </svg>

            <img
              src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className="w-10 h-10 rounded-full cursor-pointer border border-purple-500"
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

     
      <div className="pb-[150px] sm:pb-[100px]">
      {/* feeds */}
        {

          posts && Array.isArray(posts) && posts.map((post: any, index: number) => (       
      <div key={index} className="rounded-full my-1 p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">
       {
        post.reShared &&  (
          <>
          <div className="flex border-b border-b-gray-300 pb-4">
           <ImgLazyLoad className="w-8 h-8 rounded-full cursor-pointer" src={post && post.reShare && post.reShare[0].user.profilePhoto && post.reShare[0].user.profilePhoto.url} alt={post && post.reShare && post.reShare[0].user.profilePhoto && post.reShare[0].user.profilePhoto.public_id} />
            <p className="text-black dark:text-white text-xs font-medium px-1">{post && post.reShare && post.reShare[0].user.fullname}</p>
            <p className="text-gray-500 text-xs font-semibold px-3">Reshared this post</p>
          </div>
          </>
        ) 
       }
        <div className="flex items-center gap-2 w-full">
          <ImgLazyLoad onClick={() => viewUserProfile(post && post.owner && post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" key={index} src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
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
                  getUser !== undefined && getUser && getUser._doc && getUser._doc._id  ===   post && post.owner && post.owner._id ? (
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
          <p className="text-xs text-black dark:text-white">
            {post.content}
          </p>
        </div>

         {/* mobile menu  */}
      <div
        ref={mobileMenuRef}
        id="mobilemenu"
        className={`fixed ${
          menu && post._id === postClicked ? "block" : "hidden"
        } bottom-0 bg-white p-5 w-full h-auto rounded-tl-3xl rounded-tr-3xl sm:hidden`}
      >
         {
           getUser !== undefined && getUser && getUser._doc && getUser._doc._id  ===   post && post.owner && post.owner._id ? (
                      <>
                    <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
                      <EditLogo  className="stroke-black w-4 h-4"/>
                      <p className="text-black text-md">Edit Post</p>
                    </div>
                    <div  onClick={() =>handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
                      <TrashLogo className="fill-black stroke-black w-6 h-6"/>
                      <p className="text-black text-md">Delete Post</p>
                    </div>
                      </>
                    ) : (
                      <>
                       <div className="flex gap-2 cursor-pointer items-center pt-4">
                    <AddContactLogo  className="fill-black stroke-black w-5 h-5"/>
                    <p className="text-black text-md">Follow @texilola😎</p>
                  </div>

                  <div className="flex gap-2 items-center pt-4  cursor-pointer">
                    <BlockContactLogo  className="fill-black stroke-black w-5 h-5"/>
                    <p className="text-black text-md">Block @texilola😎</p>
                  </div>

                  <div className="flex gap-2 items-center cursor-pointer pt-4">
                    <ReportContactLogo  className="fill-black stroke-black w-5 h-5"/>
                    <p className="text-black text-md">Report Post</p>
                  </div>

                  <div className="flex gap-2 cursor-pointer items-center pt-4">
                    <MuteContactLogo   className="fill-black stroke-black w-5 h-5"/>
                    <p className="text-black text-md">Mute @texilola😎</p>
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
              <img className='w-9 h-9 rounded-full cursor-pointer z-40' src={displayProfileImage} alt="" />
            <div className="z-40">
              <h1 className='text-sm text-white font-semibold'>{personalPost && personalPost.owner && personalPost.owner.fullname}</h1>
              <p className='text-xs text-gray-300'>@{personalPost && personalPost.owner && personalPost.owner.handle}</p>
            </div>
            </div>
            
            <button onClick={() => handleFollowing(post && post.owner && post.owner._id)} className='text-xs px-4 py-1 bg-black z-40 dark:bg-white rounded-full border border-white text-white dark:text-black transform-transition duration-100 hover:scale-110'>
              { post && post.owner && post.owner.followers && post.owner.followers.includes(getUser && getUser._doc && getUser._doc._id.toString()) ? 'UnFollow' : "Follow" }
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
            <p className="text-xs text-white">{post && post.reShare && post.reShare.length}</p>
            </div>

            <div className="p-[5px] flex gap-1 cursor-pointer">
              <BookMarkLogo  onClick={() =>handleBookmark(post._id)} className="w-5 h-5 fill-white stroke-white"/>
             
            <p className="text-xs text-white">{post && post.bookmark && post.bookmark.length}</p>
            </div>

          </div>

        </div>
            </div>
            
            <div className={`fixed bottom-0 ${toggleControls ? 'flex' : 'hidden' } border border-white rounded-xl`}>
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
                <HeartIcon onClick={() =>handleLike(post._id)} color="white" className="w-12 h-12 fill-white" />
              </div>
              <p className="text-xs text-white">{post && post.likes && post.likes.length}</p>
            </div>

            <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
              <div  onClick={() =>handleReShare(post._id)}  className="p-2 w-9 h-9 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
               <ReplyLogo className="w-15 h-15 fill-white stroke-white" />
              </div>
              <p className="text-xs text-white">{post && post.reShare && post.reShare.length}</p>
            </div>

            <div  onClick={() => goToPost(post._id)} className="flex flex-col cursor-pointer justify-end items-center pr-4">
              <div  className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
               <CommentLogo className="w-4 h-4 fill-white stroke-white" />
              </div>
              <p className="text-xs text-white">{post && post.comments && post.comments.length}</p>
            </div>

            <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
            <div className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
               <BookMarkLogo  onClick={() =>handleBookmark(post._id)} className="w-4 h-4 fill-white stroke-white" />
              </div>
              <p className="text-xs text-white">{post && post.bookmark && post.bookmark.length}</p>
            </div>
          </div>
        </div>

        {/* cancel or close  */}
        <div className="absolute top-5 right-5 flex justify-between items-center">
          {/* cancel or close  */}
          <CancelLogo onClick={hideFullScreen}
            className="w-4 h-4 fill-white cursor-pointer"/>
        </div>

        {/* people comments  */}
        <div className="absolute bottom-16 left-3  flex flex-col">
          <div className="flex gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
            <div>
              <h1 className="text-md font-bold text-white">Harmony Waves</h1>
              <p className="text-sm text-white">
                Omg, the dress is so pretty😍
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
            <div>
              <h1 className="text-md font-bold text-white">Harmony Waves</h1>
              <p className="text-sm text-white">
                Omg, the dress is so pretty😍
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
            <div>
              <h1 className="text-md font-bold text-white">Harmony Waves</h1>
              <p className="text-sm text-white">
                Omg, the dress is so pretty😍
              </p>
            </div>
          </div>
        </div>

        {/* add your comment  */}

        <div className="fixed bottom-0 flex border border-white rounded-xl">
             <input
                  type="text"
                  className="rounded-md border-0 bg-transparent w-[70vw] sm:left-[25%] sm:w-[42vw] mx-auto left-0 py-2 text-white shadow-sm placeholder:text-white  sm:text-xs"
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
      

        {/* post images  */}

        { post && post.photos && post.photos.length > 0 ? (
        <div  className="mt-2 pl-9 cursor-pointer">
          { post && post.photos && post.photos.length === 1 ? (
            <div className="rounded-3xl overflow-hidden">
          <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                className="w-[520px] h-[310px] cursor-pointer"
                src={post && post.photos[0] && post.photos[0].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            </div>
          ) : post && post.photos && post.photos.length === 2 ? (
            <div className="flex rounded-3xl overflow-hidden">
               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                className="w-[258px] h-[293px] border-r-2 border-white cursor-pointer"
                src={post && post.photos[0] && post.photos[0].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
               
               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                 className="w-[258px] h-[293px] border-l-2 border-white cursor-pointer"
                 src={post && post.photos[1] && post.photos[1].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            </div>
          ) : post && post.photos && post.photos.length === 3 ? (
            <div className="flex rounded-3xl overflow-hidden">
               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                 className="w-[258] h-[292px] border-r-2 border-r-white cursor-pointer"
                 src={post && post.photos[0] && post.photos[0].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                 className="w-full h-[292px] border-b-2 border-l-2 border-b-white cursor-pointer"
                 src={post && post.photos[1] && post.photos[1].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[2] && post.photos[2].url, post && post._id)}
                 className="w-full h-[292px]  border-l-2  bordder-t-2 border-white cursor-pointer"
                 src={post && post.photos[2] && post.photos[2].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            </div>
          ) :   post && post.photos && post.photos.length === 4 ? (
            <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
              <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                 className="w-[259px] h-[144px]  border-r-2 border-b-2 border-white cursor-pointer"
                 src={post && post.photos[0] && post.photos[0].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[1] && post.photos[1].url, post && post._id)}
                  className="w-[259px] h-[144px] border-l-2 border-b-2 border-white cursor-pointer"
                  src={post && post.photos[1] && post.photos[1].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[2] && post.photos[2].url, post && post._id)}
                 className="w-[259px] h-[144px] border-t-2 border-r-2 border-white cursor-pointer"
                 src={post && post.photos[2] && post.photos[2].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />

               <ImgLazyLoad onClick={() => showMobileModal(post && post.photos[3] && post.photos[3].url, post && post._id)}
                 className="w-[259px] h-[144px] border-t-2 border-l-2 border-white cursor-pointer"
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
              onClick={showFullScreen}
              className="w-full cursor-pointer object-cover h-[200px]"
              controls
              muted
              src={post && post.video && post.video.url}
            ></video>
          </div>
        )  : (<> </> )}

        <div onClick={() => goToPost(post._id)} className="flex cursor-pointer justify-between items-center">
          <div className="flex ml-9 mt-4 gap-1 items-center">
            <div className="p-[5px] bg-red-600 rounded-full">
              <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-600"> {post.likes.length}</p>

            <div className="p-[5px] bg-green-600 rounded-full">
              <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-600">{post.reShare.length}</p>

            <div className="p-[5px] bg-sky-600 rounded-full">
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
      </div>
      
      {/* post form modal  */}
      <div
        className={`${
          postModal ? "flex" : "hidden"
        } fixed top-0 left-0 bg-black sm:px-[30%]  w-full h-full justify-center items-center`}
      >
        <div className={`w-full h-full  bg-white`}>
          <div className="flex justify-between items-center p-2">
          <img className='rounded-full w-7 h-7 cursor-pointer' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

            {/* cancel or close  */}
            <CancelLogo  onClick={hidePostModal}
              className="w-3 h-3 fill-black z-40 mr-2 cursor-pointer"/>
            
          </div>

          <textarea
            onChange={handlechange}
            value={content}
            name=""
            id=""
            className="bg-white resize-none flex-none w-full h-[85vh] text-xs border border-none"
            placeholder="make a post"
          ></textarea>

          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
              <div onClick={handleFileClick} className="flex cursor-pointer items-center">
                {/* file  */}
               <VideoLogo className="w-3 h-3 fill-black dark:fill-white" />
                <p className="text-xs text-black dark-text-white font-semibold">
                  Video
                </p>
                <input hidden ref={fileRef} onChange={handleFileChange} type="file" accept="video/*" name="video" id="video" />
              </div>

              <div onClick={handleImageClick} className="flex cursor-pointer pl-2 items-center">
                <ImageLogo  className="w-3 h-3 fill-black dark:fill-white"/>
                <p className="text-xs text-black dark-text-white font-semibold">
                  image
                </p>
                <input hidden ref={imageRef} onChange={handleImageChange} type="file" multiple accept="image/*" name="image" id="image" />

              </div>

            

              <div className="flex cursor-pointer pl-2 items-center">
                <GlobalTrendLogo className="w-3 h-3 fill-black dark:fill-white" />
               
                <select onChange={getPrivacy} value={privacy} className="text-xs text-black dark-text-white p-2 appearance-none font-semibold border border-0" name="" id="">
                  <option className="text-xs text-black dark-text-white font-semibold border border-0" value="public">Public</option>
                  <option className="text-xs text-black dark-text-white font-semibold border border-0" value="private">Private</option>
                </select>
                
              </div>
            </div>


            <button onClick={handlePostSubmit} className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
             {
              isPosting ? (
                <div className="flex items-center"><ProcessingLogo className="w-4 h-4 stroke-white" /> <p>Posting...</p></div>
              ) : (
                <SendLogo className="w-4 h-4 fill-white"/>
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
