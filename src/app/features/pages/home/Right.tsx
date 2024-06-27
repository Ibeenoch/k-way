import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { getAllUser, userFollowing } from "../auth/authSlice";
import { useAppContext } from "./homeContext";
import { useNavigate } from "react-router-dom";

const Right = () => {
  const getUsers = JSON.parse(localStorage.getItem('alluser') as any);
  const getAUser = JSON.parse(localStorage.getItem('user') as any);
  const { refresh, toggleRefresh } = useAppContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFollow = (userId: string) => {
   const findUser = getUsers.find((p: any) => p._id === userId );
    const token = findUser && findUser.token;
    const follow = { token, userId };
    dispatch(userFollowing(follow))
  };

useEffect(() => {
  if(refresh){
    dispatch(getAllUser())
  }
}, [refresh]);

useEffect(() => {
  dispatch(getAllUser())
}, []);

const viewProfile = (userId: string) => {

  if(userId === getAUser && getAUser._doc  && getAUser._doc._id || userId === getAUser._id){
    navigate(`/profile/create/${userId}`);
    return;
  };
  const findPerson = getUsers.users.find((u: any) => u._id === userId);
  if(!findPerson.fullname || findPerson.fullname === ''){
    return;
  }else{
    navigate(`/profile/${userId}`);
  }
}

return (
    <div className='p-4 top-0 overflow-y-auto'>
      <div className='w-full bg-white dark:bg-black dark:text-white rounded-3xl p-4'>

      <div className='flex justify-between my-2 items-center px-4'>
        <div>
          <h1 className='text-black text-sm dark:text-white font-semibold'>Currently Trending</h1>
        </div>

        <div>
        <svg className='w-[12px] h-[12px] fill-black dark:fill-white stroke-black dark:stroke-white ' version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256">
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
            <g><g><g><path fill="#000000" d="M117.3,4.5c-6.6,0.6-14.6,2-16.6,3C99.4,8.1,98,9.2,97.5,10c-0.6,0.8-2,5.4-3.3,10.2c-1.3,4.8-2.6,9-2.9,9.2c-0.2,0.2-2.9,1.4-5.8,2.8C79.2,34.9,71,39.7,65.3,44C63,45.7,60.9,47,60.7,47c-0.3,0-4.2-1-8.6-2.2c-11.5-3.1-13-3-17.4,1.8c-6.3,6.8-13.1,17.2-17.9,27.1c-6,12.4-7.7,18.6-6,21.9c0.4,0.7,3.6,4.2,7.3,7.9l6.6,6.7l-0.6,4.9c-0.8,6.3-0.8,19.5,0,25.8l0.6,4.8l-6.9,7c-9.4,9.5-9.4,9.5-4.7,21.3c5.6,14.2,18.3,33.9,24.6,38.1c2.6,1.8,4.9,1.6,14.7-1l8.5-2.3l2.3,1.8c8.2,6.1,22.2,14,26.9,15.2c1.4,0.3,1.6,0.9,4,9.8c2.4,8.9,2.7,9.6,4.7,11.5c1.8,1.8,2.8,2.1,7,2.9c14.9,2.7,29.7,2.7,44.5,0c4.3-0.8,5.2-1.1,7-2.9c1.9-1.8,2.3-2.6,4.6-11.5c1.4-5.2,2.9-9.5,3.1-9.5c1.1,0,10.6-4.5,15.4-7.4c2.8-1.7,7.2-4.5,9.6-6.3c2.5-1.9,4.8-3.4,5.2-3.4c0.3,0,4.2,1,8.6,2.2c9.3,2.5,11.7,2.7,14.4,0.9c4.2-2.9,13.8-16,19.4-26.8c1.7-3.2,4.2-8.7,5.6-12.3c2.6-6.8,3.2-10.1,1.9-12.6c-0.4-0.7-3.6-4.3-7.3-8l-6.6-6.7l0.6-5.6c0.8-7.1,0.8-17.1,0-24.2l-0.6-5.6l6.6-6.7c3.7-3.7,6.9-7.3,7.3-8c1.7-3.4-0.1-9.7-6.3-22.5c-5.6-11.4-15.9-26.1-20.6-29.2c-2.6-1.8-5.1-1.6-14.4,0.9c-4.4,1.2-8.3,2.2-8.6,2.2s-2.9-1.6-5.5-3.5c-6.3-4.7-12.6-8.3-19.2-11.3c-3-1.3-5.7-2.6-5.9-2.8c-0.3-0.2-1.6-4.5-2.9-9.4c-2.3-8.4-2.5-9.2-4.5-11c-1.8-1.8-2.7-2.1-7-2.9C140.2,4.3,126.8,3.6,117.3,4.5z M139.3,21.8c2.8,0.3,5.2,0.8,5.5,1c0.3,0.2,1.4,3.9,2.6,8.1c1.2,4.3,2.4,8.2,2.6,8.8c1.2,2.1,3.3,3.5,8.6,5.5c9.4,3.5,18.4,8.8,26.6,15.6c2.3,1.9,5,3.6,6.1,4c2.1,0.6,2.9,0.4,13.3-2.5c2.6-0.8,5.2-1.4,5.6-1.4c1.2,0,8.9,10.6,11.6,16c1.3,2.6,3.2,6.7,4.2,9l1.7,4.4l-6.6,6.7c-7.7,7.8-7.8,8.1-6.3,15.5c1.4,7,1.4,24.4,0,31.4c-1.5,7.4-1.4,7.7,6.3,15.5l6.6,6.7l-2.5,5.9c-1.4,3.3-3.5,7.7-4.7,9.7c-2.5,4.3-9.5,13.7-10.1,13.7c-0.3,0-4.1-1-8.5-2.2c-5.7-1.6-8.6-2.1-10.1-1.9c-1.3,0.2-3.4,1.5-6.3,4c-8.9,7.3-18.5,12.9-28.3,16.4c-4.4,1.5-6.7,3.3-7.7,5.7c-0.3,0.8-1.4,4.6-2.5,8.5c-1.1,3.9-2,7.2-2.2,7.3c-0.7,0.7-11.2,1.8-16.9,1.8c-5.6,0-16.2-1.2-16.8-1.8c-0.1-0.1-1.2-3.7-2.4-7.9c-1.2-4.3-2.4-8.2-2.7-8.8c-1.1-2-3.2-3.5-7.5-5.1c-11.5-4.2-20.8-9.7-29-17c-3.9-3.5-5.7-3.7-12.3-2c-3,0.8-6.7,1.8-8.2,2.2c-1.5,0.4-3,0.8-3.4,0.8c-0.8,0-7.4-8.8-10.2-13.7c-1.2-2-3.3-6.4-4.7-9.7l-2.5-5.9l6.6-6.7c7.5-7.7,7.8-8.2,6.4-14.6c-0.4-2.3-1-8.5-1.2-14c-0.2-8.5-0.1-10.9,0.9-16.8c0.9-5.2,1-7.3,0.6-8.8c-0.4-1.3-2.5-3.9-6.9-8.3l-6.3-6.3l1.7-4.4c1-2.4,2.9-6.4,4.2-9c2.7-5.3,10.5-16,11.6-16c0.4,0,4,0.9,7.9,1.9c10.7,2.9,11.4,2.8,17.7-2.5C78.8,54,88,48.6,97.5,45.1c5.3-2,7.5-3.3,8.6-5.5c0.3-0.6,1.5-4.5,2.6-8.7c1.2-4.2,2.3-7.9,2.5-8C112.7,21.4,130.8,20.7,139.3,21.8z"/><path fill="#000000" d="M117.4,68.8C94.1,73.2,76,90,69.8,113c-1.3,4.8-1.5,6.3-1.5,15c0,8.6,0.2,10.2,1.5,15c6.9,25.9,28.9,43.7,55.5,44.9c19.8,0.8,37.8-7.3,49.9-22.6c4.5-5.7,9.1-14.9,11.1-22.1c1.3-5,1.5-6.4,1.5-15.1c0-8.7-0.2-10.2-1.5-15.1c-5.7-21.1-22.2-37.6-43.2-43.1C136.2,68,124.1,67.5,117.4,68.8z M141.9,87.1c23.8,8.3,35.6,34.5,25.9,57.7c-5.5,13.1-18.6,23.4-32.9,25.9c-4.3,0.7-13.1,0.3-17.5-0.8c-9-2.3-18.8-9-24.3-16.5c-17.9-24.4-5.3-59.3,24.2-67.3c3.1-0.9,5.3-1,11.8-0.9C136.4,85.4,137.6,85.6,141.9,87.1z"/></g></g></g>
        </svg>
        </div>
      </div>

        <h1 className='text-gray-400 pl-4 text-xs'>Trending in Nigeria</h1>
        {/* trends  */}
        
      <div className='flex justify-between my-2 items-center px-4'>
        <div>
          <h1 className='text-black text-sm dark:text-white font-semibold'>#Liverpool</h1>
          <p className='text-gray-400 text-xs'>157.3k posts</p>
        </div>

        <div>
        <svg className='w-[12px] h-[12px] fill-black dark:fill-white stroke-black dark:stroke-white ' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 342.382 342.382"
                >
              <g>
                <g>
                  <g>
                    <path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                      c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/>
                  </g>
                  <g>
                    <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                      c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/>
                  </g>
                  <g>
                    <path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                      c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/>
                  </g>
                </g>
              </g>
              </svg>
        </div>
      </div>
        
      <div className='flex justify-between my-2 items-center px-4'>
        <div>
          <h1 className='text-black text-sm dark:text-white font-semibold'>#Messi</h1>
          <p className='text-gray-400 text-xs'>223.5k posts</p>
        </div>

        <div>
        <svg className='w-[12px] h-[12px] fill-black dark:fill-white stroke-black dark:stroke-white ' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 342.382 342.382"
                >
              <g>
                <g>
                  <g>
                    <path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                      c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/>
                  </g>
                  <g>
                    <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                      c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/>
                  </g>
                  <g>
                    <path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                      c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/>
                  </g>
                </g>
              </g>
              </svg>
        </div>
      </div>
        
      <div className='flex justify-between my-2 items-center px-4'>
        <div>
          <h1 className='text-black text-sm dark:text-white font-semibold'>#Drake</h1>
          <p className='text-gray-400 text-xs'>187.7k posts</p>
        </div>

        <div>
        <svg className='w-[12px] h-[12px] fill-black dark:fill-white stroke-black dark:stroke-white ' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 342.382 342.382"
                >
              <g>
                <g>
                  <g>
                    <path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                      c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/>
                  </g>
                  <g>
                    <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                      c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/>
                  </g>
                  <g>
                    <path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                      c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/>
                  </g>
                </g>
              </g>
              </svg>
        </div>
      </div>
        
      <div className='flex justify-between my-2 items-center px-4'>
        <div>
          <h1 className='text-black text-sm dark:text-white font-semibold'>#Minions</h1>
          <p className='text-gray-400 text-xs'>97.7k posts</p>
        </div>

        <div>
        <svg className='w-[12px] h-[12px] fill-black dark:fill-white stroke-black dark:stroke-white ' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 342.382 342.382"
                >
              <g>
                <g>
                  <g>
                    <path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219
                      c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/>
                  </g>
                  <g>
                    <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219
                      c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/>
                  </g>
                  <g>
                    <path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219
                      c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/>
                  </g>
                </g>
              </g>
              </svg>
        </div>
      </div>
      </div>

      <div className='w-full bg-white dark:bg-black mt-4 rounded-3xl p-4'>
          <h1 className='text-black dark-text-white font-bold text-md'>Suggestions</h1>
          {/* people */}
        {
          getUsers  && getUsers.users && getUsers.users.length > 0 && getUsers.users.map((person: any) => (       
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
            
            <button onClick={() => handleFollow(person && person._id)} className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>{person && person.followers && person.followers.includes(getAUser && getAUser._doc && getAUser._doc._id) ? 'Unfollow' : 'Follow'} </button>
          </div>
          ))
          }
      </div>
    </div>
  )
}

export default Right
