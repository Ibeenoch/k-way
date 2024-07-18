import React, {  useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeartIcon,  } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOtherUser, selectUser, setProfileType, userFollowing } from "../app/features/pages/auth/authSlice";
import { allCommentForAPost, bookmarkPost, commentOnPost, deletePost, getAPost, getAllPosts, getAllUserStories, getAvailableStories, getBookmarkforaPost, getLikesforaPost, getresharedforaPost, likePost, openpostForm, rePost, resetEditCommentStatus, selectPost, setMenuActive, setWhichPost, shouldWeEditPost, shouldWeHideMobileNav, updatePost, updateViewingStatus } from "../app/features/pages/home/PostSlice";
import { useNavigate, useParams } from "react-router-dom";
import '../app/features/pages/home/home.css';
import { ReactComponent as LikeLogo } from '../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../assets/verifyChecker.svg';
import { ReactComponent as CommentLogo } from '../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../assets/bookmark.svg';
import { ReactComponent as ReplyLogo } from '../assets/replyLogo.svg';
import { ReactComponent as SendLogo } from '../assets/sendLogo.svg';
import { ReactComponent as ArrowPreviousLogo } from '../assets/arrowPrevious.svg';
import { ReactComponent as ArrowNextLogo } from '../assets/arrowNext.svg';
import { ReactComponent as MenuLogo } from '../assets/threeDot.svg';
import { ReactComponent as BlockContactLogo } from '../assets/blockContact.svg';
import { ReactComponent as ReportContactLogo } from '../assets/reportContact.svg';
import { ReactComponent as AddContactLogo } from '../assets/addContact.svg';
import { ReactComponent as MuteContactLogo } from '../assets/muteContact.svg';
import { ReactComponent as CancelLogo } from '../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../assets/processingLogo.svg';
import { ReactComponent as UndoLogo } from '../assets/undo.svg';
import { formatCreatedAt } from "./timeformat";
import { useAppContext } from "../app/features/pages/home/homeContext";
import useOnClickOutside from "./ClickOut";


interface Post {
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
  video?: { 
    url: string 
  };
}


interface Props {
  post: Post;
}


const Post: React.FC<Props> = ({ post }) => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { refresh, toggleRefresh } = useAppContext();
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState<boolean>(false);
    const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
    const [mobileModal, setMobileModal] = useState<boolean>(false);
    const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);
    const [postModal, setPostModal] = useState<boolean>(false);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [isHome, setisHome] = useState<boolean>(false);
    const [isTrend, setIsTrend] = useState<boolean>(false);
    const [isNotify, setisnotify] = useState<boolean>(false);
    const [ispost, setispost] = useState<boolean>(false);
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
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
    const [startShowingIndex, setStartShowingIndex] = useState<any>(1);
    const {  mode,  } = useAppSelector(selectUser);
    const {  stories, viewstories, storyOwner, viewingStory } = useAppSelector(selectPost);
    const [toggleControls, setToggleControls] = useState<boolean>(false);
    const [clickedStatusIndex, setClickedStatusIndex] = useState<number>(0);
    const [statusViewerId, setStatusViewerId] = useState<string>('');
    const [personalPost, setPersonalPost] = useState<any>();
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const { id } = useParams();

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
  
   const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // hideMobileModal();
    setDesktopMenu(false);
    dispatch(setMenuActive(false));
  }
  
  
  const handleLike = async (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };

    if(!post || !post.owner){
      return;
    }
    const postOwnerId = post && post.owner && post.owner._id;
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
        dispatch(setWhichPost('none'));
      }
    })
  };
  
  const handleBookmark = async (postId: string) => {
    if(getUser === null){
      navigate('/login');
      return;
    };
    // const findpost = posts.find((p: any) => p._id === postId);
    const postOwnerId = post && post.owner && post.owner._id;
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
    // const findpost = posts.find((p: any) => p._id === postId);
    const postOwnerId = post && post.owner && post.owner._id;
  
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
  
      // const findPost = posts.find((p: any) => p._id === currentPostId);
      if (!post || !post.photos) {
        // Handle the case where findPost is undefined or findPost.photos is undefined
        return;
      }
      const picsLength = post.photos.length;
      const findIndex = post.photos.findIndex((img: any) => img.url === displayImage);
  
      if(distance > minimumSwipeDistance){
      // swipe left = next
      setDisplayImage(post.photos[findIndex === picsLength - 1 ? picsLength - 1 : findIndex + 1].url)
    }else if(distance < -minimumSwipeDistance){
      //swipe right = prev
      setDisplayImage(post.photos[findIndex <= 0 ? 0 : findIndex - 1].url);
  
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
  
  
    const hideFullScreen = () => {
      setFullVideoScreen(false);
      dispatch(shouldWeHideMobileNav(false));
    };
  
  
  
    // useOnClickOutside(desktopCommentMenuRef, (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   const targetElement = target.closest('.flex.gap-2.items-center.cursor-pointer.pt-4');
      
  
    //   if (targetElement) {
    //   } else {
    //     setDesktopMenu(false);
    //     dispatch(setMenuActive(false));
    //   }
    // });
  
   
   
    const hideMobileModal = () => {
      dispatch(shouldWeHideMobileNav(false));
      setMobileModal(false);
      dispatch(setWhichPost('none'));
    };
  
    const viewUserProfile = (userId: string) => {
      dispatch(getOtherUser(userId)).then((res: any) => {
        if(res && res.payload !== undefined){
            navigate(`/profile/${userId}`);
            window.scrollTo(0, 0);
        }
      })
    }
  


    const showMobileModal = (img: any, id: any) => {
      dispatch(setWhichPost('post'));
      
      if (!post) {
        return;
      }
    
      setDisplayImage(img);
    
      if (post.owner && post.owner.profilePhoto) {
        setDisplayProfileImage(post.owner.profilePhoto.url);
      } else {
        // Handle the case where owner or profilePhoto is not defined
        console.error('Owner or profile photo not found');
        setDisplayProfileImage('default-profile-image-url'); // Set a default profile image URL
      }
    
      setMobileModal(true);
      setCurrentPostId(id);
      setPersonalPost(post);
      dispatch(shouldWeHideMobileNav(true));
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
  
  
    const menuShow = (id: string) => {
      setPostClicked(id);
      setIsPosting(false);
      setMenu((prev) => !prev);
      setDesktopMenu(true);
      dispatch(setMenuActive(true));
    };
  
  
  const viewPrevImage = () => {
    if(!post || !post.photos) return;
    const picsLength = post.photos.length;
    const findIndex = post.photos.findIndex((img: any) => img.url === displayImage);
    setDisplayImage(post.photos[findIndex <= 0 ? 0 : findIndex - 1].url);
  
  };
  
  const viewNextImage = () => {
   if(!post || !post.photos) return;
    const picsLength = post.photos.length;
    const findIndex = post.photos.findIndex((img: any) => img.url === displayImage);
    setDisplayImage(post.photos[findIndex === picsLength - 1 ? picsLength - 1 : findIndex + 1].url);
  
  };
  
    const handleEditPost = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.stopPropagation();
      if(getUser === null){
        navigate('/login');
        return;
      };
      
      dispatch(shouldWeEditPost(true));
      
      setcontent(post.content);
      navigate(`/${post._id}`)
      showPostModal()
    };
  
    const cancelReshared = (id: string) => {
      if(getUser === null){
        navigate('/login');
        return;
      };

      const getConfirmation = window.confirm("You Really want to Unshare this post?");
      if(getConfirmation){
      const token = getUser.token;
      const post = { id, token };
      dispatch(deletePost(post))
    }
  
    };
  
    const handleDeletePost = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.stopPropagation();
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
  
    const postOwner = post && post.owner && post.owner._id;
 
    
  return (
    <div key={post && post._id} className={`rounded-full py-1 p-3 max-w-full ${ mode === 'light' ? `${ desktopMenu || menu ? 'bg-gray-200' : 'bg-white'} border-gray-300 border-opacity-80 text-black fill-black` : 'bg-black text-white fill-white border-gray-200 border-opacity-50' } border rounded-lg`} >
{
post && post.reShared &&  (
<div className={`flex justify-between px-2 items-center border-b border-b-gray-300 border-opacity-40`}>
<div className="flex items-center pb-4">
 <img onClick={() => viewUserProfile(post && post.reShare && post.reShare[0] && post.reShare[0].user && post.reShare[0].user._id)} className="w-8 h-8 rounded-full cursor-pointer" src={post && post.reShare && post.reShare[0] && post.reShare[0].user  && post.reShare[0].user.profilePhoto && post.reShare[0].user.profilePhoto.url} alt=""/>
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
<img onClick={() => viewUserProfile(post && post.owner && post.owner._id)} className="w-8 h-8 rounded-full cursor-pointer" key={post && post._id} src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt='' />
<div  className="w-full cursor-pointer flex items-center justify-between gap-1">
  <div  onClick={() => goToPost(post && post._id)} className="flex items-center">
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
  <div onClick={() => menuShow(post && post._id)} className="cursor-pointer ">
    <div className="relative" >
      <MenuLogo className="w-[12px] h-[12px]"/>
     
      {/* desktop menu  */}
      <div
        ref={desktopMenuRef}
        id="desktopmenu"
        className={`hidden ${
          desktopMenu && post && post._id === postClicked ? "sm:block" : "sm:hidden"
        } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] ${mode === 'light' ? 'bg-white fill-black stroke-black text-black' : 'bg-gray-900 fill-white stroke-white text-white' } h-auto rounded-3xl mx-auto  p-2`}
      >
        <div onClick={(e) =>  handleClose(e)} className="flex z-50 cursor-pointer justify-center items-center py-2">
          <p className={`text-xs font-semibold px-4 py-2 ${mode === 'light' ? 'border-black  text-black' : 'text-white border-white'} border  rounded-3xl  hover:text-white hover:bg-purple-600 hover:border-purple-600 `}>Close</p>
        </div>
        {
        getUser !== undefined && getUser && getUser._doc && getUser._doc._id  === postOwner ? (
            <>
          <div onClick={(e) =>handleEditPost(e, post && post._id)} className="flex gap-2 px-2 z-50 cursor-pointer items-center pt-2">
            <EditLogo  className="w-3 h-3"/>
            <p className="text-[10px]">Edit Post</p>
          </div>
          <div onClick={(e) =>handleDeletePost(e, post && post._id)} className="flex gap-2 z-50 cursor-pointer items-center pt-4">
            <TrashLogo className="w-5 h-5"/>
            <p className="text-[10px]">Delete Post</p>
          </div>
            </>
          ) : (
            <>
            {
              getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(postOwner) && (
                <>
                <div onClick={() => handleFollowing(post && post.owner && post.owner._id )} className="flex gap-2 cursor-pointer items-center pt-4">
                  <AddContactLogo  className="w-3 h-3"/>
                  <p className="text-[10px]">Follow @{post && post.owner && post.owner.handle }</p>
                </div>
                </>
              )
            }
          

        <div className="flex gap-2 items-center pt-2  cursor-pointer">
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
<div onClick={() => goToPost(post && post._id)} className="ml-9">
<p className="text-[11px] ">
  {post && post.content && post.content.length > 200 ? (
   <>
   <p className="text-justify text-wrap text-[11px]">{post && post.content && post.content.slice(0, 500)} <strong className="cursor-pointer text-purple-600 text-xs">read more</strong></p>
   </> 
     ) : post && post.content}
</p>
</div>

{/* mobile menu  */}
<div
ref={desktopMenuRef}
id="desktopmenu"
className={`fixed sm:hidden ${ desktopMenu && post && post._id === postClicked ? "block" : "hidden"} bottom-0 left-0  ${mode === 'light' ? 'bg-white fill-black stroke-black text-black' : 'bg-gray-900 fill-white stroke-white text-white' } pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
>
<div onClick={(e) =>handleClose(e)} className="flex z-50 cursor-pointer justify-center items-center ">
  <p className={`text-sm font-semibold px-4 py-1 ${mode === 'light' ? 'border-black  text-black' : 'text-white border-white'} border  rounded-3xl  hover:text-white hover:bg-purple-600 hover:border-purple-600 `}>Close</p>
</div>
{
 getUser !== undefined && getUser && getUser._doc && getUser._doc._id  === postOwner ? (
            <>
          <div onClick={(e) =>handleEditPost(e, post && post._id)} className="flex gap-3 pl-1 z-50 items-center cursor-pointer pt-2">
            <EditLogo  className="w-5 h-5"/>
            <p className="text-lg">Edit Post</p>
          </div>
          <div  onClick={(e) =>handleDeletePost(e, post && post._id)} className="flex gap-2 z-50 items-center cursor-pointer pt-4">
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
mobileModal  ? "flex" : "hidden"
} fixed top-0 left-0 bg-black w-full h-full justify-center items-center`}
>
<div className={`w-full sm:px-[25%] h-full sm:max-h-sm sm:bg-gray-900`}>
<div className="flex justify-between items-center p-2 ">
  <MenuLogo className={`${toggleControls ? 'block': 'hidden'} w-4 h-4  z-40 fill-white mt-3 ml-3 cursor-pointer`} />

  {/* cancel or close  */}
  <CancelLogo onClick={hideMobileModal}  className={`${toggleControls ? 'block': 'hidden'} w-5 h-5 stroke-[2px] fill-white z-50 mt-4 mr-4 cursor-pointer`} />
</div>

<div className={`${toggleControls ? 'flex': 'hidden'} justify-between items-center z-14 my-2 px-4`}>
  <div className='flex gap-2'>
    <img onClick={() => viewUserProfile(storyActive ? storyOwner && storyOwner._id : personalPost && personalPost.owner && personalPost.owner._id )} className='w-9 h-9 rounded-full cursor-pointer z-40' src={storyActive ? storyOwner && storyOwner.profilePhoto && storyOwner.profilePhoto.url : displayProfileImage} alt="" />
  <div className="z-40">
    <h1 className='text-sm text-white font-semibold'>{storyActive ? storyOwner && storyOwner.fullname : personalPost && personalPost.owner && personalPost.owner.fullname}</h1>
    <p className='text-xs text-gray-300'>@{storyActive ? storyOwner && storyOwner.handle : personalPost && personalPost.owner && personalPost.owner.handle}</p>
  </div>
  </div>

{
  !storyActive && (
  <button onClick={() => handleFollowing(post && post.owner && post.owner._id)} className='text-xs px-4 py-1 bg-black z-40 dark:bg-white rounded-full border border-white text-white dark:text-black transform-transition duration-100 hover:scale-110'>
    { getUser && getUser._doc && getUser._doc.following  && getUser._doc.following.includes(postOwner) ? 'Following' : "Follow" }
  </button>
  )
}  
  
</div>



<div onClick={toggleImageControls} className="fixed z-5 inset-0 flex justify-center items-center">
  <div className="pt-1"></div>
 <div className="z-40"  onTouchStart={handleTouchStart}  onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} > 
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
    <HeartIcon onClick={() =>handleLike(post && post._id)} className="w-5 h-5 fill-white stroke-white"/>             
  <p className="text-xs text-white">{post && post.likes && post.likes.length}</p>
  </div>

  <div className="p-[5px] flex gap-1 cursor-pointer">
    <RetweetLogo  onClick={() =>handleReShare(post && post._id)}   className="w-5 h-5 fill-white stroke-white"/>
  <p className="text-xs text-white">{post && post.allReshare && post.allReshare.length}</p>
  </div>

  <div className="p-[5px] flex gap-1 cursor-pointer">
    <BookMarkLogo  onClick={() =>handleBookmark(post && post._id)} className="w-5 h-5 fill-white stroke-white"/>
   
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
      <button onClick={() => handleCommentSubmit(post && post._id)} className="text-white font-medium text-xs rounded-xl py-2 px-4">
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
      <HeartIcon onClick={() =>handleLike(personalPost && personalPost._id)} color="white" className="w-12 h-12 fill-white" />
    </div>
    <p className="text-xs text-white">{personalPost && personalPost.likes && personalPost.likes.length}</p>
  </div>

  <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
    <div  onClick={() =>handleReShare(personalPost && personalPost._id)}  className="p-2 w-9 h-9 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
     <ReplyLogo className="w-15 h-15 fill-white stroke-white" />
    </div>
    <p className="text-xs text-white">{personalPost && personalPost.reShare && personalPost.reShare.length}</p>
  </div>

  <div  onClick={() => goToPost(personalPost && personalPost._id)} className="flex flex-col cursor-pointer justify-end items-center pr-4">
    <div  className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
     <CommentLogo className="w-4 h-4 fill-white stroke-white" />
    </div>
    <p className="text-xs text-white">{personalPost && personalPost.comments && personalPost.comments.length}</p>
  </div>

  <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
  <div className="p-2 w-8 h-8 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
     <BookMarkLogo  onClick={() =>handleBookmark(personalPost && personalPost._id)} className="w-4 h-4 fill-white stroke-white" />
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
      <button onClick={() => handleCommentSubmit(post && post._id)} className="text-white font-medium text-xs rounded-xl py-2 px-4">
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
<img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[0] && post?.photos?.[0]?.url, post && post._id)}
      className="w-full h-[310px] bg-white rounded-3xl object-cover cursor-pointer"
      src={post && post.photos[0] && post.photos[0].url}
     alt='photo1' />
  </div>
) : post && post.photos && post.photos.length === 2 ? (
  <div className="flex overflow-hidden">
     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[0] && post?.photos?.[0].url, post && post._id)}
      className="fixed-size w-1/2 rounded-l-3xl h-[293px] border-r border-white cursor-pointer object-cover"
      src={post && post.photos[0] && post.photos[0].url}
     alt='photo1' />
     
     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[1] && post?.photos?.[1]?.url, post && post._id)}
       className="fixed-size w-1/2 h-[293px] border-l rounded-r-3xl border-white object-cover cursor-pointer"
       src={post && post.photos[1] && post.photos[1].url}
     alt='photo2' />
  </div>
) : post && post.photos && post.photos.length === 3 ? (
  <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[0] && post?.photos?.[0]?.url, post && post._id)}
       className="w-full h-[146px] col-span-2 border-b border-b-white cursor-pointer rounded-tl-3xl rounded-tr-3xl object-cover"
       src={post && post.photos[0] && post.photos[0].url}
     alt='photo1' />

     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[1] && post?.photos?.[1]?.url, post && post._id)}
       className="w-full h-[146px] border-t border-r border-b-white  rounded-bl-3xl cursor-pointer object-cover"
       src={post && post.photos[1] && post.photos[1].url}
     alt='photo2' />

     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[2] && post?.photos?.[2]?.url, post && post._id)}
       className="w-full h-[146px]  border-t  border-l border-white cursor-pointer rounded-br-3xl object-cover"
       src={post && post.photos[2] && post.photos[2].url}
     alt='photo3' />
  </div>
) :   post && post.photos && post.photos.length === 4 ? (
  <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
    <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[0] && post?.photos?.[0]?.url, post && post._id)}
       className="w-full h-[144px]  border-r border-b border-white rounded-tl-3xl fixed-size object-cover cursor-pointer"
       src={post && post.photos[0] && post.photos[0].url}
     alt='photo1' />

     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[1] && post?.photos?.[1].url, post && post._id)}
        className="w-full h-[144px] border-l border-b border-white rounded-tr-3xl fixed-size object-cover cursor-pointer"
        src={post && post.photos[1] && post.photos[1].url}
     alt='photo2' />

     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[2] && post?.photos?.[2]?.url, post && post._id)}
       className="w-full h-[144px] border-t border-r border-white rounded-bl-3xl fixed-size object-cover cursor-pointer"
       src={post && post.photos[2] && post.photos[2].url}
     alt='photo3' />

     <img onClick={() => showMobileModal(post && post?.photos && post?.photos?.[3] && post?.photos?.[3]?.url, post && post._id)}
       className="w-full h-[144px] border-t border-l border-white rounded-br-3xl fixed-size object-cover cursor-pointer"
       src={post && post.photos[3] && post.photos[3].url}
     alt='photo4' />
  </div>
) : (
  <></>
)}
</div>
) : post && post.video ? (
<div  className="rounded-3xl cursor-pointer overflow-hidden z-20">
  <video
    // onClick={() => showFullScreen(post?._id, post.video.url)}
    className="w-full cursor-pointer object-cover h-[200px]"
    controls
    muted
    src={post && post.video && post.video.url}
  ></video>
</div>
)  : (<> </> )}

<div onClick={() => goToPost(post && post._id)} className="flex cursor-pointer justify-between items-center">
<div className="flex ml-9 mt-4 gap-1 items-center">
  <div onClick={(e) =>viewWhoLikePost(e, post._id)} className="p-[5px] bg-red-600 rounded-full">
    <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
  </div>
  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}> {post && post.likes && post.likes.length}</p>

  <div  onClick={(e) =>viewWhoResharedPost(e, post._id)} className="p-[5px] bg-green-600 rounded-full">
    <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
  </div>
  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}>{post && post.reShare && post.reShare.length}</p>

  <div  onClick={(e) =>viewWhoBookmarkPost(e, post._id)} className="p-[5px] bg-sky-600 rounded-full">
    <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
  </div>

  <p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[8px] `}>{post && post.bookmark && post.bookmark.length}</p>
</div>

<p className={`${ mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-[10px] mt-3 `}>{post && post.comments && post.comments.length} Comments</p>
</div>
{/* icons */}
<div className="flex justify-between items-center">
<div className="flex items-center pl-9 sm:gap-1 mt-4">
  <div  onClick={() =>handleLike(post && post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
    <p className="text-white text-[10px] pl-1">
      Like
    </p>
  </div>

  <div onClick={() =>handleReShare(post && post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white"/>
    <p className="text-white text-[10px] pl-1">
      ReShare
    </p>
  </div>

  <div onClick={() => goToPost(post && post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg`}>
    <CommentLogo  className={`w-[12px] h-[12px] ${ mode === 'light' ? 'fill-white' : 'fill-white'} `} />
    <p className={`${ mode === 'light' ? 'text-white' : 'text-white'} text-[10px] pl-1`} >
      Comment
    </p>
  </div>

  <div></div>
  <div></div>
</div>

<div  onClick={() =>handleBookmark(post && post._id)} className={`${ mode === 'light' ? 'bg-black' : 'bg-gray-800'} stroke-white fill-white flex cursor-pointer items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg`} >
  <BookMarkLogo   className="w-[12px] h-[12px]"/>
</div>
</div>
</div>
  )
}

export default Post
