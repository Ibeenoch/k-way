import  { useEffect, useRef, useState } from 'react'
import { deleteRepliedComment, getAllRepliesForComment, likeReplyComment, replyComment, selectPost } from './PostSlice';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
import { ReactComponent as CancelLogo } from '../../../../assets/cancelLogo.svg';
import { ReactComponent as EditLogo } from '../../../../assets/editLogo.svg';
import { ReactComponent as TrashLogo } from '../../../../assets/trashLogo.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as ThreeDotVerticalLogo } from '../../../../assets/threeDotVerticalLogo.svg';
import { ReactComponent as BackArrowLogo } from '../../../../assets/arrowBack.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { HeartIcon } from '@heroicons/react/24/outline';
import { addNotification, getAllUser, getOtherUser, selectUser,  } from '../auth/authSlice'
import { socket } from '../../../..';

const ReplyComment = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
  const [desktopCommentMenu, setDesktopCommentMenu] = useState<boolean>(false);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [findReply, setFindReply] = useState<boolean>(false);
  const [commentErr, setCommentErr] = useState<string>("");
  const { post, comments, repliedcomments } = useAppSelector(selectPost);
  const { mode } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const [commentClicked, setCommentClicked] = useState<string>("");
  const mobileCommentMenuRef = useRef<HTMLDivElement>(null);
  const [commentmenu, setCommentMenu] = useState<boolean>(false);


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
      token,
      comment,
      commentId
    }

  dispatch(replyComment(comments)).then((res: any) => {
   
    if(res && res.payload !== undefined){
      console.log('comment replied ', res);
      setIsCommenting(false);
      setComment('');
      setFindReply(false); 
    }
  })
}


const handleReplyComent = async (commentId: string) => {
  setFindReply(true);
  const userId = getUser._doc._id;
  navigate(`/reply/comment/${commentId}`)
}


const fetchAllRepliesForTheComment = () => {
 dispatch(getAllRepliesForComment(commentId)).then((res: any) => {
  console.log('replies  ', res);
  if(res && res.payload !== undefined){
    setFindReply(false);
  }
 })
}

const handleLike = (commentId: string) => {
  const token = getUser && getUser.token;
  const likes = { token, commentId };

  dispatch(likeReplyComment(likes)).then((res: any) => {
    console.log('liked reply comment', res)
    if(res && res.payload !== undefined){
      setFindReply(true);
    }
  })
}

useEffect(() => {
  fetchAllRepliesForTheComment();
}, [findReply]);

const viewPersonProfile = (id: string) => {
  dispatch(getOtherUser(id)).then((res: any) => {
    if(res && res.payload !== undefined){
      const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
      navigate(`/profile/${myId}`);
      window.scrollTo(0, 0);
    }
  })
}

useEffect(() => {
  const handlecommentReplied = (data: any) => {
    console.log('data commentReplied post ', data);
    dispatch(addNotification(data));
  };

  socket.on('commentReplied', handlecommentReplied);

  return () => {
    socket.off('commentReplied', handlecommentReplied);
  };
}, [socket]);

  const showCommentMenuBar = (id: string) => {
    setCommentClicked(id);
    setDesktopCommentMenu(true);
    setCommentMenu(true);
  };

  const closeCommentMenu = () => {
    setDesktopCommentMenu(false);
  };

  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => {
      document.body.classList.remove('bg-black')
    }
  }, [])

const handleGoBack = () => {
  navigate(-1);
  setFindReply(true);
}

const handleEditIcon = (commentId: string, postId: string) => {
  navigate(`/edit/${commentId}`);
}

const getConfirmation = (theCommentId: string) => {
  const acceptTodelete = window.confirm('Are you sure you want to trash this comment? this action cannot be undo!!!');
  if(acceptTodelete){
      const token = getUser && getUser.token;
      const repliedId = theCommentId;
      const comments = {
          commentId,  token, repliedId
      }
      dispatch(deleteRepliedComment(comments)).then((res: any) => {
          console.log('deleted comment ', res)
      })
  }
}

  return (
    <div className='sticky overflow-y-auto'>
      
        {/* desktop comment modal  */}
       <div className={`sm:mx-[30%] ${ mode === 'light' ? 'bg-white' : 'bg-black fill-white text-white'} h-screen p-3`}>
        
        <div onClick={handleGoBack} className='flex gap-3'>
          <BackArrowLogo className='w-4 h-4 cursor-pointer' />
          <h2 className='text-xs font-medium cursor-pointer'>Back</h2>
        </div>
        <h2 className='text-xs text-center font-medium cursor-pointer'>Reply Comment</h2>
        <div className={`fixed max-w-[100%] sm:max-w-[38%]  ${mode === 'light' ? 'bg-white' : 'bg-gray-800'} bottom-0 pt-2 border border-gray-400 rounded-xl`} >
            <div className={`flex ${mode === 'light' ? 'bg-white' : 'bg-gray-800'} items-center max-h-[30px] p-2 mb-1 rounded-xl`}>
            <div onClick={() => viewPersonProfile(getUser._doc._id)}>
            <img
              src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
              className="block w-7 h-7 rounded-full cursor-pointer"
              alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
            />
            </div>
            <input
              type="text"
              onChange={(e) => (setComment(e.target.value))}
              value={comment}
              className={`block text-xs w-[300px] h-[30px] p-3 ${mode === 'light' ? 'bg-white' : 'bg-gray-800'}  border-0 focus:ring-0 focus:ring-inset focus:ring-none`}
              placeholder="Reply this post"
              name="reply"
              id="reply"
            />
            
            <button onClick={handleCommentSubmit} className={`text-[9px] text-white ${ mode === 'light' ? 'bg-black' : 'bg-gray-900'} font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-105`}>
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
        
            {/* view other people comments  */}

            {
              repliedcomments && repliedcomments.length > 0 && Array.isArray(repliedcomments) ? (
                repliedcomments.map((comment) => (
            <div className={`border-b border-gray-300 ${mode === 'light' ? 'bg-white fill-black text-black' : 'bg-black fill-white text-white'}`}>
            <div className="p-4">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img onClick={() => viewPersonProfile(comment.owner._id)} src={comment && comment.owner.profilePhoto && comment.owner.profilePhoto.url} className="w-7 h-7 rounded-full cursor-pointer" alt="" />
                <div className="flex flex-col space-y-1">
                  <div>

                 <div className="flex gap-1 items-center"> 
                  <p className="text-xs font-medium">{comment && comment.owner && comment.owner.fullname}  </p>
                 <p className="text-gray-400 text-[9px]">{formatCreatedAt(comment && comment.createdAt)}</p> 
                  </div>
                  <p className="text-[9px] text-gray-500">@{comment && comment.owner && comment.owner.handle} </p>
                  </div>
                  <p className={`text-[10px] ${ mode=== 'light' ? 'text-black' : 'text-white'} `}>{comment && comment.content}</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon onClick={() => handleLike(comment._id)} className="w-[14px] h-[14px] cursor-pointer" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500">{comment && comment.likes && comment.likes.length}</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                      <CommentLogo  onClick={() => handleReplyComent(comment._id)} className="w-[12px] h-[12px] fill-gray-500 stroke-gray-500 cursor-pointer"/>
                 
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
                 <ThreeDotVerticalLogo onClick={() =>showCommentMenuBar(comment._id)} className={`w-5 relative h-5 ${ mode === 'light' ? 'fill-black stroke-black' : 'fill-white stroke-white'} cursor-pointer`}/>
              
                
                {/* desktop comment menu  */}
              <div
                ref={desktopCommentMenuRef}
                id="desktopCommentMenu"
                className={`hidden ${
                  desktopCommentMenu && comment._id === commentClicked ? "sm:block" : "sm:hidden"
                } absolute shadow-xl w-[150px] top-0 shadow-purple-80 z-10 -right-3 rounded-3xl mx-auto ${mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'} h-auto p-5`}
              >
                <div className="flex justify-end">
                  <CancelLogo onClick={closeCommentMenu} className="w-3 h-3 cursor-pointer"/>
                </div>
                {
                  comment && comment.owner && comment.owner._id === getUser._doc._id ? (
                    <>
                     <div onClick={() =>handleEditIcon(comment._id, post._id)} className="flex gap-2 group cursor-pointer items-center pl-1">
                  <EditLogo className="w-3 h-3 group-hover:stroke-purple-600"/>
                  <p className="text-[10px] group-hover:text-purple-600">Edit Comment</p>
                </div>

                <div onClick={() =>getConfirmation(comment._id)} className="flex gap-2 group items-center pt-4  cursor-pointer">
                 <TrashLogo className="w-5 h-5 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-[10px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                    </>
                  ) : (
                    <>
                     <div className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>
                    </>
                  )
                }
               
              </div>

                 {/* mobile menu  */}
                 <div
                ref={mobileCommentMenuRef}
                id="mobilecommentmenu"
                className={`fixed ${
                  commentmenu && comment._id === commentClicked ? "block" : "hidden"
                } bottom-0 left-0 ${ mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-gray-800 text-white fill-white stroke-white'} pt-10 pl-5 pr-5 pb-5 z-40 w-full h-[40%] rounded-tl-3xl rounded-tr-3xl sm:hidden`}
              >
                {
                  comment && comment.owner && comment.owner._id === getUser._doc._id ? (
                    <>
                     <div onClick={() =>handleEditIcon(comment._id, post._id)} className="flex gap-3 group cursor-pointer items-center pl-1">
                  <EditLogo className="w-5 h-5 group-hover:stroke-purple-600"/>
                  <p className="text-[17px] group-hover:text-purple-600 pt-1">Edit Comment</p>
                </div>

                <div onClick={() =>getConfirmation(comment._id)} className="flex gap-1 group items-center pt-3  cursor-pointer">
                 <TrashLogo className="w-8 h-8 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-[17px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div onClick={() => handleReplyComent(comment._id)} className="flex gap-1 group items-center cursor-pointer pt-3">
                  <ReplyLogo className="w-8 h-8  group-hover:stroke-purple-600" />
                  <p className="text-[17px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                    </>
                  ) : (
                    <>
                     <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 group items-center cursor-pointer pt-1">
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
                <> <p className={`text-gray-600 text-center pb-4 text-[10px] ${mode === 'light' ? 'bg-white' : 'bg-black'} pt-4 px-2`}>No comment has been added</p></>
              )
            }

       </div>
    </div>
  )
}

export default ReplyComment;
