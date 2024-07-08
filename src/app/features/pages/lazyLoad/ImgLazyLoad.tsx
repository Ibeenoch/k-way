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
      <LazyLoad className={className} >
        <img className={className} src={src} alt={alt} onClick={onClick} />
      </LazyLoad>
  )
}

export default ImgLazyLoad

