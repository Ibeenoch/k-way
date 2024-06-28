import { HeartIcon } from '@heroicons/react/24/outline';
import NavBar from '../mobilenav/NavBar';

const NotificationMain = () => {
  return (
    <div className='p-4'>

      <h2 className='text-black font-bold border-b border-gray-300'>Notifications </h2>
      {/* feeds  */}
      
      <div className='flex justify-between p-4 border-b border-gray-300'>
      <div className='flex gap-4 pb-2 w-full'>
        <div>
        <img src={`${process.env.PUBLIC_URL}/images/ladies5.png`} className='w-8 h-8 rounded-full' alt="" />
        </div>

        <div className='flex flex-col'>
        <HeartIcon fill='red' stroke='red' className='w-5 h-5' />
          <p className='text-sm flex-none text-black dark:text-white'><strong>Favour Daniels</strong> liked your post</p>
          <p className='text-xs flex-none text-gray-500'>5 min ago</p>
          <p className='text-xs flex-none text-gray-500'>exactly, that is where i come in... how do i apply</p>
        </div>
      </div>

        <div>
        <svg  className="w-5 relative h-5 fill-black stroke-black dark:fill-white cursor-pointer dark:stroke-white" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g><g><path  d="M116,10.5c-45.8,4.7-85.3,36.4-99.9,79.9c-8.1,24.4-8.1,50.4,0,75.1c2.8,8.6,10.1,23.1,15.2,30.2c20.3,28.5,50.9,46.4,85.2,49.8c43.5,4.4,86.7-16.4,110.6-53.4c22.4-34.6,25.1-78.9,7-115.9c-11.6-23.5-29.6-41.8-53-53.6C160.4,12.4,138.3,8.2,116,10.5z M137.3,15.9c28.1,2.4,52.5,14,72,34.2c14.5,15.1,24.4,33.7,28.8,54.2c5.2,24.4,2.1,49.3-8.8,71.9c-15.2,31.7-43.4,53.7-78.4,61.3c-9.6,2-27.6,2.6-37.9,1.1c-47.6-6.9-84.5-41.7-94.6-89.1c-1.5-6.9-1.6-8.6-1.6-21.6c-0.1-15.4,0.5-19.4,3.8-31.3c9.8-35.1,37.3-63.7,72.3-75.4C107.9,16.3,122,14.6,137.3,15.9z"/><path fill="#000000" d="M122,48.5c-6.9,2-12.1,6.4-15.2,12.9c-1.7,3.5-1.9,4.4-1.9,9.9c0,5.5,0.2,6.4,1.9,10c7,14.9,26.5,18.2,37.9,6.5c4.4-4.5,6.2-8.8,6.5-15.2c0.3-6.2-0.7-10-4-14.8C141.9,50,131.2,46,122,48.5z M132.4,57.9c1.3,0.4,3.4,1.6,4.7,2.8c6.5,5.9,6.7,14.9,0.4,21c-8.6,8.3-23.3,2.1-23.4-10C113.9,61.8,122.8,55.2,132.4,57.9z"/><path fill="#000000" d="M121,105.4c-6.2,2-11.6,6.8-14.5,12.8c-1.4,3-1.6,4.1-1.6,9.7c0,5.9,0.1,6.6,1.9,10.3c2.3,4.8,6.7,9,11.5,11.2c3,1.4,4.1,1.6,9.7,1.6c5.9,0,6.6-0.1,10.3-1.9c4.8-2.3,9-6.7,11.2-11.5c1.4-3,1.6-4.1,1.6-9.7s-0.2-6.7-1.6-9.7c-2.2-4.8-6.4-9.1-11.2-11.4c-3.4-1.7-4.6-2-9.4-2.1C125.5,104.7,122.5,104.9,121,105.4z M134.6,115.6c3.5,1.7,6.3,5.5,7.2,9.5c2.2,9.7-7,18.8-16.6,16.6c-6.7-1.4-11.2-7.1-11.2-13.8C114,117.3,124.8,110.8,134.6,115.6z"/><path fill="#000000" d="M122,161.9c-10.1,2.8-16.7,11.2-17.3,21.6c-0.5,10.3,4.5,18.4,14.1,22.9c3,1.4,4.3,1.6,9.2,1.6c5.2,0,6.1-0.2,9.7-1.9c5-2.4,9.3-6.5,11.6-11.3c2.2-4.7,2.8-12.4,1.2-17.2C146.6,165.8,133.7,158.6,122,161.9z M132.8,171.5c11.8,4.1,12.2,20.9,0.8,26.1c-8.9,4.1-19.6-2.8-19.7-12.6C113.9,175,123.4,168.2,132.8,171.5z"/></g></g></g>
        </svg>
        </div>
      </div>

      <div className='flex justify-between p-4 border-b border-gray-300'>
      <div className='flex gap-4 pb-4 w-full'>
        <div>
        <img src={`${process.env.PUBLIC_URL}/images/ladies5.png`} className='w-8 h-8 rounded-full' alt="" />
        </div>

        <div className='flex flex-col'>
          <p className='text-sm flex-none text-black dark:text-white'><strong>Sarah Jane</strong> commented on your post</p>
          <p className='text-xs flex-none text-gray-500'>2 hrs ago</p>
          <p className='text-xs flex-none text-gray-500'>this is my dream job, congrate</p>
        </div>
      </div>

        <div>
        <svg  className="w-5 relative h-5 fill-black stroke-black dark:fill-white cursor-pointer dark:stroke-white" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g><g><path  d="M116,10.5c-45.8,4.7-85.3,36.4-99.9,79.9c-8.1,24.4-8.1,50.4,0,75.1c2.8,8.6,10.1,23.1,15.2,30.2c20.3,28.5,50.9,46.4,85.2,49.8c43.5,4.4,86.7-16.4,110.6-53.4c22.4-34.6,25.1-78.9,7-115.9c-11.6-23.5-29.6-41.8-53-53.6C160.4,12.4,138.3,8.2,116,10.5z M137.3,15.9c28.1,2.4,52.5,14,72,34.2c14.5,15.1,24.4,33.7,28.8,54.2c5.2,24.4,2.1,49.3-8.8,71.9c-15.2,31.7-43.4,53.7-78.4,61.3c-9.6,2-27.6,2.6-37.9,1.1c-47.6-6.9-84.5-41.7-94.6-89.1c-1.5-6.9-1.6-8.6-1.6-21.6c-0.1-15.4,0.5-19.4,3.8-31.3c9.8-35.1,37.3-63.7,72.3-75.4C107.9,16.3,122,14.6,137.3,15.9z"/><path fill="#000000" d="M122,48.5c-6.9,2-12.1,6.4-15.2,12.9c-1.7,3.5-1.9,4.4-1.9,9.9c0,5.5,0.2,6.4,1.9,10c7,14.9,26.5,18.2,37.9,6.5c4.4-4.5,6.2-8.8,6.5-15.2c0.3-6.2-0.7-10-4-14.8C141.9,50,131.2,46,122,48.5z M132.4,57.9c1.3,0.4,3.4,1.6,4.7,2.8c6.5,5.9,6.7,14.9,0.4,21c-8.6,8.3-23.3,2.1-23.4-10C113.9,61.8,122.8,55.2,132.4,57.9z"/><path fill="#000000" d="M121,105.4c-6.2,2-11.6,6.8-14.5,12.8c-1.4,3-1.6,4.1-1.6,9.7c0,5.9,0.1,6.6,1.9,10.3c2.3,4.8,6.7,9,11.5,11.2c3,1.4,4.1,1.6,9.7,1.6c5.9,0,6.6-0.1,10.3-1.9c4.8-2.3,9-6.7,11.2-11.5c1.4-3,1.6-4.1,1.6-9.7s-0.2-6.7-1.6-9.7c-2.2-4.8-6.4-9.1-11.2-11.4c-3.4-1.7-4.6-2-9.4-2.1C125.5,104.7,122.5,104.9,121,105.4z M134.6,115.6c3.5,1.7,6.3,5.5,7.2,9.5c2.2,9.7-7,18.8-16.6,16.6c-6.7-1.4-11.2-7.1-11.2-13.8C114,117.3,124.8,110.8,134.6,115.6z"/><path fill="#000000" d="M122,161.9c-10.1,2.8-16.7,11.2-17.3,21.6c-0.5,10.3,4.5,18.4,14.1,22.9c3,1.4,4.3,1.6,9.2,1.6c5.2,0,6.1-0.2,9.7-1.9c5-2.4,9.3-6.5,11.6-11.3c2.2-4.7,2.8-12.4,1.2-17.2C146.6,165.8,133.7,158.6,122,161.9z M132.8,171.5c11.8,4.1,12.2,20.9,0.8,26.1c-8.9,4.1-19.6-2.8-19.7-12.6C113.9,175,123.4,168.2,132.8,171.5z"/></g></g></g>
        </svg>
        </div>
      </div>
      <NavBar />
    </div>
  )
}

export default NotificationMain
