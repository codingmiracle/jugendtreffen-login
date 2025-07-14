import { render } from '@redwoodjs/testing/web'

import CheckinDetailPage from './CheckinDetailPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CheckinDetailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckinDetailPage />)
    }).not.toThrow()
  })
})
