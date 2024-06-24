
import ImgLazyLoad from "../lazyLoad/ImgLazyLoad";
import { ReactComponent as GlobalTrendLogo } from '../../../../assets/globeTrend.svg';
import { ReactComponent as LikeLogo } from '../../../../assets/like.svg';
import { ReactComponent as VerifyMarkLogo } from '../../../../assets/verifyChecker.svg';
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg';
import { ReactComponent as RetweetLogo } from '../../../../assets/retweet.svg';
import { ReactComponent as BookMarkLogo } from '../../../../assets/bookmark.svg';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg';
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
import { ReactComponent as ArrowDownLogo } from '../../../../assets/arrowDownLogo.svg';
import { ReactComponent as PlusLogo } from '../../../../assets/plusLogo.svg';
import { ReactComponent as ThreeDotVerticalLogo } from '../../../../assets/threeDotVerticalLogo.svg';
import { formatCreatedAt } from "../../../../utils/timeformat";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { allCommentForAPost, bookmarkPost, commentOnPost, deleteComment, deletePost, getAllRepliesForComment, likeComment, likePost, rePost, selectPost } from "../home/PostSlice";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { HeartIcon } from "@heroicons/react/24/outline";


const SinglePost = () => {
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const [desktopMenu, setDesktopMenu] = useState<boolean>(false);
    const [postClicked, setPostClicked] = useState<string>("");
    const [content, setcontent] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [postModal, setPostModal] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
    const [commentErr, setCommentErr] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [commentModal, setCommentModal] = useState<boolean>(false);
    const [isCommenting, setIsCommenting] = useState<boolean>(false);
    const [mobileCommentModal, setMobileCommentModal] = useState<boolean>(false);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [commemtClicked, setCommentClicked] = useState<string>('');
    const [desktopCommentMenu, setDesktopCommentMenu] = useState<boolean>(false);
    const desktopCommentMenuRef = useRef<HTMLDivElement>(null);
    const [postId, setPostId] = useState<string>('');
    const [personalPost, setPersonalPost] = useState<any>();
  const [displayImage, setDisplayImage] = useState<string>('');
  const [mobileModal, setMobileModal] = useState<boolean>(false);
  const [fullvideoScreen, setFullVideoScreen] = useState<boolean>(false);

    const { post, comments } = useAppSelector(selectPost);


    const hideComment = () => {
        setCommentModal(false)
      }
  
      const showFullScreen = () => {
        setFullVideoScreen(true);
      };

      const handleLike = async (postId: string) => {
        const token = getUser && getUser.token;
        const userId =  getUser && getUser._doc._id;
        const postLike = {
          token,
          userId,
          postId
        };
        dispatch(likePost(postLike)).then((res: any) => {
          console.log('res ', res)
        })
      };

        
        const showPostModal = () => {
            setPostModal(true);
        
        };

        const showCommentMenuBar = (id: string) => {
            setCommentClicked(id);
            setDesktopCommentMenu(true);
          };
        

        const onEmojiClick = (emojiObject: any) => {
            console.log("events emoji ", emojiObject);
            setcontent((prev) => prev + emojiObject.emoji);
            setShowEmojiPicker(false);
          };
        

        const handleEditPost = (id: string) => {
            setcontent(post.content);
            navigate(`/${post._id}`)
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

  const handleCommentLike = (commentId: string) => {
    const token = getUser && getUser.token;
    const likes = { token, commentId };
    dispatch(likeComment(likes)).then((res: any) => {
      console.log('liked the comment', res)
    })
  }

  const handleReShare = async (postId: string) => {
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

    })
    
  }

  
const handleBookmark = async (postId: string) => {
    const token = getUser && getUser.token;
    const userId =  getUser && getUser._doc._id;
    const postBooked = {
      token,
      userId,
      postId
    };
    dispatch(bookmarkPost(postBooked)).then((res: any) => {
      console.log('res ', res)
    })
  };
  

  const handleEditIcon = (commentId: string, postId: string) => {
    navigate(`/edit/${postId}/${commentId}`);
  }


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
      };    
  
    dispatch(commentOnPost(comments)).then((res: any) => {
      console.log('comment ', res);
      setIsCommenting(false);
    })
  }

  const closeCommentMenu = () => {
    setDesktopCommentMenu(false);
  };

  const showMobileModal = (img: any, id: any) => {

    setDisplayImage(img);
    setMobileModal(true);
  };

  const getConfirmation = (commentId: string) => {
    const acceptTodelete = window.confirm('Are you sure you want to trash this comment? this action cannot be undo!!!');
    if(acceptTodelete){
        const token = getUser && getUser.token;
        const comments = {
            commentId, id, token
        }
        dispatch(deleteComment(comments)).then((res: any) => {
            console.log('deleted comment ', res)
        })
    }
  }

  return (
    <div className="bg-black h-full">
    <div className="sm:mx-[25%]">
         <div  className="rounded-full p-3 max-w-full bg-white dark-bg-gray-700 border border-gray-400 rounded-lg">

        <div className="flex items-center gap-2 w-full">
          <ImgLazyLoad className="w-8 h-8 rounded-full cursor-pointer" src={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.url} alt={post && post.owner && post.owner.profilePhoto && post.owner.profilePhoto.public_id} />
          <div className="w-full flex items-center justify-between gap-1">
            <div className="flex items-center">
              <div className="mt-3">
                <h1 className="text-black dark:text-white text-sm font-semibold">
                  {post && post.owner && post.owner.fullname}
                </h1>
              <p className="text-gray text-[8px]"> {post && formatCreatedAt(post.createdAt)} </p>
              </div>
              <VerifyMarkLogo className="w-5 h-5 fill-purple-500 stroke-white"/>
           
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
                  } absolute shadow-xl shadow-purple-80 z-10 top-0 -right-[10px] w-[150px] h-auto rounded-3xl mx-auto bg-white  p-2`}
                >
                   <>
                    <div onClick={() =>handleEditPost(post._id)} className="flex gap-2 px-2 cursor-pointer items-center pt-4">
                      <EditLogo  className="stroke-black w-3 h-3"/>
                      <p className="text-black text-[10px]">Edit Post</p>
                    </div>
                    <div onClick={() =>handleDeletePost(post._id)} className="flex gap-2 cursor-pointer items-center pt-4">
                      <TrashLogo className="fill-black stroke-black w-5 h-5"/>
                      <p className="text-black text-[10px]">Delete Post</p>
                    </div>
                     
                       <div className="flex gap-2 cursor-pointer items-center pt-4">
                    <AddContactLogo  className="fill-black stroke-black w-3 h-3"/>
                    <p className="text-black text-[10px]">Follow @texilola😎</p>
                  </div>

                  <div className="flex gap-2 items-center pt-4  cursor-pointer">
                    <BlockContactLogo  className="fill-black stroke-black w-3 h-3"/>
                    <p className="text-black text-[10px]">Block @texilola😎</p>
                  </div>

                  <div className="flex gap-2 items-center cursor-pointer pt-4">
                    <ReportContactLogo  className="fill-black stroke-black w-3 h-3"/>
                    <p className="text-black text-[10px]">Report Post</p>
                  </div>

                  <div className="flex gap-2 cursor-pointer items-center pt-4">
                    <MuteContactLogo   className="fill-black stroke-black w-3 h-3"/>
                    <p className="text-black text-[10px]">Mute @texilola😎</p>
                  </div>
                      </>
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
            <p className="text-[8px] text-gray-600"> {post.likes.length}</p>

            <div className="p-[5px] bg-green-600 rounded-full">
              <RetweetLogo  className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>
            <p className="text-[8px] text-gray-600">{post.reShare.length}</p>

            <div className="p-[5px] bg-sky-600 rounded-full">
              <BookMarkLogo className="w-[12px] h-[12px] fill-white stroke-white"/>
            </div>

            <p className="text-[8px] text-gray-600">{post.bookmark.length}</p>
          </div>

          <p className="text-[10px] mt-3 text-gray-600">45 Comments</p>
        </div>
        {/* icons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center pl-9 sm:gap-1 mt-4">
            <div  onClick={() =>handleLike(post._id)} className="bg-black mr-1 cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <LikeLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                Like
              </p>
            </div>

            <div onClick={() =>handleReShare(post._id)} className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <RetweetLogo  className="w-[13px] h-[13px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                ReShare
              </p>
            </div>

            <div onClick={() => showComment(post._id)} className="bg-black mr-1  cursor-pointer sm:mx-0 flex items-center py-1 px-3 rounded-lg">
              <CommentLogo  className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
              <p className="text-white dark:text-black text-[10px] pl-1">
                Comment
              </p>
            </div>

            <div></div>
            <div></div>
          </div>

          <div  onClick={() =>handleBookmark(post._id)} className="bg-black cursor-pointer flex items-center sm:gap-1 p-2 mr-4 sm:mr-0 mt-4 rounded-lg">
            <BookMarkLogo   className="w-[12px] h-[12px] fill-white stroke-white dark:fill-black dark:stroke-black"/>
          </div>
        </div> 

        
          </div>

        
      
        <div className="fixed max-w-[100%] sm:max-w-[50%] bottom-0 border border-gray-400 rounded-xl">
            <div className="flex bg-gray-100 items-center max-h-[30px] p-2 mb-1 rounded-xl">
            <ImgLazyLoad
              src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
              className="block w-7 h-7 rounded-full"
              alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
            />
            <input
              type="text"
              onChange={(e) => (setComment(e.target.value))}
              value={comment}
              className="block text-xs w-[700px] h-[30px] p-3 bg-gray-100 border-0 focus:ring-0 focus:ring-inset focus:ring-none"
              placeholder="Comment on this post"
              name=""
              id=""
            />
            
            <button onClick={() => handleCommentSubmit(post._id)} className="text-[9px] text-white bg-black font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
            {
              isCommenting ? (
                <>
               <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-[9px] text-white'> Commenting...</p></div> 
               </>
              ) : (
                'Comment'
              )
            }  
            </button>
          
          </div>
          <p className="text-red-600 text-[8px]">{commentErr}</p>
        </div>

            {/* view other people comments  */}

            {
              comments && comments.length > 0 && Array.isArray(comments) ? (
                comments.map((comment) => (
            <div className="border-b border-gray-300 bg-white">
            <div className="p-4">
              <div className="flex justify-between">
              <div className="flex space-x-2">
                <img src={comment && comment.owner.profilePhoto && comment.owner.profilePhoto.url} className="w-7 h-7 rounded-full" alt="" />
                <div className="flex flex-col space-y-1">
                  <div>

                 <div className="flex gap-1 items-center"> 
                  <p className="text-xs font-medium text-black">{comment && comment.owner && comment.owner.fullname}  </p>
                 <p className="text-gray-400 text-[9px]">{formatCreatedAt(comment && comment.createdAt)}</p> 
                  </div>
                  <p className="text-[9px] text-gray-600">@{comment && comment.owner && comment.owner.handle} </p>
                  </div>
                  <p className="text-[10px] text-black dark:text-white">{comment && comment.content}</p>
                   <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                    {/* heart icon  */}
                    <HeartIcon onClick={() => handleCommentLike(comment._id)} className="w-[14px] h-[14px] cursor-pointer" fill="red" stroke="red" />
                      <p className="text-xs text-gray-500 dark:text-white">{comment && comment.likes && comment.likes.length}</p>
                    </div>
                    <div className="flex items-center">
                      {/* comment icon  */}
                      <CommentLogo className="w-[12px] h-[12px] fill-gray-600 stroke-gray-600 cursor-pointer"/>
                 
                  <p className="text-xs text-gray-500 dark:text-white">{comment && comment.replies && comment.replies.length}</p>
                    </div>
                      
                   </div>

                   <div onClick={() => handleReplyComent(comment._id)} className="cursor-pointer">
                    <p className="text-gray-400 text-sm pt-1 flex">See Reply &#40;<span>9</span>&#41; </p>
                   </div>
                </div>
              </div>

              <div className="relative">
                 {/* three dot icon vertical */}
                 <ThreeDotVerticalLogo onClick={() =>showCommentMenuBar(comment._id)} className="w-5 relative h-5 fill-black stroke-black dark:fill-white cursor-pointer dark:stroke-white"/>
              
                
                {/* desktop comment menu  */}
              <div
                ref={desktopCommentMenuRef}
                id="desktopCommentMenu"
                className={`hidden ${
                  desktopCommentMenu && comment._id === commemtClicked ? "sm:block" : "sm:hidden"
                } absolute shadow-xl w-[150px] top-0 shadow-purple-80 z-10 -right-3 rounded-3xl mx-auto bg-white  h-auto p-5`}
              >
                <div className="flex justify-end">
                  <CancelLogo onClick={closeCommentMenu} className="w-3 h-3 cursor-pointer"/>
                </div>
                {
                  comment && comment.owner && comment.owner._id === getUser._doc._id ? (
                    <>
                     <div onClick={() =>handleEditIcon(comment._id, post._id)} className="flex gap-2 group cursor-pointer items-center pl-1">
                  <EditLogo className="stroke-black w-3 h-3 group-hover:stroke-purple-600"/>
                  <p className="text-black text-[10px] group-hover:text-purple-600">Edit Comment</p>
                </div>

                <div onClick={() =>getConfirmation(comment._id)} className="flex gap-2 group items-center pt-4  cursor-pointer">
                 <TrashLogo className="fill-black stroke-black w-5 h-5 group-hover:stroke-red-600 group-hover:fill-red-600"/>
                  <p className="text-black text-[10px] group-hover:text-red-600">Delete Comment</p>
                </div>

                <div onClick={() => handleReplyComent(comment._id)} className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-black text-[10px] group-hover:text-purple-600">Reply Comment</p>
                </div>

                    </>
                  ) : (
                    <>
                     <div className="flex gap-2 group items-center cursor-pointer pt-4">
                  <ReplyLogo className="w-5 h-5  group-hover:stroke-purple-600" />
                  <p className="text-black text-[10px] group-hover:text-purple-600">Reply Comment</p>
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
                <> <p className="text-gray-600 text-[10px] bg-white pt-4 px-2">No comment has been added</p></>
              )
            }

      
    </div>
    </div>
  )
}

export default SinglePost
