import type { PersonalDatasQuery } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import LoadingSpinner from 'src/components/Loading/LoadingSpinner'
import { navigate, routes } from '@redwoodjs/router'

export const QUERY: TypedDocumentNode<PersonalDatasQuery> = gql`
  query PersonalDatasQuery {
    personalDatas {
      id
      name
      familyName
      birthdate
      gender
      userId
    }
  }
`

export const Loading = () => <LoadingSpinner></LoadingSpinner>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  personalDatas,
}: CellSuccessProps<PersonalDatasQuery>) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="py-3 px-4 text-left font-semibold text-sm">
              User ID
            </th>
            <th className="py-3 px-4 text-left font-semibold text-sm">Name</th>
            <th className="py-3 px-4 text-left font-semibold text-sm">
              Family Name
            </th>
          </tr>
        </thead>
        <tbody>
          {personalDatas.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                navigate(routes.personalData({ id: String(row.id) }))
              }
            >
              <td className="py-3 px-4 text-gray-800">{row.userId}</td>
              <td className="py-3 px-4 text-gray-800">{row.name}</td>
              <td className="py-3 px-4 text-gray-800">{row.familyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
