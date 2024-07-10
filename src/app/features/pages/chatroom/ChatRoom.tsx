
import { lazy } from "react"
import { selectUser } from "../auth/authSlice";
import { useAppSelector } from "../../../hooks";
const Left = lazy(() => import("../home/Left"));
const Right = lazy(() => import("../home/Right"));
const ChatMain = lazy(() => import("./ChatMain"));


const ChatRoom = () => {
  const { mode } = useAppSelector(selectUser);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9 ${mode === 'light' ? 'bg-white' : 'bg-black' }`}>
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
        <Left />
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
        <ChatMain/>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
        <Right />
      </div>
    </div>
  )
}

export default ChatRoom
