/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe. */

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDataProvider } from 'adobe-apis';

export function Modal({ children }) {
  const { modalIsOpen, openModal } = useDataProvider();

  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => openModal(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity sm:block md:block' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden md:inline-block md:h-screen md:align-middle'
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'>
              <Dialog.Panel className='flex w-full transform text-left text-base transition sm:my-8 sm:max-w-xl md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
                <div className='relative flex overflow-hidden rounded-lg bg-white shadow-2xl sm:px-6 sm:py-0 md:p-2 lg:p-2'>
                  <button
                    type='button'
                    className='absolute right-3 top-7 text-gray-400 hover:text-gray-500 sm:right-3 sm:top-7 md:right-6 md:top-6 lg:right-6 lg:top-4'
                    onClick={() => openModal(false)}>
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
