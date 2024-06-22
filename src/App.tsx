import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster, ToastOptions } from "react-hot-toast"
import Home from "./app/features/pages/home/Home";
import Profile from "./app/features/pages/profile/Profile";
import Notification from "./app/features/pages/Notification/Notification";
import ChatRoom from "./app/features/pages/chatroom/ChatRoom";
import Message from "./app/features/pages/message/Message";
import Trend from "./app/features/pages/trendlist/Trend";
import Trends from "./app/features/pages/trendmain/Trends";
import SignUp from "./app/features/pages/auth/SignUp";
import Login from "./app/features/pages/auth/Login";
import ProfileForm from "./app/features/pages/auth/ProfileForm";
import Verification from "./app/features/pages/auth/Verification";
import PasswordRecovery from "./app/features/pages/auth/PasswordRecovery";
import ChangePassword from "./app/features/pages/auth/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Home />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/message",
    element: <Message />,
  },
 
  {
    path: "/chatroom",
    element: <ChatRoom />,
  },
  {
    path: "/trendlist",
    element: <Trend />,
  },
  {
    path: "/trends",
    element: <Trends />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile/create/:id",
    element: <ProfileForm />,
  },
  {
    path: "/verify/email",
    element: <Verification />,
  },
  {
    path: "/verify/email/:id",
    element: <Verification />,
  },
  {
    path: "/password/recovery",
    element: <PasswordRecovery />,
  },
  {
    path: "/password/reset/:id",
    element: <ChangePassword />,
  },
 
]);

function App() {
  return (
    
      <div className="App">
        <RouterProvider router={router} />
        <Toaster toastOptions={{
          error: {
            style: {
              background: '#CE1126',
              color: 'white',
              padding: '7px'
            }
          },
          success: {
            style: {
              background: '#37B400',
              color: 'white',
              padding: '7px'
            }
          },
          
        }}  />
      </div>
  );
}

export default App;
