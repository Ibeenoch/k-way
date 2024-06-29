import { HeartIcon } from '@heroicons/react/24/outline';
import NavBar from '../mobilenav/NavBar';
import { useAppSelector } from '../../../hooks';
import { selectUser } from '../auth/authSlice';
import momemt from 'moment';
import { formatCreatedAt } from '../../../../utils/timeformat';
import { ReactComponent as ReplyLogo } from '../../../../assets/replyLogo.svg'
import { ReactComponent as CommentLogo } from '../../../../assets/comment.svg'
import { ReactComponent as BookmarkLogo } from '../../../../assets/bookmark.svg'
import { ReactComponent as FollowerLogo } from '../../../../assets/follower.svg'
import { ReactComponent as ReshareLogo } from '../../../../assets/retweet.svg'

const NotificationMain = () => {
  const { notification } = useAppSelector(selectUser);

  if(notification){
    console.log('my notication ', notification);
  }
  return (
    <div className='p-4'>

      <h2 className='text-black font-bold border-b border-gray-300'>Notifications </h2>
      {/* feeds  */}
      
      {
        notification && notification.length > 0 && Array.isArray(notification) && notification.map((note: any) => (

      <div key={note._id} className='flex justify-between p-4 border-b border-gray-300'>
      <div className='flex gap-4 pb-2 w-full'>
        <div>
        <img src={note && note.sender && note.sender.profilePhoto && note.sender.profilePhoto.url} className='w-8 h-8 rounded-full' alt="" />
        </div>

        <div className='flex flex-col'>
        {
            note && note.message && note.message.includes('liked') ? (
              <>
               <HeartIcon fill='red' stroke='red' className='w-5 h-5' />
              </>
            )
             : note && note.message && note.message.includes('bookmark') ? (
              <>
              <BookmarkLogo fill='purple' stroke='white' className='w-5 h-5'/>
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
             : (
              <>
              <ReplyLogo  fill='purple' className='w-5 h-5'/>
              </>
             )
       
        }
       
          <p className='text-sm flex-none text-black dark:text-white'><strong>{note && note.sender && note.sender.fullname} &nbsp;</strong>
          {
            note && note.message && note.message.includes('liked') ? 'liked'
             : note && note.message && note.message.includes('bookmark') ? 'bookmark'
             : note && note.message && note.message.includes('reshared') ? 'reshared'
             : note && note.message && note.message.includes('commented') ? 'commented on'
             : 'replied'
       
        } your post</p>
          <p className='text-xs flex-none text-gray-500'>{formatCreatedAt(note && note.createdAt)}</p>
          <p className='text-xs flex-none text-gray-500'>{note && note.message}</p>
        </div>
      </div>

        <div>
        <></>
        </div>
      </div>
      ))
      }
      <NavBar />
    </div>
  )
}

export default NotificationMain
