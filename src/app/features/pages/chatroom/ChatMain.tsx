import { HeartIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { addChat, fetchChat, getAllUser, getOtherUser, markreadChatBtwTwoUsers, selectUser } from '../auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as SendLogo } from '../../../../assets/sendLogo.svg';
import { ReactComponent as BackArrowLogo } from '../../../../assets/arrowBack.svg';
import { Socket, io } from 'socket.io-client';
import { formatCreatedAt } from '../../../../utils/timeformat';

const ChatMain = () => {
const dispatch = useAppDispatch();
const navigate = useNavigate();
const socket: Socket = io('http://localhost:5800');
const getUser = JSON.parse(localStorage.getItem('user') as any);
const [isCommenting, setIsCommenting] = useState<boolean>(false);
const [comment, setComment] = useState<string>("");
const [commentErr, setCommentErr] = useState<string>("");
const { userId, myId, chatId } = useParams();
const { chat, users } = useAppSelector(selectUser);
const others = users && Array.isArray(users) && users.find((u: any) => u._id === userId );

if(others){
  console.log('the other ', others)
}
useEffect(() => {
if(getUser === null){
  navigate('/login');
}
}, [])

useEffect(() => {
  dispatch(getAllUser()).then((res: any) => {
    console.log('all are ', res)
  })
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
  console.log(message);
  setComment('');
  
}

useEffect(() => {
  const token = getUser && getUser.token;
  const data = { chatId, token };
  dispatch(markreadChatBtwTwoUsers(data)).then((res:any) => {
    console.log('marked all chat ', res);
  })
}, []);

useEffect(() => {
  socket.emit('joinChat', chatId);
  const token = getUser && getUser.token;
  const data = { token, chatId };
 
  socket.on('receivedMessage', (newMessage) => {
    dispatch(addChat(newMessage));
    dispatch(fetchChat(data)).then((res: any) => {
      console.log('the chat history res ', res);
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
    <div className='bg-white h-screen'>

<div onClick={handleGoBack} className={`flex sm:mx-[25%] gap-3 bg-white p-2 cursor-pointer`} >
          <BackArrowLogo  className='w-4 h-4 cursor-pointer fill-black' />
        <h2 className='text-xs font-medium text-black'>Back</h2>
        </div>
      
    <div className='pb-4 pl-4 pr-4'>
      <div className='flex justify-between pb-2 border-b border-gray-400 items-center'>
        <div className='flex gap-1 items-center'>
          <img src={others && others.profilePhoto && others.profilePhoto.url} className='w-7 h-7 rounded-full' alt="" />
          <h1 className='text-black font-semibold pr-2'>{others && others.fullname}</h1>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </div>

        <div></div>
      </div>
    <div className='pb-10 bg-white'>
      {
        chat && Array.isArray(chat) && chat.map((message) => (

    <div key={message && message._id} className=''>
          <div className='flex justify-center text-[8px] items-center'> <div className='border-b border-gray-200 w-[40%]'></div> {formatCreatedAt(message && message.createdAt)} <div className='border-b w-[40%] border-gray-200'></div> </div>
          {
            message && message.sender && message.sender._id === myId ? (
             <div className='flex gap-1 items-center mb-[1px]'>
          <img src={ message && message.sender && message.sender.profilePhoto && message.sender.profilePhoto.url } className='w-4 h-4 rounded-full' alt="" />
          <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg flex-none bg-gray-400'>
            <p className='text-black text-xs sm:max-w-xs max-w-[180px]'>{message && message.message}</p>
            <p className='text-[8px] text-black'>{formatCreatedAt(message && message.createdAt)}</p>
          </div>
          </div>  
            ) : (
              <div className='flex justify-between mb-[1px]'>
        <div></div>

      <div className='flex items-center gap-1'>
      <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg flex-none bg-gray-400'>
        <p className='text-black text-xs sm:max-w-xs max-w-[180px]'>{message && message.message}</p>
        <p className='text-[8px] text-black'>{formatCreatedAt(message && message.createdAt)}</p>
      </div>

      <img  src={ message && message.sender && message.sender.profilePhoto && message.sender.profilePhoto.url  } className='w-4 h-4 rounded-full' alt="" />
      
      </div>
      </div>

            )
          }
         


    </div>
      ))
      }
    </div>
      
      <div className="fixed max-w-[100%] bg-white sm:max-w-[38%] bottom-0 left-0 sm:left-auto pt-2 border border-gray-400 rounded-xl">
            <div className="flex bg-white items-center max-h-[38px] p-2 mb-1 rounded-xl">
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
              className="block text-xs w-[700px] h-[30px] p-3 bg-white border-0 focus:ring-0 focus:ring-inset focus:ring-none"
              placeholder="type a chat message"
              name=""
              id=""
            />
            
            <button onClick={handleChatSubmit} className="text-[9px] text-white bg-black font-semibold rounded-2xl px-3 py-1 transform-transition duration-100 hover:scale-110">
            {
              isCommenting ? (
                <>
               <div className='flex items-center'><ProcessingLogo className="w-5 h-5 fill-white" /> <p className='text-[9px] text-white'> Commenting...</p></div> 
               </>
              ) : (
                <SendLogo className="w-6 h-6 fill-white" />
              )
            }  
            </button>
          
          </div>
          <p className="text-red-600 text-[8px]">{commentErr}</p>
        </div>
    </div>
    </div>
  )
}

export default ChatMain
