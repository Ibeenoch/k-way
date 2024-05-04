import React from 'react'
import img1 from '../../images/Apple 2022 MacBook Air Laptop 1.jpg'
import img2 from '../../images/apple watch 1.png'
import img3 from '../../images/HP ENVY x360 Convertible 15-inch Laptop__2.jpg'
import img4 from '../../images/profile 3.jpeg'

const Test = () => {
    const set = [img1, img2, img3, img4]
  return (
<div className="flex flex-row overflow-x-auto lg:overflow-hidden">
  {/* Map over each image */}
  {set.map((image, index) => (
    <div key={index} className={`px-1 flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 ${index > 0 ? 'ml-4 sm:ml-0 md:ml-0 lg:ml-0' : ''}`}>
      <img
        alt="product image"
        src={image}
        className="h-full w-full object-cover"
        style={{ zIndex: 30 }}
      />
    </div>
  ))}
</div>


  
  )
}

export default Test
