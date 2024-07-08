
import { ReactComponent as LikeLogo } from '../../../../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../../../../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../../../../assets/bookmark.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
import { ReactComponent as MenuLogo } from '../../../../assets/threeDot.svg';
import { ReactComponent as BlockContactLogo } from '../../../../assets/blockContact.svg';
import { ReactComponent as ArrowPreviousLogo } from '../../../../assets/arrowPrevious.svg';
import { ReactComponent as ReportContactLogo } from '../../../../assets/reportContact.svg';
import { ReactComponent as ArrowNextLogo } from '../../../../assets/arrowNext.svg';
import { ReactComponent as AddContactLogo } from '../../../../assets/addContact.svg';
import { ReactComponent as MuteContactLogo } from '../../../../assets/muteContact.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { ReactComponent as BackArrowLogo } from '../../../../assets/arrowBack.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ThreeDotVerticalLogo } from '../../../../assets/threeDotVerticalLogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {  allCommentForAPost, bookmarkPost, commentOnPost, likeComment, createPost, createStory, deletePost, getAPost, getAllPosts, getAllUserStories, getAvailableStories, getBookmarkforaPost, getLikesforaPost, getresharedforaPost, likePost, openpostForm, rePost, resetEditCommentStatus, selectPost, setWhichPost, updatePost, updateViewingStatus, deleteComment, getAllRepliesForComment, shouldWeHideMobileNav } from "../home/PostSlice";
import { useNavigate, useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { addNotification, getOtherUser, selectUser, userFollowing } from '../auth/authSlice'
import { socket } from '../../../../index'
import '../../pages/home/home.css';
import useOnClickOutside from '../../../../utils/ClickOut';



const SinglePost = () => {
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const [touchstart, setTouchStart] = useState<number>();
    const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
    const [postClicked, setPostClicked] = useState<string>("");
    const [commentClicked, setCommentClicked] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [content, setcontent] = useState<string>("");
    const [findReply, setFindReply] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [toggleControls, setToggleControls] = useState<boolean>(false);
    const [touchend, setTouchEnd] = useState<number>();
    const { id } = useParams();
    const [postModal, setPostModal] = useState<boolean>(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [displayProfileImage, setDisplayProfileImage] = useState<string>('');
    const mobileCommentMenuRef = useRef<HTMLDivElement>(null);
    const [comment, setComment] = useState<string>("");
    const [commentErr, setCommentErr] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [commentModal, setCommentModal] = useState<boolean>(false);
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [currentPostId, setCurrentPostId] = useState<string>("");
    const [mobileCommentModal, setMobileCommentModal] = useState<boolean>(false);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [commentmenu, setCommentMenu] = useState<boolean>(false);
    const [desktopCommentMenu, setDesktopCommentMenu] = useState<boolean>(false);
    const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
    const [postId, setPostId] = useState<string>('');
    const [personalPost, setPersonalPost] = useState<any>();
  const [displayImage, setDisplayImage] = useState<string>('');
  const [mobileModal, setMobileModal] = useState<boolean>(false);
  const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);
  const [storyActive, setStoryActive] = useState<boolean>(false);


    const { post, comments, storyOwner, posts } = useAppSelector(selectPost);
    const { mode } = useAppSelector(selectUser);


    const hideComment = () => {
        setCommentModal(false)
      }
  
      const showFullScreen = () => {
        setFullVideoScreen(true);
      };

      const hideMobileModal = () => {
        setMobileModal(false);
        dispatch(shouldWeHideMobileNav(false));
      };

     
    
      const hideFullScreen = () => {
        setFullVideoScreen(false);
        dispatch(shouldWeHideMobileNav(false));
      };
    
    

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
          console.log('res ', res);
          if(res && res.payload !== undefined){
            setFindReply(true);
          }
        })
      };

        
        const showPostModal = () => {
            setPostModal(true);
        
        };

        const showCommentMenuBar = (id: string) => {
            setCommentClicked(id);
            setDesktopCommentMenu(true);
            setIsPosting(false);
            setCommentMenu(true)
            setCommentMenu(true);
          };
        
 

   const toggleImageControls = () => {
    setToggleControls((prev) => !prev);
    }

      

        

   
          const handleDeletePost = (id: string) => {
            const getConfirmation = window.confirm("Are you sure Your want to delete this post? This action cannot be undo");
            if(getConfirmation){
            const token = getUser.token;
            const post = { id, token };
            dispatch(deletePost(post)).then((res: any) => {
              console.log('is successfully deleted ', res);
            })
          }
        
          };
          
 
          const menuShow = (id: string) => {
            setPostClicked(id);
            setIsPosting(false);
            setMenu((prev) => !prev);
            setDesktopMenu(true);
          };

          
  const handleReplyComent = async (commentId: string) => {
    
    dispatch(getAllRepliesForComment(commentId)).then((res: any) => {
        if(res && res.payload !== undefined){
            console.log('replies comments ', res.payload)
            navigate(`/reply/comment/${commentId}`)
        }
    })
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
        })
      }
    })
   };
  

  const handleCommentLike = (commentId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    const token = getUser && getUser.token;
    const likes = { token, commentId };
    dispatch(likeComment(likes)).then((res: any) => {
      console.log('liked the comment', res)
      if(res && res.payload !== undefined){
        setFindReply(true);
      }
    })
  }

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
  

  const showComment = async(postId: string) => {
    console.log('the postid ', postId);
    const getAllComments = await dispatch(allCommentForAPost(postId)).then((res: any) => {
      console.log('res ', res);
      setCommentModal(true);
      setMobileCommentModal(true);
      setFindReply(false);
    })
    
  }



  
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
      console.log('res ', res);
      
    })
  };
  
  useEffect(() => {
    const handlepostComment = (data: any) => {
      console.log('data postComment post ', data);
      dispatch(addNotification(data));
    };
  
    socket.on('postComment', handlepostComment);
  
    return () => {
      socket.off('postComment', handlepostComment);
    };
  }, [socket]);

  useEffect(() => {
    const handlecommentLiked = (data: any) => {
      console.log('data commentLiked post ', data);
      dispatch(addNotification(data));
    };
  
    socket.on('commentLiked', handlecommentLiked);
  
    return () => {
      socket.off('commentLiked', handlecommentLiked);
    };
  }, [socket]);


  const handleEditIcon = (commentId: string, postId: string) => {
    navigate(`/edit/${postId}/${commentId}`);
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
      console.log('comment ', res);
      if(res && res.payload !== undefined){
        setComment('');
        window.scrollTo(0, document.documentElement.scrollHeight);
        setIsCommenting(false);
        setFindReply(true);
      }
    })
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

const goToPost = async (id: string) => {
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

  const closeCommentMenu = () => {
    setDesktopCommentMenu(false);
  };


  const showMobileModal = (img: any, id: any) => {

    setDisplayImage(img);
    setMobileModal(true);
    setDisplayProfileImage(post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url );
  };

const navigateToProfile = (userId: string) => {
  if(getUser && getUser._doc  && getUser._doc.fullname !== ''){

    dispatch(getOtherUser(userId)).then((res: any) => {
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
        window.scrollTo(0, 0);
      }
    });

  }else{
    navigate(`/profile/create/${userId}`);
  }
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
    navigate('/');
    const findPost = posts.find((p: any) => p._id === id);
    setcontent(findPost.content);
    navigate(`/${findPost._id}`)
    showPostModal()
  };

const viewOthersProfile = ( userId: string ) => {
  dispatch(getOtherUser(userId)).then((res: any) => {
    if(res && res.payload !== undefined){
      const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
      navigate(`/profile/${myId}`);
    }
  });
}

const viewPost = (postId: string) => {
  navigate(`/post/${postId}`);
}

  const getConfirmation = (commentId: string) => {
    const acceptTodelete = window.confirm('Are you sure you want to trash this comment? this action cannot be undo!!!');
    if(acceptTodelete){
        const token = getUser && getUser.token;
        const comments = {
            commentId, id, token
        }
        dispatch(deleteComment(comments)).then((res: any) => {
            console.log('deleted comment ', res);
            setFindReply(true);
        })
    }
  };

  const getPost = (id: string) => {
            dispatch(getAPost(id)).then((res: any) => {
                console.log(res)
            })
          }

  useEffect(() => {
    if(id){
        showComment(id);
        getPost(id);
    }
  }, [findReply, navigate]);

  const handleGoBack = () => {
    navigate(-1);
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

   useOnClickOutside(mobileMenuRef, (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('text-[10px]')
      ) 
    {
  console.log('Clicked inside the specific div!', target);
} else {
  console.log('Clicked outside the button!', target.classList);
  setDesktopMenu(false);
}
  });

  const postOwner = post && post.owner && post.owner._id;
  return (
    <div className="sticky overflow-y-auto hide-scrollbar">
        <div onClick={handleGoBack} className={`flex sm:mx-[25%] gap-3 ${mode === 'light' ? `${commentmenu || menu  ? 'bg-gray-200 text-black' : 'bg-white fill-black text-black'}` : 'bg-black fill-white text-white'} p-2 cursor-pointer`} >
          <BackArrowLogo  className='w-4 h-4 cursor-pointer' />
        <h2 className='text-xs font-medium'>Back to Post Feeds</h2>
        </div>

    <div className={`sm:mx-[25%] h-screen`} >
         <div  className={`p-3 max-w-full ${ mode === 'light' ? `${commentmenu  || menu ? 'bg-gray-200' : 'bg-white'} text-black fill-black` : 'bg-black text-white fill-white'} border border-gray-400`}>
         
        <div className="flex items-center gap-2 w-full">
          <img onClick={() => viewOthersProfile(post && post.owner && post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex items-center">
              <div className="mt-3">
                <h1 className="text-sm font-semibold">
                  {post && post.owner && post.owner.fullname}
                </h1>
              <p className="text-gray-500 text-[8px]"> {post && formatCreatedAt(post.createdAt)} </p>
              </div>
              <VerifyMarkLogo className="w-5 h-5 fill-purple-500 stroke-white"/>
           
              <p className="text-gray-400 text-[10px] ">@{post && post.owner && post.owner.handle}</p>
            </div>
            {/* three dot icon  */}
            <div onClick={() => menuShow(post._id)} className="cursor-pointer ">
              <div className="relative" >
                <MenuLogo className="w-[12px] h-[12px]"/>
               
                {/* desktop menu  */}
                <div
                  ref={mobileMenuRef}
                  id="mobileMenuRef"
                  className={`hidden ${
                    menu && post._id === postClicked ? "sm:block" : "sm:hidden"
                  } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] h-auto rounded-3xl mx-auto ${ mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'} p-2`}
                >
                  {
                    getUser && getUser._doc && getUser._doc._id === postOwner ? (
                      <div id="mobileMenuRef">    
                    <div onClick={() =>handleDeletePost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center py-4">
                      <TrashLogo className="w-5 h-5"/>
                      <p className="text-[10px]">Delete Post</p>
                    </div>
                      </div>
                    ) : (
                      <div id="mobileMenuRef">
                       <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                    <AddContactLogo  className="w-3 h-3"/>
                    <p className="text-[10px]">Follow @{post && post.owner && post.owner.handle}</p>
                  </div>

                  <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                    <BlockContactLogo  className="w-3 h-3"/>
                    <p className="text-[10px]">Block @{post && post.owner && post.owner.handle}</p>
                  </div>

                  <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                    <ReportContactLogo  className="w-3 h-3"/>
                    <p className="text-[10px]">Report Post</p>
                  </div>

                  <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                    <MuteContactLogo   className="w-3 h-3"/>
                    <p className="text-[10px]">Mute @{post && post.owner && post.owner.handle}</p>
                  </div>
                      </div>
                    )
                  }
                  
                </div>

                   {/* mobile menu  */}
              <div
                ref={mobileMenuRef}
                id="mobileMenuRef"
                className={`fixed ${
                  menu && post._id === postClicked ? "block" : "hidden"
                } bottom-0 left-0 ${ mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'} pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
              >
                {
                  getUser !== undefined && getUser && getUser._doc && getUser._doc._id  ===   post && post.owner && post.owner._id ? (
                              <div id="mobileMenuRef">
                            <div  onClick={() =>handleDeletePost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center py-4">
                              <TrashLogo className="w-6 h-6"/>
                              <p className="text-lg">Delete Post</p>
                            </div>
                              </div>
                            ) : (
                              <div id="mobileMenuRef">
                              <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                            <AddContactLogo  className="w-5 h-5"/>
                            <p className="text-lg">Follow @{post && post.owner && post.owner.handle}</p>
                          </div>

                          <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                            <BlockContactLogo  className="w-5 h-5"/>
                            <p className="text-lg">Block @{post && post.owner && post.owner.handle}</p>
                          </div>

                          <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                            <ReportContactLogo  className="w-5 h-5"/>
                            <p className="text-lg">Report Post</p>
                          </div>

                          <div className="flex gap-2 px-2 cursor-pointer items-center py-4">
                            <MuteContactLogo   className="w-5 h-5"/>
                            <p className="text-lg">Mute @{post && post.owner && post.owner.handle}</p>
                          </div>
                              </div>
                            )
                          }
                
              </div>
              </div>
            </div>
          </div>
        </div>
        {/* post text  */}
        <div className="ml-9">
          <p className={`${mode === 'light' ? 'text-xs text-black' : 'text-xs text-white'}`}>
            {post.content}
          </p>
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
              <img onClick={() => viewAProfile(post && post.owner && post.owner._id )} className='w-9 h-9 rounded-full cursor-pointer z-40' src={displayProfileImage} alt="" />
            <div className="z-40">
              <h1 className='text-sm text-white font-semibold'>{post && post.owner && post.owner.fullname}</h1>
              <p className='text-xs text-gray-300'>@{post && post.owner && post.owner.handle}</p>
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

       

        {/* add your comment  */}

        <div className={`${ mobileModal ? 'hidden' : 'block'} fixed bottom-0 flex border border-white rounded-xl`}>
             <input
             onClick={() =>viewPost(post && post._id)}
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

        { post && post.photos && post.photos.length > 0 ? (
        <div className="mt-2 pl-9">
          { post && post.photos && post.photos.length === 1 ? (
            <div className="rounded-3xl overflow-hidden">
          <img onClick={() => showMobileModal(post && post.photos[0] && post.photos[0].url, post && post._id)}
                className="w-[520px] h-[310px] bg-white rounded-3xl object-cover cursor-pointer"
                src={post && post.photos[0] && post.photos[0].url}
               alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
            </div>
          ) : post && post.photos && post.photos.length === 2 ? (
            <div className="flex rounded-3xl overflow-hidden">
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
          <div className="rounded-3xl overflow-hidden z-2">
            <video
              onClick={showFullScreen}
              className="w-full cursor-pointer object-cover h-[200px]"
              controls
              muted
              src={post && post.video && post.video.url}
            ></video>
          </div>
        )  : (<> </> )}
           
            <div className="flex justify-between items-center">
          <div className="flex ml-9 mt-4 gap-1 items-center">
            <div className="p-[5px] bg-red-600 rounded-full">
              <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-500"> {post.likes.length}</p>

            <div className="p-[5px] bg-green-600 rounded-full">
              <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-500">{post.reShare.length}</p>

            <div className="p-[5px] bg-sky-600 rounded-full">
              <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>

            <p className="text-[8px] text-gray-500">{post.bookmark.length}</p>
          </div>

          <p className="text-[10px] mt-3 text-gray-500 cursor-pointer">{post.comments.length} comments</p>
        </div>
        {/* icons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center pl-9 sm:gap-1 mt-4">
            <div  onClick={() =>handleLike(post._id)} className={` ${mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
              <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
              <p className="text-white text-[10px] pl-1">
                Like
              </p>
            </div>

            <div onClick={() =>handleReShare(post._id)} className={` ${mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
              <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white"/>
              <p className="text-white text-[10px] pl-1">
                ReShare
              </p>
            </div>

            <div onClick={() => showComment(post._id)} className={` ${mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
              <CommentLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
              <p className="text-white text-[10px] pl-1">
                Comment
              </p>
            </div>

            <div></div>
            <div></div>
          </div>

          <div  onClick={() =>handleBookmark(post._id)} className={`${mode === 'light' ? 'bg-black' : 'bg-gray-800'} cursor-pointer flex items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg`}>
            <BookMarkLogo   className="w-[12px] h-[12px] fill-white stroke-white"/>
          </div>
        </div> 

        
          </div>

        
      

            {/* view other people comments  */}
            <div className={` ${mode === 'light' ? `${commentmenu || menu ? 'bg-gray-200' : 'bg-white'} text-black fill-black` : 'bg-black text-white fill-white'} h-screen`} >
            {
              comments && comments.length > 0 && Array.isArray(comments) ? (
                comments.map((comment) => (
            <div className={`border-b border-gray-300 `} >
            <div className="p-4">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img onClick={() => viewOthersProfile(comment && comment.owner && comment.owner._id)} src={comment && comment.owner.profilePhoto && comment.owner.profilePhoto.url} className="w-7 h-7 rounded-full" alt="" />
                <div className="flex flex-col space-y-1">
                  <div>

                 <div className="flex gap-1 items-center"> 
                  <p className="text-xs font-medium">{comment && comment.owner && comment.owner.fullname}  </p>
                  <p className="text-[9px] text-gray-500">@{comment && comment.owner && comment.owner.handle} </p>
                 <p className="text-gray-400 text-[9px]">. {formatCreatedAt(comment && comment.createdAt)}</p> 
                  </div>
                  <p className="text-[10px] text-gray-500 flex items-center">Replying to <p className="text-[11px] text-purple-600"> &nbsp; @{post && post.owner && post.owner.handle}</p> </p>
                  </div>
                  <p className="text-[10px]">{comment && comment.content}</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon onClick={() => handleCommentLike(comment._id)} className="w-[14px] h-[14px] cursor-pointer" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500">{comment && comment.likes && comment.likes.length}</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                      <CommentLogo  onClick={() => handleReplyComent(comment._id)} className="w-[12px] h-[12px] fill-gray-600 stroke-gray-600 cursor-pointer"/>
                 
                  <p className="text-xs text-gray-500">{comment && comment.replies && comment.replies.length}</p>
                    </div>
                      
                   </div>

                   <div onClick={() => handleReplyComent(comment._id)} className="cursor-pointer">
                    <p className="text-gray-400 text-sm pt-1 flex">See Reply &#40;<span>{comment && comment.replies && comment.replies.length}</span>&#41; </p>
                   </div>
                </div>
              </div>

              <div className="relative">
                 {/* three dot icon vertical */}
                 <ThreeDotVerticalLogo onClick={() =>showCommentMenuBar(comment._id)} className={`w-5 relative h-5 ${mode === 'light' ? 'fill-black stroke-black' : 'fill-white stroke-white'} cursor-pointer`}/>
              
                
                {/* desktop comment menu  */}
              <div
                ref={desktopCommentMenuRef}
                id="desktopCommentMenu"
                className={`hidden ${
                  desktopCommentMenu && comment._id === commentClicked ? "sm:block" : "sm:hidden"
                } absolute shadow-xl w-[150px] top-0 shadow-purple-80 z-10 -right-3 rounded-lg mx-auto ${mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'}  h-auto pb-3 pl-3 pr-3 pt-2`}
              >
                <div className="flex justify-end">
                  <CancelLogo onClick={closeCommentMenu} className="w-3 h-3 cursor-pointer"/>
                </div>
                {
                  comment && comment.owner && comment.owner._id === getUser._doc._id ? (
                    <>
                     <div onClick={() =>handleEditIcon(comment._id, post._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <EditLogo className="w-4 h-4 group-hover:stroke-purple-600"/>
                  <p className="text-[10px] group-hover:text-purple-600">Edit Comment</p>
                </div>

                <div onClick={() =>getConfirmation(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                 <TrashLogo className="w-5 h-5 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-[10px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                    </>
                  ) : (
                    <>
                     <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <ReplyLogo  className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>
                    </>
                  )
                }
               
              </div>

                {/* mobile menu  */}
              <div
                ref={desktopCommentMenuRef}
                id="mobilecommentmenu"
                className={`fixed ${
                  desktopCommentMenu && comment._id === commentClicked ? "block" : "hidden"
                } bottom-0 left-0 ${ mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'} pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
              >
                {
                  comment && comment.owner && comment.owner._id === getUser._doc._id ? (
                    <>
                     <div onClick={() =>handleEditIcon(comment._id, post._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <EditLogo className="w-5 h-5 group-hover:stroke-purple-600"/>
                  <p className="text-[17px] group-hover:text-purple-600 pt-1">Edit Comment</p>
                </div>

                <div onClick={() =>getConfirmation(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                 <TrashLogo className="w-8 h-8 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-[17px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-8 h-8  group-hover:stroke-purple-600" />
                  <p className="text-[17px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                    </>
                  ) : (
                    <>
                     <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-6 h-6  group-hover:stroke-purple-600" />
                  <p className="text-[15px] group-hover:text-purple-600">Reply Comment</p>
                </div>
                    </>
                  )
                }
              </div>

              </div>
              </div>
            </div>
            </div>
                ))
              ) : (
                <div className={`h-screen ${mode === 'light' ? 'bg-white' : 'bg-black'}`}> 
                <p className="text-gray-500 text-center pb-4 text-[12px] pt-4 px-2">No comment has been added</p>
                </div>
              )
            }
          </div>

        <div className={`${ mobileModal ? 'hidden' : 'block'} fixed max-w-[100%] sm:max-w-[49%] pt-2 bottom-0 rounded-xl`}>
            <div className={`flex ${ mode === 'light' ? 'bg-white fill-black text-black' : 'bg-gray-800 fill-white text-white'} border border-gray-300 items-center max-h-[30px] py-6 px-2 rounded-xl`}>
            <img onClick={() => navigateToProfile(getUser && getUser._doc && getUser._doc._id)}
              src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
              className="block w-7 h-7 rounded-full cursor-pointer"
              alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
            />
            <input
              type="text"
              onChange={(e) => (setComment(e.target.value))}
              value={comment}
              className={`block text-xs w-[700px] h-[30px] p-3 ${ mode === 'light' ? 'bg-white' : 'bg-gray-800'} bg-opacity-50 border-0 focus:ring-0 focus:ring-inset focus:ring-none`}
              placeholder="Comment on this post"
              name=""
              id=""
            />
            
            <button onClick={() => handleCommentSubmit(post._id)} className="text-[9px] text-white bg-black font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
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
          <p className="text-red-600 text-[8px]">{commentErr}</p>
        </div>
      
    </div>
    </div>
  )
}

export default SinglePost
