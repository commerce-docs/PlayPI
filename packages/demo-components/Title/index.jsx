/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

export function Title({ title, subtitle }) {
  return (
    <div className='border-b border-gray-200 pb-5'>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        {title}
      </h3>
      <p className='mt-2 max-w-4xl text-sm text-gray-500'>{subtitle}</p>
    </div>
  );
}
