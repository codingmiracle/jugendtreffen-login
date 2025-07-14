// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CheckinDetailPage = () => {
  return (
    <>
      <Metadata title="CheckinDetail" description="CheckinDetail page" />

      <h1>CheckinDetailPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CheckinDetailPage/CheckinDetailPage.tsx</code>
      </p>
      {/*
          My default route is named `checkinDetail`, link to me with:
          `<Link to={routes.checkinDetail()}>CheckinDetail</Link>`
      */}
    </>
  )
}

export default CheckinDetailPage
