'use client';
import { Card } from 'flowbite-react';
import { Button, Timeline } from 'flowbite-react';
export const CardExperiences = () => {
  return (
    <Card className='w-full mr-2'>
      <div className="mb-4 flex">
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Experinces
        </h1>
      </div>

      <Timeline>
      <Timeline.Item>
        <Timeline.Point/>
        <Timeline.Content>
          <Timeline.Time>
            February 2022
          </Timeline.Time>
          <Timeline.Title>
            <div className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Application UI code in Tailwind CSS
            </div>
          </Timeline.Title>
          <Timeline.Body>
            <p className='text-sm'>
              Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
              E-commerce & Marketing pages.
            </p>
          </Timeline.Body>
         
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>
            March 2022
          </Timeline.Time>
          <Timeline.Title>
          <div className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Marketing UI design in Figma
          </div>
          </Timeline.Title>
          <Timeline.Body>
            <p className="text-sm">
              All of the pages and components are first designed in Figma and we keep a parity between the two versions even
              as we update the project.
            </p>
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>
            April 2022
          </Timeline.Time>
          <Timeline.Title>
          <div className="text-sm mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            E-Commerce UI code in Tailwind CSS
          </div>
          </Timeline.Title>
          <Timeline.Body>
            <p className="text-sm">
              Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
            </p>
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
      
    </Card>
  )
}
