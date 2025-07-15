import type {
  CheckinDetailsQuery,
  CheckinDetailsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  CheckinDetailsQuery,
  CheckinDetailsQueryVariables
> = gql`
  query FindCheckinDetailsQuery($id: BigInt!) {
    checkinDetails: checkinDetails(participationId: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<CheckinDetailsQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  checkinDetail,
}: CellSuccessProps<CheckinDetailsQuery, CheckinDetailsQueryVariables>) => {
  return <div>{JSON.stringify(checkinDetail)}</div>
}
