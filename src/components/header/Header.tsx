import profileImg from '../../images/smileemoji.webp'

const Header = () => {
  return (
    <div className='pt-2'>
      <div className='flex justify-between pl-2 pb-2 border-b border-gray-300'>
        <div className='pl-12'>
          <input type="text" className='py-[2px] rounded-md border w-[400px] text-[10px] text-gray-400 border-gray-300' placeholder='Search for anything...'/>
        </div>

        <div className='flex gap-4 items-center pr-8'>
        <svg className='w-5 h-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M257 120.471c7.083 0 23.911 4.479 23.911 4.479 45.589 10.447 77.678 52.439 77.678 99.85V352.412l9.321 9.364 7.788 7.823H136.302l7.788-7.823 9.321-9.364V224.8c0-47.41 32.089-89.403 77.678-99.85 0 0 18.043-4.479 23.911-4.479M256 48c-17.602 0-31.059 13.518-31.059 31.2v14.559c-59.015 13.523-103.53 67.601-103.53 131.041v114.4L80 380.8v20.8h352v-20.8l-41.411-41.6V224.8c0-63.44-44.516-117.518-103.53-131.041V79.2c0-17.682-13.457-31.2-31.059-31.2zm41.411 374.4h-82.823c0 22.881 18.633 41.6 41.412 41.6s41.411-18.719 41.411-41.6z"/></svg> 
        <div className='border-l-2 border-gray-300'> &nbsp; </div>
        <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer'>
          <img src={profileImg} alt="" className='w-8 h-8 rounded-full' />
        </div>
        <div className='flex items-center gap-1'>
          <p className='text-sm font-normal'>BigTech</p>
          <svg
            className='w-3 h-3 cursor-pointer'
            version="1.1"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            >
            <defs id="defs1"></defs>
            <path
                id="rect1"
                style={{
                fill: "none",
                stroke: "#237b7c",
                strokeWidth: "46.4278",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: "none"
                }}
                d="M 232.7861,90.531359 117.33567,194.34022 23.2139,89.663243"
            />
            </svg>

        </div>
        </div>
      </div>

    
    </div>
  )
}

export default Header

