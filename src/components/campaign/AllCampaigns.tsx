import axios from 'axios';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { deleteACampaignById, getACampaignById, getCampaigns } from './CampaignService';

const AllCampaigns = () => {
    interface ICampaign {
        campaignDescription : string;
        campaignName: string;
        campaignStatus : string;
        dailyDigest : string;
        digestCampaign : string;
        endDate : string;
        id: number;
        linkedKeywords: string[];
        startDate: string;
    };

const [fetchedCampaign, setFetchCampaign] = useState<any>([]);
const [currentPage, setCurrentpage] = useState<number>(1);
const [totalresult, setTotalResult] = useState<number>(0);
const resultsPerPage = 7; 
const navigate = useNavigate();
const [isDeleteCampaign, setIsDeleteCampaign] = useState<boolean>(false);
const [isDeletedCampaign, setIsDeletedCampaign] = useState<boolean>(false);
const [deletedId, setDeletedId] = useState<number>()
const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
const [justDelete, setJustDelete] = useState<boolean>(false);
const modalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
const [ singleCampaign ,setSingleCampaign ] = useState<ICampaign>();



    const fetchCampaign = async(page: number) => {
        const data = await getCampaigns();
        setTotalResult(data.length);
        const startIndex = (page - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        setFetchCampaign(data.slice(startIndex, endIndex));
    }

    useEffect(() => {
      fetchCampaign(currentPage);
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

 const pageDiv = Math.ceil(totalresult / resultsPerPage);


 const renderPagination = () => {
    const pages = [];
    const totalPagesToShow = 7;
    const totalPages = pageDiv;

    if (totalPages <= totalPagesToShow + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
      let endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

      if (endPage === totalPages) {
        startPage = endPage - totalPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift(1, '...');
      }

      if (endPage < totalPages) {
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  const paginationPages = renderPagination();


 const handleViewCampaign = (id: number) => {
    navigate(`/campaign/${id}`)
    
 }
 const handleEditCampaign = (id: number) => {
    navigate(`/edit/campaign/${id}`)
 }


 const closePopup = () => {
    setIsOpenModal(false)
};

const openPopup = () => {
    setIsOpenModal(true)
};

const closeModalClick = (e: MouseEvent) => {
    if(modalRef.current && !modalRef.current.contains(e.target as Node)){
        closePopup();
    }
};

const confirmDeleteCampaign = async(id: number) => {
    setIsDeletedCampaign(false);
    setConfirmDelete(false);
    const data = await getACampaignById(id);
    setSingleCampaign(data);
    setDeletedId(id);
    setIsDeleteCampaign(true);
    openPopup();
    
}

const handleAcceptedDelete = () => {
    setConfirmDelete(true)
}

const deleteCampaign = async(deletedId: any) => {
    const data = await deleteACampaignById(deletedId);
    closePopup();
    setIsDeleteCampaign(false);
    setIsDeletedCampaign(true);
    openPopup();
}

// update campaign after it is deleted
useEffect(() => {
    const index = fetchedCampaign.findIndex((k: any) => k.id == deletedId);
    setFetchCampaign(fetchedCampaign.filter((k: any) => k.id !== deletedId ));
    setJustDelete(true);
}, [isDeletedCampaign])

useEffect(() => {
    setFetchCampaign(fetchedCampaign);
}, [justDelete])

useEffect(() => {
    if(confirmDelete){
       deleteCampaign(deletedId);  
    }
   
}, [confirmDelete])

useEffect(() => {
    if(isOpenModal){
        document.addEventListener('mousedown', closeModalClick);
    }else{
        document.removeEventListener('mousedown', closeModalClick);
    };

    return () => {
        document.addEventListener('mousedown', closeModalClick);
    }
}, [isOpenModal])


return (
    <div>
    <div className='pb-16 pl-16 pr-16'>

  <div className='pt-6 pb-1'>
    <h2 className='text-[#237b7c] text-md font-bold'>All Campaigns</h2>
  </div>

  <div className='flex items-center gap-4 pt-5 pb-6'>
    <div className='py-1 px-2 border border-[#237b7c] rounded-md cursor-pointer flex gap-[1px]'> <p className='text-[#237b7c] text-xs '>All </p> <p className='text-[#237b7c] text-xs '> &#40;90&#41; </p></div>
    <div className='py-1 px-2 border border-[#237b7c] rounded-md cursor-pointer flex gap-[1px]'> <p className='text-[#237b7c] text-xs '>Inactive </p> <p className='text-[#237b7c] text-xs '> &#40;90&#41; </p></div>
    <div className='py-1 px-2 border border-[#237b7c] rounded-md cursor-pointer flex gap-[1px]'> <p className='text-[#237b7c] text-xs '>Active </p> <p className='text-[#237b7c] text-xs '> &#40;90&#41; </p></div>
   
    <div className='flex gap-3 items-center  pl-8'>
  <div className='relative cursor-pointer'>
        <input type="text" className='text-[10px] w-[225px] px-1 rounded-md border border-gray-300 h-7' placeholder='Search...' name="" id="" />
        <div className='absolute top-1/2 right-3 transform -translate-y-1/2'>
        <svg className='w-3 h-3' version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
        <g><g><g><path fill="#666666" d="M96.1,10.5c-18.4,1.9-36,9.2-50.7,21.1c-4.1,3.3-12.3,11.7-15.2,15.5c-3.9,5-7.8,11.4-10.4,16.6C3.7,96.9,7.6,135,30.2,164.6c2.9,3.9,11.2,12.3,15.2,15.5c34.5,27.8,82.4,28.8,117.6,2.4l5.2-3.9l33.4,33.4c36.3,36.2,34.3,34.5,38.6,33.7c2.2-0.4,5.1-3.4,5.5-5.5c0.8-4.2,2.4-2.3-33.7-38.6l-33.4-33.4l3.9-5.2c26.4-35.2,25.4-83.2-2.4-117.6c-3.3-4.1-11.7-12.3-15.5-15.2C144.7,15,120.4,8,96.1,10.5z M116,25.4c9.6,1.2,17.5,3.6,25.9,7.9c40,20,56.4,68.8,36.5,108.5c-14,27.7-42,45.1-72.6,45.1c-27,0-52.4-13.7-67.6-36.5C18.7,121.3,20.7,82,42.9,54.7c2.7-3.3,9.4-9.9,12.7-12.5C72.2,28.9,95,22.6,116,25.4z"/></g></g></g>
        </svg>
        </div>
    </div>

    <div className='relative cursor-pointer'>
        <input type="text" className='text-[10px] w-[225px] px-1 rounded-md border border-gray-300 h-7' placeholder='Filter By Date' name="" id="" />
        <div className='absolute top-1/2 right-3 transform -translate-y-1/2'>
        {/* arrow down icon  */}
        <svg
        className='w-3 h-3'
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 256 256"
        >
        <defs></defs>
        <g
            style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1
            }}
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
            <path
            d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
            style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                opacity: 1
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
            />
        </g>
        </svg>

        </div>
    </div>
  </div>

  </div>

  <table  className=''>
      <thead className='bg-[#f0f4f5] rounded-lg'>
        <tr className='w-full text-[#455555]'>
          <th className='font-bold text-xs w-[150px] text-left p-2 rounded-tl-md rounded-bl-md'>S/N</th>
          <th className='font-bold text-xs w-[150px] text-left p-2'>Campaign Name</th>
          <th className='font-bold text-xs w-[150px] text-left p-2'>Start Date</th>
          <th className='font-bold text-xs w-[150px] text-left p-2'>Status</th>
          <th className='font-bold text-xs w-[150px] text-left p-2 rounded-tr-md rounded-br-md'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fetchedCampaign.map((row: any, index: any) => (
          <tr key={index}>
            <td className='text-xs text-[#666666] w-[150px] text-left border-b border-gray-200 p-2'>{row.id}</td>
            <td className='text-xs text-[#666666]  w-[150px] text-left border-b border-gray-200 p-2'>{row.campaignName}</td>
            <td className='text-xs text-[#666666]  w-[150px] text-left border-b border-gray-200 p-2'>{moment(row.startDate).format('DD/MM/YYYY')}</td>
            <td className={` ${row.campaignStatus === 'Inactive' ? 'text-[#990100]' : 'text-[#009a18]' } text-xs w-[150px] text-left p-2 border-b border-gray-200`}> {row && typeof row.campaignStatus === 'string' && row.campaignStatus.toUpperCase()} </td>
            <td className='text-xs text-[#666666]  w-[150px] text-left border-b border-gray-200 p-2'>
                <div className='flex items-center gap-3'>

                <div onClick={() => handleViewCampaign(row.id)}>
               {/* view campaign icon  */}
                    <svg
                    fill="#666666"
                    version="1.1"
                    id="Capa_1"
                    className='w-4 h-4 cursor-pointer'
                    viewBox="0 0 37.52 37.52"
                    stroke="#000000"
                    stroke-width="0.00037518999999999996"
                    transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"
                    xmlns="http://www.w3.org/2000/svg"
                    ><defs
                    id="defs1" />

                    <g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0" />

                    <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.75038" />

                    <g
                    id="SVGRepo_iconCarrier"> <g
                    id="g1"> <path
                    d="M 37.087,17.705 C 36.753,17.367 28.434434,6.0381945 18.391434,6.0381945 8.3484342,6.0381945 0.766,17.367 0.433,17.705 c -0.577,0.584 -0.577,1.523 0,2.107 0.333,0.34 8.5051395,11.815232 18.548139,11.815232 10.043,0 17.771861,-11.476232 18.105861,-11.813232 0.575,-0.584 0.575,-1.524 0,-2.109 z M 18.98114,28.258666 C 12.26014,28.258666 6.156,20.798 3.738,18.757 c 2.411,-2.04 7.912435,-9.3502397 14.653435,-9.3502397 6.72,0 12.972565,7.3142397 15.389565,9.3542397 -2.412,2.041 -8.05886,9.497666 -14.79986,9.497666 z M 18.76,13.009 c 3.176,0 5.75,2.574 5.75,5.75 0,3.175 -2.574,5.75 -5.75,5.75 -3.177,0 -5.75,-2.574 -5.75,-5.75 0,-3.175 2.573,-5.75 5.75,-5.75 z"
                    id="path1" /> </g> </g>

                    </svg>
                </div>

                <div onClick={() => handleEditCampaign(row.id)}>
                    {/* edit campaign icon  */}
                    <svg className='w-3 h-3 stroke-[#666666] cursor-pointer' fill="none" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                 </div>

                 <div onClick={() => confirmDeleteCampaign(row.id)}>
                    {/* delete campaign icon  */}
                    <svg
                        className='w-4 h-5 cursor-pointer'
                        viewBox="0 0 210 297"
                        version="1.1"
                        id="svg1"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <defs id="defs1" />
                        <g id="layer1">
                            <path
                            id="rect1"
                            style={{
                                fill: "none",
                                fillRule: "evenodd",
                                stroke: "#666666",
                                strokeWidth: 21,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeDasharray: "none"
                            }}
                            d="m 60.533894,68.852689 c 0,0 0.522805,-6.050841 6.722506,-8.894693 5.150969,-2.362791 15.847079,-1.608254 18.517667,-1.608254 2.355176,0 9.224579,-0.838702 13.117975,0.955027 5.835098,2.688294 8.621268,8.380926 8.621268,8.380926 z M 12.836687,73.520577 159.29469,74.104074 Z M 29.75839,74.104004 V 186.71884 c 0,0 -1.279217,13.30852 4.084506,18.67224 5.226194,5.2262 18.088301,4.08451 18.088301,4.08451 h 71.770293 c 0,0 9.60279,0.3165 14.0038,-4.08451 4.67598,-4.67606 4.66793,-15.75459 4.66793,-15.75459 V 74.104004 Z"
                            />
                            <path
                            style={{
                                fill: "none",
                                fillRule: "evenodd",
                                stroke: "#666666",
                                strokeWidth: "19.6454",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeDasharray: "none"
                            }}
                            d="m 67.28722,106.6766 c 0,64.87327 0,64.87327 0,64.87327"
                            id="path4"
                            />
                            <path
                            style={{
                                fill: "none",
                                fillRule: "evenodd",
                                stroke: "#666666",
                                strokeWidth: "19.6454",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeDasharray: "none"
                            }}
                            d="m 106.38152,105.50961 c 0,64.87327 0,64.87327 0,64.87327"
                            id="path9"
                            />
                        </g>
                    </svg>
                </div>


                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className='fixed bottom-5 flex items-center gap-3 w-[60%] justify-between'>
    <div className='flex items-center gap-3'>
        {
            <>
            <button onClick={() => handlePageChange(currentPage <= 1 ? 1 : currentPage - 1) }>
                {/* icon for previous page   */}
            <svg className='w-[9px] h-[9px]' fill="#666666"  stroke='#666666' style={{ strokeWidth: "12"}} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 312 511.42"><path fill-rule="nonzero" d="M306.3 32.62 65.46 252.86 312 478.8l-29.84 32.62L0 252.83 276.46 0z"/></svg>
            </button>
          

        {paginationPages.map((page, index) => (
            <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={typeof page !== 'number'}
            >
            <div
              className={`flex justify-center items-center ${
                currentPage === page ? 'bg-[#237b7c]' : ''
              } px-2 py-1 rounded-full cursor-pointer`}
            >
              <p
                className={`text-xs pt-[1px] font-bold ${
                  currentPage === page ? 'text-white' : 'text-[#666666]'
                }`}
              >
                {page}
              </p>
            </div>
          </button>
        ))}

            <button className='pl-8' onClick={() => handlePageChange(  currentPage === pageDiv ? pageDiv  :  currentPage + 1) }>
                <svg  fill="#666666"  stroke='#666666' style={{ strokeWidth: "12"}} className='w-[10px] h-[10px]'  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
                    viewBox="0 0 330 330" >
                <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                    C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                    C255,161.018,253.42,157.202,250.606,154.389z"/>
                </svg>
            </button>
            </>
        }

    </div>
      
        <p className='text-xs font-medium text-black'>showing {resultsPerPage} of {totalresult} results</p>
    </div>

 
    <div className={`${isOpenModal ? 'fixed' : 'hidden'} inset-0 bg-[#e4e4e2]  bg-opacity-50 flex items-center justify-center`}>
     {
        isDeletedCampaign ?  (

            <div className="bg-white p-6 rounded-lg shadow-lg text-center px-16 py-8" ref={modalRef}>
            <h2 className="text-xs  font-medium pb-4 mb-4 border-b border-gray-300">Campaign Deleted!</h2>
            <p className="my-8 text-[10px]"> {singleCampaign && singleCampaign.campaignName ? singleCampaign.campaignName : ''} campaign has been deleted</p>
            <div className='flex justify-center items-center gap-4'>
            <Link to="/">
                <button
                className={`bg-[#237b7c] rounded-lg text-[10px] text-white px-6 hover:text-white py-1`}
                onClick={closePopup}
                >
                Go Back to campaign list
                </button>
            </Link>
    
            </div>
          </div>
    ) : isDeleteCampaign ? (

       
        <div className="bg-white p-6 rounded-lg shadow-lg text-center px-16 py-8" ref={modalRef}>
          <h2 className="text-xs  font-medium mb-4">Stop Campaign</h2>
          <p className="mt-4 text-[10px]">Are you sure you want to delete { singleCampaign && singleCampaign.campaignName ? singleCampaign.campaignName : ''} campaign?</p>
          <p className="mb-4 text-[10px]">This action cannot be undone.</p>
          <div className='flex justify-center items-center gap-4'>
          <button
          onClick={closePopup}
            className={`border border-[#237b7c] hover-border-none rounded-lg text-[10px] text-black px-6 hover:text-white py-1 rounded hover:bg-[#237b7c]`}
          >
            Cancel
          </button>
  
          <button
            className="bg-red-700 text-[10px] text-white px-2 py-1 rounded hover:bg-red-700"
            type='button'
            onClick={handleAcceptedDelete}
          >
            Delete Campaign
          </button>
          </div>
        </div>
       ) : (
        <></>
       )
     }
      
    </div>

  </div>
</div>
  )
}

export default AllCampaigns
