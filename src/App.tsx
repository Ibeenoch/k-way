import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster, ToastOptions } from "react-hot-toast"
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
 
]);

function App() {
  return (
    
      <div className="App">
        <Suspense>
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
