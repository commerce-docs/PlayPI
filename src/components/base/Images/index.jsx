/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

import classNames from '@/utils/classNames';
import { Tab } from '@headlessui/react';

export default function Images({ productDetails }) {
  return (
    <div className='mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
      <h2 className='sr-only'>Product images</h2>
      <div className='grid grid-cols-1 lg:grid-cols-1 lg:grid-rows-1 lg:gap-8'>
        <Tab.Group as='div' className='flex flex-col-reverse'>
          {/* Image selector */}
          <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
            <Tab.List className='grid grid-cols-3 gap-6'>
              {productDetails.media_gallery.map((image) => (
                <Tab
                  key={image.position}
                  className='relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4'>
                  {({ selected }) => (
                    <>
                      <span className='sr-only'>{image.name}</span>
                      <span className='absolute inset-0 overflow-hidden rounded-md'>
                        <img
                          src={image.url}
                          alt=''
                          className='h-full w-full object-cover object-center'
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? 'ring-blue-500' : 'ring-transparent',
                          'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
            {productDetails.media_gallery.map((image) => (
              <Tab.Panel key={image.position}>
                <img
                  src={image.url}
                  alt={image.label}
                  className='h-full w-full object-cover object-center sm:rounded-lg'
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
