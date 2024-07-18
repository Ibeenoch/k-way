import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectPost } from './PostSlice';
import { useNavigate } from 'react-router-dom';
import { getOtherUser, selectUser, userFollowing } from '../auth/authSlice';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ViewPerson = () => {
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { likes, bookmark, reshared, view } = useAppSelector(selectPost);
    const { user, mode  } = useAppSelector(selectUser);

    const viewProfile = (userId: string) => {
        dispatch(getOtherUser(userId)).then((res: any) => {
          if(res && res.payload !== undefined){
            const myId = res && res.payload && res.payload._doc && res.payload._doc._id;
            navigate(`/profile/${myId}`);
            window.scrollTo(0, 0);
          }
        })
    }

      const handleFollow = (userId: string) => {
        if(!getUser){
            navigate('/login');
        }
        
         const token = getUser && getUser.token;
         const me = getUser && getUser._doc && getUser._doc._id;
         if(me === userId){
            return;
         }
         const follow = { token, auserId: userId };
         dispatch(userFollowing(follow))
       };
     
    const handleGoBack = () => {
        navigate(-1);
    }

    const me = getUser && getUser._doc && getUser._doc._id;

    return (
    <div className='sticky overflow-y-auto'>
      <div onClick={handleGoBack} className={`flex items-center py-4 gap-3 cursor-pointer ${mode === 'light' ? 'stroke-black text-black bg-white' : 'stroke-white text-white bg-black' } `}>
        <ArrowLeftIcon className='w-5 h-5 stroke-[3px] cursor-pointer' />
        <h2 className='text-sm font-semibold'>Go Back</h2>
      </div>

      <div className={`sm:mx-[25%] ${mode === 'light' ? 'bg-white text-black fill-black stroke-black' : 'bg-black text-white fill-white stroke-white'} h-screen`}>
        <h2 className='font-bold text-sm text-center p-1'>Post { view === 'likes' ? 'Liked' : view === 'bookmark' ? 'Bookmark' : view === 'reshare' ? 'Reshared' : 'none'} By</h2>
        {
          view === 'likes' &&  likes && likes.length > 0 ? likes.map((person: any) => (
                <div className={`${ mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl flex justify-between items-center px-4 py-3 mb-[0.5px]`}>

          
            <div onClick={() =>viewProfile(person._id)} className='flex gap-2 cursor-pointer'>
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
            
            <button onClick={() => handleFollow(person && person._id)}  className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 duration-200 hover:scale-105 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black'}`}>
                {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Following' : 'Follow'} 
            </button>
          
          </div>
        ))
        : view === 'bookmark' && bookmark && bookmark.length > 0 ? bookmark.map((person: any) => (
          <div className={`${ mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl flex justify-between items-center px-4 py-3 mb-[0.5px]`}>

          
          <div onClick={() =>viewProfile(person._id)} className='flex gap-2 cursor-pointer'>
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
          
          <button onClick={() => handleFollow(person && person._id)}  className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 duration-200 hover:scale-105 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black'}`}>
              {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Following' : 'Follow'} 
          </button>
        
        </div>
    )) 
    : view === 'reshare' && reshared && reshared.length > 0 ? reshared.map((person: any) => (
      <div className={`${ mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl flex justify-between items-center px-4 py-3 mb-[0.5px]`}>

          
            <div onClick={() =>viewProfile(person._id)} className='flex gap-2 cursor-pointer'>
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
            
            <button onClick={() => handleFollow(person && person._id)}  className={`text-[11px] text-purple-600 border border-purple-600 hover:border-purple-600 font-bold hover:bg-purple-600 hover:text-white px-4 py-1 duration-200 hover:scale-105 rounded-2xl ${ mode === 'light' ? 'bg-white' : 'bg-black'}`}>
                {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Following' : 'Follow'} 
            </button>
          
          </div>
)) : (
    <></>
)
        }
      </div>
    </div>
  )
}

export default ViewPerson
