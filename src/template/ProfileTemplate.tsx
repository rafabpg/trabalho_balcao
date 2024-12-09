import ProfileSidebar from '@/components/Molecules/ProfileSidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfileTemplate = () => {
  return (
    <section className='flex flex-row'>
        <ProfileSidebar />
        <div className='flex-grow'>
            <Outlet/>
        </div>
    </section>
  )
}

export default ProfileTemplate