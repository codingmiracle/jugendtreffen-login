import { useAuth } from 'src/auth'
import { Metadata } from '@redwoodjs/web'
import CheckinCell from 'src/components/CheckinCell'

const QuartierView = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const personalData = currentUser?.personalData

  if (isAuthenticated && personalData.role.id === 2) {
    return (
      <>
        <Metadata title="Check In" description="Check In" />

        <section className="flex flex-col p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
          <h1>Check In</h1>
          <div className="mb-4l">table</div>
        </section>
      </>
    )
  }
}

export default QuartierView
