export const schema = gql`
  type Participation {
    id: BigInt!
    travelMethod: String
    participationRoleId: Int
    accommodation: Boolean
    accommodationLocation: String
    startDate: DateTime!
    endDate: DateTime!
    foodChoice: String!
    helpAfterwards: Boolean
    foundUsBy: String
    acceptPhotos: Boolean!
    acceptCoC: Boolean!
    eventId: Int
    event: Event!
    userId: String!
    participationRole: ParticipationRole
  }

  type ChekinRow {
    id: BigInt!
    name: String!
    familyName: String!
    email: String!
    checkinConfirmed: Boolean!
  }

  type Query {
    participations(userId: String): [Participation!] @requireAuth
    participation(id: BigInt!): Participation @requireAuth
    participationsForCheckin: [ChekinRow!] @requireAuth
  }

  input CreateParticipationInput {
    travelMethod: String
    participationRoleId: Int
    accommodation: Boolean
    accommodationLocation: String
    startDate: DateTime!
    endDate: DateTime!
    foodChoice: String!
    helpAfterwards: Boolean
    foundUsBy: String
    acceptPhotos: Boolean!
    acceptCoC: Boolean!
    eventId: Int!
    userId: String!
  }

  input UpdateParticipationInput {
    travelMethod: String
    participationRoleId: Int
    accommodation: Boolean
    accommodationLocation: String
    startDate: DateTime
    endDate: DateTime
    foodChoice: String
    helpAfterwards: Boolean
    foundUsBy: String
    acceptPhotos: Boolean
    acceptCoC: Boolean
    eventId: Int!
    userId: String!
  }

  type Mutation {
    createParticipation(input: CreateParticipationInput!): Participation!
      @requireAuth
    updateParticipation(
      id: BigInt!
      input: UpdateParticipationInput!
    ): Participation! @requireAuth
    deleteParticipation(id: BigInt!): Participation! @requireAuth
  }
`
