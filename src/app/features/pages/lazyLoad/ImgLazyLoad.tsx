import React from 'react'
import LazyLoad from 'react-lazyload';

interface LazyLoadProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void
}

const ImgLazyLoad: React.FC<LazyLoadProps> = ({ src, alt, className, onClick }) => {
  return (
      <LazyLoad height={200} offset={100} className={className} >
        <img className='w-full h-auto object-center' src={src} alt={alt} onClick={onClick} />
      </LazyLoad>
  )
}

export default ImgLazyLoad

