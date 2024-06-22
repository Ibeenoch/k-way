import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import pics from "../../../../images/images-74.jpeg";
import { PlusIcon, HeartIcon,  } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectUser } from "../auth/authSlice";
import { createPost, deletePost, getAllPosts, selectPost, updatePost } from "./PostSlice";
import { timeStamp } from "console";
import toast, { Toast } from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import ImgLazyLoad from "../lazyLoad/ImgLazyLoad";
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as LikeLogo } from '../../../../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../../../../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../../../../assets/bookmark.svg';
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

const Middle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [mobileCommentModal, setMobileCommentModal] = useState<boolean>(false);
  const [postClicked, setPostClicked] = useState<string>("");
  const [content, setcontent] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>('public');
  const [displayImage, setDisplayImage] = useState<string>('');

  const { profile } = useAppSelector(selectUser);
  const { posts } = useAppSelector(selectPost);

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
  const [postId, setPostId] = useState<string>('');
  const [personalPost, setPersonalPost] = useState<any>();
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const { id } = useParams();

  const handleFileClick = () => {
    if(fileRef && fileRef.current){
       fileRef.current?.click();
    }
  }

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
console.log(fileInput);
  const handleImageClick = () => {
    if(imageRef && imageRef.current){
       imageRef.current?.click() 
    }
  }

  // convert timeStamp 
  const getConvertedTime = (time: any) => {
    const now = moment();
    const then = moment(time);
    const diff = now.diff(then, 'seconds');


    switch(true){
      case (diff < 60):
      return `${diff} sec ago`;
      case (diff < 3600):
        const minutes = Math.floor(diff / 60);
      return `${minutes} min ago`;
      case (diff < 86400):
        const hour = Math.floor(diff / 3600);
      return `${hour} hrs ago`;
      case (diff < 604800):
        const day = Math.floor(diff / 86400);
      return `${day} days ago`;
      case (diff < 2592000):
        const week = Math.floor(diff / 604800);
      return `${week} weeks ago`;
      case (diff < 31536000):
        const month = Math.floor(diff / 2592000);
      return `${month} months ago`;
      default:
        const years = Math.floor(diff / 31536000);
        return `${years} years ago`;
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
console.log(fileInput, imageInput, fileInput.length, imageInput.length);


 const getPrivacy = (e: ChangeEvent<HTMLSelectElement>) => {
  setPrivacy(e.target.value)

 }




const handlePostSubmit = async() => {
  setIsPosting(true);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
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
     }

    })
  }
}else{

  const post = {
    postData, 
    token
  };

  if(post){
    dispatch(createPost(post)).then((res: any) => {
      console.log('posted   ', res)
      if(res.payload !== undefined){
         dispatch(getAllPosts()).then((res: any) => {
          setIsPosting(false);
          hidePostModal();
          navigate('/');
      });
      }
     
    })
  }
}
}

const getAPost = async() => {

}

const fetchAllPosts = async() => {

}

useEffect(() => {
  fetchAllPosts()
}, []);

useEffect(() => {
  getAPost()
}, [postId]);

  const videoUrl = `${process.env.PUBLIC_URL}/video.mp4`;

  const showComment = () => {
    setCommentModal(true);
    setMobileCommentModal(true);
  }

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
      let mobile = document.getElementById("mobilemenu");
      if (!mobile) {
        setMenu(false);
      }
    }
    if (
      desktopMenuRef.current &&
      !desktopMenuRef.current.contains(e.target as Node)
    ) {
      let desktop = document.getElementById("desktopmenu");
      if (!desktop) {
        setDesktopMenu(false);
      }
    }
  };

  const hideMobileModal = () => {
    setMobileModal(false);
  };

  const showMobileModal = (img: any, id: any) => {
    const post = posts.find((item: any) => item._id === id );
    setPersonalPost(post)
    console.log('type of is ' ,typeof id, post)

    setDisplayImage(img);
    setMobileModal(true);
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

  const handleEditPost = (id: string) => {
    const findPost = posts.find((p: any) => p._id === id);
    setcontent(findPost.content);
    navigate(`/${findPost._id}`)
    showPostModal()
  };

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
  return (
    <div className="mt-10 max-w-md sm:max-w-full">
      <h1 className="text-md font-bold text-black dark:text-white pl-4">
        Stories
      </h1>
      {/* stories */}
      <div className="my-4">
        <div className="flex max-w-full overflow-x-auto">
          {/* add a story  */}
          <div className="relative inline-block mx-1 flex-none">
            <img
              className="w-20 h-20 border-2 opacity-80 border-purple-500 rounded-full cursor-pointer"
              src={`${process.env.PUBLIC_URL}/images/images-73.jpeg`}
              alt=""
            />
            <PlusIcon
              width="20"
              height="20"
              className="absolute inset-0 m-auto fill-white stroke-white"
              strokeWidth="1"
            >
              {" "}
            </PlusIcon>
            <p className="text-[10px] text-black dark:text-white text-center">
              Your story
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
              src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className="hidden sm:block sm:w-6 sm:h-6 sm:rounded-full"
              alt=""
            />
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

     

      {/* feeds */}
        {

          posts && Array.isArray(posts) && posts.map((post: any, index: number) => (       
      <div key={index} className="rounded-full my-1 p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">
        <div className="flex items-center gap-2 w-full">
          <ImgLazyLoad className="w-8 h-8 rounded-full cursor-pointer" key={index} src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex items-center">
              <div className="mt-3">
                <h1 className="text-black dark:text-white text-sm font-semibold">
                  {post && post.owner && post.owner.fullname}
                </h1>
              <p className="text-gray text-[8px]"> {post && post.createdAt && getConvertedTime(getUser.createdAt)} </p>
              </div>
              <VerifyMarkLogo className="w-5 h-5 fill-blue-500 stroke-white"/>
           
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
                  } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[200px] h-auto rounded-3xl mx-auto bg-white  p-2`}
                >
                  {
                    post && post.owner && post.owner._id === getUser._doc._id ? (
                      <>
                    <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
                      <EditLogo  className="stroke-black w-4 h-4"/>
                      <p className="text-black text-md">Edit Post</p>
                    </div>
                    <div onClick={() =>handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
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
              </div>
            </div>
          </div>
        </div>
        {/* post text  */}
        <div className="ml-9">
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
                    post && post.owner && post.owner._id === getUser._doc._id ? (
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
        {/* post images  */}

        { post && post.photos && post.photos.length > 0 ? (
        <div className="mt-2 pl-9">
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
            <p className="text-[8px] text-gray-600">441k</p>

            <div className="p-[5px] bg-green-600 rounded-full">
              <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-600">731k</p>

            <div className="p-[5px] bg-sky-600 rounded-full">
              <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>

            <p className="text-[8px] text-gray-600">241k</p>
          </div>

          <p className="text-[10px] mt-3 text-gray-600">45 Comments</p>
        </div>
        {/* icons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center pl-9 sm:gap-1 mt-4">
            <div className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                Like
              </p>
            </div>

            <div className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                Retweet
              </p>
            </div>

            <div onClick={showComment} className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <CommentLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                Comment
              </p>
            </div>

            <div></div>
            <div></div>
          </div>

          <div className="bg-black flex items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg">
            <BookMarkLogo   className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
          </div>
        </div>
      </div>
        ))
      
      }
      
      

      {/* video view modal  */}

      <div
        className={`${
          fullvideoScreen ? "flex" : "hidden"
        } fixed top-0 left-0 bg-black  w-full h-full flex-cols justify-center items-center`}
      >
        <video
          className="w-full h-screen object-cover"
          
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
        } fixed top-0 left-0 bg-black w-full h-full justify-center items-center`}
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

          <div className='flex justify-between items-center z-9 my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={displayImage} alt="" />
            <div>
              <h1 className='text-sm text-white font-semibold'>{personalPost && personalPost.owner && personalPost.owner.fullname}</h1>
              <p className='text-xs text-gray-300'>@{personalPost && personalPost.owner && personalPost.owner.handle}</p>
            </div>
            </div>
            
            <button className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full border border-white text-white dark:text-black transform-transition duration-100 hover:scale-110'>Follow</button>
          </div>

          {/* image  */}
          <div className="fixed bottom-1/4 sm:left-1/4 lg:bottom-0">
            <img
              className=""
              src={displayImage}
              alt=""
            />

            {/* <div className="absolute right-0 bottom-14 flex justify-between pb-2 pt-[60%]">
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
            </div> */}
            {/* comment right  */}

            {/* <div className="absolute left-0 bottom-14">
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
            </div> */}

            <div className="fixed bottom-16 flex justify-between items-center">
            <div className="flex justify-between items-center">
          <div className="flex ml-9 mt-4 items-center">
            <div className="p-[5px] flex gap-1">
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
            <p className="text-[8px] text-white">441k</p>
            </div>

            <div className="p-[5px] flex gap-1">
              <svg
                className="w-[12px] h-[12px] fill-white stroke-white"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M924.72 578.4L816 685.68V347.728C816 254.944 743.648 176 650.864 176H341.984l78.56 80h230.32C699.456 256 736 299.12 736 347.728V685.28l-105.472-106.88-55.84 56.56 204 203.632 202.88-203.632-56.848-56.56zM362.848 752C314.272 752 272 716.32 272 667.712V330.048l108.464 107.04 57.28-56.576-203.296-203.632L30.976 380.512l55.216 56.576L192 329.968v337.76C192 760.48 270.08 832 362.848 832h308.96l-78.56-80h-230.4z" />
              </svg>
            <p className="text-[8px] text-white">731k</p>
            </div>

            <div className="p-[5px] flex gap-1">
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
            <p className="text-[8px] text-white">241k</p>
            </div>

          </div>

        </div>
            </div>

            {/* <div className="fixed bottom-16 flex justify-between items-center">
             <div className="relative flex items-center">
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
            </div> */}

             <input
                  type="text"
                  className="fixed bottom-0 bg-transparent w-[100vw] left-0 border-0 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="start typing here"
                  name=""
                  id=""
                /> 
          </div>
        </div>
      </div>

      {/* post form modal  */}
      <div
        className={`${
          postModal ? "flex" : "hidden"
        } fixed top-0 left-0 bg-black sm:px-[36.6%] md:px[45%] w-full h-full justify-center items-center`}
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
            className="bg-white flex-none w-full h-[80vh] text-xs border border-none"
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

            <button onClick={handlePostSubmit} className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
             {
              isPosting ? (
                <ProcessingLogo className="w-4 h-4 stroke-white" />
              ) : (
                'Send'
              )
             } 
            </button>
          </div>
        </div>
        
      </div>


         {/* mobile comment modal  */}
         <div
        className={`${
          mobileCommentModal ? "flex sm:hidden" : "hidden"
        } fixed top-[20%] left-0 bg-white rounded-3xl w-full h-full justify-center items-center`}
      >
        <div className={`w-full h-full bg-white p-4 rounded-3xl`}>
          <div className="flex justify-between items-center p-2">
            <div>
              <h1 className="font-semibold text-md text-black">23k Comment</h1>
            </div>
            {/* close comment */}
            <svg
              onClick={hideMobileComment}
              className="w-4 h-4 fill-black dark:white z-40 mr-2 cursor-pointer"
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

          <div className="flex bg-gray-100 items-center max-h-[30px] p-2 rounded-xl">
            <img
              src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className="block w-6 h-6 rounded-full"
              alt=""
            />
            <input
              type="text"
              onChange={handleInputchange}
              value={content}
              className="block text-xs w-[700px] h-[30px] bg-gray-100 border-0"
              placeholder="Share something"
              name=""
              id=""
              required
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-black cursor-pointer"
            >
              🙂
            </button>
            {showEmojiPicker && (
              <div className="absolute z-5">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

         
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
              
            </div>

           

            <button className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
              Send
            </button>
          </div>
            {/* view other people comments  */}
            <div className="p-4">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`} className="w-7 h-7 rounded-full" alt="" />
                <div className="flex flex-col space-y-1">
                  <p className="text-xs text-black dark:text-white">@takejack . 20min</p>
                  <p className="text-sm text-black dark:text-white">Her daughter is so smart!</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon className="w-[14px] h-[14px]" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500 dark:text-white">25k</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                  <svg
                  fill="gray"
                    className="w-[12px] h-[12px] fill-red stroke-red"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 439.3 529.7"
                  >
                    <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
                  </svg>
                  <p className="text-xs text-gray-500 dark:text-white">54k</p>
                    </div>
                      
                   </div>

                   <div className="">
                    <p className="text-gray-400 text-sm pt-1 flex">See Reply &#40;<span>9</span>&#41; </p>
                   </div>
                </div>
              </div>

              <div>
                 {/* three dot icon vertical */}
                 <svg  className="w-[12px] h-[12px] fill-black stroke-black dark:fill-white dark:stroke-white" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><g><g><path  d="M116,10.5c-45.8,4.7-85.3,36.4-99.9,79.9c-8.1,24.4-8.1,50.4,0,75.1c2.8,8.6,10.1,23.1,15.2,30.2c20.3,28.5,50.9,46.4,85.2,49.8c43.5,4.4,86.7-16.4,110.6-53.4c22.4-34.6,25.1-78.9,7-115.9c-11.6-23.5-29.6-41.8-53-53.6C160.4,12.4,138.3,8.2,116,10.5z M137.3,15.9c28.1,2.4,52.5,14,72,34.2c14.5,15.1,24.4,33.7,28.8,54.2c5.2,24.4,2.1,49.3-8.8,71.9c-15.2,31.7-43.4,53.7-78.4,61.3c-9.6,2-27.6,2.6-37.9,1.1c-47.6-6.9-84.5-41.7-94.6-89.1c-1.5-6.9-1.6-8.6-1.6-21.6c-0.1-15.4,0.5-19.4,3.8-31.3c9.8-35.1,37.3-63.7,72.3-75.4C107.9,16.3,122,14.6,137.3,15.9z"/><path fill="#000000" d="M122,48.5c-6.9,2-12.1,6.4-15.2,12.9c-1.7,3.5-1.9,4.4-1.9,9.9c0,5.5,0.2,6.4,1.9,10c7,14.9,26.5,18.2,37.9,6.5c4.4-4.5,6.2-8.8,6.5-15.2c0.3-6.2-0.7-10-4-14.8C141.9,50,131.2,46,122,48.5z M132.4,57.9c1.3,0.4,3.4,1.6,4.7,2.8c6.5,5.9,6.7,14.9,0.4,21c-8.6,8.3-23.3,2.1-23.4-10C113.9,61.8,122.8,55.2,132.4,57.9z"/><path fill="#000000" d="M121,105.4c-6.2,2-11.6,6.8-14.5,12.8c-1.4,3-1.6,4.1-1.6,9.7c0,5.9,0.1,6.6,1.9,10.3c2.3,4.8,6.7,9,11.5,11.2c3,1.4,4.1,1.6,9.7,1.6c5.9,0,6.6-0.1,10.3-1.9c4.8-2.3,9-6.7,11.2-11.5c1.4-3,1.6-4.1,1.6-9.7s-0.2-6.7-1.6-9.7c-2.2-4.8-6.4-9.1-11.2-11.4c-3.4-1.7-4.6-2-9.4-2.1C125.5,104.7,122.5,104.9,121,105.4z M134.6,115.6c3.5,1.7,6.3,5.5,7.2,9.5c2.2,9.7-7,18.8-16.6,16.6c-6.7-1.4-11.2-7.1-11.2-13.8C114,117.3,124.8,110.8,134.6,115.6z"/><path fill="#000000" d="M122,161.9c-10.1,2.8-16.7,11.2-17.3,21.6c-0.5,10.3,4.5,18.4,14.1,22.9c3,1.4,4.3,1.6,9.2,1.6c5.2,0,6.1-0.2,9.7-1.9c5-2.4,9.3-6.5,11.6-11.3c2.2-4.7,2.8-12.4,1.2-17.2C146.6,165.8,133.7,158.6,122,161.9z M132.8,171.5c11.8,4.1,12.2,20.9,0.8,26.1c-8.9,4.1-19.6-2.8-19.7-12.6C113.9,175,123.4,168.2,132.8,171.5z"/></g></g></g>
                </svg>
              </div>
              </div>
            </div>
            
        </div>
      </div>

         {/* desktop comment modal  */}
         <div
        className={`${
          commentModal ? "hidden sm:flex" : "hidden"
        } fixed top-0 left-0 bg-black sm:px-[30%] md:px[45%] w-full h-full justify-center items-center`}
      >
        <div className={`w-full h-full  bg-white`}>
          <div className="flex justify-between items-center p-2">
            <div>
              <h1 className="font-semibold text-md text-black">23k Comment</h1>
            </div>
            {/* close comment */}
            <svg
              onClick={hideComment}
              className="w-4 h-4 fill-black dark:white z-40 mr-2 cursor-pointer"
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

          <div className="flex bg-gray-100 items-center max-h-[30px] p-2 rounded-xl">
            <img
              src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`}
              className="block w-6 h-6 rounded-full"
              alt=""
            />
            <input
              type="text"
              onChange={handleInputchange}
              value={content}
              className="block text-xs w-[700px] h-[30px] bg-gray-100 border-0"
              placeholder="Share something"
              name=""
              id=""
              required
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-black cursor-pointer"
            >
              🙂
            </button>
            {showEmojiPicker && (
              <div className="absolute z-5">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

         
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
              
            </div>

           

            <button className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
              Send
            </button>
          </div>

            {/* view other people comments  */}
            <div className="p-4">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img src={`${process.env.PUBLIC_URL}/images/images-74.jpeg`} className="w-7 h-7 rounded-full" alt="" />
                <div className="flex flex-col space-y-1">
                  <p className="text-xs text-black dark:text-white">@takejack . 20min</p>
                  <p className="text-sm text-black dark:text-white">Her daughter is so smart!</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon className="w-[14px] h-[14px]" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500 dark:text-white">25k</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                  <svg
                  fill="gray"
                    className="w-[12px] h-[12px] fill-red stroke-red"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 439.3 529.7"
                  >
                    <path d="M0 529.7l108.9-117.1h330.4V0H.7L0 529.7zM338.7 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2s-37.2-16.6-37.2-37.2c.1-20.5 16.7-37.2 37.2-37.2zM220 173c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2.1-20.5 16.7-37.2 37.2-37.2zm-118.7 0c20.5 0 37.2 16.6 37.2 37.2 0 20.5-16.6 37.2-37.2 37.2-20.5 0-37.2-16.6-37.2-37.2 0-20.5 16.7-37.2 37.2-37.2z" />
                  </svg>
                  <p className="text-xs text-gray-500 dark:text-white">54k</p>
                    </div>
                      
                   </div>

                   <div className="">
                    <p className="text-gray-400 text-sm pt-1 flex">See Reply &#40;<span>9</span>&#41; </p>
                   </div>
                </div>
              </div>

              <div className="">
                 {/* three dot icon vertical */}
                 <svg  className="w-5 relative h-5 fill-black stroke-black dark:fill-white cursor-pointer dark:stroke-white" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><g><g><path  d="M116,10.5c-45.8,4.7-85.3,36.4-99.9,79.9c-8.1,24.4-8.1,50.4,0,75.1c2.8,8.6,10.1,23.1,15.2,30.2c20.3,28.5,50.9,46.4,85.2,49.8c43.5,4.4,86.7-16.4,110.6-53.4c22.4-34.6,25.1-78.9,7-115.9c-11.6-23.5-29.6-41.8-53-53.6C160.4,12.4,138.3,8.2,116,10.5z M137.3,15.9c28.1,2.4,52.5,14,72,34.2c14.5,15.1,24.4,33.7,28.8,54.2c5.2,24.4,2.1,49.3-8.8,71.9c-15.2,31.7-43.4,53.7-78.4,61.3c-9.6,2-27.6,2.6-37.9,1.1c-47.6-6.9-84.5-41.7-94.6-89.1c-1.5-6.9-1.6-8.6-1.6-21.6c-0.1-15.4,0.5-19.4,3.8-31.3c9.8-35.1,37.3-63.7,72.3-75.4C107.9,16.3,122,14.6,137.3,15.9z"/><path fill="#000000" d="M122,48.5c-6.9,2-12.1,6.4-15.2,12.9c-1.7,3.5-1.9,4.4-1.9,9.9c0,5.5,0.2,6.4,1.9,10c7,14.9,26.5,18.2,37.9,6.5c4.4-4.5,6.2-8.8,6.5-15.2c0.3-6.2-0.7-10-4-14.8C141.9,50,131.2,46,122,48.5z M132.4,57.9c1.3,0.4,3.4,1.6,4.7,2.8c6.5,5.9,6.7,14.9,0.4,21c-8.6,8.3-23.3,2.1-23.4-10C113.9,61.8,122.8,55.2,132.4,57.9z"/><path fill="#000000" d="M121,105.4c-6.2,2-11.6,6.8-14.5,12.8c-1.4,3-1.6,4.1-1.6,9.7c0,5.9,0.1,6.6,1.9,10.3c2.3,4.8,6.7,9,11.5,11.2c3,1.4,4.1,1.6,9.7,1.6c5.9,0,6.6-0.1,10.3-1.9c4.8-2.3,9-6.7,11.2-11.5c1.4-3,1.6-4.1,1.6-9.7s-0.2-6.7-1.6-9.7c-2.2-4.8-6.4-9.1-11.2-11.4c-3.4-1.7-4.6-2-9.4-2.1C125.5,104.7,122.5,104.9,121,105.4z M134.6,115.6c3.5,1.7,6.3,5.5,7.2,9.5c2.2,9.7-7,18.8-16.6,16.6c-6.7-1.4-11.2-7.1-11.2-13.8C114,117.3,124.8,110.8,134.6,115.6z"/><path fill="#000000" d="M122,161.9c-10.1,2.8-16.7,11.2-17.3,21.6c-0.5,10.3,4.5,18.4,14.1,22.9c3,1.4,4.3,1.6,9.2,1.6c5.2,0,6.1-0.2,9.7-1.9c5-2.4,9.3-6.5,11.6-11.3c2.2-4.7,2.8-12.4,1.2-17.2C146.6,165.8,133.7,158.6,122,161.9z M132.8,171.5c11.8,4.1,12.2,20.9,0.8,26.1c-8.9,4.1-19.6-2.8-19.7-12.6C113.9,175,123.4,168.2,132.8,171.5z"/></g></g></g>
                </svg>
                
                {/* desktop menu  */}
              <div
                ref={desktopMenuRef}
                id="desktopmenu"
                className={`hidden ${
                  !desktopMenu ? "sm:block" : "sm:hidden"
                } absolute shadow-xl shadow-purple-80 z-10 left-[50%] rounded-3xl mx-auto bg-white  h-1/3 p-5`}
              >
                <div className="flex gap-2 cursor-pointer items-center -pt-4">
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

        </div>

        
      </div>

    </div>
  );
};

export default Middle;
