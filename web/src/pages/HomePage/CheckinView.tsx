import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const ParticipantView = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const personalData = currentUser?.personalData
  return (
    <>
      <Metadata title="Check In" description="Check In" />

      <section className="flex flex-col p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
        <h1>Check In</h1>
        <div className="mb-4l">CheckinCell</div>
      </section>
    </>
  )
}

export default ParticipantView
