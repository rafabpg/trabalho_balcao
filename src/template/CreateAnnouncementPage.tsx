import { CreateAnnouncementProvider } from '@/context/CreateAnnouncementContext'
import StepperAnnouncement from '@/pages/StepperAnnouncement'
import React from 'react'

const CreateAnnouncementPage = () => {
  return (
    <CreateAnnouncementProvider>
        <StepperAnnouncement/>
    </CreateAnnouncementProvider>
  )
}

export default CreateAnnouncementPage