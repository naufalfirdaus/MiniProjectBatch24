'use client';
import { Card } from 'flowbite-react';
import { CardProfileRightSide } from './cardProfileRightSide';
import {CardExperiences} from './cardExperiences'
import { Badge } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDataOneUserReq } from '@/redux-saga/action/userAction';
import { useSelector } from 'react-redux';

export const CardProfile = ({ dataProfile } : any) => {
  const dispatch = useDispatch()
  const id = dataProfile.userid
  const dataUser = useSelector((state:any)=>state.user.oneUser)
  
  
  useEffect(()=>{
    if(id){
      dispatch(getDataOneUserReq(id))
    }
  },[id])

    return(
    <>
    <div className='flex mt-5 ml-3 p-2'>
    <Card className='w-1/3 mr-4'>
    {dataUser && dataUser.map((item: any) => (
   <div key={item.userId} className="flex flex-col pb-10">
   <img
     alt="Bonnie image"
     className="mb-3 rounded-full shadow-lg"
     height="96"
     src="https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
     width="96"
     />

     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
       {`${item.userFirstName} ${item.userLastName}`}
     </h5>

     <span className="text-sm text-gray-500 dark:text-gray-400">
       FullStack Developer
     </span>

     <div className="flex  mb-4 items-center justify-space">
     <ul className=" divide-gray-200 dark:divide-gray-700">
       
       <li className="py-3 sm:py-4">
         <div className="flex items-center space-x-4">
         <div className="w-full flex-1">
             <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-words">
             Email
             </p>
             <p className="text-sm font-medium  text-gray-900 dark:text-white break-words">
             {`${item.userEmail[0]}`}
             </p>
         </div>
       </div>
     </li>
       <li className="py-3 sm:py-4">
         <div className="flex items-center space-x-4">
         <div className="w-full flex-1">
             <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-words">
             Home address 
             </p>
             <p className="text-sm font-medium  text-gray-900 dark:text-white break-words">
             92 Miles Drive, Newark, NJ 07103, California,
             United States of America 
             </p>
         </div>
       </div>
     </li>
       <li className="py-3 sm:py-4">
         <div className="flex items-center space-x-4">
         <div className="w-full flex-1">
             <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-words">
             Phone number 
             </p>
             <p className="text-sm font-medium  text-gray-900 dark:text-white break-words">
             {`${item.userPhoneNumber[0]}`}
             </p>
         </div>
       </div>
     </li>
       <li className="py-3 sm:py-4">
         <div className="flex items-center space-x-4">
         <div className="w-full flex-1">
             <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-words">
                 Software Skills
             </p>
             <p className="text-sm font-medium  text-gray-900 dark:text-white break-words">
             No doubt, i will find u and install linux on your fuckin laptop
             </p>
         </div>
       </div>
     </li>
     </ul>
      </div>

   </div>
    ))}
     

    
    </Card>
    <CardProfileRightSide/>
    </div>

    <div className='flex mt-0 ml-3 p-2'>
    <Card className='w-1/3 h-1/2 mr-4'>
      <div className="flex flex-col">
      <div className="mb-4 mt-0">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Skills
        </h1>
      </div>
        <div className="flex  mb-4 items-center justify-space">
        <ul className=" divide-gray-200 dark:divide-gray-700">
          
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
            <div className="flex flex-wrap">
            <Badge color="info" className='mr-2 mb-2'>
             ReactJs
           </Badge>
            <Badge color="failure" className='mr-2 mb-2'>
             Angular
           </Badge>
            <Badge color="gray" className='mr-2 mb-2'>
             PostgreSQL
           </Badge>
            <Badge color="success" className='mr-2 mb-2'>
             NodeJs
           </Badge>
            <Badge color="warning" className='mr-2 mb-2'>
             Javasrcipt
           </Badge>
            <Badge color="info" className='mr-2 mb-2'>
             Default
           </Badge>
            </div>
          </div>
        </li>
        </ul>
      </div>
      </div>
    </Card>
    <CardExperiences/>
    </div>
    </>
    )
}