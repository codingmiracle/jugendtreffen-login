import type { CheckinOverviewQuery } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

export const QUERY: TypedDocumentNode<CheckinOverviewQuery> = gql`
  query CheckinOverviewQuery {
    checkinOverview: checkinOverview {
      id
      name
      familyName
      checkinConfirmed
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  checkinOverview,
}: CellSuccessProps<CheckinOverviewQuery>) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredParticipations = checkinOverview.filter((row) =>
    [row.name, row.familyName, row.email].some((field) =>
      field?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
  )

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Nachname, or E-Mail..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            if (e.target.value != null) {
              setSearchTerm(e.target.value)
            }
          }}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="py-3 px-4 text-left font-semibold text-sm">
                Name
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm">
                Nachname
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm">
                E-Mail
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm">
                Check-in
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredParticipations.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-100 bg-gray-800 hover:bg-gray-700"
                onClick={() => navigate(routes.checkin({ id: String(row.id) }))}
              >
                <td className="py-3 px-4">{row.name}</td>
                <td className="py-3 px-4">{row.familyName}</td>
                <td className="py-3 px-4">{row.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      row.checkinConfirmed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {row.checkinConfirmed ? (
                      <>
                        <CheckIcon className="w-4 h-4 text-green-800" />
                        Ja
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        Nein
                      </>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
