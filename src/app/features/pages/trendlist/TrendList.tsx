import NavBar from '../mobilenav/NavBar'
import { ReactComponent as SearchLogo } from '../../../../assets/searchBar.svg';
import './trend.css';
import { useNavigate, useParams } from 'react-router-dom'
import { resetSearchPost, searchForPost, shouldWeHideMobileNav } from '../home/PostSlice';
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, } from "@heroicons/react/24/outline";
import { getOtherUser, resetSearchUser, searchUser, selectUser, userFollowing } from "../auth/authSlice";
import { allCommentForAPost, getAPost, getAllPosts, selectPost,  } from "../home/PostSlice";
import { useAppContext } from "../home/homeContext";
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Post from '../../../../utils/Post';

const TrendList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { refresh, toggleRefresh } = useAppContext();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
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
  const [displayImage, setDisplayImage] = useState<string>('');
  const [touchstart, setTouchStart] = useState<number>();
  const [touchend, setTouchEnd] = useState<number>();
  const [displayProfileImage, setDisplayProfileImage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [toRefresh, setToRefresh] = useState<boolean>(false);
  const [searchuser, setSearchuser] = useState<boolean>(false);
  const { posts, searchPosts, currentSearch, status } = useAppSelector(selectPost);
  const { users, searchUsers, mode } = useAppSelector(selectUser);
  const [searchWord, setSearchWord] = useState(currentSearch ? currentSearch : '');

  useEffect(() => {
    getAllPosts();
  }, [dispatch])

  useEffect(() => {
    setSearchWord(currentSearch)
  }, [currentSearch])

 


 
  const handleTheSearch = () => {
    if(searchuser){ 
    dispatch(searchUser(searchWord))
    }else{
    dispatch(searchForPost(searchWord))
    }
  
  };

  useEffect(() => {
    handleTheSearch()
  }, [searchuser]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleTheSearch();
  };

  const thesearchPost = () => {
    setSearchuser(false)
   };
 
   const thesearchUser = () => {
    setSearchuser(true)
   };

   useEffect(() => {
    if(currentSearch){
      handleTheSearch();
    }
   }, [currentSearch])

  const [toggleControls, setToggleControls] = useState<boolean>(false);
  const [personalPost, setPersonalPost] = useState<any>();
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { id } = useParams();

const viewProfile = (userId: string) => {
if(!getUser){
  navigate(`/profile/${userId}`);
}
// if i am logged in
const me = getUser && getUser._doc  && getUser._doc._id;
  
  const findPerson = getUser.users.find((u: any) => u._id === userId);
    if(!findPerson.fullname || findPerson.fullname === ''){
      navigate(`/profile/create/${userId}`);
      return;
    }else{
     dispatch(getOtherUser(findPerson && findPerson._id)).then((res: any) => {
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
        window.scrollTo(0, 0);
      }
     })
    };
  

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


  const showPostModal = () => {
    setPostModal(true);
   setisHome(false);
   setIsTrend(false);
   setisnotify(false);
   setispost(true);
  };


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
      dispatch(shouldWeHideMobileNav(false));
      setDesktopMenu(false);
    }
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



  const handleFollow = (userId: string) => {
    const findUser = searchUsers.find((p: any) => p._id === userId );
     const token = findUser && findUser.token;
     const follow = { token, userId };
     dispatch(userFollowing(follow))
   };

   useEffect(() => {
    dispatch(resetSearchPost());
    dispatch(resetSearchUser());
   }, [])
 

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
   <div className={`p-2 sm:mt-10 sm:rounded-xl ${ mode === 'light' ? 'bg-white text-black fill-black' : 'bg-black text-white fill-white'} h-min `}>
      <div className='w-full rounded-3xl'>
      <div onClick={handleGoBack} className='flex items-center py-4 gap-3 cursor-pointer'>
        <ArrowLeftIcon className='w-5 h-5 stroke-[3px] cursor-pointer' />
        <h2 className='text-sm font-semibold'>Go Back</h2>
      </div>
  <form onSubmit={handleSearch}>
<div className='flex my-2 w-full items-center px-4'> 
<div className='flex relative items-center w-full sm:w-[50%]'>
  <input value={searchWord} required onChange={(e) => (setSearchWord(e.target.value))} type="search" name="search" id="search" className={`w-full ${ mode === 'light' ? 'bg-white border-gray-200 focus:border-gray-200' : 'bg-gray-600 border-purple-600 focus:border-purple-200'} rounded-bl-2xl rounded-tl-2xl px-3 py-1 text-[12px]  focus:ring-0`} placeholder='search for a trend' />
  <div className='absolute right-2'>
  <button>
  <SearchLogo  className='w-[14px] h-[14px] stroke-[4px]' />
  </button>
  </div>
</div>

<button 
 
    type="submit" 
    className="bg-purple-600 text-xs hover:bg-purple-800 text-white font-semibold py-[9.3px] px-3 rounded-r-2xl transition-colors duration-200"
  >
    Search
  </button>
</div>
</form>

<div className='flex items-center justify-around gap-3'>
      <p onClick={thesearchPost} className={` px-12 font-semibold cursor-pointer tracking-widest text-md ${searchuser ? '' : 'border-b-[3px] border-purple-600 text-purple-600'} `} >Post</p>
      <p onClick={thesearchUser} className={`px-12 font-semibold cursor-pointer tracking-widest text-md ${searchuser ? 'border-b-[3px] border-purple-600 text-purple-600' : ''} `} >User</p>
</div>


{/* search user result  */}
  <div className={`pb-[61px] h-screen ${mode === 'light' ? 'bg-white' : 'bg-black'} `}>
    {
      searchuser ? (
        <>
        {
          
              searchUsers && searchUsers.length === 0 ? (
                <>
             <img src={`${process.env.PUBLIC_URL}/images/noresultfound1.png`} alt="nosearchresultfound" className='w-full h-full' />
                <h1 className={`text-xs flex p-4 justify-center ${mode === 'light' ? 'text-black' : 'text-white'}`}>No User found</h1>
                </>
              ) :   searchUsers && Array.isArray(searchUsers) && searchUser.length > 0 ? searchUsers.map((person: any, index: number) => (
                <div className={`flex justify-between items-center rounded-xl py-2 my-2 px-4 ${mode === 'light' ? 'bg-white' : 'bg-gray-800'} `}>
                  <div onClick={() =>viewProfile(person._id)} className='flex gap-2 cursor-pointer'>
                    {
                      person && person.profilePhoto && person.profilePhoto.url ? (
                        <img className='w-9 h-9 rounded-full' src={person && person.profilePhoto && person.profilePhoto.url} alt="" />
                      ) : (
                        <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
                      )
                    }
                  <div>
                    <h1 className='text-sm font-semibold'>{person && person.fullname ?  person.fullname : 'anonymous'}</h1>
                    <p className='text-xs text-gray-500'>@{person && person.handle ?  person.handle : 'anonymous'}</p>
                  </div>
                  </div>
                  
                  <button onClick={() => handleFollow(person && person._id)} className={`text-xs px-4 py-1 rounded-full hover:bg-purple-600 ${mode === 'light' ? 'bg-black text-white' : 'bg-gray-900 text-white'} transform-transition duration-100 hover:scale-110`}>
                {getUser && getUser._doc && getUser._doc.following && getUser._doc.following.includes(person._id) ? 'Following' : 'Follow'} 
                  </button>
                </div>
              )) : (
                <></>
              )
          
        }
        </>
      ) : (
        // post result 
        <>
          {
            searchPosts && searchPosts.length === 0 ? (
              <>
              <img src={`${process.env.PUBLIC_URL}/images/noresultfound1.png`} alt="nosearchresultfound" className='w-full h-full' />
              <h1>No Post found</h1>
              </>
            )
          : searchPosts && Array.isArray(searchPosts) && searchPosts.length > 0 ? searchPosts.map((post: any, index: number) => (       
         
          <Post post={post} />
          )) : (
            <>
            </>
          )
          }
  </>
      )
    }
  </div>
</div>
<NavBar />
   </div>
  )
}

export default TrendList
