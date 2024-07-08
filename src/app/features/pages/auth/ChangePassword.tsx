import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import  toast, { Toaster } from "react-hot-toast"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { resetPassword, selectUser } from "./authSlice";
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';


interface Login {
  newpassword1: string;
  newpassword2: string;
}

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<Login>({
    newpassword1: "",
    newpassword2: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isClicked, setIsClicked ] = useState(false);
  const { id } = useParams();
  const [isWeak, setIsWeak] = useState(false);
  const [isGood, setIsGood] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const { mode } = useAppSelector(selectUser);

  const handleSwitchElem = (checked: boolean) => {
    setIsChecked(checked);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(name === 'newpassword1'){
     setPasswordCheck(newpassword1);

    };

  };

  
  const isWeakPass = () => {
    setIsWeak(true);
    setIsGood(false);
    setIsStrong(false);
  }

  const isGoodPass = () => {
    setIsWeak(false);
    setIsGood(true);
    setIsStrong(false);
  }

  const isStrongPass = () => {
    setIsWeak(false);
    setIsGood(false);
    setIsStrong(true);
  }

  useEffect(() => {
     // poor password 
  const poorPassword = /^([a-zA-Z]{1,7}|[0-9]{1,7})$/;

  // good password 8 chars long, have at least 2 character, uppercase and lowercase
  const goodPassword = /^.{8,12}$/;

  // very strong password at least 12 chars long
  const strongPassword = /^.{12,32}$/;

  const checkWeak = poorPassword.test(formData.newpassword1);
  const checkGood = goodPassword.test(formData.newpassword1);
  const checkStrong = strongPassword.test(formData.newpassword1);

  if(checkWeak && !checkGood && !checkStrong){
    isWeakPass();
  };

  if(!checkWeak && checkGood && !checkStrong){
    isGoodPass();
  }
  
  if(checkGood && checkStrong || !checkGood && checkStrong){
    isStrongPass();
  }
console.log(checkWeak, checkGood, checkStrong);
  }, [passwordCheck])

  const { newpassword1, newpassword2 } = formData;

  const handlePasswordRecovery = (e: FormEvent) => {
    e.preventDefault();
    
    setIsClicked(true);
    if(isWeak){
      toast.error('Password too weak, password should be at least 8 characters long', {
        duration: 6000,
        position: 'top-center',
        
      });
      setIsClicked(false);
      return;
    };

    const { newpassword1, newpassword2 } = formData;
    const data = { newpassword1, id };
    
    if( newpassword2 !== newpassword1){
      toast.error('Confirm Password does not match the Password', {
        duration: 6000,
        position: 'top-center',
        
      });
      setIsClicked(false);
      return;
    }
    if(id){
      dispatch(resetPassword(data)).then((res: any) => {
        if(res && res.payload && res.payload.message){
          toast.success(res.payload.message, {
            duration: 6000,
            position: 'top-center',
            
          });
          setIsClicked(false);
          navigate('/login')
        }
      })
    }
    
  };

  const changeVisibilty2 = () => {
    setIsShowPassword2(!isShowPassword2);
  };
  const changeVisibilty3 = () => {
    setIsShowPassword3(!isShowPassword3);
  };

  const changeConfirmVisibilty = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };



  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-4 lg:px-8 ${mode === 'light' ? 'bg-white text-black' : 'text-white bg-black'}`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to="/">
            <div
               className="ml-[40%] pt-6"
            >
                {/* company logo  */}
                <CompanyLogo className="w-24 h-24" />
            </div>
          </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Password Recovery
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handlePasswordRecovery}>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="newpassword1"
                className="block text-sm font-medium leading-6"
              >
                New Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newpassword1"
                name="newpassword1"
                type={isShowPassword2 ? "text" : "password"}
                value={formData.newpassword1}
                onChange={handleChange}
                required
                placeholder="New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty2}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword2 ? (
                  <EyeIcon color="purple" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="purple" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
              {/* check password strength */}
              <div className="flex gap-2 pt-1">
                <div>
                  {
                    isWeak && (
                      <>
                      <div className="w-14 rounded-lg border-2 border-red-600"></div>
                      <p className="text-red-500 text-xs font-semibold">weak password strength</p>
                      </>
                    )
                  }
                  
                </div>
                <div>
                  {
                    isGood && (
                      <>
                        <div className="w-14 rounded-lg border-2 border-yellow-600"></div>                  
                        <p className="text-sky-600 text-xs font-semibold">good password strength</p>
                      </>
                    )
                  }
                
                </div>
                <div>
                  {
                    isStrong && (
                      <>
                        <div className="w-14 rounded-lg border-2 border-green-600"></div>
                        <p className="text-[#37B400] text-xs font-semibold">strong password strength</p>
                      </>
                    )
                  }
                </div>
                  
                  
              </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="newpassword2"
                className="block text-sm font-medium leading-6"
              >
                Confirm New Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newpassword2"
                name="newpassword2"
                type={isShowPassword3 ? "text" : "password"}
                value={formData.newpassword2}
                onChange={handleChange}
                required
                placeholder="Confirm New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty3}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword3 ? (
                  <EyeIcon color="purple" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="purple" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div>
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
                    <p className="px-2">Reset Password</p>
                  )}
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default ChangePassword;
