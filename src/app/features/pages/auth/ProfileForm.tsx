import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast, { Toaster } from "react-hot-toast";
import Switch from "react-switch";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { createUserProfile, getAUser, registerUser, selectUser } from "./authSlice";
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';
import { ReactComponent as ProfileImageLogo } from '../../../../assets/profileImage.svg';
import { ReactComponent as CameraLogo } from '../../../../assets/cameraAdd.svg';


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
    fullname: getUser && getUser.fullname && typeof getUser.fullname === 'string' ? getUser.fullname : "",
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
  
  useEffect(() => {
    dispatch(getAUser(id)).then((res: any) => {
      console.log('users fetched ', res);
    })
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

console.log('image upload ', image)
  
  
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
       <div className="shadow-lg">
          <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <Link to="/">
              <div              
                className="ml-[40%] pt-6"
              >
                {/* company logo  */}
                <CompanyLogo className="w-9 h-9"/>
              </div>
            </Link>
            <h2 className="mt-5 text-center text-lg font-bold leading-4 tracking-tight text-gray-900">
              Create Your Profile
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleProfile} >
              <div className="flex-none mx-auto w-full relative">
                {/* image upload  */}
                <ProfileImageLogo  className="w-16 h-16"/>
                <div className="absolute bg-white rounded-full ml-11 -mt-3 cursor-pointer">
                  <CameraLogo onClick={openImgFile} className="w-5 h-5 fill-none" />
                </div>
              </div>
              <input ref={imageRef} onChange={handleImgFile} multiple hidden accept="image/*" type="file" name="image" id="image" />

              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                 
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                 
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  
                  { isClicked  ? (
                    <div className="flex items-center">
                      <svg className="w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FFFFFF"></stop><stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="8" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
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
