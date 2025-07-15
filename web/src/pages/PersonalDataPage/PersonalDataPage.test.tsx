import { render } from '@redwoodjs/testing/web'

import PersonalDataPage from './PersonalDataPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PersonalDataPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonalDataPage />)
    }).not.toThrow()
  })
})
