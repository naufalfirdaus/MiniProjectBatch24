import React from 'react';
import { Tab } from '@headlessui/react';
import AppLayout from '../../component/layout/AppLayout';
import Apply from './apply';
import Page from '@/pages/component/commons/Page';

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

  return (
    <AppLayout>
      <Page title='Candidate'>
        <Tab.Group>
          <Tab.List className='text-base text-gray-500 border-b border-gray-200'>
            {tabs.map((tab, i) => 
              <Tab key={i} className={({selected}) => `inline-block px-4 py-3 rounded-t-lg hover:text-gray-500 hover:bg-gray-50 ${selected && 'text-blue-600 font-medium bg-gray-100'}`}>{tab.name}</Tab>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Apply />
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            <Tab.Panel>Content 4</Tab.Panel>
            <Tab.Panel>Content 5</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Page>
    </AppLayout>
  )
}
