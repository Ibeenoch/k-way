import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllUser, getOtherUser, selectUser, userFollowing } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { currentSearchTrend, selectPost, topPostTrending } from "./PostSlice";
import { ReactComponent as Settings } from '../../../../assets/setting.svg'
import './home.css';
import SkeletonTrends from "../../skeleton/SkeletonTrends";

const Right = () => {
  const getUsers = JSON.parse(localStorage.getItem('alluser') as any);
  const getAUser = JSON.parse(localStorage.getItem('user') as any);
  const dispatch = useAppDispatch();
  const { trendingPost, trendStatus, viewingStory, whichPost, hideMobileNav, isEditPost } = useAppSelector(selectPost);
  const { mode, users, allUserStatus } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleFollow = (auserId: string) => {
    const token = getAUser && getAUser.token;
    const follow = { token, auserId };
    dispatch(userFollowing(follow))
  };



useEffect(() => {
  dispatch(getAllUser())
}, [dispatch]);


useEffect(() => {
  dispatch(topPostTrending())
}, [dispatch]);

const viewProfile = (userId: string) => {
  // check if i am not logged in
if(!getAUser){
  navigate(`/profile/${userId}`);
}
// if i am logged in
const me = getAUser && getAUser._doc  && getAUser._doc._id;

const findPerson = getUsers.find((u: any) => u._id === userId);
    if(findPerson && !findPerson.fullname || findPerson.fullname === ''){
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
  

}

const viewTrend = (trend: string) => {
  dispatch(currentSearchTrend(trend));
  navigate('/trendlist')
}

return (
    <div className={`fixed w-[33vw] hide-scrollbar ${viewingStory || isEditPost || whichPost === 'story' || whichPost === 'post' || hideMobileNav ? '-z-10' : 'z-10'}  p-4 top-2 overflow-y-auto`}>
      
      <div className={`w-full ${mode === 'light' ? 'bg-white fill-black text-black' : 'bg-black fill-white text-white' } rounded-tr-3xl rounded-tl-3xl p-4 border-b border-gray-200`}>
    {
      trendStatus === 'loading' ? (<SkeletonTrends />) : (      
      <>
        <div className='flex justify-between my-2 items-center px-4'>
          <div>
            <h1 className='text-sm font-semibold'>Currently Trending</h1>
          </div>

          <div>
            <Settings className='w-[12px] h-[12px]'/>
          </div>
        </div>

          <h1 className='text-gray-400 pl-4 text-xs'>Trending in Nigeria</h1>
          {/* trends  */}
          
          {
      trendingPost && Array.isArray(trendingPost) && trendingPost.map((trend: any) => (
  <div onClick={() =>viewTrend(trend._id)} className='flex cursor-pointer justify-between my-2 items-center px-4'>
    <div>
      <h1 className='text-sm font-semibold'>#{trend._id}</h1>
      <p className='text-gray-400 text-xs'>{trend.count} posts</p>
    </div>

    <div onClick={() =>viewTrend(trend._id)}>
      <button className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black'}`}> View </button>
    </div>
  </div>
      ))
    } 
      </>
      )
      }  
    </div>

      <div className={`w-full h-screen p-4 ${mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'} `}>
          <h1 className={`font-bold text-md`}>Suggestions</h1>
          {/* people */}

         {
           allUserStatus === 'loading' ? (
            <SkeletonTrends />
           ) : (
        
          users  && users && users.length > 0 && users.map((person: any) => (  
                 
          <div className={`flex justify-between items-center my-2 px-4 `}>
            {
              users && users._doc && users._doc._id !== person._id && (
                <>
            <div onClick={() =>viewProfile(person && person._id)} className='flex gap-2 cursor-pointer'>
              {
                person && person.profilePhoto && person.profilePhoto.url ? (
                  <img className='w-9 h-9 rounded-full' src={person && person.profilePhoto && person.profilePhoto.url} alt="" />
                ) : (
                  <img className='w-9 h-9 rounded-full' src={`${process.env.PUBLIC_URL}/images/user.png`} alt="" />
                )
              }
            <div>
              <h1 className='text-sm font-semibold'>{person && person.fullname ?  person.fullname : 'anonymous'}</h1>
              <p className='text-xs text-gray-500'>@{person && person.handle ?  person.handle : 'anonymous'}</p>
            </div>
            </div>
               
            
            <button onClick={() => handleFollow(person && person._id)} className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 duration-200 hover:scale-105 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black'}`}>
          {getAUser && getAUser._doc && getAUser._doc.following && getAUser._doc.following.includes(person._id) ? 'Following' : 'Follow'} 
            </button>
            </>
              )
            }
          </div>
          ))  
           )
         } 
      </div>
    </div>
  )
}

export default Right
