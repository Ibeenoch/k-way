
import Left from "../home/Left"
import Right from "../home/Right"
import MessageList from "./MessageList"


const Message = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-9 md:grid-cols-9'>
      <div className='hidden sm:block sm:col-start-1 sm:col-end-3 md:col-start-1 md:col-end-3'>
        <Left />
      </div>
      <div className='sm:col-start-3 sm:col-end-7 md:col-start-3 md:col-end-7'>
        <MessageList/>
      </div>
      <div className='hidden sm:block sm:col-start-7 sm:col-end-10 md:col-start-7 md:col-end-10'>
        <Right />
      </div>
    </div>
  )
}

export default Message
