import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { PlusIcon, HeartIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useAppSelector } from "../../../hooks";
import { selectUser } from "../auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProfileMiddle = () => {
  const navigate = useNavigate();
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
  
    const videoUrl = `${process.env.PUBLIC_URL}/video.mp4`;
    const { user, profile } = useAppSelector(selectUser);
    const otheruser = JSON.parse(localStorage.getItem('otheruser') as any);

  

    const activateFeed = () => {
        setShowFeed(true);
        setShowupload(false);
        setShowFollowers(false);
        setShowFollowing(false);
    }

    const activateUpload = () => {
        setShowFeed(false);
        setShowupload(true);
        setShowFollowers(false);
        setShowFollowing(false);
    }

    const activateFollowers = () => {
        setShowFeed(false);
        setShowupload(false);
        setShowFollowers(true);
        setShowFollowing(false);
    }

    const activateFollowing = () => {
        setShowFeed(false);
        setShowupload(false);
        setShowFollowers(false);
        setShowFollowing(true);
    }
  
    const showPostModal = () => {
      setPostModal(true);
    };
  
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
      setInputStr((prev) => prev + emojiObject.emoji);
      setShowEmojiPicker(false);
    };
  
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
  
    const showMobileModal = () => {
      setMobileModal(true);
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", hideMobileMenu);
  
      return () => {
        document.removeEventListener("mousedown", hideMobileMenu);
      };
    }, []);
    const menuShow = () => {
      setMenu((prev) => !prev);
      setDesktopMenu(true);
    };
  
    const showDesktopMenu = () => {
      setDesktopMenu(false);
    };
    console.log('profile ', profile)

    const viewProfile = () => {
      navigate(`/profile/${otheruser && otheruser._doc && otheruser._doc._id}`)
    }
  
    const editProfile = () => {
      if(otheruser && otheruser._doc && otheruser._doc._id === id ){
        navigate(`/profile/create/${otheruser && otheruser._doc && otheruser._doc._id}`);
      }
    }

  return (
    <div className="mt-10 max-w-md sm:max-w-full">
               
      <div className='flex flex-col rounded-tl-3xl justify-center items-center bg-white p-6'>
        <div className='flex gap-2 items-center'>
        <div className='rounded-full bg-sky-500 cursor-pointer w-18 h-18'></div>
        {
          otheruser && otheruser._doc && otheruser._doc.profilePhoto && otheruser._doc.profilePhoto.url ? (
            <>
            <div className="relative">
            <img onClick={viewProfile} className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={otheruser && otheruser._doc && otheruser._doc.profilePhoto && otheruser._doc.profilePhoto.url} alt="" />
             <div onClick={editProfile} className="absolute bottom-0 right-9 cursor-pointer">
                <svg className="w-5 h-5" fill="none"  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div> 
            </div>
            
            </>
          ) : (
            <>
            <div className="relative">
             <img onClick={viewProfile} className='rounded-full w-[250px] h-[250px] cursor-pointer -ml-4' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
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
            <h1 className='text-black font-bold  cursor-pointer text-md'>{otheruser && otheruser._doc && otheruser._doc.fullname}</h1>
            </div>
            <p className='text-gray-500 text-xs'>@{otheruser && otheruser._doc && otheruser._doc.handle}</p>
            <p className='text-gray-500 text-xs'>{otheruser && otheruser._doc && otheruser._doc.profession}</p>
            <p className='text-gray-500 text-xs'>{otheruser && otheruser._doc && otheruser._doc.address}</p>
            <p className='text-gray-500 text-xs'>{otheruser && otheruser._doc && otheruser._doc.dateOfBirth}</p>
            <p className='text-gray-500 text-xs max-w-sm'>{otheruser && otheruser._doc && otheruser._doc.bio}</p>
        </div>

        <div className='flex gap-1 mt-3'>
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otheruser && otheruser._doc && otheruser._doc.followers && otheruser._doc.followers.length  }</h1>
            <p className='text-xs text-gray-400'>Followers</p>
          </div>
          <div className='flex flex-col justify-center px-3 border-r-2 border-gray-400'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otheruser && otheruser._doc && otheruser._doc.following && otheruser._doc.following.length }</h1>
            <p className='text-xs text-gray-400'>Following</p>
          </div>
          <div className='flex flex-col justify-center px-3'>
            <h1 className='text-black dark:text-white text-center font-semibold text-sm'>{otheruser && otheruser._doc && otheruser._doc.posts && otheruser._doc.posts.length }</h1>
            <p className='text-xs text-gray-400'>Posts</p>
          </div>
        </div>
      </div>

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
              {/* desktop post  */}
    {desktopmodal ? (
      <div className="hidden sm:block fixed bottom-0 sm:rounded-xl sm:bg-gray-300 sm:pr-3 sm:pl-3 sm:pb-3 sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-xl">
        <div className="flex justify-center sm:pb-2">
          <svg
            onClick={handleDesktopPost}
            className="w-4 h-4 cursor-pointer"
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

        <div className="hidden sm:flex sm:bg-white sm:items-center sm:max-h-[30px] sm:p-2 sm:rounded-2xl">
          <img
            src={`${process.env.PUBLIC_URL}/images/user.png`}
            className="hidden sm:block sm:w-6 sm:h-6 sm:rounded-full"
            alt=""
          />
          <input
          onClick={showPostModal}
            type="text"
            onChange={handlechange}
            value={inputStr}
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
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M35.8,25.1c-2.4,0.6-6.2,2.9-7.6,4.6c-3.1,3.8-3.4,4.9-3.5,15.1l-0.2,9.4h103.4h103.4l-0.3-2.1c-0.6-4.6-4-9.1-8.4-11.3l-2.3-1.2l-53.5-0.1l-53.6-0.1l-0.3-2.2c-0.4-2.4-1.9-5.8-3.6-7.8c-0.6-0.7-2.4-2.1-4.1-3l-2.9-1.6l-32.5-0.1C51.8,24.8,36.6,24.9,35.8,25.1z" />
                      <path
                        fill="#000000"
                        d="M20.3,69.6c-5.9,2.1-9.6,6.5-10.3,12.2c-0.2,1.4,2.4,26.7,7.3,70.5c8.4,75.5,7.7,70.7,11.6,74.6c1,1,2.9,2.4,4.1,3l2.3,1.2l91.5,0.1c82.9,0.1,91.7,0,93.8-0.6c4.8-1.5,8.3-5,9.6-9.7c0.4-1.2,4.1-33,8.2-70.5L246,82l-0.8-2.5c-1.6-4.9-4.9-8.3-9.6-9.9C233.6,69,224,69,127.7,69C41.9,69,21.7,69.1,20.3,69.6z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                File
              </p>
            </div>

            <div className="flex cursor-pointer items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M127.5,21.6c-16.7,4.8-50,14.4-73.9,21.3S10.1,55.4,10,55.5c-0.1,0.1,8.4,29.7,18.7,65.7c10.4,36.1,20,69.6,21.3,74.3c1.4,4.8,2.5,8.7,2.6,8.8c0,0.1,148.5-42.4,148.9-42.7c0.3-0.2-42.7-149-43.1-148.9C158.2,12.8,144.3,16.8,127.5,21.6z M149.2,31.4c0.1,0.5,3.9,13.5,8.3,28.9c4.4,15.4,9.8,34,11.9,41.2c2.1,7.3,3.7,13.4,3.6,13.5c-0.1,0.1-4-3.4-8.5-8c-8.9-8.7-10.8-10-12.5-8.6c-0.5,0.4-1.3,1.9-1.7,3.1c-1.2,3.5-3.2,5-7.4,5.6c-2.3,0.3-2.6,0.5-3.4,2.1c-0.5,1-1.7,4.8-2.7,8.5c-1.8,7-3.7,11.6-6.8,16.4c-1,1.5-1.5,2.7-1.4,2.7c0.2,0,10.8-3,23.7-6.7l23.3-6.7l1.2,4c0.7,2.1,1.3,4.3,1.4,4.9c0.1,0.9-5,2.4-59.7,18.2c-32.9,9.5-60.1,17.2-60.5,17.3c-0.6,0-3-7.1-3-8.8c0-0.5,0.8-1,2.6-1.5c42.2-12.1,60.3-17.3,61.5-17.7c1.2-0.4,2.2-1.5,4.9-5.7c4.6-7.1,5.7-9.5,7.4-15.9l1.4-5.5l-2.3-2c-1.3-1.1-7.9-7.4-14.6-14.2c-12.9-12.8-15.9-15.2-18.8-15.2c-2.3,0-3.1,1-4.7,5.2c-2.4,6.6-5.2,8.9-12.2,9.9c-3.5,0.5-4.1,0.7-5.1,2c-1.4,1.9-2.6,5.4-4.8,14.3c-2.4,9.5-4.3,15.1-6.8,19.9c-2,3.9-8.4,14.3-10.2,16.6c-0.9,1.1-1.2,0-13-41.3c-6.7-23.3-12.1-42.4-12-42.5c0.1-0.1,120-34.8,120.7-34.9C148.8,30.6,149.1,31,149.2,31.4z" />
                      <path
                        fill="#000000"
                        d="M49.6,69.5c-9.1,4.5-9.2,17.3,0,21.9c6.6,3.4,15-0.3,17.1-7.5C69.7,73.7,59.1,64.8,49.6,69.5z"
                      />
                      <path
                        fill="#000000"
                        d="M179.9,50.7c0,0.2,0.9,3.5,2.1,7.4l2,7l10,0.7c5.5,0.4,10.1,0.8,10.2,1c0.1,0.1-0.7,12.6-1.8,27.8l-2,27.5l5.6,19.4c3.1,10.7,5.7,19.5,5.8,19.5c0.3,0,8.3-107.3,8-107.6c-0.1-0.2-36.4-3-38.7-3C180.4,50.4,179.9,50.5,179.9,50.7z"
                      />
                      <path
                        fill="#000000"
                        d="M225.9,104.6c-0.4,5.8-0.4,7.9,0,8.1c0.4,0.3,0.4,0.7-0.1,1.5c-0.4,0.7-1.1,7.4-1.9,18.5c-0.7,9.6-1.3,17.4-1.2,17.5c0,0,5.4-9.6,11.8-21.4c6.4-11.9,11.6-21.6,11.5-21.7c-0.3-0.2-19.2-10.4-19.4-10.4C226.5,96.7,226.2,100.3,225.9,104.6z"
                      />
                      <path
                        fill="#000000"
                        d="M157.6,184.3c-29.7,8.5-53.9,15.6-53.8,15.7c0.2,0.3,104.4,7.8,104.6,7.6c0.1-0.1,0.9-8.3,1.6-18.1c1-13.2,1.5-18.2,2.1-19.3c0.6-1.1,0.6-1.5,0.1-1.4C211.8,168.8,187.3,175.8,157.6,184.3z"
                      />
                      <path
                        fill="#000000"
                        d="M111.4,210.4c0.8,0.8,61.1,33.1,61.2,32.8c0-0.2,3.4-6.4,7.3-13.7l7.2-13.3l-1.8-0.3c-1-0.2-17-1.5-35.6-2.8c-18.6-1.4-34.9-2.6-36.2-2.7C112.2,210.3,111.2,210.3,111.4,210.4z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                image
              </p>
            </div>

            <div className="flex cursor-pointer items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M118.7,10.5c-10.3,1.1-20.5,4.1-30,8.9c-17.8,9-30.7,22-39.7,39.7c-13.6,27-12.3,59.7,3.5,85.3c4.2,6.7,70.3,99.7,71.7,100.6c1.8,1.3,6.2,1.3,8,0c1.4-1,68.7-95.7,72.3-101.7c5.4-8.9,9-19.1,11.2-30.9c1.1-6.1,1.1-21.5,0-27.7c-1.8-10.2-3.9-16.5-8.4-25.6c-6.7-13.6-15.6-24-28.4-33.1c-5.4-3.9-16.6-9.5-23-11.6C144.2,10.6,130.8,9.2,118.7,10.5z M134.3,69.7c10.9,2.3,20.4,11.7,22.6,22.6c4.3,20.9-14.1,39.4-35.1,35.1c-8.3-1.7-16.3-7.9-20-15.6c-5.8-11.7-3.7-24.9,5.5-34C114.5,70.6,124.3,67.6,134.3,69.7z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                Location
              </p>
            </div>

            <div className="flex cursor-pointer items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                    <path
                      fill="#000000"
                      d="M128,10C62.9,10,10,63,10,128c0,65.1,52.9,118,118,118c65.1,0,118-52.9,118-118C246,63,193.1,10,128,10z M228.6,128c0,23-7.8,44.2-20.9,61.2c-3.7-2.9-7.6-10.7-3.9-18.7c3.7-8.1,4.7-26.9,3.8-34.2c-0.8-7.3-4.6-24.9-14.9-25.1c-10.3-0.1-17.4-3.6-23.5-15.8c-12.7-25.4,23.8-30.3,11.1-44.4c-3.6-3.9-21.9,16.3-24.6-10.7c-0.2-1.9,1.7-4.8,4.1-7.8C199.8,46,228.6,83.7,228.6,128z M114.2,28.4c-2.4,4.7-8.8,6.6-12.6,10.1c-8.4,7.6-12,6.6-16.5,13.8c-4.6,7.3-19.3,17.8-19.3,23.1s7.4,11.5,11.1,10.3c3.7-1.2,13.5-1.2,19.3,0.9c5.8,2,48.1,4.1,34.6,39.9c-4.3,11.4-23,9.5-28,28.3c-0.7,2.8-3.3,14.6-3.5,18.4c-0.3,6,4.2,28.5-1.5,28.5s-21.4-20.2-21.4-23.8s-4-16.4-4-27.4c0-11-18.7-10.8-18.7-25.3c0-13.1,10.1-19.7,7.9-26c-2.2-6.3-20-6.5-27.4-7.2C47,58.4,77.5,33.5,114.2,28.4z M96.3,223.5c6-3.2,6.7-7.3,12.1-7.5c6.3-0.3,11.4-2.5,18.4-4c6.3-1.4,17.5-7.7,27.4-8.5c8.3-0.7,24.8,0.4,29.2,8.5c-15.9,10.6-35,16.7-55.5,16.7C116.9,228.6,106.3,226.8,96.3,223.5z"
                    />
                  </g>
                </g>
              </svg>
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
          <svg
            onClick={showDeskTopModal}
            className="w-7 h-7 cursor-pointer"
            style={{ strokeWidth: 5 }}
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
                  <path
                    fill="white"
                    d="M124.1,10.8c-1,0.6-2.6,1.9-3.4,3l-1.5,2L119,67.4l-0.1,51.6H68c-56.6,0-53.2-0.2-56.4,3.9c-2.2,2.9-2.2,7.6,0,10.5c3.1,4.1-0.3,3.9,56.4,3.9h50.9V188c0,56.6-0.2,53.2,3.9,56.4c2.9,2.2,7.6,2.2,10.5,0c4.1-3.1,3.9,0.3,3.9-56.4v-50.9H188c56.6,0,53.2,0.2,56.4-3.9c2.2-2.9,2.2-7.6,0-10.5c-3.1-4.1,0.3-3.9-56.4-3.9h-50.9V68c0-56.5,0.2-53.2-3.8-56.3C130.8,9.9,126.8,9.4,124.1,10.8z"
                  />
                </g>
              </g>
            </g>
          </svg>
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

          <div onClick={showPostModal} className="p-4 bg-black border border-white rounded-full">
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
            src={`${process.env.PUBLIC_URL}/images/user.png`}
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

    {/* mobile menu  */}
    <div
      ref={mobileMenuRef}
      id="mobilemenu"
      className={`fixed ${
        menu ? "block" : "hidden"
      } bottom-5 bg-white p-5 w-full h-1/3 rounded-tl-3xl rounded-tr-3xl sm:hidden`}
    >
      <div className="flex gap-2 items-center pt-4">
        <svg
          id="svg"
          className="fill-black stroke-black w-5 h-5"
          version="1.1"
          viewBox="144 144 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="IconSvg_bgCarrier" stroke-width="0"></g>
          <g
            id="IconSvg_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
          ></g>
          <g id="IconSvg_iconCarrier">
            <g xmlns="http://www.w3.org/2000/svg">
              <path d="m179.58 617.6h392.83c8.6914 0 15.742-7.0391 15.742-15.742 0-116.98-95.172-212.15-212.17-212.15-116.97 0.015625-212.15 95.188-212.15 212.15 0 8.707 7.0547 15.746 15.746 15.746zm196.41-196.39c94.324 0 171.99 72.629 180 164.92h-359.98c7.9961-92.293 85.664-164.92 179.98-164.92z" />
              <path d="m281.26 277.13c0 52.238 42.508 94.746 94.746 94.746 52.238 0 94.746-42.492 94.746-94.746 0-52.254-42.508-94.746-94.746-94.746-52.254 0.011719-94.746 42.508-94.746 94.746zm157.99 0c0 34.875-28.387 63.258-63.258 63.258-34.875 0-63.258-28.387-63.258-63.258 0-34.875 28.371-63.258 63.258-63.258 34.887-0.003906 63.258 28.383 63.258 63.258z" />
              <path d="m636.16 273.21c0-8.707-7.0547-15.742-15.742-15.742h-36.195l-0.003906-36.195c0-8.707-7.0547-15.742-15.742-15.742-8.6914 0-15.742 7.0391-15.742 15.742v36.195h-36.195c-8.6914 0-15.742 7.0391-15.742 15.742 0 8.707 7.0547 15.742 15.742 15.742h36.195v36.211c0 8.707 7.0547 15.742 15.742 15.742 8.6914 0 15.742-7.0391 15.742-15.742v-36.211l36.195 0.003906c8.6914 0 15.746-7.0391 15.746-15.746z" />
            </g>
          </g>
        </svg>
        <p className="text-black text-md">Follow @texilola😎</p>
      </div>

      <div className="flex gap-2 items-center pt-4">
        <svg
          className="fill-black stroke-black w-5 h-5"
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
                <path d="M116.7,10.8C87.9,13.8,62.4,26.2,42.5,47c-17.6,18.2-28.3,40.9-31.9,67.1c-0.9,6.8-0.8,23,0.3,29.8c2.1,13.3,5.6,24.7,11.2,35.9c15.8,31.9,44.4,54.5,79.4,62.8c12.3,2.9,28.8,3.7,41.9,2c15.8-2.1,32.7-8,45.9-16c31.2-19.2,51.2-49.9,56.2-86.5c1-7,0.9-23-0.3-30.3c-3.9-26.4-15.9-49.8-34.9-68.2c-17.9-17.3-40.3-28.3-64.9-32.1C138.9,10.6,122.6,10.1,116.7,10.8z M141.9,29.1c33.6,4.9,62.2,25.9,76.7,56.4c13.2,27.7,12.6,60.5-1.6,88.1c-2.6,5.1-7.8,13.1-10.6,16.4l-1.7,2l-70.4-70.1C95.7,83.2,64,51.5,63.9,51.4c-0.1-0.1,1.7-1.7,4-3.3c13.3-9.9,29-16.4,45.7-19C120,28.1,135.3,28.1,141.9,29.1z M152.2,164.7l40,39.9l-1.7,1.4c-3.6,3.1-13,9-19,11.8c-35,16.9-76.6,12.1-106.8-12.3c-4.9-4-13.5-12.9-17.2-17.8c-26.4-35.4-26.4-83.7,0.2-119.3l3.3-4.4l30.6,30.5C98.4,111.1,130.2,142.8,152.2,164.7z" />
              </g>
            </g>
          </g>
        </svg>
        <p className="text-black text-md">Block @texilola😎</p>
      </div>

      <div className="flex gap-2 items-center pt-4">
        <svg
          version="1.1"
          className="fill-black stroke-black w-5 h-5"
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
                <path d="M23.5,11.4L22,12.8v115.3v115.3l1.3,1.2c1.8,1.7,5.1,1.7,6.6,0.1c1.1-1.2,1.1-2.8,1.3-41l0.1-39.8l101.3-0.1l101.3-0.2l-26.9-32.2l-26.9-32.2l2.5-3c18.4-21.7,50.8-60.9,50.5-61.1c-0.1-0.2-45.6-0.3-101-0.3H31.4V24.5c0-10.6-0.3-12.2-2.3-13.8C27.6,9.5,25,9.8,23.5,11.4z M212.9,45.5c-0.5,0.6-10.7,12.9-22.9,27.5l-22,26.4l22.8,27.3c12.5,15,22.8,27.4,22.8,27.6c0,0.2-41,0.4-91.1,0.4H31.4V99.6V44.5h91.1C209,44.5,213.7,44.6,212.9,45.5z" />
              </g>
            </g>
          </g>
        </svg>
        <p className="text-black text-md">Report Post</p>
      </div>

      <div className="flex gap-2 items-center pt-4">
        <svg
          version="1.1"
          className="fill-black stroke-black w-5 h-5"
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
                <path d="M173.7,14.2c-23.9,16.2-44.9,28.4-59.9,35c-3.7,1.7-10.9,4.4-15.9,6.2c-9.3,3.2-12,4.5-14.5,7.3c-1.8,2-4.7,7.7-6.9,13.8l-1.7,4.6l-16.7,0.2l-16.6,0.2l-3,1.5c-3.8,1.9-7.5,5.5-9.2,9.3L27.8,95v33v33l1.4,2.9c1.7,3.7,5.6,7.7,9.4,9.4l2.9,1.4l14.4,0.2l14.4,0.2l58.6-58.1l58.6-58.1l0-3.3c0.3-17.9,0-41.5-0.6-42.4c-0.3-0.6-1.3-1.5-2.2-2C181.8,9.2,180.4,9.6,173.7,14.2z" />
                <path
                  fill="#000000"
                  d="M217.9,43.2c-1.6,1-173.4,171.2-175.9,174.3c-2.9,3.6-1.5,8.8,2.9,10.6c4.7,2,0.4,5.9,64.1-57.4c31.6-31.4,71.3-70.8,88.2-87.5l30.8-30.6l0.2-2.5c0.3-3.1-0.7-5.3-3-6.8C223.1,42,219.9,42,217.9,43.2z"
                />
                <path
                  fill="#000000"
                  d="M140,151.5c-25.9,25.7-47.1,46.8-47.3,47c-0.1,0.2,1.9,1,4.3,1.8c19.7,6.4,39.6,16.9,71,37.7c7.1,4.7,12.6,8,13.3,8c1.9,0,4.5-1.3,5.4-2.7c0.8-1.2,0.9-6.2,0.9-69.6c0-37.6-0.1-68.5-0.3-68.6C187.2,104.9,165.9,125.8,140,151.5z"
                />
              </g>
            </g>
          </g>
        </svg>
        <p className="text-black text-md">Mute @texilola😎</p>
      </div>
    </div>

    {/* feeds */}

    <div className="rounded-full my-1 p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">
      <div className="flex items-center gap-2 w-full">
        <img
          src={`${process.env.PUBLIC_URL}/images/user.png`}
          className="w-8 h-8 rounded-full cursor-pointer"
          alt=""
        />
        <div className="w-full flex items-center justify-between gap-1">
          <div className="flex items-center">
            <div className="mt-3">
              <h1 className="text-black dark:text-white text-sm font-semibold">
                Elon Musk
              </h1>
              <p className="text-gray text-[8px]">few minutes ago</p>
            </div>
            <svg
              className="w-5 h-5 fill-blue-500 stroke-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m21.5609 10.7386-1.36-1.58001c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57004 1.37c-.3.25-.87.46-1.26.46h-1.73c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59001c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58004 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83c-.14.14-.33.22-.53.22s-.39-.08-.53-.22l-2.42004-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89004 1.89 4.3-4.30001c.29-.29.77-.29 1.06 0s.29.77 0 1.06001z" />
            </svg>
            <p className="text-gray-600 text-[10px] ">@elonmusk</p>
          </div>
          {/* three dot icon  */}
          <div onClick={menuShow} className="cursor-pointer ">
            <svg
              className="w-[12px] h-[12px] fill-black stroke-black dark:fill-white dark:stroke-white"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 342.382 342.382"
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                    c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"
                    />
                  </g>
                  <g>
                    <path
                      d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                    c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"
                    />
                  </g>
                  <g>
                    <path
                      d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                    c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"
                    />
                  </g>
                </g>
              </g>
            </svg>

            {/* desktop menu  */}
            <div
              ref={desktopMenuRef}
              id="desktopmenu"
              className={`hidden ${
                desktopMenu ? "sm:block" : "sm:hidden"
              } absolute shadow-xl shadow-purple-80 z-10 left-[50%] rounded-3xl mx-auto bg-white  h-1/3 p-5`}
            >
              <div className="flex gap-2 cursor-pointer items-center pt-4">
                <svg
                  id="svg"
                  className="fill-black stroke-black w-5 h-5"
                  version="1.1"
                  viewBox="144 144 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="IconSvg_bgCarrier" stroke-width="0"></g>
                  <g
                    id="IconSvg_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                  ></g>
                  <g id="IconSvg_iconCarrier">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="m179.58 617.6h392.83c8.6914 0 15.742-7.0391 15.742-15.742 0-116.98-95.172-212.15-212.17-212.15-116.97 0.015625-212.15 95.188-212.15 212.15 0 8.707 7.0547 15.746 15.746 15.746zm196.41-196.39c94.324 0 171.99 72.629 180 164.92h-359.98c7.9961-92.293 85.664-164.92 179.98-164.92z" />
                      <path d="m281.26 277.13c0 52.238 42.508 94.746 94.746 94.746 52.238 0 94.746-42.492 94.746-94.746 0-52.254-42.508-94.746-94.746-94.746-52.254 0.011719-94.746 42.508-94.746 94.746zm157.99 0c0 34.875-28.387 63.258-63.258 63.258-34.875 0-63.258-28.387-63.258-63.258 0-34.875 28.371-63.258 63.258-63.258 34.887-0.003906 63.258 28.383 63.258 63.258z" />
                      <path d="m636.16 273.21c0-8.707-7.0547-15.742-15.742-15.742h-36.195l-0.003906-36.195c0-8.707-7.0547-15.742-15.742-15.742-8.6914 0-15.742 7.0391-15.742 15.742v36.195h-36.195c-8.6914 0-15.742 7.0391-15.742 15.742 0 8.707 7.0547 15.742 15.742 15.742h36.195v36.211c0 8.707 7.0547 15.742 15.742 15.742 8.6914 0 15.742-7.0391 15.742-15.742v-36.211l36.195 0.003906c8.6914 0 15.746-7.0391 15.746-15.746z" />
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Follow @texilola😎</p>
              </div>

              <div className="flex gap-2 items-center pt-4  cursor-pointer">
                <svg
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M116.7,10.8C87.9,13.8,62.4,26.2,42.5,47c-17.6,18.2-28.3,40.9-31.9,67.1c-0.9,6.8-0.8,23,0.3,29.8c2.1,13.3,5.6,24.7,11.2,35.9c15.8,31.9,44.4,54.5,79.4,62.8c12.3,2.9,28.8,3.7,41.9,2c15.8-2.1,32.7-8,45.9-16c31.2-19.2,51.2-49.9,56.2-86.5c1-7,0.9-23-0.3-30.3c-3.9-26.4-15.9-49.8-34.9-68.2c-17.9-17.3-40.3-28.3-64.9-32.1C138.9,10.6,122.6,10.1,116.7,10.8z M141.9,29.1c33.6,4.9,62.2,25.9,76.7,56.4c13.2,27.7,12.6,60.5-1.6,88.1c-2.6,5.1-7.8,13.1-10.6,16.4l-1.7,2l-70.4-70.1C95.7,83.2,64,51.5,63.9,51.4c-0.1-0.1,1.7-1.7,4-3.3c13.3-9.9,29-16.4,45.7-19C120,28.1,135.3,28.1,141.9,29.1z M152.2,164.7l40,39.9l-1.7,1.4c-3.6,3.1-13,9-19,11.8c-35,16.9-76.6,12.1-106.8-12.3c-4.9-4-13.5-12.9-17.2-17.8c-26.4-35.4-26.4-83.7,0.2-119.3l3.3-4.4l30.6,30.5C98.4,111.1,130.2,142.8,152.2,164.7z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Block @texilola😎</p>
              </div>

              <div className="flex gap-2 items-center cursor-pointer pt-4">
                <svg
                  version="1.1"
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M23.5,11.4L22,12.8v115.3v115.3l1.3,1.2c1.8,1.7,5.1,1.7,6.6,0.1c1.1-1.2,1.1-2.8,1.3-41l0.1-39.8l101.3-0.1l101.3-0.2l-26.9-32.2l-26.9-32.2l2.5-3c18.4-21.7,50.8-60.9,50.5-61.1c-0.1-0.2-45.6-0.3-101-0.3H31.4V24.5c0-10.6-0.3-12.2-2.3-13.8C27.6,9.5,25,9.8,23.5,11.4z M212.9,45.5c-0.5,0.6-10.7,12.9-22.9,27.5l-22,26.4l22.8,27.3c12.5,15,22.8,27.4,22.8,27.6c0,0.2-41,0.4-91.1,0.4H31.4V99.6V44.5h91.1C209,44.5,213.7,44.6,212.9,45.5z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Report Post</p>
              </div>

              <div className="flex gap-2 cursor-pointer items-center pt-4">
                <svg
                  version="1.1"
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M173.7,14.2c-23.9,16.2-44.9,28.4-59.9,35c-3.7,1.7-10.9,4.4-15.9,6.2c-9.3,3.2-12,4.5-14.5,7.3c-1.8,2-4.7,7.7-6.9,13.8l-1.7,4.6l-16.7,0.2l-16.6,0.2l-3,1.5c-3.8,1.9-7.5,5.5-9.2,9.3L27.8,95v33v33l1.4,2.9c1.7,3.7,5.6,7.7,9.4,9.4l2.9,1.4l14.4,0.2l14.4,0.2l58.6-58.1l58.6-58.1l0-3.3c0.3-17.9,0-41.5-0.6-42.4c-0.3-0.6-1.3-1.5-2.2-2C181.8,9.2,180.4,9.6,173.7,14.2z" />
                        <path
                          fill="#000000"
                          d="M217.9,43.2c-1.6,1-173.4,171.2-175.9,174.3c-2.9,3.6-1.5,8.8,2.9,10.6c4.7,2,0.4,5.9,64.1-57.4c31.6-31.4,71.3-70.8,88.2-87.5l30.8-30.6l0.2-2.5c0.3-3.1-0.7-5.3-3-6.8C223.1,42,219.9,42,217.9,43.2z"
                        />
                        <path
                          fill="#000000"
                          d="M140,151.5c-25.9,25.7-47.1,46.8-47.3,47c-0.1,0.2,1.9,1,4.3,1.8c19.7,6.4,39.6,16.9,71,37.7c7.1,4.7,12.6,8,13.3,8c1.9,0,4.5-1.3,5.4-2.7c0.8-1.2,0.9-6.2,0.9-69.6c0-37.6-0.1-68.5-0.3-68.6C187.2,104.9,165.9,125.8,140,151.5z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Mute @texilola😎</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* post text  */}
      <div className="ml-9">
        <p className="text-xs text-black dark:text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          placeat voluptate odio reiciendis expedita ea.
        </p>
      </div>

      {/* post images  */}

      <div className="mt-2 pl-9">
        {onePic ? (
          <div className="rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-full h-50 cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : twoPics ? (
          <div className="flex rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-1/2 h-25 border-r-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-1/2 h-25 border-l-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : threePics ? (
          <div className="flex rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-1/2 h-30 border-r-2 border-r-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <div className="flex flex-col w-full">
              <img
                onClick={showMobileModal}
                className="w-full h-15 border-b-2 border-l-2 border-b-white cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/user.png`}
                alt=""
              />
              <img
                onClick={showMobileModal}
                className="w-full h-15  border-l-2  bordder-t-2 border-white cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/ladies 8.png`}
                alt=""
              />
            </div>
          </div>
        ) : fourPics ? (
          <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-r-2 border-b-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-l-2 border-b-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-t-2 border-r-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full border-t-2 border-l-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : playvideo ? (
          <div className="rounded-3xl overflow-hidden z-2">
            <video
              onClick={showFullScreen}
              className="w-full cursor-pointer object-cover h-[200px]"
              controls
              muted
              src={videoUrl}
            ></video>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex ml-9 mt-4 gap-1 items-center">
          <div className="p-[5px] bg-red-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
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
                    <path d="M70.8,25.1c-15.9,2.2-28.3,8.4-39.7,19.8c-7.9,8-12.5,14.9-16.4,25.1c-9.8,25.3-3.9,55.9,14.5,75.4c1.8,1.8,16.5,15.8,32.9,31.1s35.1,32.9,41.7,39c6.6,6.2,13,11.8,14.3,12.6c3.1,1.8,7.7,3.2,10.4,3.2c2.7,0,6.5-1.1,9.3-2.7c1.2-0.7,6.6-5.7,12.2-11.2c12.5-12.3,26.4-25.3,54.2-50.9c22.2-20.5,25.6-23.9,29.7-30.1c16.3-24.3,16.2-56.5,0-81.2c-4.1-6.1-13-15.1-19-19.1c-26-17.3-60.1-14.8-82.7,5.9c-1.9,1.8-3.8,3.3-4.1,3.3c-0.3,0-2.1-1.5-4-3.2c-8.5-7.9-19.6-13.6-32.1-16.2C87,24.9,75.5,24.4,70.8,25.1z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p className="text-[8px] text-gray-600">441k</p>

          <div className="p-[5px] bg-green-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M924.72 578.4L816 685.68V347.728C816 254.944 743.648 176 650.864 176H341.984l78.56 80h230.32C699.456 256 736 299.12 736 347.728V685.28l-105.472-106.88-55.84 56.56 204 203.632 202.88-203.632-56.848-56.56zM362.848 752C314.272 752 272 716.32 272 667.712V330.048l108.464 107.04 57.28-56.576-203.296-203.632L30.976 380.512l55.216 56.576L192 329.968v337.76C192 760.48 270.08 832 362.848 832h308.96l-78.56-80h-230.4z" />
            </svg>
          </div>
          <p className="text-[8px] text-gray-600">731k</p>

          <div className="p-[5px] bg-sky-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
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
                    <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-[8px] text-gray-600">241k</p>
        </div>

        <p className="text-[10px] mt-3 text-gray-600">45 Comments</p>
      </div>
      {/* icons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center pl-9 sm:gap-1 mt-4">
          <div className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
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
                    <path d="M70.8,25.1c-15.9,2.2-28.3,8.4-39.7,19.8c-7.9,8-12.5,14.9-16.4,25.1c-9.8,25.3-3.9,55.9,14.5,75.4c1.8,1.8,16.5,15.8,32.9,31.1s35.1,32.9,41.7,39c6.6,6.2,13,11.8,14.3,12.6c3.1,1.8,7.7,3.2,10.4,3.2c2.7,0,6.5-1.1,9.3-2.7c1.2-0.7,6.6-5.7,12.2-11.2c12.5-12.3,26.4-25.3,54.2-50.9c22.2-20.5,25.6-23.9,29.7-30.1c16.3-24.3,16.2-56.5,0-81.2c-4.1-6.1-13-15.1-19-19.1c-26-17.3-60.1-14.8-82.7,5.9c-1.9,1.8-3.8,3.3-4.1,3.3c-0.3,0-2.1-1.5-4-3.2c-8.5-7.9-19.6-13.6-32.1-16.2C87,24.9,75.5,24.4,70.8,25.1z" />
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Like
            </p>
          </div>

          <div className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[13px] h-[13px] fill-white stroke-white dark:fill-black dark:stroke-black"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M924.72 578.4L816 685.68V347.728C816 254.944 743.648 176 650.864 176H341.984l78.56 80h230.32C699.456 256 736 299.12 736 347.728V685.28l-105.472-106.88-55.84 56.56 204 203.632 202.88-203.632-56.848-56.56zM362.848 752C314.272 752 272 716.32 272 667.712V330.048l108.464 107.04 57.28-56.576-203.296-203.632L30.976 380.512l55.216 56.576L192 329.968v337.76C192 760.48 270.08 832 362.848 832h308.96l-78.56-80h-230.4z" />
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Retweet
            </p>
          </div>

          <div className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 439.3 529.7"
            >
              <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Comment
            </p>
          </div>

          <div></div>
          <div></div>
        </div>

        <div className="bg-black flex items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg">
          <svg
            className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
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
                  <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div className="rounded-full my-1 p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">
      <div className="flex items-center gap-2 w-full">
        <img
          src={`${process.env.PUBLIC_URL}/images/user.png`}
          className="w-8 h-8 rounded-full cursor-pointer"
          alt=""
        />
        <div className="w-full flex items-center justify-between gap-1">
          <div className="flex items-center">
            <div className="mt-3">
              <h1 className="text-black dark:text-white text-sm font-semibold">
                Elon Musk
              </h1>
              <p className="text-gray text-[8px]">few minutes ago</p>
            </div>
            <svg
              className="w-5 h-5 fill-blue-500 stroke-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m21.5609 10.7386-1.36-1.58001c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57004 1.37c-.3.25-.87.46-1.26.46h-1.73c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59001c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58004 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83c-.14.14-.33.22-.53.22s-.39-.08-.53-.22l-2.42004-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89004 1.89 4.3-4.30001c.29-.29.77-.29 1.06 0s.29.77 0 1.06001z" />
            </svg>
            <p className="text-gray-600 text-[10px] ">@elonmusk</p>
          </div>
          {/* three dot icon  */}
          <div onClick={menuShow} className="cursor-pointer ">
            <svg
              className="w-[12px] h-[12px] fill-black stroke-black dark:fill-white dark:stroke-white"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 342.382 342.382"
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                    c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"
                    />
                  </g>
                  <g>
                    <path
                      d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                    c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"
                    />
                  </g>
                  <g>
                    <path
                      d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                    c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"
                    />
                  </g>
                </g>
              </g>
            </svg>

            {/* desktop menu  */}
            <div
              ref={desktopMenuRef}
              id="desktopmenu"
              className={`hidden ${
                desktopMenu ? "sm:block" : "sm:hidden"
              } absolute shadow-xl shadow-purple-80 z-10 left-[50%] rounded-3xl mx-auto bg-white  h-1/3 p-5`}
            >
              <div className="flex gap-2 cursor-pointer items-center pt-4">
                <svg
                  id="svg"
                  className="fill-black stroke-black w-5 h-5"
                  version="1.1"
                  viewBox="144 144 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="IconSvg_bgCarrier" stroke-width="0"></g>
                  <g
                    id="IconSvg_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                  ></g>
                  <g id="IconSvg_iconCarrier">
                    <g xmlns="http://www.w3.org/2000/svg">
                      <path d="m179.58 617.6h392.83c8.6914 0 15.742-7.0391 15.742-15.742 0-116.98-95.172-212.15-212.17-212.15-116.97 0.015625-212.15 95.188-212.15 212.15 0 8.707 7.0547 15.746 15.746 15.746zm196.41-196.39c94.324 0 171.99 72.629 180 164.92h-359.98c7.9961-92.293 85.664-164.92 179.98-164.92z" />
                      <path d="m281.26 277.13c0 52.238 42.508 94.746 94.746 94.746 52.238 0 94.746-42.492 94.746-94.746 0-52.254-42.508-94.746-94.746-94.746-52.254 0.011719-94.746 42.508-94.746 94.746zm157.99 0c0 34.875-28.387 63.258-63.258 63.258-34.875 0-63.258-28.387-63.258-63.258 0-34.875 28.371-63.258 63.258-63.258 34.887-0.003906 63.258 28.383 63.258 63.258z" />
                      <path d="m636.16 273.21c0-8.707-7.0547-15.742-15.742-15.742h-36.195l-0.003906-36.195c0-8.707-7.0547-15.742-15.742-15.742-8.6914 0-15.742 7.0391-15.742 15.742v36.195h-36.195c-8.6914 0-15.742 7.0391-15.742 15.742 0 8.707 7.0547 15.742 15.742 15.742h36.195v36.211c0 8.707 7.0547 15.742 15.742 15.742 8.6914 0 15.742-7.0391 15.742-15.742v-36.211l36.195 0.003906c8.6914 0 15.746-7.0391 15.746-15.746z" />
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Follow @texilola😎</p>
              </div>

              <div className="flex gap-2 items-center pt-4  cursor-pointer">
                <svg
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M116.7,10.8C87.9,13.8,62.4,26.2,42.5,47c-17.6,18.2-28.3,40.9-31.9,67.1c-0.9,6.8-0.8,23,0.3,29.8c2.1,13.3,5.6,24.7,11.2,35.9c15.8,31.9,44.4,54.5,79.4,62.8c12.3,2.9,28.8,3.7,41.9,2c15.8-2.1,32.7-8,45.9-16c31.2-19.2,51.2-49.9,56.2-86.5c1-7,0.9-23-0.3-30.3c-3.9-26.4-15.9-49.8-34.9-68.2c-17.9-17.3-40.3-28.3-64.9-32.1C138.9,10.6,122.6,10.1,116.7,10.8z M141.9,29.1c33.6,4.9,62.2,25.9,76.7,56.4c13.2,27.7,12.6,60.5-1.6,88.1c-2.6,5.1-7.8,13.1-10.6,16.4l-1.7,2l-70.4-70.1C95.7,83.2,64,51.5,63.9,51.4c-0.1-0.1,1.7-1.7,4-3.3c13.3-9.9,29-16.4,45.7-19C120,28.1,135.3,28.1,141.9,29.1z M152.2,164.7l40,39.9l-1.7,1.4c-3.6,3.1-13,9-19,11.8c-35,16.9-76.6,12.1-106.8-12.3c-4.9-4-13.5-12.9-17.2-17.8c-26.4-35.4-26.4-83.7,0.2-119.3l3.3-4.4l30.6,30.5C98.4,111.1,130.2,142.8,152.2,164.7z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Block @texilola😎</p>
              </div>

              <div className="flex gap-2 items-center cursor-pointer pt-4">
                <svg
                  version="1.1"
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M23.5,11.4L22,12.8v115.3v115.3l1.3,1.2c1.8,1.7,5.1,1.7,6.6,0.1c1.1-1.2,1.1-2.8,1.3-41l0.1-39.8l101.3-0.1l101.3-0.2l-26.9-32.2l-26.9-32.2l2.5-3c18.4-21.7,50.8-60.9,50.5-61.1c-0.1-0.2-45.6-0.3-101-0.3H31.4V24.5c0-10.6-0.3-12.2-2.3-13.8C27.6,9.5,25,9.8,23.5,11.4z M212.9,45.5c-0.5,0.6-10.7,12.9-22.9,27.5l-22,26.4l22.8,27.3c12.5,15,22.8,27.4,22.8,27.6c0,0.2-41,0.4-91.1,0.4H31.4V99.6V44.5h91.1C209,44.5,213.7,44.6,212.9,45.5z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Report Post</p>
              </div>

              <div className="flex gap-2 cursor-pointer items-center pt-4">
                <svg
                  version="1.1"
                  className="fill-black stroke-black w-5 h-5"
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
                        <path d="M173.7,14.2c-23.9,16.2-44.9,28.4-59.9,35c-3.7,1.7-10.9,4.4-15.9,6.2c-9.3,3.2-12,4.5-14.5,7.3c-1.8,2-4.7,7.7-6.9,13.8l-1.7,4.6l-16.7,0.2l-16.6,0.2l-3,1.5c-3.8,1.9-7.5,5.5-9.2,9.3L27.8,95v33v33l1.4,2.9c1.7,3.7,5.6,7.7,9.4,9.4l2.9,1.4l14.4,0.2l14.4,0.2l58.6-58.1l58.6-58.1l0-3.3c0.3-17.9,0-41.5-0.6-42.4c-0.3-0.6-1.3-1.5-2.2-2C181.8,9.2,180.4,9.6,173.7,14.2z" />
                        <path
                          fill="#000000"
                          d="M217.9,43.2c-1.6,1-173.4,171.2-175.9,174.3c-2.9,3.6-1.5,8.8,2.9,10.6c4.7,2,0.4,5.9,64.1-57.4c31.6-31.4,71.3-70.8,88.2-87.5l30.8-30.6l0.2-2.5c0.3-3.1-0.7-5.3-3-6.8C223.1,42,219.9,42,217.9,43.2z"
                        />
                        <path
                          fill="#000000"
                          d="M140,151.5c-25.9,25.7-47.1,46.8-47.3,47c-0.1,0.2,1.9,1,4.3,1.8c19.7,6.4,39.6,16.9,71,37.7c7.1,4.7,12.6,8,13.3,8c1.9,0,4.5-1.3,5.4-2.7c0.8-1.2,0.9-6.2,0.9-69.6c0-37.6-0.1-68.5-0.3-68.6C187.2,104.9,165.9,125.8,140,151.5z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="text-black text-md">Mute @texilola😎</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* post text  */}
      <div className="ml-9">
        <p className="text-xs text-black dark:text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          placeat voluptate odio reiciendis expedita ea.
        </p>
      </div>

      {/* post images  */}

      <div className="mt-2 pl-9">
        {onePic ? (
          <div className="rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-full h-50 cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : twoPics ? (
          <div className="flex rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-1/2 h-25 border-r-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-1/2 h-25 border-l-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : threePics ? (
          <div className="flex rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-1/2 h-30 border-r-2 border-r-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <div className="flex flex-col w-full">
              <img
                onClick={showMobileModal}
                className="w-full h-15 border-b-2 border-l-2 border-b-white cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/user.png`}
                alt=""
              />
              <img
                onClick={showMobileModal}
                className="w-full h-15  border-l-2  bordder-t-2 border-white cursor-pointer"
                src={`${process.env.PUBLIC_URL}/images/ladies 8.png`}
                alt=""
              />
            </div>
          </div>
        ) : fourPics ? (
          <div className="grid grid-cols-2 rounded-3xl overflow-hidden">
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-r-2 border-b-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-l-2 border-b-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full  border-t-2 border-r-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
            <img
              onClick={showMobileModal}
              className="w-full h-full border-t-2 border-l-2 border-white cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/user.png`}
              alt=""
            />
          </div>
        ) : playvideo ? (
          <div className="rounded-3xl overflow-hidden z-2">
            <video
              onClick={showFullScreen}
              className="w-full cursor-pointer object-cover h-[200px]"
              controls
              muted
              src={videoUrl}
            ></video>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex ml-9 mt-4 gap-1 items-center">
          <div className="p-[5px] bg-red-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
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
                    <path d="M70.8,25.1c-15.9,2.2-28.3,8.4-39.7,19.8c-7.9,8-12.5,14.9-16.4,25.1c-9.8,25.3-3.9,55.9,14.5,75.4c1.8,1.8,16.5,15.8,32.9,31.1s35.1,32.9,41.7,39c6.6,6.2,13,11.8,14.3,12.6c3.1,1.8,7.7,3.2,10.4,3.2c2.7,0,6.5-1.1,9.3-2.7c1.2-0.7,6.6-5.7,12.2-11.2c12.5-12.3,26.4-25.3,54.2-50.9c22.2-20.5,25.6-23.9,29.7-30.1c16.3-24.3,16.2-56.5,0-81.2c-4.1-6.1-13-15.1-19-19.1c-26-17.3-60.1-14.8-82.7,5.9c-1.9,1.8-3.8,3.3-4.1,3.3c-0.3,0-2.1-1.5-4-3.2c-8.5-7.9-19.6-13.6-32.1-16.2C87,24.9,75.5,24.4,70.8,25.1z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p className="text-[8px] text-gray-600">441k</p>

          <div className="p-[5px] bg-green-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M924.72 578.4L816 685.68V347.728C816 254.944 743.648 176 650.864 176H341.984l78.56 80h230.32C699.456 256 736 299.12 736 347.728V685.28l-105.472-106.88-55.84 56.56 204 203.632 202.88-203.632-56.848-56.56zM362.848 752C314.272 752 272 716.32 272 667.712V330.048l108.464 107.04 57.28-56.576-203.296-203.632L30.976 380.512l55.216 56.576L192 329.968v337.76C192 760.48 270.08 832 362.848 832h308.96l-78.56-80h-230.4z" />
            </svg>
          </div>
          <p className="text-[8px] text-gray-600">731k</p>

          <div className="p-[5px] bg-sky-600 rounded-full">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white"
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
                    <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <p className="text-[8px] text-gray-600">241k</p>
        </div>

        <p className="text-[10px] mt-3 text-gray-600">45 Comments</p>
      </div>
      {/* icons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center pl-9 sm:gap-1 mt-4">
          <div className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
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
                    <path d="M70.8,25.1c-15.9,2.2-28.3,8.4-39.7,19.8c-7.9,8-12.5,14.9-16.4,25.1c-9.8,25.3-3.9,55.9,14.5,75.4c1.8,1.8,16.5,15.8,32.9,31.1s35.1,32.9,41.7,39c6.6,6.2,13,11.8,14.3,12.6c3.1,1.8,7.7,3.2,10.4,3.2c2.7,0,6.5-1.1,9.3-2.7c1.2-0.7,6.6-5.7,12.2-11.2c12.5-12.3,26.4-25.3,54.2-50.9c22.2-20.5,25.6-23.9,29.7-30.1c16.3-24.3,16.2-56.5,0-81.2c-4.1-6.1-13-15.1-19-19.1c-26-17.3-60.1-14.8-82.7,5.9c-1.9,1.8-3.8,3.3-4.1,3.3c-0.3,0-2.1-1.5-4-3.2c-8.5-7.9-19.6-13.6-32.1-16.2C87,24.9,75.5,24.4,70.8,25.1z" />
                  </g>
                </g>
              </g>
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Like
            </p>
          </div>

          <div className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[13px] h-[13px] fill-white stroke-white dark:fill-black dark:stroke-black"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M924.72 578.4L816 685.68V347.728C816 254.944 743.648 176 650.864 176H341.984l78.56 80h230.32C699.456 256 736 299.12 736 347.728V685.28l-105.472-106.88-55.84 56.56 204 203.632 202.88-203.632-56.848-56.56zM362.848 752C314.272 752 272 716.32 272 667.712V330.048l108.464 107.04 57.28-56.576-203.296-203.632L30.976 380.512l55.216 56.576L192 329.968v337.76C192 760.48 270.08 832 362.848 832h308.96l-78.56-80h-230.4z" />
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Retweet
            </p>
          </div>

          <div className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
            <svg
              className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 439.3 529.7"
            >
              <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
            </svg>
            <p className="text-white dark:text-black text-[10px] pl-1">
              Comment
            </p>
          </div>

          <div></div>
          <div></div>
        </div>

        <div className="bg-black flex items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg">
          <svg
            className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"
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
                  <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

    {/* video view modal  */}

    <div
      className={`${
        fullvideoScreen ? "flex" : "hidden"
      } fixed top-0 left-0 bg-black  w-full h-full flex-cols justify-center items-center`}
    >
      <video
        className="w-full h-screen object-cover"
        autoPlay
        controls
        src={videoUrl}
      ></video>

      {/* video icons controls */}
      <div className="absolute z-30 bottom-12 right-0 flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
            <div className="p-2 w-12 h-12 bg-red-500 mt-2 rounded-full flex justify-center items-center">
              <HeartIcon color="white" className="w-12 h-12 fill-white" />
            </div>
            <p className="text-md text-gray-400 font-bold">124k</p>
          </div>

          <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
            <div className="p-2 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
              <svg
                className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M20.5399 16.8073C20.7615 16.5775 20.8134 16.2326 20.6692 15.9478L19.939 14.5059C18.2788 11.2271 14.9158 9.16048 11.2406 9.16049H10.8367C10.8113 8.60714 10.7785 8.05406 10.7382 7.50138L10.6697 6.56241C10.6144 5.80389 9.76867 5.37987 9.1278 5.78937C7.01209 7.14127 5.17281 8.88321 3.70799 10.9224L3.24781 11.563C3.05998 11.8245 3.05998 12.1766 3.24781 12.4381L3.70799 13.0787C5.17281 15.1179 7.01209 16.8598 9.1278 18.2117C9.76867 18.6212 10.6144 18.1972 10.6697 17.4387L10.7382 16.4997C10.7863 15.8402 10.8238 15.18 10.8507 14.5196C13.0228 14.4559 15.1925 14.8939 17.1864 15.8141L19.6858 16.9676C19.9756 17.1014 20.3183 17.0371 20.5399 16.8073ZM18.3291 14.6894L17.815 14.4522C15.3833 13.3299 12.7153 12.856 10.0678 13.0594C9.68551 13.0888 9.38691 13.4018 9.37558 13.785C9.34988 14.6542 9.30541 15.5229 9.24215 16.3907L9.23581 16.4776C7.57301 15.3039 6.11599 13.8598 4.92625 12.2036L4.78038 12.0005L4.92625 11.7975C6.11599 10.1413 7.57301 8.69718 9.23581 7.52347L9.24215 7.61043C9.29861 8.38499 9.34011 9.16037 9.36665 9.93613C9.38047 10.3401 9.71198 10.6605 10.1162 10.6605L11.2406 10.6605C14.1615 10.6605 16.8492 12.2032 18.3291 14.6894Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text-md text-gray-400 font-bold">124k</p>
          </div>

          <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
            <div className="p-4 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
              <svg
                className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 439.3 529.7"
              >
                <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
              </svg>
            </div>
            <p className="text-md text-gray-400 font-bold">124k</p>
          </div>

          <div className="flex flex-col cursor-pointer justify-end items-center pr-4">
            <div className="p-4 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
              <svg
                className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
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
                      <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                    </g>
                  </g>
                </g>
              </svg>{" "}
            </div>
            <p className="text-md text-gray-400 font-bold">124k</p>
          </div>
        </div>
      </div>

      {/* cancel or close  */}
      <div className="absolute top-5 right-5 flex justify-between items-center">
        {/* cancel or close  */}
        <svg
          onClick={hideFullScreen}
          className="w-4 h-4 fill-white cursor-pointer"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 492 492"
        >
          <g>
            <g>
              <path
                d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                  c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                  c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                  L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                  c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                  c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                  c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"
              />
            </g>
          </g>
        </svg>
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

      <div className="absolute bottom-0  flex justify-between items-center">
        <div className="relative flex items-center">
          <input
            type="text"
            className="block w-[100vw] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="start typing here"
            name=""
            id=""
          />
          <div className="absolute right-4 rounded-full p-2 bg-sky-400">
            <svg
              className="w-7 h-7 z-40 fill-white cursor-pointer"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill-rule="nonzero">
                <path d="m3.45559904 3.48107721 3.26013002 7.74280879c.20897233.4963093.20897233 1.0559187 0 1.552228l-3.26013002 7.7428088 18.83130296-8.5189228zm-.74951511-1.43663117 20.99999997 9.49999996c.3918881.1772827.3918881.7338253 0 .911108l-20.99999997 9.5c-.41424571.1873968-.8433362-.2305504-.66690162-.6495825l3.75491137-8.9179145c.10448617-.2481546.10448617-.5279594 0-.776114l-3.75491137-8.9179145c-.17643458-.41903214.25265591-.83697933.66690162-.64958246z" />
                <path d="m6 12.5v-1h16.5v1z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* picture modal  */}
    <div
      className={`${
        mobileModal ? "flex" : "hidden"
      } fixed top-0 left-0 bg-black sm:px-[30%] md:px[45%] w-full h-full justify-center items-center`}
    >
      <div className={`w-full sm:px-[2%] h-full sm:max-h-sm sm:bg-gray-900`}>
        <div className="flex justify-between items-center p-2 ">
          <svg
            className="w-3 h-3  z-40 fill-white mt-3 ml-3 cursor-pointer"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 342.382 342.382"
          >
            <g>
              <g>
                <g>
                  <path
                    d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                    c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"
                  />
                </g>
                <g>
                  <path
                    d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                    c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"
                  />
                </g>
                <g>
                  <path
                    d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                    c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"
                  />
                </g>
              </g>
            </g>
          </svg>
          {/* cancel or close  */}
          <svg
            onClick={hideMobileModal}
            className="w-3 h-3 fill-white z-40 mt-4 mr-4 cursor-pointer"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 492 492"
          >
            <g>
              <g>
                <path
                  d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* image  */}
        <div className="relative">
          <img
            className="w-full  sm:w-[45vw] md:w-[60vw] md:pl-0 md:pt-0 sm:pl-[10vw] pt-[15vw] sm:pt-0 lg:pt-0 sm:h-[90vh]"
            src={`${process.env.PUBLIC_URL}/images/ladies 7.png`}
            alt=""
          />

          <div className="absolute right-0 bottom-14 flex justify-between pb-2 pt-[60%]">
            <div></div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-end cursor-pointer items-center pr-4">
                <div className="p-2 w-12 h-12 bg-red-500 mt-2 rounded-full flex justify-center items-center">
                  <HeartIcon color="white" className="w-12 h-12 fill-white" />
                </div>
                <p className="text-md text-gray-400 font-bold">124k</p>
              </div>

              <div className="flex flex-col justify-end cursor-pointer items-center pr-4">
                <div className="p-2 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                  <svg
                    className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M20.5399 16.8073C20.7615 16.5775 20.8134 16.2326 20.6692 15.9478L19.939 14.5059C18.2788 11.2271 14.9158 9.16048 11.2406 9.16049H10.8367C10.8113 8.60714 10.7785 8.05406 10.7382 7.50138L10.6697 6.56241C10.6144 5.80389 9.76867 5.37987 9.1278 5.78937C7.01209 7.14127 5.17281 8.88321 3.70799 10.9224L3.24781 11.563C3.05998 11.8245 3.05998 12.1766 3.24781 12.4381L3.70799 13.0787C5.17281 15.1179 7.01209 16.8598 9.1278 18.2117C9.76867 18.6212 10.6144 18.1972 10.6697 17.4387L10.7382 16.4997C10.7863 15.8402 10.8238 15.18 10.8507 14.5196C13.0228 14.4559 15.1925 14.8939 17.1864 15.8141L19.6858 16.9676C19.9756 17.1014 20.3183 17.0371 20.5399 16.8073ZM18.3291 14.6894L17.815 14.4522C15.3833 13.3299 12.7153 12.856 10.0678 13.0594C9.68551 13.0888 9.38691 13.4018 9.37558 13.785C9.34988 14.6542 9.30541 15.5229 9.24215 16.3907L9.23581 16.4776C7.57301 15.3039 6.11599 13.8598 4.92625 12.2036L4.78038 12.0005L4.92625 11.7975C6.11599 10.1413 7.57301 8.69718 9.23581 7.52347L9.24215 7.61043C9.29861 8.38499 9.34011 9.16037 9.36665 9.93613C9.38047 10.3401 9.71198 10.6605 10.1162 10.6605L11.2406 10.6605C14.1615 10.6605 16.8492 12.2032 18.3291 14.6894Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="text-md text-gray-400 font-bold">124k</p>
              </div>

              <div className="flex flex-col justify-end cursor-pointer items-center pr-4">
                <div className="p-4 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                  <svg
                    className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 439.3 529.7"
                  >
                    <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
                  </svg>
                </div>
                <p className="text-md text-gray-400 font-bold">124k</p>
              </div>

              <div className="flex flex-col justify-end cursor-pointer items-center pr-4">
                <div className="p-4 w-12 h-12 bg-sky-500 mt-2 rounded-full flex justify-center items-center">
                  <svg
                    className="w-12 h-12 fill-white stroke-white dark:fill-black dark:stroke-black"
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
                          <path d="M60.7,10.8c-0.7,0.4-1.4,1.3-1.7,1.9c-0.4,0.8-0.5,33.9-0.5,112.2c0,124.6-0.3,113.4,3.5,117.7c2.4,2.7,4.3,3.5,8.2,3.5c5.1,0,4.9,0.1,32-26.6c13.7-13.5,25.2-24.7,25.4-24.7s11.7,11,25.6,24.5c27.8,26.9,27.5,26.7,32.9,26.7c1.6,0,3.5-0.2,4.2-0.5c2.2-0.8,4.9-3.7,6.2-6.5l1.2-2.7V124.9c0-73.4-0.1-111.5-0.5-112.1c-0.2-0.5-1-1.3-1.7-1.8l-1.3-1h-66.1C67.3,10,61.8,10.1,60.7,10.8z M187.8,127.7v107.9l-1.2,0.6c-1.1,0.5-1.4,0.3-5.3-3.5c-2.2-2.1-14.7-14.3-27.7-26.9c-25.3-24.5-25.2-24.4-28.1-22.9c-0.7,0.3-13,12.3-27.5,26.5c-14.5,14.2-26.7,26.2-27.1,26.5c-0.6,0.5-1,0.5-1.7,0.1l-1-0.5V127.7V19.8H128h59.8V127.7z" />
                        </g>
                      </g>
                    </g>
                  </svg>{" "}
                </div>
                <p className="text-md text-gray-400 font-bold">124k</p>
              </div>
            </div>
          </div>
          {/* comment right  */}

          <div className="absolute left-0 bottom-14">
            <div className="flex gap-4">
              <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
              <div>
                <h1 className="text-md font-bold text-white">
                  Harmony Waves
                </h1>
                <p className="text-sm text-white">
                  Omg, the dress is so pretty😍
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
              <div>
                <h1 className="text-md font-bold text-white">
                  Harmony Waves
                </h1>
                <p className="text-sm text-white">
                  Omg, the dress is so pretty😍
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className="w-9 h-9 rounded-full" alt="" />
              <div>
                <h1 className="text-md font-bold text-white">
                  Harmony Waves
                </h1>
                <p className="text-sm text-white">
                  Omg, the dress is so pretty😍
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <h1 className="text-md font-bold text-white">More Comments</h1>
              <svg
                className="w-4 h-4 fill-white stroke-white"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
              >
                <path
                  id="XMLID_222_"
                  d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
  C255,161.018,253.42,157.202,250.606,154.389z"
                />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 flex justify-between items-center">
            <div className="relative flex items-center">
              <input
                type="text"
                className="block w-[100vw] sm:w-[38vw] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="start typing here"
                name=""
                id=""
              />
              <div className="absolute right-0 rounded-full p-2 bg-sky-400">
                <svg
                  className="w-7 h-7 z-40 fill-white cursor-pointer"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill-rule="nonzero">
                    <path d="m3.45559904 3.48107721 3.26013002 7.74280879c.20897233.4963093.20897233 1.0559187 0 1.552228l-3.26013002 7.7428088 18.83130296-8.5189228zm-.74951511-1.43663117 20.99999997 9.49999996c.3918881.1772827.3918881.7338253 0 .911108l-20.99999997 9.5c-.41424571.1873968-.8433362-.2305504-.66690162-.6495825l3.75491137-8.9179145c.10448617-.2481546.10448617-.5279594 0-.776114l-3.75491137-8.9179145c-.17643458-.41903214.25265591-.83697933.66690162-.64958246z" />
                    <path d="m6 12.5v-1h16.5v1z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* post modal  */}
    <div
      className={`${
        postModal ? "flex" : "hidden"
      } fixed top-0 left-0 bg-black sm:px-[36.6%] md:px[45%] w-full h-full justify-center items-center`}
    >
      <div className={`w-full h-full  bg-white`}>
      <div className="flex justify-between items-center p-2">
         <div></div>
          {/* cancel or close  */}
          <svg
            onClick={hidePostModal}
            className="w-3 h-3 fill-black z-40 mr-2 cursor-pointer"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 492 492"
          >
            <g>
              <g>
                <path
                  d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"
                />
              </g>
            </g>
          </svg>
        </div>

        <textarea  name="" id="" className="bg-white flex-none w-full h-[90vh] text-xs border border-black" placeholder="make a post"></textarea>

        <div className="flex justify-between items-center p-2">
          <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
            <div className="flex cursor-pointer items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M35.8,25.1c-2.4,0.6-6.2,2.9-7.6,4.6c-3.1,3.8-3.4,4.9-3.5,15.1l-0.2,9.4h103.4h103.4l-0.3-2.1c-0.6-4.6-4-9.1-8.4-11.3l-2.3-1.2l-53.5-0.1l-53.6-0.1l-0.3-2.2c-0.4-2.4-1.9-5.8-3.6-7.8c-0.6-0.7-2.4-2.1-4.1-3l-2.9-1.6l-32.5-0.1C51.8,24.8,36.6,24.9,35.8,25.1z" />
                      <path
                        fill="#000000"
                        d="M20.3,69.6c-5.9,2.1-9.6,6.5-10.3,12.2c-0.2,1.4,2.4,26.7,7.3,70.5c8.4,75.5,7.7,70.7,11.6,74.6c1,1,2.9,2.4,4.1,3l2.3,1.2l91.5,0.1c82.9,0.1,91.7,0,93.8-0.6c4.8-1.5,8.3-5,9.6-9.7c0.4-1.2,4.1-33,8.2-70.5L246,82l-0.8-2.5c-1.6-4.9-4.9-8.3-9.6-9.9C233.6,69,224,69,127.7,69C41.9,69,21.7,69.1,20.3,69.6z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                File
              </p>
            </div>

            <div className="flex cursor-pointer pl-2 items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M127.5,21.6c-16.7,4.8-50,14.4-73.9,21.3S10.1,55.4,10,55.5c-0.1,0.1,8.4,29.7,18.7,65.7c10.4,36.1,20,69.6,21.3,74.3c1.4,4.8,2.5,8.7,2.6,8.8c0,0.1,148.5-42.4,148.9-42.7c0.3-0.2-42.7-149-43.1-148.9C158.2,12.8,144.3,16.8,127.5,21.6z M149.2,31.4c0.1,0.5,3.9,13.5,8.3,28.9c4.4,15.4,9.8,34,11.9,41.2c2.1,7.3,3.7,13.4,3.6,13.5c-0.1,0.1-4-3.4-8.5-8c-8.9-8.7-10.8-10-12.5-8.6c-0.5,0.4-1.3,1.9-1.7,3.1c-1.2,3.5-3.2,5-7.4,5.6c-2.3,0.3-2.6,0.5-3.4,2.1c-0.5,1-1.7,4.8-2.7,8.5c-1.8,7-3.7,11.6-6.8,16.4c-1,1.5-1.5,2.7-1.4,2.7c0.2,0,10.8-3,23.7-6.7l23.3-6.7l1.2,4c0.7,2.1,1.3,4.3,1.4,4.9c0.1,0.9-5,2.4-59.7,18.2c-32.9,9.5-60.1,17.2-60.5,17.3c-0.6,0-3-7.1-3-8.8c0-0.5,0.8-1,2.6-1.5c42.2-12.1,60.3-17.3,61.5-17.7c1.2-0.4,2.2-1.5,4.9-5.7c4.6-7.1,5.7-9.5,7.4-15.9l1.4-5.5l-2.3-2c-1.3-1.1-7.9-7.4-14.6-14.2c-12.9-12.8-15.9-15.2-18.8-15.2c-2.3,0-3.1,1-4.7,5.2c-2.4,6.6-5.2,8.9-12.2,9.9c-3.5,0.5-4.1,0.7-5.1,2c-1.4,1.9-2.6,5.4-4.8,14.3c-2.4,9.5-4.3,15.1-6.8,19.9c-2,3.9-8.4,14.3-10.2,16.6c-0.9,1.1-1.2,0-13-41.3c-6.7-23.3-12.1-42.4-12-42.5c0.1-0.1,120-34.8,120.7-34.9C148.8,30.6,149.1,31,149.2,31.4z" />
                      <path
                        fill="#000000"
                        d="M49.6,69.5c-9.1,4.5-9.2,17.3,0,21.9c6.6,3.4,15-0.3,17.1-7.5C69.7,73.7,59.1,64.8,49.6,69.5z"
                      />
                      <path
                        fill="#000000"
                        d="M179.9,50.7c0,0.2,0.9,3.5,2.1,7.4l2,7l10,0.7c5.5,0.4,10.1,0.8,10.2,1c0.1,0.1-0.7,12.6-1.8,27.8l-2,27.5l5.6,19.4c3.1,10.7,5.7,19.5,5.8,19.5c0.3,0,8.3-107.3,8-107.6c-0.1-0.2-36.4-3-38.7-3C180.4,50.4,179.9,50.5,179.9,50.7z"
                      />
                      <path
                        fill="#000000"
                        d="M225.9,104.6c-0.4,5.8-0.4,7.9,0,8.1c0.4,0.3,0.4,0.7-0.1,1.5c-0.4,0.7-1.1,7.4-1.9,18.5c-0.7,9.6-1.3,17.4-1.2,17.5c0,0,5.4-9.6,11.8-21.4c6.4-11.9,11.6-21.6,11.5-21.7c-0.3-0.2-19.2-10.4-19.4-10.4C226.5,96.7,226.2,100.3,225.9,104.6z"
                      />
                      <path
                        fill="#000000"
                        d="M157.6,184.3c-29.7,8.5-53.9,15.6-53.8,15.7c0.2,0.3,104.4,7.8,104.6,7.6c0.1-0.1,0.9-8.3,1.6-18.1c1-13.2,1.5-18.2,2.1-19.3c0.6-1.1,0.6-1.5,0.1-1.4C211.8,168.8,187.3,175.8,157.6,184.3z"
                      />
                      <path
                        fill="#000000"
                        d="M111.4,210.4c0.8,0.8,61.1,33.1,61.2,32.8c0-0.2,3.4-6.4,7.3-13.7l7.2-13.3l-1.8-0.3c-1-0.2-17-1.5-35.6-2.8c-18.6-1.4-34.9-2.6-36.2-2.7C112.2,210.3,111.2,210.3,111.4,210.4z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                image
              </p>
            </div>

            <div className="flex cursor-pointer pl-2 items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                      <path d="M118.7,10.5c-10.3,1.1-20.5,4.1-30,8.9c-17.8,9-30.7,22-39.7,39.7c-13.6,27-12.3,59.7,3.5,85.3c4.2,6.7,70.3,99.7,71.7,100.6c1.8,1.3,6.2,1.3,8,0c1.4-1,68.7-95.7,72.3-101.7c5.4-8.9,9-19.1,11.2-30.9c1.1-6.1,1.1-21.5,0-27.7c-1.8-10.2-3.9-16.5-8.4-25.6c-6.7-13.6-15.6-24-28.4-33.1c-5.4-3.9-16.6-9.5-23-11.6C144.2,10.6,130.8,9.2,118.7,10.5z M134.3,69.7c10.9,2.3,20.4,11.7,22.6,22.6c4.3,20.9-14.1,39.4-35.1,35.1c-8.3-1.7-16.3-7.9-20-15.6c-5.8-11.7-3.7-24.9,5.5-34C114.5,70.6,124.3,67.6,134.3,69.7z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                Location
              </p>
            </div>

            <div className="flex cursor-pointer pl-2 items-center">
              <svg
                className="w-3 h-3 fill-black dark:fill-white"
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
                    <path
                      fill="#000000"
                      d="M128,10C62.9,10,10,63,10,128c0,65.1,52.9,118,118,118c65.1,0,118-52.9,118-118C246,63,193.1,10,128,10z M228.6,128c0,23-7.8,44.2-20.9,61.2c-3.7-2.9-7.6-10.7-3.9-18.7c3.7-8.1,4.7-26.9,3.8-34.2c-0.8-7.3-4.6-24.9-14.9-25.1c-10.3-0.1-17.4-3.6-23.5-15.8c-12.7-25.4,23.8-30.3,11.1-44.4c-3.6-3.9-21.9,16.3-24.6-10.7c-0.2-1.9,1.7-4.8,4.1-7.8C199.8,46,228.6,83.7,228.6,128z M114.2,28.4c-2.4,4.7-8.8,6.6-12.6,10.1c-8.4,7.6-12,6.6-16.5,13.8c-4.6,7.3-19.3,17.8-19.3,23.1s7.4,11.5,11.1,10.3c3.7-1.2,13.5-1.2,19.3,0.9c5.8,2,48.1,4.1,34.6,39.9c-4.3,11.4-23,9.5-28,28.3c-0.7,2.8-3.3,14.6-3.5,18.4c-0.3,6,4.2,28.5-1.5,28.5s-21.4-20.2-21.4-23.8s-4-16.4-4-27.4c0-11-18.7-10.8-18.7-25.3c0-13.1,10.1-19.7,7.9-26c-2.2-6.3-20-6.5-27.4-7.2C47,58.4,77.5,33.5,114.2,28.4z M96.3,223.5c6-3.2,6.7-7.3,12.1-7.5c6.3-0.3,11.4-2.5,18.4-4c6.3-1.4,17.5-7.7,27.4-8.5c8.3-0.7,24.8,0.4,29.2,8.5c-15.9,10.6-35,16.7-55.5,16.7C116.9,228.6,106.3,226.8,96.3,223.5z"
                    />
                  </g>
                </g>
              </svg>
              <p className="text-xs text-black dark-text-white font-semibold">
                Public
              </p>
            </div>
          </div>

          <button className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
            Send
          </button>
        </div>

        </div>

    

        

        </div>
            </>
        ) : 
        showfollowers ? (
            <>
             {/* followers  */}

        <div className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
          <h1 className='text-black dark-text-white font-bold text-md'>Suggestions</h1>
          {/* people */}

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Chioma Ada</h1>
              <p className='text-xs text-gray-600'>@chiada</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 7.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Ade Yomi</h1>
              <p className='text-xs text-gray-600'>@adeyomi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 6.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Tola Femi</h1>
              <p className='text-xs text-gray-600'>@_tolafemi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Tom Figi</h1>
              <p className='text-xs text-gray-600'>@tomfigi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>
      </div>
            </>
        ) :
        showfollowing ? (
            <>
             {/* following  */}

      <div className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
          <h1 className='text-black dark-text-white font-bold text-md'>Suggestions</h1>
          {/* people */}

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Chioma Ada</h1>
              <p className='text-xs text-gray-600'>@chiada</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 7.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Ade Yomi</h1>
              <p className='text-xs text-gray-600'>@adeyomi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 6.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Tola Femi</h1>
              <p className='text-xs text-gray-600'>@_tolafemi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          <div className='flex justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
            <div>
              <h1 className='text-sm text-black dark:text-white font-semibold'>Tom Figi</h1>
              <p className='text-xs text-gray-600'>@tomfigi</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>
      </div>
            </>
        ) : 
        (
            <></>
         )
    }

       

     

  </div>
  )
}

export default ProfileMiddle
