import { HeartIcon } from '@heroicons/react/24/outline';
import NavBar from '../mobilenav/NavBar';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getOtherUser, selectUser } from '../auth/authSlice';
import momemt from 'moment';
import { formatCreatedAt } from '../../../../utils/timeformat';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg'
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg'
import { ReactComponent as BookmarkLogo } from '../../../../assets/bookmark.svg'
import { ReactComponent as FollowerLogo } from '../../../../assets/follower.svg'
import { ReactComponent as ReshareLogo } from '../../../../assets/retweet.svg'
import { useNavigate } from 'react-router-dom';

const NotificationMain = () => {
  const { notifications } = useAppSelector(selectUser);
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if(notifications){
    console.log('my notication ', notifications);
  }
  const myId = getUser && getUser._doc && getUser._doc._id;
  const viewUser = (userId: string) => {
    dispatch(getOtherUser(userId)).then((res) => {
      if(res && res.payload !== undefined){
        const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
        navigate(`/profile/${myId}`);
      }
    })
  };
  return (
    <div className='p-4'>

      <h2 className='text-black font-bold border-b border-gray-300'>Notifications </h2>
      {/* feeds  */}
      
      {
        notifications && notifications.length > 0 && Array.isArray(notifications) && notifications.map((note: any) => (
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
          
              <p className='text-sm flex-none text-black dark:text-white'><strong>{note && note.sender && note.sender.fullname} &nbsp;</strong>
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
      ))
      }
      <NavBar />
    </div>
  )
}

export default NotificationMain
