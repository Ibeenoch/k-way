import { useEffect, useState } from "react"
import { useAppSelector } from "./app/hooks";
import { selectProduct } from "./features/ProductList/ProductSlice";


const Loading: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const { products } = useAppSelector(selectProduct)

  useEffect(() => {
    const timer = setInterval( () => {
      setCount((prev) => prev - 1)
      console.log('product length: ' ,products.length)
      if(count === 0 && products.length < 1){
        window.location.reload();
        setCount(15);
      }else{
        console.log('okay')
      }
    }, 1000 );

    return () => clearInterval(timer);
    }, [count]);

    console.log('loading content in: ', count)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', opacity: 0.3}}>
<p>Please be patience, this may take a while...</p>
 {products.length > 0 ? (
  <></>
 ) : ( <p>Loading in {count} seconds</p>)}
<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '150px', height: '150px' }} viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#E50202" stop-opacity="0"></stop><stop offset="1" stop-color="#E50202"></stop></linearGradient><circle fill="none" stroke="url(#a12)" stroke-width="11" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>    
</div>
  )
}

export default Loading
