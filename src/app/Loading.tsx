import {ReactComponent as LoadingLogo} from '../assets/loading.svg'
import { selectUser } from './features/pages/auth/authSlice'
import { useAppSelector } from './hooks'

const Loading = () => {
  const { mode } = useAppSelector(selectUser)
  return (
    <div className={`flex items-center justify-center h-screen w-full ${mode === 'light' ? '' : 'bg-gray-900'} `}> 
    <LoadingLogo className="w-14 h-14" /> 
    </div>
  )
}

export default Loading
