import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { userVerification } from "./authSlice";
import { ReactComponent as CompanyLogo } from '../../../../assets/companylogo.svg'
import { ReactComponent as ProcessingLogo } from '../../../../assets/processingLogo.svg'

const Verification = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') as any);
  console.log('jooo  ', user )
const { email, _id } = user

  useEffect(() => {
    if(id && user){
     dispatch(userVerification(id)); 
    }
    
  }, []);

  return (
    <div className="mt-5 h-screen" >
      {id ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <div
               className="ml-[40%] pt-6"
            >
                {/* company logo  */}
                <CompanyLogo className="w-9 h-9"/>
              
            </div>
          </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Email Verification Successfully
            </h2>
          </div>

        <div className="flex justify-center gap-4 p-4">
          <Link to={`/profile/create/${id}`}>
            <div className="flex justify-center mt-10">
              <button 
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">               
                     Complete Profile
              </button>
            </div>
          </Link>
          <Link to="/">
            <div className="flex justify-center mt-10">
              <button 
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-[#33348E] to-[#CC2229] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
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
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "40%",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
            <CompanyLogo className="w-9 h-9"/>

              </div>
            </Link>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Your Account is Successfully Created
            </h2>
            <p className="mt-5 text-center text-sm font-semibold leading-9 tracking-tight text-gray-900">
              A message has been send to your email, please verify your email
              address to continue
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;
