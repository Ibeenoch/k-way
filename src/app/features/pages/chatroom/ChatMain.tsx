import { useAppDispatch, useAppSelector } from '../../../hooks'
import { addChat, fetchChat, getAllUser, getOtherUser, markreadChatBtwTwoUsers, selectUser } from '../auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { ReactComponent as BackArrowLogo } from '../../../../assets/arrowBack.svg';
import { formatCreatedAt } from '../../../../utils/timeformat';
import '../../pages/home/home.css'
import { socket } from '../../../..';

const ChatMain = () => {
const dispatch = useAppDispatch();
const navigate = useNavigate();
const getUser = JSON.parse(localStorage.getItem('user') as any);
const [isCommenting, setIsCommenting] = useState<boolean>(false);
const [comment, setComment] = useState<string>("");
const [commentErr, setCommentErr] = useState<string>("");
const { userId, myId, chatId } = useParams();
const { chat, users, mode } = useAppSelector(selectUser);
const others = users && Array.isArray(users) && users.find((u: any) => u._id === userId );

useEffect(() => {
if(getUser === null){
  navigate('/login');
}
}, [])

useEffect(() => {
  dispatch(getAllUser())
}, [])
console.log(comment);

const viewPersonProfile = (id: string) => {
  dispatch(getOtherUser(id)).then((res: any) => {
    if(res && res.payload !== undefined){
      const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
      navigate(`/profile/${myId}`);
      window.scrollTo(0, 0);
    }
  })
}

const handleChatSubmit = () => {
  const message = { message: comment, chatId, sender: myId, receiver: userId };
  socket.emit('sendMessage', message);
  setComment('');
  
}

useEffect(() => {
  const token = getUser && getUser.token;
  const data = { chatId, token };
  dispatch(markreadChatBtwTwoUsers(data))
}, []);

useEffect(() => {
  socket.emit('joinChat', chatId);
  const token = getUser && getUser.token;
  const data = { token, chatId };
 
  socket.on('receivedMessage', (newMessage) => {
    dispatch(addChat(newMessage));
    dispatch(fetchChat(data)).then((res: any) => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    })
  });

 return () => {
   socket.off('receivedMessage');
} 

}, [userId, dispatch]);

const handleGoBack = () => {
  navigate(-1);
}

  return (
    <div className='sticky sm:mt-5 sm:px-2 sm:rounded-tl-3xl sm:rounded-tr-3xl overflow-y-auto hide-scrollbar'>
      <div className={`${ mode === 'light' ? 'bg-white text-black fill-black' : 'bg-gray-800 text-white fill-white'} ${chat && Array.isArray(chat) && chat.length > 11 ? 'h-min' : 'h-screen' }`}>

  <div onClick={handleGoBack} className={`flex justify-start gap-3 py-4 pl-2 cursor-pointer`} >
            <BackArrowLogo  className='w-4 h-4 stroke-[3px] cursor-pointer' />
          <h2 className='text-xs font-medium'>Back</h2>
          </div>
        
      <div className='pb-4 pl-4 pr-4'>
        <div className='flex justify-between pb-2 border-b border-gray-400 items-center'>
          <div className='flex gap-1 items-center'>
            <img src={others && others.profilePhoto && others.profilePhoto.url} className='w-7 h-7 rounded-full' alt="" />
            <h1 className='font-semibold pr-2'>{others && others.fullname}</h1>
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </div>

          <div></div>
        </div>
      <div className='pb-10'>
        {
          chat && Array.isArray(chat) && chat.map((message) => (

      <div key={message && message._id} className=''>
            <div className='flex justify-center text-[8px] items-center'> <div className='border-b border-gray-200 w-[40%] border-opacity-10'></div> {formatCreatedAt(message && message.createdAt)} <div className='border-b w-[40%]  border-opacity-10 border-gray-200'></div> </div>
            {
              message && message.sender && message.sender._id === myId ? (
              <div className='flex gap-1 items-center mb-[1px]'>


            <img src={ message && message.sender && message.sender.profilePhoto && message.sender.profilePhoto.url } className='w-7 h-7 rounded-full' alt="person" />
            <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg flex-none bg-gray-500'>
              <p className='text-[14px] sm:max-w-xs max-w-[180px]'>{message && message.message}</p>
              <p className='text-[8px]'>{formatCreatedAt(message && message.createdAt)}</p>
            </div>
            </div>  
              ) : (
                <div className='flex justify-between mb-[1px]'>
          <div></div>

        <div className='flex items-center gap-1'>
        <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg flex-none bg-gray-400'>
          <p className='text-[14px] sm:max-w-xs max-w-[180px]'>{message && message.message}</p>
          <p className='text-[8px]'>{formatCreatedAt(message && message.createdAt)}</p>
        </div>

        <img  src={ message && message.sender && message.sender.profilePhoto && message.sender.profilePhoto.url  } className='w-7 h-7 rounded-full' alt="person" />
        
        </div>
        </div>

              )
            }
          


      </div>
        ))
        }
      </div>
        
        <div className="fixed w-[100%] sm:w-[42%] bottom-0 left-0 sm:left-auto pt-2 border border-gray-400 rounded-xl">
              <div className="flex items-center max-h-[38px] p-2 mb-1 rounded-xl">
              <img 
                onClick={() => viewPersonProfile(getUser._doc._id)}
                src={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url }
                className="w-7 h-7 rounded-full cursor-pointer"
                alt={getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.public_id }
              />
    
              <input
                type="text"
                onChange={(e) => (setComment(e.target.value))}
                value={comment}
                className={`block text-xs w-full h-[30px] ${ mode === 'light' ? 'bg-white text-black' : 'bg-transparent text-white'} p-3 border-0 focus:ring-0 focus:ring-inset focus:ring-none`}
                placeholder="type a chat message"
                name="chat"
                id="chat"
              />
              
              <button onClick={handleChatSubmit} className="text-[9px] font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
              {
                isCommenting ? (
                  <>
                <div className='flex items-center'><ProcessingLogo className="w-5 h-5" /> <p className='text-[9px] text-white'> Posting...</p></div> 
                </>
                ) : (
                  <SendLogo className="w-6 h-6" />
                )
              }  
              </button>
            
            </div>
            <p className="text-red-600 text-[8px]">{commentErr}</p>
          </div>
      </div>
      </div>
    </div>
  )
}

export default ChatMain
