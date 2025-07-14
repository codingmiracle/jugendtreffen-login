import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import LoadingSpinner from 'src/components/Loading/LoadingSpinner'
import DefaultView from 'src/pages/HomePage/DefaultView'
import ParticipantView from 'src/pages/HomePage/ParticipantView'
import CheckinView from 'src/pages/HomePage/CheckinView'
import QuartierView from 'src/pages/HomePage/QuartierView'

const HomePage = () => {
  const { loading, isAuthenticated, currentUser } = useAuth()
  const personalData = currentUser?.personalData

  if (loading) {
    return (
      <>
        <Metadata title="Home" description="Home page" />
        <div className="flex flex-col items-center justify-center mt-20 w-full">
          <LoadingSpinner />
        </div>
      </>
    )
  }

  if (isAuthenticated && personalData.role.id === 1) {
    return <CheckinView />
  }

  if (isAuthenticated && personalData.role.id === 2) {
    return <QuartierView />
  }

  if (isAuthenticated && personalData.role.id === 3) {
    return <ParticipantView />
  }

  return <DefaultView />
}

export default HomePage
