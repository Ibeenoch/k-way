import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { registerUser, selectUser } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import toast from "react-hot-toast";
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';


interface Register {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<Register>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [emailInvalid, setemailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [noemail, setnoEmail] = useState(false);
  const [nopassword, setnoPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isWeak, setIsWeak] = useState(false);
  const [isGood, setIsGood] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const { mode } = useAppSelector(selectUser);



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(name === 'password'){
     setPasswordCheck(password);
    }
  };
  const { email, password } = formData;

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

  const checkWeak = poorPassword.test(formData.password);
  const checkGood = goodPassword.test(formData.password);
  const checkStrong = strongPassword.test(formData.password);

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

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if(email.length < 1){
      setnoEmail(true);
      return;
    };

    if(email){
      setnoEmail(false);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const validEmail = emailRegex.test(email);
      if(!validEmail){
        setemailInvalid(true);
      }else{
        setemailInvalid(false);
      }
    }
  }

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if(password.length < 1){
      setnoPassword(true);
      return;
    }else{

      setnoPassword(false);
      if((isWeak === false && isGood ===true) || (isWeak === false && isStrong === true)){
        setPasswordInvalid(false);
      }

    };

  }

  const handleRegister = async(e: FormEvent) => {
    e.preventDefault();
    if(email === '' && password === ''){
      setnoEmail(true);
      setnoPassword(true);
      setIsGood(false);
      setIsWeak(false);
      setIsStrong(false);
      return;
    }

    setIsClicked(true);

    if(isWeak || passwordInvalid){
      setIsClicked(false);
      return;
    }
   
   dispatch(registerUser(formData)).then((res: any) => {
    if(res && res.payload && res.payload.email){

      setFormData({
        email: '',
        password: '',
      })
      setIsClicked(false);
      setIsGood(false);
      setIsWeak(false);
      setIsStrong(false);
      navigate('/verify/email');
    };

    
    if(res && res.payload && res.payload.response && res.payload.response.data){
      console.log(res.payload.response.data);
      toast.error(`${res.payload.response.data}`, {
        duration: 5000,
        position: 'top-center',
      })
      setIsClicked(false);
    };
    
   })
   
 

  };

 

  const changeVisibilty = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={`flex h-screen flex-1 flex-col justify-center px-6 py-1 lg:px-8 ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white' } `}>
       <div className="">
          <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <Link to="/">
              <div              
                className="ml-[40%]"
              >
                {/* company logo  */}
                <CompanyLogo className="w-24 h-24" />
              </div>
            </Link>
            <h2 className="mt-5 text-center text-lg font-bold leading-4 tracking-tight">
              Sign Up to K-Way
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onBlur={handleEmailBlur}
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Email Address"
                    className={`block w-full rounded-md ${noemail || emailInvalid ? "border border-red-600" : 'border-0'} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6`}
                    />
                    <p className={`${ noemail ? 'block text-red-600 text-[11px]' : 'hidden' }`}>Email address is required</p>
                    <p className={`${ emailInvalid ? 'block text-red-600 text-[11px]' : 'hidden' } `}>please enter a valid email address</p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={isShowPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handlePasswordBlur}
                    placeholder="Password"
                    className={`block w-full rounded-md ${ passwordInvalid || nopassword ? 'border border-red-600' : 'border-0'} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6`}
                    />
                    <p className={`${ nopassword ? 'block text-red-600  text-[11px]' : 'hidden' }`}>Password is Required</p>
                  <div
                    onClick={changeVisibilty}
                    className={`absolute ${ nopassword || passwordInvalid ? 'top-1/3' : 'top-1/2'} right-3 transform -translate-y-1/2 cursor-pointer z-30`}
                  >
                    {isShowPassword ? (
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

            
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  { isClicked  ? (
                    <div className="flex items-center">
                      <ProcessingLogo  className="w-9 h-9"/>
                       <p>Processing...</p>
                    </div>
                  ) : (
                    <p className="px-2">Sign Up</p>
                  )}
                  
                </button>
              </div>
            </form>

            <Link to="/login">
              <p className={`mt-5 text-center text-sm ${ mode === 'light' ? 'text-purple-800 hover:text-purple-700' : 'text-white hover:text-white'}`}>
                Already a member?{" "}
                <div className={`font-semibold leading-6 ${ mode === 'light' ? 'text-purple-800 hover:text-purple-700' : 'text-white hover:text-white'} `}>
                  Please Login in
                </div>
              </p>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default SignUp;
