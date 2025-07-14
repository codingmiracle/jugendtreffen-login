import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ParticipationsCell from 'src/components/ParticipationsCell'

const ParticipantView = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <Metadata title="Dashboard" description="Home Page" />

      <section className="flex flex-col md:flex-row p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
        <h1>Check In</h1>
      </section>
    </>
  )
}

export default ParticipantView
