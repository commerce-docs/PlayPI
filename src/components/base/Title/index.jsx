/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it.
*/

export default function Title({ title, subtitle }) {
  return (
    <div className='border-b border-gray-200 pb-5'>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        {title}
      </h3>
      <p className='mt-2 max-w-4xl text-sm text-gray-500'>{subtitle}</p>
    </div>
  );
}
