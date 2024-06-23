import { Link, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import toast, { Toaster} from "react-hot-toast"
import { emailPasswordLink } from "./authSlice";
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg';
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg';

const PasswordRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsClicked(true)
    const data = { email };
    if(email){
      dispatch(emailPasswordLink(data)).then((res) => {
        console.log('emmail link ', res)
        if(res && res.payload && res.payload.message){
          setIsSent(true);
          setIsClicked(false);
        }
      })
    }
    
  };

  // const hexcode = "#DEB887";

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center mt-5 px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Link to="/">
            <div
               className="ml-[40%] pt-1"
            >
                {/* company logo  */}
                <CompanyLogo  className="w-9 h-9"/>
            </div>
          </Link>
        <form className="space-y-6 mt-14" onSubmit={handleSubmit}>
        <p className="text-center text-sm font-semibold tracking-tight text-gray-900">
            Please enter your email address to reset your password
          </p>
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Email Address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      <ProcessingLogo className="w-9 h-9"/>
                       <p>Processing...</p>
                    </div>
                  ) : (
                    <p className="px-2">Recover Account</p>
                  )}
            </button>
          </div>
          {
            isSent && (
              <p className="text-center text-sm font-semibold tracking-tight text-green-600">
                The Password recovery Link has been send to your Email
          </p>
            ) 
          }
          
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
