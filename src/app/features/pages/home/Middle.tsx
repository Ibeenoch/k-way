import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeartIcon, PlusIcon,  } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { changeMode, getAllUser, getOtherUser, selectUser, userFollowing, } from "../auth/authSlice";
import { allCommentForAPost, createPost, createStory, getAPost, getAllPosts, getAllUserStories, getAvailableStories,  openpostForm,  selectPost, setWhichPost, shouldWeEditPost, shouldWeHideMobileNav, updatePost, updateViewingStatus } from "./PostSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../mobilenav/NavBar";
import './home.css';
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as SignalLogo } from '../../../../assets/signal.svg';
import { ReactComponent as PlayLogo } from '../../../../assets/play.svg';
import { ReactComponent as DarkModeLogo } from '../../../../assets/darkmode.svg';
import { ReactComponent as LightModeLogo } from '../../../../assets/lighmode.svg';
import { ReactComponent as VideoLogo } from '../../../../assets/videoLogo.svg';
import { ReactComponent as ImageLogo } from '../../../../assets/imagesLogo.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ArrowDownLogo } from '../../../../assets/arrowDownLogo.svg';
import { ReactComponent as PlusLogo } from '../../../../assets/plusLogo.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../../../../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../../../../assets/bookmark.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { ReactComponent as ArrowPreviousLogo } from '../../../../assets/arrowPrevious.svg';
import { ReactComponent as ArrowNextLogo } from '../../../../assets/arrowNext.svg';
import { ReactComponent as MenuLogo } from '../../../../assets/threeDot.svg';
import useOnClickOutside from "../../../../utils/ClickOut";
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

const Middle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
  const [mobileModal, setMobileModal] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [desktopmodal, setdeskTopModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [toggleControls, setToggleControls] = useState<boolean>(false);
  const [isHome, setisHome] = useState<boolean>(false);
  const [isTrend, setIsTrend] = useState<boolean>(false);
  const [isNotify, setisnotify] = useState<boolean>(false);
  const [ispost, setispost] = useState<boolean>(false);
  const [postClicked, setPostClicked] = useState<string>("");
  const [content, setcontent] = useState<string>("");
  const [currentPostId, setCurrentPostId] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>('public');
  const [displayImage, setDisplayImage] = useState<string>('');
  const [storyActive, setStoryActive] = useState<boolean>(false);
  const [toRefresh, setToRefresh] = useState<boolean>(false);
  const [startShowingIndex, setStartShowingIndex] = useState<any>(1);

  const {  mode,  } = useAppSelector(selectUser);
  const { posts,  openPostForm, whichPost, stories, viewstories, isEditPost, storyOwner } = useAppSelector(selectPost);

  const fileRef = useRef<HTMLInputElement>(null);
  const [fileInput, setFileInput] = useState<File[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageInput, setImageInput] = useState<File[]>([]);
  const [videoUploaded, setVideoUploaded] = useState<boolean>(false);
  const [isvideoUploaded, setIsVideoUploaded] = useState<boolean>(false);
  const [clickedStatusIndex, setClickedStatusIndex] = useState<number>(0);
  const [statusViewerId, setStatusViewerId] = useState<string>('');
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

  useEffect(() => {
    if(isEditPost){
      if(getUser === null){
        navigate('/login');
        return;
      };
      if(id){
        const findPost = posts.find((p: any) => p._id === id);
        if(!findPost) return;
        setcontent(findPost.content)
        navigate(`/${id}`);
        showPostModal();
      }
      
    }
  }, [id])
  

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

  const token = getUser && getUser.token;
  const follow = { token, auserId };
  dispatch(userFollowing(follow))
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
      dispatch(shouldWeEditPost(false));
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
        if(res && res.payload !== undefined){
           dispatch(getAvailableStories()).then((res: any) => {
            setcontent('');
            setIsPosting(false);
            hidePostModal();
            dispatch(shouldWeEditPost(false));
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
          setIsPosting(false);
          hidePostModal();
          setdeskTopModal(false);
          dispatch(shouldWeEditPost(false));
          navigate('/');
          window.scrollTo(0, 0);
      });
      }
     
    });
  
  }
  }
}
}



useEffect(() => {
  dispatch(getAvailableStories());
}, [])


const viewAProfile = (userId: string) => {
  
  dispatch(getOtherUser(userId)).then((res) => {
    if(res && res.payload !== undefined){
      const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
      navigate(`/profile/${myId}`);
      window.scrollTo(0, 0);
    }
  })
};


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

  const toggleImageControls = () => {
    setToggleControls((prev) => !prev);
    }

    

  const me = getUser && getUser._doc && getUser._doc._id;

  const showPostModal = () => {
    dispatch(setWhichPost('post'));
    dispatch(shouldWeHideMobileNav(true));
    dispatch(shouldWeEditPost(false));
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
    dispatch(shouldWeEditPost(false));
    if(id){
      navigate('/');
    }
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
    } else {
      setDesktopMenu(false);
    }
  });

 
 
  const hideMobileModal = () => {
    dispatch(shouldWeHideMobileNav(false));
    setMobileModal(false);
    dispatch(setWhichPost('none'));
    dispatch(shouldWeEditPost(false));
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
      if(res && res.payload && res.payload.photoUrls){
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
        <div className={`hidden sm:block fixed mx-auto bottom-0 z-5 sm:rounded-xl ${mode === 'light' ? 'sm:bg-gray-300' : 'sm:bg-gray-800'} sm:pr-3 sm:pl-3 sm:pb-3 sm:w-[44%]`} >
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

posts && Array.isArray(posts) && posts.map((post: IPost, index: number) => (       
 <Post post={post} key={post._id}  />
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
          <div className="flex justify-between items-center p-4">
          <img className='rounded-full w-10 h-10 cursor-pointer' src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url} alt="" />

            {/* cancel or close  */}
            <CancelLogo  onClick={hidePostModal}
              className={`w-6 h-6 ${ mode === 'light' ? 'fill-black' : 'fill-white'} z-40 mr-2 cursor-pointer`}/>
            
          </div>

          <textarea
            onChange={handlechange}
            value={content}
            name="content"
            id="content"
            className={`${mode === 'light' ? 'bg-white' : 'bg-gray-800 text-white'} resize-none flex-none w-full h-[75%] sm:h-[85vh] text-sm border-none focus:ring-0`}
            placeholder={`${ whichPost === 'post' ? 'share a post' : 'share a story'} `}
          ></textarea>

          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
              <div onClick={handleFileClick} className="flex cursor-pointer items-center">
                {/* file  */}
               <VideoLogo className="w-5 h-5" />
                <p className="text-sm dark-text-white font-semibold">
                  Video
                </p>
                <input hidden ref={fileRef} onChange={handleFileChange} type="file" accept="video/*" name="video" id="video" />
              </div>

              <div onClick={handleImageClick} className="flex cursor-pointer pl-2 items-center">
                <ImageLogo  className="w-5 h-5"/>
                <p className="text-sm font-semibold">
                  image
                </p>
                <input hidden ref={imageRef} onChange={handleImageChange} type="file" multiple accept="image/*" name="image" id="image" />

              </div>

            

              <div className="flex cursor-pointer pl-2 items-center">
                <GlobalTrendLogo className="w-5 h-5" />
               
                <select onChange={getPrivacy} value={privacy} className={`text-sm ${ mode === 'light' ?  'bg-white text-black':'bg-gray-800 text-white' } text-black dark-text-white p-2 appearance-none font-semibold border border-0`} name="public" id="public">
                  <option className="text-xs font-semibold border border-0" value="public">Public</option>
                  <option className="text-xs font-semibold border border-0" value="private">Private</option>
                </select>
                
              </div>
            </div>


            <button onClick={handlePostSubmit} className={`text-sm ${ mode === 'light' ? 'bg-black text-white' : 'border border-gray-900 bg-gray-900'} font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110`}>
             {
              isPosting ? (
                <div className="flex items-center"><ProcessingLogo className="w-5 h-5 fill-white stroke-[5px] stroke-white" /> <p>Posting...</p></div>
              ) : (
                <SendLogo className="w-6 h-6 fill-white"/>
              )
             } 
            </button>
          </div>
        </div>
        
      </div>


      {/* picture modal  */}
<div
className={`${
mobileModal  ? "flex" : "hidden"
} fixed top-0 left-0 bg-black w-full h-full justify-center items-center`}
>
<div className={`w-full sm:px-[25%] h-full sm:max-h-sm sm:bg-gray-900`}>
<div className="flex justify-between items-center p-2 ">
  <MenuLogo className={`${toggleControls ? 'block': 'hidden'} w-4 h-4  z-40 fill-white mt-3 ml-3 cursor-pointer`} />

  {/* cancel or close  */}
  <CancelLogo onClick={hideMobileModal}  className={`${toggleControls ? 'block': 'hidden'} w-4 h-4 fill-white z-50 mt-4 mr-4 cursor-pointer`} />
</div>

<div className={`${toggleControls ? 'flex': 'hidden'} justify-between items-center z-14 my-2 px-4`}>
  <div className='flex gap-2'>
    <img onClick={() => viewAProfile( storyOwner && storyOwner._id  )} className='w-9 h-9 rounded-full cursor-pointer z-40' src={storyOwner && storyOwner.profilePhoto && storyOwner.profilePhoto.url } alt="" />
  <div className="z-40">
    <h1 className='text-sm text-white font-semibold'>{storyOwner && storyOwner.fullname }</h1>
    <p className='text-xs text-gray-300'>@{storyOwner && storyOwner.handle}</p>
  </div>
  </div>

 
  
</div>



<div onClick={toggleImageControls} className="fixed z-5 inset-0 flex justify-center items-center">
  <div className="pt-1"></div>
 <div className="z-40"  > 
  <img
   
    className="max-w-[600px] cursor-pointer z-40"
    src={displayImage}
    alt="displayimage"
  />
  </div>

  {/* show image  */}

  
</div>
</div>
</div>


    </div>
  );
};

export default Middle;
