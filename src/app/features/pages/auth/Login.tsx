import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast, { Toaster } from "react-hot-toast"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { loginUser } from "./authSlice";
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg'

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const [passcode, setPasscode] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleSwitchElem = (checked: boolean) => {
    setIsChecked(checked);
  };

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
      console.log('hiii ', res)
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

  const changeConfirmVisibilty = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
      <div className="">
        <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
          <Link to="/">
            <div
               className="ml-[40%] pt-6"
            >
                {/* company logo  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                  viewBox="0 0 192.756 192.756"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#fff"
                    fill-opacity="0"
                    d="M0 0h192.756v192.756H0V0z"
                  />
                  <path
                    d="M131.693 20.827c3.225-5.343 10.898-.719 7.676 4.626l-39.883 66.11 16.076 26.843c3.205 5.355-4.471 9.943-7.676 4.592L90.669 94.247c-.306-.512-.566-1.547-.587-2.661-.019-.983.148-2.029.632-2.83l40.979-67.929zm14.911 0c3.223-5.343 10.898-.719 7.676 4.626l-39.883 66.11 16.074 26.843c3.207 5.355-4.469 9.943-7.674 4.592L105.58 94.247c-.307-.512-.566-1.547-.588-2.661-.018-.983.148-2.029.633-2.83l40.979-67.929zm14.91 0c3.223-5.343 10.898-.719 7.674 4.626l-39.883 66.11 16.076 26.843c3.205 5.355-4.469 9.943-7.674 4.592L120.49 94.247c-.307-.512-.566-1.547-.588-2.661-.02-.983.148-2.029.631-2.83l40.981-67.929zm14.91 0c3.223-5.343 10.898-.719 7.674 4.626l-39.883 66.11 16.076 26.843c3.205 5.355-4.471 9.943-7.676 4.592l-17.217-28.751c-.305-.512-.566-1.547-.586-2.661-.02-.983.146-2.029.631-2.83l40.981-67.929z"
                    fill="#cc2229"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#33348e"
                    d="M65.556 122.496l61.229-102.72H75.873l-61.229 102.72h50.912zM14.575 138.02c0-3.023 2.056-4.562 4.898-4.562s4.898 1.539 4.898 4.562v8.102l8.51-9.447c2.079-2.34 3.379-2.664 4.938-2.664 2.339 0 5.098 1.936 5.098 4.729 0 1.561-.975 3.055-2.08 4.225l-8.401 8.541 9.425 10.814c1.326 1.432 2.387 2.547 2.387 4.137 0 2.758-2.548 5.383-4.935 5.383-2.28 0-4.003-1.451-5.382-2.99l-9.561-11.363v9.812c0 3.021-2.056 4.561-4.898 4.561s-4.898-1.539-4.898-4.561V138.02h.001zM94.608 133.457c-2.811 0-4.74 1.697-5.218 3.82l-3.912 17.066h-.106l-5.044-16.484c-1.061-3.287-2.927-4.402-5.208-4.402l-.179.316v-.316c-2.281 0-4.147 1.115-5.208 4.402l-5.043 16.484h-.106l-3.911-17.066c-.478-2.123-2.407-3.82-5.218-3.82-2.599 0-4.805 1.91-4.805 4.191 0 1.432.583 3.287.848 4.402l5.729 23.389c1.007 4.139 2.623 6.418 6.759 6.418 3.288 0 5.422-1.645 6.43-4.721l4.473-13.24h.106l-.002-.609.182.609 4.473 13.24c1.007 3.076 3.141 4.721 6.429 4.721 4.138 0 5.752-2.279 6.759-6.418l5.729-23.389c.266-1.115.85-2.971.85-4.402-.001-2.281-2.208-4.191-4.807-4.191zM135.031 154.428s-10.49-14.631-10.49-16.381c0-2.281 2.354-4.59 4.898-4.59 2.334 0 3.639 1.645 4.541 2.918l6.174 7.951 5.77-7.477c.9-1.271 2.609-3.393 4.943-3.393 2.547 0 6.121 2.197 5.074 5.188-.58 1.652-10.982 15.783-10.982 15.783v12.869c0 3.021-2.312 4.561-4.805 4.561-2.494 0-5.123-1.539-5.123-4.561v-12.868zM129.234 163.053l-8.465-21.629c-1.512-4.119-3.438-7.666-7.582-7.785v-.012c-.037 0-.07.004-.107.006-.035-.002-.07-.006-.105-.006l-.002.012c-4.143.119-6.07 3.666-7.582 7.785l-8.464 21.629c-1.113 3.023-1.272 4.031-1.272 5.305 0 3.033 3.271 3.5 5.711 3.5 2.811 0 3.713-1.803 4.51-4.189l1.061-2.703.227-.752H119l.229.752 1.061 2.703c.795 2.387 1.697 4.189 4.508 4.189 2.439 0 5.713-.467 5.713-3.5-.003-1.274-.163-2.282-1.277-5.305zM113.08 146.92l3.338 8.77h-6.676l3.338-8.77z"
                  />
                  <path
                    d="M45.718 159.006a5.92 5.92 0 0 0 5.92-5.922 5.92 5.92 0 0 0-5.92-5.92 5.921 5.921 0 0 0 0 11.842zM157.871 139.721a5.83 5.83 0 0 1 5.846-5.846 5.852 5.852 0 0 1 5.846 5.846 5.853 5.853 0 0 1-5.846 5.846 5.833 5.833 0 0 1-5.846-5.846zm10.149 0c0-2.607-1.805-4.459-4.303-4.459-2.547 0-4.305 1.852-4.305 4.459 0 2.605 1.758 4.457 4.305 4.457 2.498 0 4.303-1.852 4.303-4.457zm-1.405 3.177h-1.527l-1.402-2.67h-1.049v2.67h-1.326v-6.311h3.053c1.65 0 2.453.449 2.453 1.93 0 1.172-.617 1.635-1.729 1.711l1.527 2.67-2.236-3.609c.709.016 1.203-.154 1.203-.941 0-.85-.91-.787-1.512-.787h-1.434v1.729h1.742l2.237 3.608z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#33348e"
                  />
                </svg>
            </div>
          </Link>
          <h2 className="mt-5 text-center text-lg font-bold leading-4 tracking-tight text-gray-900">
            Login to K-Way
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
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
            <p className="mt-5 text-center text-sm text-gray-900">
              Not a member?{" "}
              <div className="font-semibold leading-6 text-purple-800 hover:text-purple-700">
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
