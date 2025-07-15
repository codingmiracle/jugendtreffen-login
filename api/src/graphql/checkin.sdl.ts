export const schema = gql`
  type CheckinOverviewType {
    id: BigInt!
    name: String
    familyName: String
    email: String
    checkinConfirmed: Boolean!
  }

  type CheckinDetailType {
    id: BigInt!
    name: String
    familyName: String
    email: String
    birthdate: DateTime
  }

  type Query {
    checkinOverview: [CheckinOverviewType!] @requireAuth
    checkinDetails(participationId: BigInt!): CheckinDetailType @requireAuth
  }
`
