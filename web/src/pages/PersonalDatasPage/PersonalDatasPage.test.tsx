import { render } from '@redwoodjs/testing/web'

import PersonalDatasPage from './PersonalDatasPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PersonalDatasPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonalDatasPage />)
    }).not.toThrow()
  })
})
