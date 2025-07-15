import { Metadata } from '@redwoodjs/web'
import { useParams } from '@redwoodjs/router'

import CheckinDetailCell from 'src/components/CheckinDetailCell/CheckinDetailCell'

const CheckinDetailPage = () => {
  const { id } = useParams()

  return (
    <>
      <Metadata title="Check In" description="Check In" />

      <section className="flex flex-col p-6 mx-auto lg:py-0 h-full mt-20 gap-2">
        <h1>Check In</h1>

        <CheckinDetailCell id={id}></CheckinDetailCell>
      </section>
    </>
  )
}

export default CheckinDetailPage
