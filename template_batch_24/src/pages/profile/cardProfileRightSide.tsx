'use client';
import { Card } from 'flowbite-react';


export const CardProfileRightSide = () => {
  return (
    <Card className='w-full mr-2'>
      <div className="mb-4 flex">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          General Information
        </h1>
      </div>
      <div className="mb-4">
        <h5 className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          About me
        </h5>
        <p className='text-xs text-gray-900 dark:text-white'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nisi ornare mi faucibus, 
        vitae tristique orci rutrum. Sed semper, nulla ac maximus aliquet, ligula mi pretium nibh, 
        sed suscipit sem nulla vitae risus. Donec sem ligula, congue ut arcu sed, vulputate viverra mauris.
         Morbi semper nisl risus, ac imperdiet tellus lacinia vitae. Quisque tortor eros, 
         maximus hendrerit maximus ac, ullamcorper id purus. Mauris vitae velit eu ligula convallis auctor vitae rutrum metus.
        </p>
      </div>
      <div className="flex  mb-4 items-center justify-space">
        <ul className=" divide-gray-200 dark:divide-gray-700">
          
          <li className="py-3 sm:py-4">
            <div className="flex  items-center space-x-4">

            <div className="w-full mr-20 flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Education
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                Thomas Jeff High School, Stanford University
                </p>
            </div>

            <div className="w-full flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Join Date
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                12-09-2021 
                </p>
            </div>

          </div>
        </li>

          <li className="py-3 sm:py-4">
            <div className="flex  items-center space-x-4">

            <div className="w-full mr-20 flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Organization
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                Fullstact NodeJs Batch 24
                </p>
            </div>

            <div className="w-full flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Languages
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                English, German, Italian
                </p>
            </div>

          </div>
        </li>

          <li className="py-3 sm:py-4">
            <div className="flex  items-center space-x-4">

            <div className="w-1/2 mr-20 flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Role
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                Backend Developer
                </p>
            </div>

            <div className="w-full flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Department
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                IT
                </p>
            </div>

          </div>
        </li>

          <li className="py-3 sm:py-4">
            <div className="flex  items-center space-x-4">

            <div className="w-full mr-20 flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Work History
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                Twitch, Google, Apple
                </p>
            </div>

            <div className="w-full flex-1">
                <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
                Birthday
                </p>
                <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
                15-08-1990 
                </p>
            </div>
          </div>
        </li>
      
        </ul>
      </div>
    </Card>
  )
}
