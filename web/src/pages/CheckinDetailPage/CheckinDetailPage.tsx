import { Metadata } from '@redwoodjs/web'
import { usePage } from '@redwoodjs/web/usePage'
import UpdateParticipationCell from 'src/components/UpdateParticipationCell'

const CheckinDetailPage = () => {
  const { id } = useParams()
  return (
    <>
      <Metadata title="Check In" description="Check In" />

      <section className="flex flex-col p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
        <h1>Check In</h1>
        <div className="mb-4l">
          <UpdateParticipationCell />
        </div>
      </section>
    </>
  )
}

export default CheckinDetailPage
