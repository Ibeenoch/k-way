import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { createUserProfile, getAUser, registerUser, selectUser } from "./authSlice";
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { ReactComponent as ProfileImageLogo } from '../../../../assets/profileImage.svg';
import { ReactComponent as CameraLogo } from '../../../../assets/cameraAdd.svg';
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


interface ProfileInterface {
  fullname: string;
  dateOfBirth: string;
  handle: string;
  address: string;
  profession: string;
}

const ProfileForm: React.FC = () => {
  const getUser = JSON.parse(localStorage.getItem('user') as any);
  const [formData, setFormData] = useState<ProfileInterface>({
    fullname: getUser && getUser._doc && getUser._doc.fullname && typeof getUser._doc.fullname === 'string' ? getUser._doc.fullname : "",
    dateOfBirth: getUser && getUser._doc && getUser._doc.dateOfBirth && typeof getUser._doc.dateOfBirth === 'string' ? getUser._doc.dateOfBirth : "",
    handle:  getUser && getUser._doc && getUser._doc.handle && typeof getUser._doc.handle === 'string' ? getUser._doc.handle : "",
    address:  getUser && getUser._doc && getUser._doc.address && typeof getUser._doc.address === 'string' ? getUser._doc.address : "",
    profession:  getUser && getUser._doc && getUser._doc.profession && typeof getUser._doc.profession === 'string' ? getUser._doc.profession : "",
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>([]);
  const [bio, setBio] = useState<string>( getUser && getUser._doc && getUser._doc.bio && typeof getUser._doc.bio === 'string' ? getUser._doc.bio : "",);
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<string>('');
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const { status, user } = useAppSelector(selectUser);
  const { id } = useParams();
  const { mode } = useAppSelector(selectUser);
  
  useEffect(() => {
    dispatch(getAUser(id))
  }, []);

  const { token } = getUser;
  const _id = getUser && getUser._doc && getUser._doc._id;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target && e.target.files){
      const img = Array.from(e.target.files)
      setImage(img);
      setImageUploaded(true)
    }
  };

  
  
  const openImgFile = () => {
    if(imageRef.current){
      imageRef.current?.click()
    }
  }

  const { fullname, dateOfBirth, handle, address, profession } = formData;
  

  const handleProfile = async(e: FormEvent) => {
    e.preventDefault();
    setIsClicked(true);
    
    if(image){
    const profilefile = new FormData();
    profilefile.append('fullname', fullname);
    profilefile.append('dateOfBirth', dateOfBirth);
    profilefile.append('handle', handle);
    profilefile.append('address', address);
    profilefile.append('profession', profession);
    profilefile.append('bio', bio);
      profilefile.append('image', image[0]);
      
          const data = { profilefile, token, _id };
          dispatch(createUserProfile(data)).then((res: any) => {
            if(res && res.payload){
              navigate(`/profile/${res.payload._doc._id}`)
            }else{
              setIsClicked(false);
            }
          })

          setFormData({
            fullname: '',
            dateOfBirth: '',
            handle: '',
            address: '',
            profession: '',
          });
          setBio('');

    }else{
      const profilefile = new FormData();
      profilefile.append('fullname', fullname);
      profilefile.append('dateOfBirth', dateOfBirth);
      profilefile.append('handle', handle);
      profilefile.append('address', address);
      profilefile.append('profession', profession);
      profilefile.append('bio', bio);
      const data = { profilefile, token, _id };

    dispatch(createUserProfile(data)).then((res: any) => {
        if(res && res.payload && res.payload._doc && res.payload._doc._id ){
          console.log('good  ', res.payload._doc._id)
          navigate(`/profile/${res && res.payload && res.payload._doc && res.payload._doc._id}`)
        }else{
          setIsClicked(false);
        }
      })

      setFormData({
        fullname: '',
        dateOfBirth: '',
        handle: '',
        address: '',
        profession: '',
      });
      setBio('');

    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={`flex min-h-full flex-1 flex-col justify-center ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white' } px-6 py-1 lg:px-8`}>
      <div onClick={goBack} className='flex items-center gap-2 p-2 ml-[30%] cursor-pointer'>
                <ArrowLeftIcon className='w-4 h-4 cursor-pointer' />
        <h2 className='text-xs font-semibold'>Go Back</h2>
        </div>

       <div className="">
          <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <Link to="/">
              <div              
                className="ml-[40%]"
              >
                {/* company logo  */}
                <CompanyLogo className="w-24 h-24"/>
              </div>
            </Link>
            <h2 className="mt-5 text-center text-lg font-bold leading-4 tracking-tight">
              Create Your Profile
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleProfile} >
              <div className="flex-none mx-auto w-full relative">
                {/* image upload  */}
                {
                  getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url ? (
                    <img  className="w-20 h-20 rounded-full border border-purple-600" src={`${getUser && getUser._doc && getUser._doc.profilePhoto && getUser._doc.profilePhoto.url}`} alt="profileimg" />
                  ) : (
                    <ProfileImageLogo stroke="purple"  className="w-16 h-16"/>
                  )
                }
                <div className={`absolute ${ mode === 'light' ? 'bg-white' : 'bg-gray-800' } rounded-full ml-11 -mt-3 cursor-pointer`}>
                  <CameraLogo onClick={openImgFile} className="w-5 h-5 fill-none" />
                </div>
              </div>
              <input ref={imageRef} onChange={handleImgFile} multiple hidden accept="image/*" type="file" name="image" id="image" />

              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    name="fullname"
                    type="fullname"
                    onChange={handleChange}
                    value={formData.fullname}
                    required
                    placeholder="Surname Firstname"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium leading-6"
                  >
                    Date Of Birth
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    placeholder="Date Of Birth"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                    />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium leading-6"
                  >
                    Handle
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="handle"
                    name="handle"
                    type="text"
                    value={formData.handle}
                    onChange={handleChange}
                    required
                    placeholder="@Nickname What Nickname Should We Call You?"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                    />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6"
                  >
                    Address
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Where do You live?"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                    />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium leading-6"
                  >
                    Profession
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    placeholder="What's Your Profession?"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                    />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6"
                  >
                    Describe yourself
                  </label>
                </div>
                <div className="mt-2 relative">
                  <textarea
                    id="bio"
                    name="bio"
                    value={bio}
                    rows={3}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    placeholder="What makes you special?"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                    />
                 
                </div>
              </div>

              <div className="pb-12">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  
                  { isClicked  ? (
                    <div className="flex items-center">
                      <ProcessingLogo className="w-9 h-9" />
                       <p>Processing...</p>
                    </div>
                  ) : (
                    <p className="px-2">Update Profile</p>
                  )}
              </button>
              </div>
            </form>

           
          </div>
        </div>
    </div>
  );
};

export default ProfileForm;
