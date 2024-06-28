import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectPost } from './PostSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser, setProfileType, userFollowing } from '../auth/authSlice';
import { ReactComponent as ArrowBackLogo } from '../../../../assets/arrowBack.svg'

const ViewPerson = () => {
    const getUser = JSON.parse(localStorage.getItem('user') as any);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { likes, bookmark, reshared, view } = useAppSelector(selectPost);
    const { user, otherperson } = useAppSelector(selectUser);

    useEffect(() => {
        document.body.classList.add('bg-black');

        return() => {
            document.body.classList.remove('bg-black')
        };
    }, []);

    const viewProfile = (userId: string) => {
        if(getUser === null){
            dispatch(setProfileType('foreign'));
            navigate(`/profile/${userId}`);
            return;
        };
        const me = getUser && getUser._doc && getUser._doc._id;
        if( userId === me){
            dispatch(setProfileType('local'));
            navigate(`/profile/${userId}`);
        }else{
            console.log('foreign check')
            dispatch(setProfileType('foreign'));
            navigate(`/profile/${userId}`); 
        }

    }

      const handleFollow = (userId: string) => {
        if(!getUser){
            navigate('/login');
        }
        
         const token = getUser && getUser.token;
         const me = getUser && getUser._doc && getUser._doc._id;
         if(me === userId){
            console.log('the same user');
            return;
         }
         const follow = { token, auserId: userId };
         dispatch(userFollowing(follow)).then((res: any) => {
            console.log('started following ', res)
         });
       };
     
    const handleGoBack = () => {
        navigate(-1);
      }
// if(user){
//     console.log('me the user ', user && user.mine && user.mine._doc && user.mine._doc._id, ' the other person ', otherperson && otherperson._doc && otherperson._doc._id );
// }
  return (
    <div className='bg-black'>
         <div onClick={handleGoBack} className='bg-white sm:bg-transparent sm:fixed flex gap-3 py-2 cursor-pointer'>
          <ArrowBackLogo  className='w-4 h-4 cursor-pointer sm:fill-white fill-black' />
        <h2 className='text-xs font-medium text-black sm:text-white'>Back to Post Feeds</h2>
        </div>

      <div className='sm:mx-[25%] bg-white h-screen'>
        <h2 className='text-black font-bold text-sm text-center p-1 border-b border-gray-300'>Post { view === 'likes' ? 'Liked' : view === 'bookmark' ? 'Bookmark' : view === 'reshare' ? 'Reshared' : 'none'} By</h2>
        {
          view === 'likes' &&  likes && likes.length > 0 ? likes.map((person: any) => (
                <div className='flex justify-between items-center my-2 px-4 py-3 border-b border-gray-300'>

          
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
            
            <button onClick={() => handleFollow(person && person._id)} className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>
                {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Unfollow' : 'Follow'} 
            </button>
          
          </div>
        ))
        : view === 'bookmark' && bookmark && bookmark.length > 0 ? bookmark.map((person: any) => (
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
        
        <button onClick={() => handleFollow(person && person._id)} className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>
        {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Unfollow' : 'Follow'}  
        </button>
      
      </div>
    )) 
    : view === 'reshare' && reshared && reshared.length > 0 ? reshared.map((person: any) => (
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
    
    <button onClick={() => handleFollow(person && person._id)} className='text-xs px-4 py-1 bg-black dark:bg-white rounded-full text-white dark:text-black transform-transition duration-100 hover:scale-110'>
    {user && user.mine && user.mine._doc && user.mine._doc.following && user.mine._doc.following.includes(person._id) ? 'Unfollow' : 'Follow'}  
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
