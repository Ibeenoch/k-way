import { HeartIcon } from '@heroicons/react/24/outline'

const ChatMain = () => {
  return (
    <div className='p-4'>
      <div className='flex justify-between pb-2 border-b border-gray-400 items-center'>
        <div className='flex gap-1 items-center'>
          <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className='w-7 h-7 rounded-full' alt="" />
          <h1 className='text-black font-semibold pr-2'>Dianna Vanham</h1>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </div>

        <div></div>
      </div>

      <div className='flex justify-center text-xs'> yesterday </div>

      <div className='flex items-center gap-1 mb-2'>
      <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className='w-4 h-4 rounded-full' alt="" />
      <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg flex-none bg-gray-400'>
        <p className='text-black text-xs sm:max-w-xs max-w-[180px]'>That's great Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eius deleniti excepturi quia repellendus quaerat aut eaque voluptatum, consequuntur nesciunt?</p>
        <p className='text-xs text-black'>12:45 pm</p>
      </div>
      </div>

      <div className='flex justify-between mb-2'>
        <div></div>

      <div className='flex items-center gap-1'>
      <div className='p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg flex-none bg-gray-400'>
        <p className='text-black text-xs sm:max-w-xs max-w-[180px]'>Yes it is indeed</p>
        <p className='text-xs text-black'>12:55 pm</p>
      </div>

      <img src={`${process.env.PUBLIC_URL}/images/ladies 8.png`} className='w-4 h-4 rounded-full' alt="" />
      
      </div>
      </div>
      
    </div>
  )
}

export default ChatMain
