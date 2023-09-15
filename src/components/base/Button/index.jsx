/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

export default function Button({ label, sku }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
      value={sku}
      type='submit'
      className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
      {label}
    </button>
  );
}
