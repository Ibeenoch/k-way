
import { useNavigate } from 'react-router-dom'

const MessageList = () => {
    const navigate = useNavigate()
    const gotoChatRoom = () => {
        navigate('/chatroom');
    }
  return (
    <div>
      
      <div className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
          <h1 className='text-black dark-text-white font-bold text-md'>Chat Room</h1>
          {/* people */}

          <div onClick={gotoChatRoom} className='flex border-b border-gray-400 my-2 cursor-pointer justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} alt="" />
            <div className='flex flex-col item-center'>
              <h1 className='text-sm text-black dark:text-white font-semibold flex items-center'>Chioma Ada <p className='text-xs text-gray-600'>@chiada</p> </h1>
              
              <p className='text-xs text-gray-600 max-w-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis iste unde in atque consequatur.</p>

            </div>
            </div>

            <div className='flex flex-col items-center pb-2 gap-3'>
                <p className='text-gray-500 text-[12px]'>10:34am</p>
                <div className='w-4 h-4 rounded-full bg-sky-500 text-[8px] flex items-center justify-center text-white'>1</div>
            </div>
          </div>

          <div onClick={gotoChatRoom} className='flex border-b border-gray-400 my-2 cursor-pointer justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 7.png`} alt="" />
            <div className='flex flex-col item-center'>
              <h1 className='text-sm text-black dark:text-white font-semibold flex items-center'>Chioma Ada <p className='text-xs text-gray-600'>@chiada</p> </h1>
              
              <p className='text-xs text-gray-600 max-w-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis iste unde in atque consequatur.</p>

            </div>
            </div>

            <div className='flex flex-col items-center pb-2 gap-3'>
                <p className='text-gray-500 text-[12px]'>10:34am</p>
                <div className='w-4 h-4 rounded-full bg-sky-500 text-[8px] flex items-center justify-center text-white'>5</div>
            </div>
          </div>

          <div onClick={gotoChatRoom} className='flex border-b border-gray-400 my-2 cursor-pointer justify-between items-center my-2 px-4'>
            <div className='flex gap-2'>
              <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/ladies 7.png`} alt="" />
            <div className='flex flex-col item-center'>
              <h1 className='text-sm text-black dark:text-white font-semibold flex items-center'>Chioma Ada <p className='text-xs text-gray-600'>@chiada</p> </h1>
              
              <p className='text-xs text-gray-600 max-w-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis iste unde in atque consequatur.</p>

            </div>
            </div>

            <div className='flex flex-col items-center pb-2 gap-3'>
                <p className='text-gray-500 text-[12px]'>10:34am</p>
                <div className='w-4 h-4 rounded-full bg-sky-500 text-[8px] flex items-center justify-center text-white'>2</div>
            </div>
          </div>

      </div>
    </div>
  )
}

export default MessageList
