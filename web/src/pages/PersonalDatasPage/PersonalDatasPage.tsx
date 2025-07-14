import { Metadata } from '@redwoodjs/web'
import PersonalDatasCell from 'src/components/PersonalDatasCell'
import { useAuth } from 'src/auth'

const PersonalDatasPage = () => {
  const { loading, isAuthenticated, currentUser } = useAuth()
  const personalData = currentUser?.personalData

  if (isAuthenticated && personalData.role.id <= 1) {
    return (
      <>
        <Metadata title="PersonalDatas" description="PersonalDatas Overview" />

        <h1>Persönliche Daten</h1>

        <PersonalDatasCell />
      </>
    )
  }

  return
}

export default PersonalDatasPage
