
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks';
import { fetchChat, findChatIdForTwoUsers, getOtherUser } from '../auth/authSlice';
import { Socket, io } from 'socket.io-client';



const MessageList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket: Socket = io('http://localhost:5800');
    const getUsers = JSON.parse(localStorage.getItem('alluser') as any);
    const getAUser = JSON.parse(localStorage.getItem('user') as any);

    const viewProfile = (userId: string) => {
      // check if i am not logged in
    if(!getAUser){
      navigate(`/profile/${userId}`);
    }
    // if i am logged in
    const me = getAUser && getAUser._doc  && getAUser._doc._id;
      
      const findPerson = getUsers.users.find((u: any) => u._id === userId);
        if(!findPerson.fullname || findPerson.fullname === ''){
          navigate(`/profile/create/${userId}`);
          return;
        }else{
         dispatch(getOtherUser(findPerson && findPerson._id)).then((res: any) => {
          if(res && res.payload !== undefined){
            const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
            navigate(`/profile/${myId}`);
            window.scrollTo(0, 0);
          }
         })
        };
    };

    const beginChat = (userId: string, myId: string) => {
    
      const token = getAUser && getAUser.token;
      
      const findChatid = { token, userId, myId}

      dispatch(findChatIdForTwoUsers(findChatid)).then((res: any) => {
        console.log('the chatId is ', res, res.payload);
        if(res && res.payload !== undefined){
          const chatId = res && res.payload
        socket.emit('joinChat', chatId);
        const data = { token, chatId };
        dispatch(fetchChat(data)).then((res: any) => {
          if(res && res.payload !== undefined){
            navigate(`/chatroom/${userId}/${myId}/${chatId}`)
          }
        });

        }
        

      })

      


    }

    const me = getAUser && getAUser._doc && getAUser._doc._id;

  return (
    <div>
      
      <div className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
          <h1 className='text-black dark-text-white font-bold text-md'>Message Your Friends</h1>
          {/* people */}
        {
          getUsers  && getUsers && getUsers.length > 0 && getUsers.map((person: any) => (       
           <>
                {
                  person && person._id !== me && (
    
            <div className='flex justify-between items-center my-2 px-4'>
                <div onClick={() =>viewProfile(person._id)} className='flex gap-2 cursor-pointer'>
                  {
                    person && person.profilePhoto && person.profilePhoto.url ? (
                      <img className='w-9 h-9 rounded-full' src={person && person.profilePhoto && person.profilePhoto.url} alt="" />
                    ) : (
                      <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
                    )
                  }
                <div>
                  <h1 className='text-sm text-black dark:text-white font-semibold'>{person && person.fullname ?  person.fullname : 'anonymous'}</h1>
                  <p className='text-xs text-gray-600'>@{person && person.handle ?  person.handle : 'anonymous'}</p>
                </div>
                </div>
            
                <button onClick={() => beginChat(person && person._id, me)}  className='text-xs px-4 py-1 bg-black rounded-full text-white hover:bg-purple-600 transform-transition duration-100 hover:scale-110'>
                  Message
                </button>
                
              </div>  
                  )
                } 
          </>
          ))
          }
      </div>
    </div>
  )
}

export default MessageList
