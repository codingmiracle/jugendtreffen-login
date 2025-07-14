import type { PersonalDatasQuery } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import LoadingSpinner from 'src/components/Loading/LoadingSpinner'

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
    <ul>
      {personalDatas.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
