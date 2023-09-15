/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

export default function Description({ description }) {
  return (
    <section
      className='mt-6 w-full text-gray-500'
      dangerouslySetInnerHTML={{
        __html: description.html,
      }}
    />
  );
}
