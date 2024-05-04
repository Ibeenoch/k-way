import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getAllproduct, selectProduct } from "./features/ProductList/ProductSlice";
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Loading: React.FC = () => {
  const [count, setCount] = useState<number>(15);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllproduct());

    const timer = setInterval( () => {
      setCount((prev) => prev - 1)
      if(count === 0){        
        toast.error('Server taking too long to respond, Kindly click Maven logo to try again', {
          position: 'top-center',
          duration: 6000,
        })
      }

    }, 1000 );

    return () => clearInterval(timer);
    }, [count]);


  return (
    <div style={{ display: 'flex', color: 'black', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', opacity: 0.3}}>
{ count === 0 ? (
  <>
  <p style={{ color: 'red'}}> Server taking too long to respond, kindly click the Maven logo to try again </p>
  <p style={{ color: 'red'}}> NB: it may take 5-6 times of trial to load the content on first visit to the site</p>
  </>
) : (
  <>
  
  </>
)}
<p>Please be patience, while we fetch the content</p>
<p>this may take a while...</p>
<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '150px', height: '150px' }} viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#E50202" stop-opacity="0"></stop><stop offset="1" stop-color="#E50202"></stop></linearGradient><circle fill="none" stroke="url(#a12)" stroke-width="11" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>    
<Toaster />
</div>
  )
}

export default Loading
