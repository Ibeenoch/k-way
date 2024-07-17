import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast, { Toaster } from "react-hot-toast"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { loginUser, selectUser } from "./authSlice";
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg'
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { mode } = useAppSelector(selectUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const { email, password } = formData;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsClicked(true);
    const data = { email, password }
  
    dispatch(loginUser(data)).then((res: any) => {
      if(res && res.payload && res.payload._doc && res.payload._doc._id){
        navigate('/')
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
    <div className={`flex h-screen flex-1 flex-col justify-center px-6 py-1 lg:px-8 ${mode === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
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
            Login to K-Way
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  placeholder="Email Address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                />
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
                  required
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-none sm:text-sm sm:leading-6"
                />
                <div
                  onClick={changeVisibilty}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
                >
                  {isShowPassword ? (
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
                {  isClicked  ? (
                    <div className="flex items-center">
                      <ProcessingLogo className="w-9 h-9"/>
                       <p>Processing...</p>
                    </div>
                  ) : (
                    <p className="px-2">Login</p>
                  )}
              </button>
            </div>
          </form>

          <Link to='/password/recovery'>
          <p className="text-sm pt-1 text-purple-800">Forgot Password</p>
          </Link>
          

          <Link to="/register">
            <p className={`mt-5 text-center text-sm ${ mode === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-white hover:text-white'}`}>
              Not a member?{" "}
              <div className={`font-semibold leading-6 ${ mode === 'light' ? 'text-purple-800 hover:text-purple-700' : 'text-white hover:text-white'} `}>
                Open an account with K-way
              </div>
            </p>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
