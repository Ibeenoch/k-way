import React, { useEffect, useRef, useState } from 'react'
import { allCommentForAPost, commentOnPost, selectPost } from './PostSlice';

import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ThreeDotVerticalLogo } from '../../../../assets/threeDotVerticalLogo.svg';
import { ReactComponent as BackArrowLogo } from '../../../../assets/arrowBack.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ImgLazyLoad from '../lazyLoad/ImgLazyLoad';
import EmojiPicker from 'emoji-picker-react';
import { HeartIcon } from '@heroicons/react/24/outline';

const ReplyComment = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
  const [desktopCommentMenu, setDesktopCommentMenu] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [commemtClicked, setCommentClicked] = useState<string>('');
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [mobileCommentModal, setMobileCommentModal] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [commentErr, setCommentErr] = useState<string>("");
  const { posts, comments } = useAppSelector(selectPost);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const [content, setcontent] = useState<string>("");

  const { id } = useParams();


 

const handleCommentSubmit = (postId: string) => {
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
    }

  dispatch(commentOnPost(comments)).then((res: any) => {
    console.log('comment ', res);
    setIsCommenting(false);
  })
}



const getAPost = async() => {

}

const handleReplyComent = async (commentId: string) => {
  const userId = getUser._doc._id;
  navigate(`/reply/comment/${commentId}/${userId}`)
}


const fetchAllPosts = async() => {

}

useEffect(() => {
  fetchAllPosts()
}, []);



  const showComment = async(postId: string) => {
    const getAllComments = await dispatch(allCommentForAPost(postId)).then((res: any) => {
      console.log('res ', res);
      setCommentModal(true);
      setMobileCommentModal(true);

    })
    
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


  const onEmojiClick = (emojiObject: any) => {
    console.log("events emoji ", emojiObject);
    setcontent((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };




  const showCommentMenuBar = (id: string) => {
    setCommentClicked(id);
    setDesktopCommentMenu(true);
  };

  const closeCommentMenu = () => {
    setDesktopCommentMenu(false);
  };

const handleGoBack = () => {
  navigate(-1);
}


  return (
    <div className='bg-black min-h-screen'>
      
        {/* desktop comment modal  */}
       <div className='sm:mx-[30%] bg-white h-screen p-3'>
        <div className='flex gap-3'>
          <BackArrowLogo onClick={handleGoBack} className='w-4 h-4 cursor-pointer' />
        <h2 className='text-xs font-medium text-black'>Reply to stephen's Comment</h2>
        </div>
        <div className="p-4 bg-white">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img src={`${process.env.PUBLIC_URL}/images/ladies 7.png`} className="w-7 h-7 rounded-full" alt="" />
                <div className="flex flex-col space-y-1">
                  <div>

                 <div className="flex gap-1 items-center"> 
                  <p className="text-xs font-medium text-black">Daniel Histho  </p>
                 <p className="text-gray-400 text-[9px]">12:32</p> 
                  </div>
                  <p className="text-[9px] text-gray-600">@dan </p>
                  </div>
                  <p className="text-[10px] text-black dark:text-white">this is my reply</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon className="w-[14px] h-[14px]" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500 dark:text-white">25k</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                      <CommentLogo className="w-[12px] h-[12px] fill-gray-600 stroke-gray-600"/>
                 
                  <p className="text-xs text-gray-500 dark:text-white">54k</p>
                    </div>
                      
                   </div>

                   <div  className="cursor-pointer">
                    <p className="text-gray-400 text-sm pt-1 flex">See Reply &#40;<span>9</span>&#41; </p>
                   </div>
                </div>
              </div>

              <div className="relative">
                 {/* three dot icon vertical */}
                 <ThreeDotVerticalLogo  className="w-5 relative h-5 fill-black stroke-black dark:fill-white cursor-pointer dark:stroke-white"/>
              
                
                {/* desktop comment menu  */}
              <div
                ref={desktopCommentMenuRef}
                id="desktopCommentMenu"
                className={`hidden ${
                  desktopCommentMenu  ? "sm:block" : "sm:hidden"
                } absolute shadow-xl w-[150px] top-0 shadow-purple-80 z-10 -right-3 rounded-3xl mx-auto bg-white  h-auto p-5`}
              >
                <div className="flex justify-end">
                  <CancelLogo onClick={closeCommentMenu} className="w-3 h-3 cursor-pointer"/>
                </div>

                     <div className="flex gap-2 group cursor-pointer items-center pl-1">
                  <EditLogo className="stroke-black w-3 h-3 group-hover:stroke-purple-600"/>
                  <p className="text-black text-[10px] group-hover:text-purple-600">Edit Comment</p>
                </div>

                <div className="flex gap-2 group items-center pt-4  cursor-pointer">
                 <TrashLogo className="fill-black stroke-black w-5 h-5 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-black text-[10px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div  className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-black text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                 
                     <div className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-black text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>
                
              </div>

              </div>
              </div>
            </div>

       </div>
    </div>
  )
}

export default ReplyComment;
