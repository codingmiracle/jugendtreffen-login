import type {
  PersonalDataQuery,
  PersonalDataQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  PersonalDataQuery,
  PersonalDataQueryVariables
> = gql`
  query PersonalDataQuery($id: BigInt!) {
    personalData(id: $id) {
      name
      id
      familyName
      birthdate
      gender
      role {
        id
        desc
      }
      phoneNumber
      phoneCaretakerContact
      country
      city
      postalCode
      address
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<PersonalDataQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  personalData,
}: CellSuccessProps<PersonalDataQuery, PersonalDataQueryVariables>) => {
  return (
    <>
      <span>{JSON.stringify(personalData)}</span>
    </>
  )
}
