import { HeartIcon } from '@heroicons/react/24/outline';
import NavBar from '../mobilenav/NavBar';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIfNoteIsLoading, getAllNotificationForAUser, getOtherUser, markAllNotificationForAUser, selectUser } from '../auth/authSlice';
import { formatCreatedAt } from '../../../../utils/timeformat';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg'
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg'
import { ReactComponent as BookmarkLogo } from '../../../../assets/bookmark.svg'
import { ReactComponent as FollowerLogo } from '../../../../assets/follower.svg'
import { ReactComponent as ReshareLogo } from '../../../../assets/retweet.svg'
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/arrowBack.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotificationMain = () => {
  const { notifications, notification, isNotificationLoading, mode } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const myId = getUser && getUser._doc && getUser._doc._id;
  const viewUser = (userId: string) => {
    dispatch(getOtherUser(userId)).then((res) => {
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
      }
    })
  };

  useEffect(() => {
    dispatch(checkIfNoteIsLoading(false))
    const postId = notification && notification.post;
    const userId = getUser && getUser._doc && getUser._doc._id;
    const token = getUser && getUser.token;
    const note = { userId, token, postId };

    dispatch(getAllNotificationForAUser(note)).then((res: any) => {
      if(res && res.payload !== undefined){
        dispatch(markAllNotificationForAUser(note))
      }
    })

  }, []);

  const goBack = () => {
    navigate(-1);
  };
 

  return (
  <div>
    <div className={`p-4 ${ notifications && Array.isArray(notifications) && notifications.length > 6 ? 'h-min' :  'h-screen' } sm:mt-2 sm:rounded-tl-xl sm:rounded-tr-xl ${mode === 'light' ? 'bg-white text-black fill=black' : 'bg-black text-white fill-white'} sm:rounded-tl-3xl sm:rounded-tr-3xl`}>
    <div onClick={goBack} className='flex items-center py-4 gap-3 cursor-pointer'>
        <ArrowLeftIcon className='w-5 h-5 stroke-[3px] cursor-pointer' />
        <h2 className='text-sm font-semibold'>Go Back</h2>
      </div>

      <h2 className='font-bold border-b border-gray-300'>Notifications </h2>
      {/* feeds  */}
      
      {
        notifications && notifications.length > 0 && Array.isArray(notifications) ? notifications.map((note: any) => (
        <>
          {
            note && note.sender && note.sender && note.sender._id !== myId && (
              
              <div key={note._id} className='flex justify-between p-4 border-b border-gray-300'>
            <div className='flex gap-4 pb-2 w-full'>
              <div>
            <img onClick={() => viewUser(note && note.sender && note.sender._id)} src={note && note.sender && note.sender.profilePhoto && note.sender.profilePhoto.url} className='w-8 h-8 rounded-full cursor-pointer' alt="" />
            </div>

            <div className='flex flex-col'>
            {
                note && note.message && note.message.includes('liked') ? (
                  <>
                  <HeartIcon fill='purple' stroke='purple' className='w-5 h-5' />
                  </>
                )
                : note && note.message && note.message.includes('bookmark') ? (
                  <>
                  <BookmarkLogo fill='purple' stroke='purple' className='w-5 h-5 fill-purple-600'/>
                  </>
                )
                : note && note.message && note.message.includes('reshared') ? (
                  <>
                  <ReshareLogo fill='purple' className='w-5 h-5' />
                  </>
                )
                : note && note.message && note.message.includes('commented') ? (
                  <>
                  <CommentLogo fill='purple' className='w-5 h-5'/>
                  </>
                )
                : note && note.message && note.message.includes('followed') ? (
                  <>
                  <FollowerLogo fill='purple' className='w-5 h-5'/>
                  </>
                )
                : (
                  <>
                  <ReplyLogo  fill='purple' className='w-5 h-5'/>
                  </>
                )
          
            }
          
              <p className='text-sm flex-none'><strong>{note && note.sender && note.sender.fullname} &nbsp;</strong>
              {
                note && note.message && note.message.includes('liked') ? 'liked your post'
                : note && note.message && note.message.includes('bookmark') ? 'bookmark your post'
                : note && note.message && note.message.includes('reshared') ? 'reshared your post'
                : note && note.message && note.message.includes('commented') ? 'commented on your post'
                : note && note.message && note.message.includes('followed') ? 'followed you'
                : 'replied'
          
            }</p>
              <p className='text-xs flex-none text-gray-500'>{formatCreatedAt(note && note.createdAt)}</p>
              <p className='text-xs flex-none text-gray-500'>{note && note.message}</p>
            </div>
          </div>

            <div>
            <></>
            </div>
              </div>
            
            )
          }
      </>
      )) : (
        <>
        <div className={`flex h-screen justify-center items-center ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'} `}>
        <p className='text-xs font-semibold'>You have no Notifications yet</p>
        </div>
        </>
      )
      }
      <NavBar />
    </div>
    </div>
  )
}

export default NotificationMain
