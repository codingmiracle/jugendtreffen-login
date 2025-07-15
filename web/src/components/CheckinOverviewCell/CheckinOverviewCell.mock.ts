// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  checkinOverview: {
    __typename: 'CheckinOverview' as const,
    id: 42,
  },
})
