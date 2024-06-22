import React, { ReactElement, ReactNode, useEffect } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
import { jwtDecode } from "jwt-decode";
import Login from "./Login";
interface Children {
  child: ReactElement | any;
}
const ProtectedRoute: React.FC<Children> = ({ child }) => {
  const user = JSON.parse(localStorage.getItem("user") as any);
  const navigate = useNavigate();
  const gettoken = user && user.token;
  const token = gettoken ? JSON.stringify(gettoken) : "10";

  useEffect(() => {
    const isTokenExpired = (token: any) => {
      if (!token) {
        toast("Session expiry please login to continue", 
        {
         position: "top-center",
         duration: 6000,
       });
      
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        const decodeToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const expiryTime = decodeToken?.exp;
        if (expiryTime) {
          console.log(currentTime > expiryTime);
          if (currentTime > expiryTime) {
            toast("Your Session has expired please login to continue", 
            {
             position: "top-center",
             duration: 6000,
           });
          
            localStorage.removeItem("user");
            navigate("/login");
          } else {
            return;
          }
        }
      }
    };

    if (token !== null || token !== undefined) {
      isTokenExpired(token);
    }
  }, [token]);

  if (user && user.id) {
    return child;
  } else {
    return <Login />;
  }
};

export default ProtectedRoute;
