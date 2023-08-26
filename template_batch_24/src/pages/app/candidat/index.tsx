import React, { useEffect, useState } from 'react';
import { Menu, Tab } from '@headlessui/react';
import AppLayout from '../../component/layout/AppLayout';
import Apply from './apply';
import Page from '@/pages/component/commons/Page';
import Filtering from './filtering';
import { useDispatch } from 'react-redux';
import { getCandidateFetch } from '@/redux-saga/slices/candidateSlices';
import Contract from './contract';
import Disqualified from './disqualified';
import NotResponding from './notResponding';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
import monthData from '@/helper/month';

const tabs = [
  {
    name: 'Apply',
    status: 'Apply',
    active: false,
  },
  {
    name: 'Filtering Test',
    status: 'Ready Test',
    active: false,
  },
  {
    name: 'Contract',
    status: 'Passed',
    active: false,
  },
  {
    name: 'Disqualified',
    status: 'Failed',
    active: false,
  },
  {
    name: 'Not Responding',
    status: 'Not Responding',
    active: false,
  },
];

export default function Candidate() {
  const [tabFilter, setTabFilter] = useState<String>('Apply');
  const [month, setMonth] = useState<any>();
  const [year, setYear] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if(year && month){
      dispatch(getCandidateFetch({status: tabFilter, month: month, year: year.getFullYear()}));
    } else if(month){
      dispatch(getCandidateFetch({status: tabFilter, month: month}));
    } else if(year){
      dispatch(getCandidateFetch({status: tabFilter, year: year.getFullYear()}));
    }
  }, [year, month]);

  const handleTabClick = (status: String) => {
    setTabFilter(status);
    setYear(undefined);
    setMonth(undefined);
  }

  const handleFilterYear = (date: Date, e: any) => {
    e.preventDefault();
    setYear(date);
  }

  return (
    <AppLayout>
      <Page title='Candidate'>
        <Tab.Group>
          <div className='flex justify-between border-b'>
            <Tab.List className='text-base text-gray-500 border-gray-200'>
              {tabs.map((tab, i) => 
                <Tab key={i} onClick={() => handleTabClick(tab.status)} className={({selected}) => `inline-block px-4 py-3 rounded-t-lg hover:text-gray-500 hover:bg-gray-50 ${selected && 'text-blue-600 font-medium bg-gray-100'}`}>{tab.name}</Tab>
              )}
            </Tab.List>
            <div className='flex items-center'>
              <Menu as='div' className='relative'>
                <Menu.Button className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5'> Month
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
                </Menu.Button>
                <Menu.Items className='absolute grid grid-cols-3 z-10 text-sm w-36 text-gray-600 right-0 mt-2 origin-top-right bg-white divide-y divide-x divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {monthData.map((month: any) => 
                    <Menu.Item key={month.value}>
                        <Link href='#' onClick={() => setMonth(month.value)} className="block p-2 text-center hover:bg-gray-100">{month.name}</Link>
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Menu>
              <DatePicker
                  className='ml-2 inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm py-1.5 w-16 text-center'
                  selected={year}
                  placeholderText="Year"
                  onChange={(date: Date, e) => handleFilterYear(date, e)}
                  dateFormat="yyyy"
                  showYearPicker
              />
            </div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <Apply status={tabFilter}/>
            </Tab.Panel>
            <Tab.Panel>
              <Filtering status={tabFilter}/>
            </Tab.Panel>
            <Tab.Panel>
              <Contract status={tabFilter}/>
            </Tab.Panel>
            <Tab.Panel>
              <Disqualified status={tabFilter}/>
            </Tab.Panel>
            <Tab.Panel>
              <NotResponding status={tabFilter}/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Page>
    </AppLayout>
  )
}
