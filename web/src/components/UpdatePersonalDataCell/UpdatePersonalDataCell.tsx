import type {
  UpdatePersonalDataQuery,
  UpdatePersonalDataQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  UpdatePersonalDataQuery,
  UpdatePersonalDataQueryVariables
> = gql`
  query UpdatePersonalDataQuery {
    updatePersonalData {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<UpdatePersonalDataQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  updatePersonalData,
}: CellSuccessProps<
  UpdatePersonalDataQuery,
  UpdatePersonalDataQueryVariables
>) => {
  return (
    <ul>
      {updatePersonalData.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
