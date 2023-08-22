import React from 'react'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import CardInformation from './edit/cardEditProfile';
import CardAddEducation from './add/cardAddEducation';
import { useState } from 'react';

const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        delete: 'hover:bg-red-400',
        edit: 'hover:bg-yellow-300  ',
        add: 'hover:bg-emerald-300'
      },
    },
  };

const EducationCard = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const [email, setEmail] = useState("");
    const props = { openModal, setOpenModal, email, setEmail };

  return (
<div className='education-section'>
    <div className="flex  mb-4 items-center justify-space">
      <ul className=" divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex justify-around space-x-7">
          <div className="w-full mr-20 flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              School
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-words">
              Universitas Komputer Indonesia Bandung
              </p>
          </div>
          <div className="w-full flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              Degree
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
              Bachelor
              </p>
          </div>

        </div>
      </li>
        <li className="py-3 sm:py-4">
          <div className="flex  items-center space-x-4">

          <div className="w-full mr-20 flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              Field Study
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
              Informatic Engineering
              </p>
          </div>

          <div className="w-full flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              Grade(IPK)
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
              3,5
              </p>
          </div>
        </div>
      </li>

        <li className="py-3 sm:py-4">
          <div className="flex  items-center space-x-4">

          <div className="w-1/2 mr-20 flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              Year
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
              2018 until 2021
              </p>
          </div>
          <div className="w-full flex-1">
              <p className="text-sm font-medium  text-gray-500 dark:text-gray-400 break-all">
              Activity
              </p>
              <p className="text-sm font-medium  text-gray-900 dark:text-white break-all">
              Sekretaris HMJ
              </p>
          </div>
        </div>
      </li>
      </ul>
    </div>
    <div className="mb-4">
      <h5 className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white">
        Description
      </h5>
      <p className='text-xs text-gray-900 dark:text-white'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nisi ornare mi faucibus, 
      vitae tristique orci rutrum. Sed semper, nulla ac maximus aliquet, ligula mi pretium nibh, 
      sed suscipit sem nulla vitae risus. Donec sem ligula, congue ut arcu sed, vulputate viverra mauris.
       Morbi semper nisl risus, ac imperdiet tellus lacinia vitae. Quisque tortor eros, 
       maximus hendrerit maximus ac, ullamcorper id purus. Mauris vitae velit eu ligula convallis auctor vitae rutrum metus.
      </p>
    </div>
    <span className="flex items-center justify-end">
  <div className="flex items-center space-x-2">
    <Flowbite theme={{ theme: customTheme }}>
      {/* Tombol Edit */}
      <Button color="edit" className="w-5 h-5" onClick={() => props.setOpenModal('form-elements')}>
        <svg className="w-3 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
        </svg>
      </Button>
      {/* Modal untuk Edit */}
      <Modal show={props.openModal === 'form-elements'} size="lg" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <CardInformation/>
        </Modal.Body>
      </Modal>
    </Flowbite>
    <Flowbite theme={{ theme: customTheme }}>
      {/* Tombol Delete */}
      <Button color="delete" className="w-5 h-5" onClick={() => props.setOpenModal('form-elements')}>
        <svg className="w-2 h-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </Button>
      {/* Modal untuk Delete */}
      <Modal show={props.openModal === 'form-elements'} size="lg" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <CardInformation/>
        </Modal.Body>
      </Modal>
    </Flowbite>
  </div>
</span>

  </div>
  )
}

export default EducationCard