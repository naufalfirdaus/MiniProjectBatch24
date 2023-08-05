import React from 'react'

import AppLayout from '../../component/layout/AppLayout';
import Link from 'next/link';

export default function Hiring() {
  return (
    <AppLayout>
      <div className='text-black'>Hiring</div>
      <Link href={`hiring/post/create`} className='text-black'>Create Post</Link>
    </AppLayout>
  )
}
