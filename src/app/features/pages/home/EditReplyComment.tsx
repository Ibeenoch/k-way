import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { editComment, selectPost } from './PostSlice';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { selectUser } from '../auth/authSlice';



const EditReplyComment = () => {
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [commentErr, setCommentErr] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const { repliedcomments } = useAppSelector(selectPost);
    const { mode } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { commentId } = useParams();
   

    const handleCommentSubmit = () => {
        setIsCommenting(true);
        if(comment === ''){
          setIsCommenting(false);
          setCommentErr('No comment has been added, please add a comment');
          setTimeout(() => { setCommentErr('');}, 5000);
          return;
        }
          const token = getUser && getUser.token;
      
          const comments = {
            commentId,
            token,
            comment
          }
      
        dispatch(editComment(comments)).then((res: any) => {
          if(res && res.payload && res.payload.content){
            navigate(-1)
            setIsCommenting(false);
          }
        })
      }

      const populateComment = () => {
        const findComment = repliedcomments.find((c: any) => c._id.toString() === commentId );
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
        <div  className={`sm:mx-[30%] p-1 ${ mode === 'light' ? 'bg-white text-black fill-black' : 'bg-gray-800 text-white fill-white'} h-auto p-3`}>
            <div className='flex items-center gap-3 pb-4'>
                <ArrowLeftIcon onClick={goBack} className='w-4 h-4 cursor-pointer' />
            <h2 className='text-xs font-semibold'>Edit Your comment</h2>
            </div>
        <div className="flex items-center max-h-[30px] p-2 rounded-xl">
                <img
                src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
                className="block w-6 h-6 rounded-full"
                alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
                />
                <input
                type="text"
                onChange={(e) => (setComment(e.target.value))}
                value={comment}
                className={`block text-xs w-[700px] h-[30px] ${ mode === 'light' ? 'bg-gray-100' : 'bg-gray-600'} border-0`}
                placeholder="Comment on this"
                name=""
                id=""
                />
               
            </div>
            <p className="text-red-600 text-[8px]">{commentErr}</p>

            
            <div className="flex justify-between items-center p-2">
                <div className="flex gap-4 sm:max-w-xs sm:gap-0 sm:flex-wrap">
                
                </div>

            

                <button onClick={() => handleCommentSubmit()} className={`text-sm ${ mode === 'light' ? 'bg-black' : 'bg-gray-900'} text-white font-semibold rounded-2xl px-3 py-1 mt-2 transform-transition duration-100 hover:scale-110`}>
                {
                isCommenting ? (
                    <>
               <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-sm'> Editing...</p></div> 
               </>
                ) : (
                    'Edit'
                )
                }  
                </button>
            </div>
        </div>
    </div>
  )
}

export default EditReplyComment
