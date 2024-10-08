
import { lazy, Suspense } from "react"
import Loading from "../../../Loading";
import { useAppSelector } from "../../../hooks";
import { selectUser } from "../auth/authSlice";
const Left = lazy(() => import("../home/Left"));
const Right = lazy(() => import("../home/Right"));
const MessageList = lazy(() => import("./MessageList"));


const Message = () => {
  const { mode } = useAppSelector(selectUser);
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9 h-min ${ mode === 'light' ? '' : 'bg-gray-900' } `} >
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
        <Suspense fallback={<div></div>} >
        <Left />
        </Suspense>
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
      <Suspense fallback={<div></div>} >
        <MessageList/>
        </Suspense>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
      <Suspense fallback={<div></div>} >
        <Right />
        </Suspense>
      </div>
    </div>
  )
}

export default Message
