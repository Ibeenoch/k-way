import React, { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import Header from '../header/Header'
import Switch from 'react-switch'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Keyword } from './KeyWords';
import { createACampaign, getACampaignById, updateACampaignById } from './CampaignService';

const CreateCampaign = () => {
    const { id } = useParams();
   const navigate = useNavigate();
    const [isCreatedCampaign, setIsCreatedCampaign] = useState(false);
    const [ isErr, setIsErr ] = useState(false);
    const [campaignName, setCampaignName] = useState<any>('');
    const [campaignDescription, setcampaignDescription] = useState<string>('' );
    const [started, setstarted] = useState<string>('');
    const [ended, setended] = useState<string>('');
    const [keywords, setKeyWords] = useState<string>('');
    const [digestCampaign, setdigestCampaign] = useState<boolean>(false );
    const [dailyDigest, setdailyDigest] = useState<string>('');
    const [linkedKeywords, setlinkedKeywords] = useState<string[]>([]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError]= useState<string>('');
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  
    const modalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    

    const getExistingCampaign = async() => {
        try {
            if(id){
            const data = await getACampaignById(parseInt(id));
            setCampaignName(data.campaignName);
            setcampaignDescription(data.campaignDescription);
            setdailyDigest(data.dailyDigest);
            setstarted(moment(data.startDate).format("DD/MM/YYYY"));
            setended(moment(data.endDate).format("DD/MM/YYYY"));
            setlinkedKeywords(data.linkedKeywords);
            setdigestCampaign(data && data.digestCampaign && data.digestCampaign === "No" ?  false : true);
            }
            
        } catch (error) {
           console.log(error) 
        }
    }
    
    useEffect(() => {
        if(id){
            getExistingCampaign();
        }
    }, [])


    // handle modal for any error
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
    }

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



    // end of modal; 

// get words entered in the linked keywords
    const handleWordsEntered = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        
        if(e.key === 'Enter' && keywords.trim()){
            if(!linkedKeywords.includes(keywords.trim())){
                setlinkedKeywords([...linkedKeywords, keywords.trim()]);
                setKeyWords('')
                e.preventDefault();
            }
         
        }
    }



      const handleRemove = (keyword: string) => {
        setlinkedKeywords(linkedKeywords.filter(k => k !== keyword));
      };

      const convertDateToServerDate = (dateString: string): string | null => {
        try {
          
        const date = moment(dateString, 'MM/DD/YYYY');
        const now = moment();
        const currentTime = moment.duration(moment(now).diff(moment().startOf('day')));

        const isoDate = moment(date)
            .hours(currentTime.hours())
            .minutes(currentTime.minutes())
            .seconds(currentTime.seconds())
            .milliseconds(currentTime.milliseconds())
            .toISOString();

        return isoDate;

        } catch (error) {
          console.error('Error converting date:', error);
          return null; 
        }
      }

      // post a campaign
    const handleCampaign = async(e: FormEvent) => {
        e.preventDefault();
        if(id){
            if( campaignName && started && linkedKeywords  && campaignDescription){
                const validateDateInputRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                 
                console.log('validated as ', validateDateInputRegex.test(started), validateDateInputRegex.test(ended));
                if( validateDateInputRegex.test(started) === false || validateDateInputRegex.test(ended) === false){
                    closePopup();
                    setIsErr(true);
                    openPopup();
                    setError('Please Enter a valid date in this format dd/mm/yyyy');
                    return;
                };
    
    
                const campaign = {
                    id: parseInt(id), campaignName, campaignDescription, startDate: convertDateToServerDate(started) , EndDate: convertDateToServerDate(ended), linkedKeywords, digestCampaign, dailyDigest,
                };

                try {
                  
                    const data = await updateACampaignById(parseInt(id), campaign)
                      closePopup();
                      setIsCreatedCampaign(true);
                      openPopup();
                } catch (error) {
                    console.log(error);
                }
            }

            closePopup();
            setIsErr(true);
            openPopup();
            setError('Please add all required fields');
            return;

        }else{
        if( campaignName && started && linkedKeywords && campaignDescription){
            const validateDateInputRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
             
            if( validateDateInputRegex.test(started) === false || validateDateInputRegex.test(ended) === false){
              console.log('validated as ', validateDateInputRegex.test(started));
                closePopup();
                setIsErr(true);
                openPopup();
                setError('Please Enter a valid date in this format dd/mm/yyyy');
                return;
            };


            const campaign = {
                campaignName, campaignDescription, startDate: convertDateToServerDate(started) , EndDate: convertDateToServerDate(ended), linkedKeywords, digestCampaign, dailyDigest,
            };

            try {              
                const data = await createACampaign(campaign);
                  setIsCreatedCampaign(true);
                  openPopup();
            } catch (error) {
                console.log(error);
            }
        }

        closePopup();
        setIsErr(true);
        openPopup();
        setError('Please add all required fields');
        return;

        };

    }

    const goBack = () => {
        navigate(-1);
    };


  return (
    <div>
    <div className='pb-16 pl-16 pr-16'>

  <div className='pt-6 pb-1 max-w-xl'>
    <h2 className='text-[#237b7c] text-md font-bold'>{ id ? 'Edit' : 'Create New'} Campaign</h2>
  </div>

  <form className="space-y-1  max-w-xl" onSubmit={handleCampaign} >
        <div>
          <label
            htmlFor="campName"
            className="block text-xs  leading-6 text-gray-600 flex"
          >
           <p>Campaign Name </p> <p className='text-red-600'> &nbsp;*</p>
          </label>
          <div className="mt-2">
            <input
              id="campName"
              name="campName"
              type="text"
              required
              value={campaignName}
              onChange={(e) => (setCampaignName(e.target.value))}
              placeholder="e.g The Future is now"
              className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:gray-red-300 text-[11px] sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="campDesc"
            className="block text-[11px]  leading-6 text-gray-500 flex"
          >
           <p>  Campaign Description</p> <p className='text-red-600'>&nbsp;*</p>
          </label>
          <div className="mt-1 mb-2">
            <textarea
              id="campDesc"
              name="campDesc"
              value={campaignDescription}
              onChange={(e) => (setcampaignDescription(e.target.value))}
              placeholder="Please add a description to your campaign"
              className="block pb-12 text-[11px] resize-none w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="start"
                  className="block text-xs leading-2 flex text-gray-600"
                >
                  <p>  Start Date </p> <p className='text-red-600'>&nbsp;*</p>

                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="start"
                    id="start"
                    value={started}
                    onChange={(e) => (setstarted(e.target.value))}
                    placeholder='dd/mm/yyyy'
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset  sm:text-[11px] sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="end"
                  className="block text-xs font-medium leading-2 text-gray-600"
                >
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="end"
                    id="end"
                    value={ended}
                    onChange={(e) => (setended(e.target.value))}
                    placeholder='dd/mm/yyyy'
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-[11px] sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-between py-4'> 
            <p className='text-xs '>Want to recieve daily digest about the campaign?</p>
            <label className="switch">
                <input type="checkbox" id='switch' name='switch' 
              onChange={(prev) => (!prev)} />
                <span className="slider round"></span>
                </label>
            
            </div>


        <div>
          <label
            htmlFor="keywords"
            className="block text-xs  leading-6 text-gray-600 flex"
          >
            <p>Linked Keywords </p> <p className='text-red-600'>&nbsp;*</p>
                     
          </label>
         
          <div className="mt-1 mb-2 border border-gray-300 rounded-md">
             <div className="flex flex-wrap">
                {linkedKeywords.map((keyword: any, index: any) => (
                <Keyword key={index} keyword={keyword} onRemove={handleRemove} />
                ))}
            </div>
            <textarea
              id="keywords"
              name="keywords"
              ref={inputRef}
              onKeyDown={handleWordsEntered}
              value={keywords}
              onChange={(e) => (setKeyWords(e.target.value))}
              placeholder="To add keywords, type your keyword and press enter"
              
              className="block pb-6 text-[11px] resize-none w-full border-none py-1.5 text-gray-600 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="notify"
            className="block text-xs leading-6 text-gray-600"
          >
            Kindly select how often you want to receive daily digest
          </label>
          <div className="mt-1">
            <select
              value={dailyDigest}
              id='notify'
              name='notify'
              onChange={(e) => (setdailyDigest(e.target.value))}
              className="block rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset text-[11px] sm:leading-6"
            >
                <option className='text-[11px]' id='notifySelect' value="none">Select</option>
                <option className='text-[11px]' id='notifyMonthly' value="monthly">Monthly</option>
                <option className='text-[11px]' id='notifyWeekly' value="weekly">Weekly</option>
                <option className='text-[11px]' id='notifyDaily' value="daily">Daily</option>
            </select>
          </div>
        </div>


        <div className='flex gap-6 pt-8'>
          <button
             onClick={goBack}
              type='button'
              className="rounded-sm border border-[#237b7c] px-14 py-1.5 text-sm font-semibold leading-6 text-[#237b7c] shadow-sm hover:bg-[#237b7c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
          <button
            type='submit'
            className="rounded-sm border border-[#237b7c] text-[#237b7c] hover:text-white px-7 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#237b7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            { id ? 'Edit Campaign' : 'Create Campaign'}
          </button>
         
        </div>
      </form>

      <div className={`${isOpenModal ? 'fixed' : 'hidden'} inset-0 bg-[#e4e4e2]  bg-opacity-50 flex items-center justify-center`}>
   
     
      {
          isCreatedCampaign ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center px-16 py-8" ref={modalRef}>
            <div className='flex justify-center'>
            <svg
            version="1.1"
            className='w-9 h-9'
            viewBox="0 0 256 256"
            xmlSpace="preserve"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            >
            <defs id="defs1"></defs>
            <g id="g1">
                <circle
                cx="127.85659"
                cy="127.85659"
                r="126.45"
                style={{
                    fill: "#237b7c",
                    fillRule: "nonzero",
                    stroke: "none",
                    strokeWidth: "2.81",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    strokeDasharray: "none"
                }}
                id="circle1"
                />
                <path
                d="m 115.58541,164.54487 c -0.0188,0 -0.0376,0 -0.0546,0 -2.44591,-0.0169 -4.76577,-1.08937 -6.36125,-2.94074 L 83.811115,132.15345 c -3.051747,-3.54281 -2.652875,-8.88995 0.891818,-11.9417 3.544693,-3.04987 8.889954,-2.651 11.941702,0.89182 l 19.025435,22.096 43.47329,-49.172262 c 3.09502,-3.5033 8.44592,-3.83256 11.9511,-0.73566 3.50331,3.0969 3.83256,8.447812 0.73566,11.951112 l -49.8985,56.44415 c -1.61054,1.81751 -3.92099,2.85796 -6.34621,2.85796 z"
                style={{
                    fill: "#ffffff",
                    fillRule: "nonzero",
                    stroke: "none",
                    strokeWidth: "1.88147",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    strokeDasharray: "none"
                }}
                strokeLinecap="round"
                id="path1"
                />
            </g>
            </svg>
    
            </div>
           
            <p className="my-8 text-[10px]">Campaign Successfully { id ? 'Updated' : 'Created'}!</p>
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
        ) : isErr ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center px-16 py-8" ref={modalRef}>
            <h2 className="text-xs text-red-600 font-medium mb-4">Error Invalid Date</h2>
              <p className="mb-4 text-red-600 text-[10px]">{error} </p>
              <div className='flex justify-center items-center gap-4'>
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

export default CreateCampaign
