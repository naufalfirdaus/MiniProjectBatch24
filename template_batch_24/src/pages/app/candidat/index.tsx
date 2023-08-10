import React, { useEffect } from 'react';
import { Tab } from '@headlessui/react';
import AppLayout from '../../component/layout/AppLayout';
import Apply from './apply';
import Page from '@/pages/component/commons/Page';
import Filtering from './filtering';
import { useDispatch, useSelector } from 'react-redux';
import { changeToIdle } from '@/redux/slices/candidateSlices';
import Contract from './contract';
import Disqualified from './disqualified';
import NotResponding from './notResponding';

const tabs = [
  {
    name: 'Apply',
    active: false,
  },
  {
    name: 'Filtering Test',
    active: false,
  },
  {
    name: 'Contract',
    active: false,
  },
  {
    name: 'Disqualified',
    active: false,
  },
  {
    name: 'Not Responding',
    active: false,
  },
];

export default function Candidat() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeToIdle(''));
  });

  return (
    <AppLayout>
      <Page title='Candidate'>
        <Tab.Group>
          <Tab.List className='text-base text-gray-500 border-b border-gray-200'>
            {tabs.map((tab, i) => 
              <Tab key={i} onClick={() => dispatch(changeToIdle(''))} className={({selected}) => `inline-block px-4 py-3 rounded-t-lg hover:text-gray-500 hover:bg-gray-50 ${selected && 'text-blue-600 font-medium bg-gray-100'}`}>{tab.name}</Tab>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Apply />
            </Tab.Panel>
            <Tab.Panel>
              <Filtering />
            </Tab.Panel>
            <Tab.Panel>
              <Contract />
            </Tab.Panel>
            <Tab.Panel>
              <Disqualified />
            </Tab.Panel>
            <Tab.Panel>
              <NotResponding />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Page>
    </AppLayout>
  )
}
