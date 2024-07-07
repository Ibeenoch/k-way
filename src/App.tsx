import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster, ToastOptions } from "react-hot-toast"
import { ReactComponent as LoadingLogo } from './assets/loading.svg';
import EditReplyComment from "./app/features/pages/home/EditReplyComment";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectUser } from "./app/features/pages/auth/authSlice";
const Home = lazy(() => import("./app/features/pages/home/Home"));
const Profile = lazy(() => import("./app/features/pages/profile/Profile"));
const Notification = lazy(() => import("./app/features/pages/Notification/Notification"));
const ChatRoom = lazy(() => import("./app/features/pages/chatroom/ChatRoom"));
const Message = lazy(() => import("./app/features/pages/message/Message"));
const Trend = lazy(() => import("./app/features/pages/trendlist/Trend"));
const Trends = lazy(() => import("./app/features/pages/trendmain/Trends"));
const SignUp = lazy(() => import("./app/features/pages/auth/SignUp"));
const Login = lazy(() => import("./app/features/pages/auth/Login"));
const ProfileForm = lazy(() => import("./app/features/pages/auth/ProfileForm"));
const Verification = lazy(() => import("./app/features/pages/auth/Verification"));
const PasswordRecovery = lazy(() => import("./app/features/pages/auth/PasswordRecovery"));
const ChangePassword = lazy(() => import("./app/features/pages/auth/ChangePassword"));
const ReplyComment = lazy(() => import("./app/features/pages/home/ReplyComment"));
const EditComment = lazy(() => import("./app/features/pages/home/EditComment"));
const SinglePost = lazy(() => import("./app/features/pages/singlePost/SinglePost"));
const ViewPerson = lazy(() => import("./app/features/pages/home/ViewPerson"));


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
    path: "/post/:id",
    element: <SinglePost />,
  },
  {
    path: "/post/like/:postId",
    element: <ViewPerson />,
  },
  {
    path: "/post/bookmark/:postId",
    element: <ViewPerson />,
  },
  {
    path: "/post/reshare/:postId",
    element: <ViewPerson />,
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
    path: "/chatroom/:userId/:myId/:chatId",
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
  {
    path: "/reply/comment/:commentId",
    element: <ReplyComment />,
  },
  {
    path: "/edit/:postId/:commentId",
    element: <EditComment />,
  },
  {
    path: "/edit/:commentId",
    element: <EditReplyComment />,
  },
 
]);

function App() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectUser);



  return (
    
      <div className={`App ${ mode === 'light' ? 'color-bg' : 'bg-gray-800' } `} >
        <Suspense fallback={<div className="flex items-center justify-center h-screen w-full"> <LoadingLogo className="w-14 h-14" /> </div>}>
        <RouterProvider router={router} />
        </Suspense>
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
