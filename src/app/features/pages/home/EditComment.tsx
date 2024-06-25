import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { commentOnPost, editComment, selectPost } from './PostSlice';
import ImgLazyLoad from '../lazyLoad/ImgLazyLoad';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';



const EditComment = () => {
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [commentErr, setCommentErr] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [content, setcontent] = useState<string>("");
    const { comments, } = useAppSelector(selectPost)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { commentId, postId } = useParams();
    if(comments){
        console.log(comments, typeof commentId)
    }

    const handleCommentSubmit = () => {
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
            commentId,
            token,
            comment
          }
      
        dispatch(editComment(comments)).then((res: any) => {
          console.log('comment ', res.payload.content);
          if(res && res.payload && res.payload.content){
            navigate(-1)
            setIsCommenting(false);
          }
        })
      }

      const onEmojiClick = (emojiObject: any) => {
        console.log("events emoji ", emojiObject);
        setcontent((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
      };
      const populateComment = () => {
        const findComment = comments.find((c: any) => c._id.toString() === commentId );
        console.log(findComment);
        setComment(findComment.content);
      }

      useEffect(() => {
        populateComment()
      }, [])
    
      const goBack = () => {
        navigate(-1);
      };

  return (
    <div className='bg-black h-screen'>
        <div  className='sm:mx-[30%] p-1 bg-white h-auto p-3'>
            <div className='flex items-center gap-3'>
                <ArrowLeftIcon onClick={goBack} className='w-4 h-4 cursor-pointer' />
            <h2 className='text-xs font-semibold text-black'>Edit Your comment</h2>
            </div>
        <div className="flex bg-gray-100 items-center max-h-[30px] p-2 rounded-xl">
                <ImgLazyLoad
                src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
                className="block w-6 h-6 rounded-full"
                alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
                />
                <input
                type="text"
                onChange={(e) => (setComment(e.target.value))}
                value={comment}
                className="block text-xs w-[700px] h-[30px] bg-gray-100 border-0"
                placeholder="Comment on this"
                name=""
                id=""
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
            <p className="text-red-600 text-[8px]">{commentErr}</p>

            
            <div className="flex justify-between items-center p-2">
                <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
                
                </div>

            

                <button onClick={() => handleCommentSubmit()} className="text-[9px] text-white dark-text-black bg-black dark:bg-white font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
                {
                isCommenting ? (
                    <>
               <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-[9px] text-white'> Editing...</p></div> 
               </>
                ) : (
                    'Comment'
                )
                }  
                </button>
            </div>
        </div>
    </div>
  )
}

export default EditComment
