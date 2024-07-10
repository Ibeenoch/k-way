import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectUser, userVerification } from "./authSlice";
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg'
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg'

const Verification = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') as any);
  const { email, _id } = user;
  const { mode } = useAppSelector(selectUser)

  useEffect(() => {
    if(id && user){
     dispatch(userVerification(id)); 
    }
    
  }, []);

  return (
    <div className={`h-screen ${ mode === 'light' ? 'bg-white text-black' : 'bg-black text-white' } `} >
      {id ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <div className="ml-[40%]">
                {/* company logo  */}
                <CompanyLogo className="w-24 h-24"/>
            </div>
          </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Email Verification Successfully
            </h2>
          </div>

        <div className="flex justify-center gap-4 p-4">
          <Link to={`/profile/create/${id}`}>
            <div className="flex justify-center mt-10">
              <button 
                  className="flex w-full justify-center text-white rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">               
                     Complete Profile
              </button>
            </div>
          </Link>
          <Link to="/">
            <div className="flex justify-center mt-10">
              <button 
                  className="flex w-full justify-center text-white rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
                  Proceed to Home Page
              </button>
            </div>
          </Link>
        </div>

        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <div className="flex justify-center">
            <CompanyLogo className="w-24 h-24"/>

              </div>
            </Link>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
              Your Account is Successfully Created
            </h2>
            <p className="mt-5 text-center text-sm font-semibold leading-9 tracking-tight">
              A message has been send to your email, please verify your email
              address to continue
            </p>
            <p className="mt-5 text-center text-sm font-semibold leading-9 tracking-tight">
              Or skip and complete your profile
            </p>
            <Link to={`/profile/create/${_id}`}>
            <div className="flex justify-center mt-5">
              <button 
                  className="flex w-full justify-center text-white rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">               
                     Complete Profile
              </button>
            </div>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;
