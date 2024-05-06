import { useState } from 'react'
import './Starter.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { getAllproduct } from '../ProductList/ProductSlice'
import toast from 'react-hot-toast'

const StarterOne = () => {
    const [news, setNews] = useState<string>('')
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

const handleNextPage = () => {
    dispatch(getAllproduct()).then((res: any) => {
        if(res){
            navigate('/startertwo')
        }
    })
}


  return (
    <div className="h-full">
    {/*Nav*/}
    <div className="w-full container mx-auto p-4">
      <div className="w-full flex items-center justify-between">
        <a
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="#"
        >
         
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
          MAVEN STORE
          </span>
        </a>
        <div className="flex w-1/2 justify-end content-center">
          <a
            className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
            href="https://twitter.com/intent/tweet?url=#"
          >
            <svg
              className="fill-current h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z" />
            </svg>
          </a>
          <a
            className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
            href="https://www.facebook.com/sharer/sharer.php?u=#"
          >
            <svg
              className="fill-current h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    {/*Main*/}
    <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/*Left Col*/}
      <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
       
        
        <form className="w-full shadow-lg pt-6 rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
          <p className="leading-normal text-gray-800 text-base md:text-2xl mb-8 md:text-left">

          Welcome to our website! Here's a quick guide to help you navigate through our platform and make the most out of your shopping experience:
          <br />

<br /> <strong>Viewing Product Lists and Descriptions:</strong>  <br />
1. Navigate to the "Products" section on the home page. <br />
2. Browse through the available categories or use the search bar to find specific products. <br />
3. Click on a product to view its detailed description, including features, specifications, and pricing. <br />
<br /><br />
<strong>Adding Products to Cart or Wishlist:</strong> <br />
1. To add a product to your cart, simply click on the "Add to Cart" button located on the product page or the shopping bag icon. <br />
2. To add a product to your wishlist, click on the heart-shaped icon next to the product. You can access your wishlist later by clicking on the "Wishlist" icon. <br />
<br /><br />
<strong>Managing Wishlist:</strong> <br />
1. If you've added products to your wishlist, you can access them by clicking on the "Wishlist" icon.
<br /> 2.From your wishlist, you can view all the saved products and easily add them to your cart whenever you're ready to purchase.        
        </p>
           
          </div>
          <div className="flex items-center justify-between pt-4">

         
          </div>
        </form>

        <button
        onClick={handleNextPage}
            className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
        >
            Continue
        </button>
      </div>
      {/*Right Col*/}
      
     
    </div>
    
  </div>
  
  )
}

export default StarterOne
