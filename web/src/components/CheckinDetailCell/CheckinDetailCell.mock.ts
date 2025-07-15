// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  checkinDetail: {
    __typename: 'CheckinDetail' as const,
    id: 42,
  },
})
