import {ReactComponent as LoadingLogo} from '../assets/loading.svg'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full"> 
    <LoadingLogo className="w-14 h-14" /> 
    </div>
  )
}

export default Loading
