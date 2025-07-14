// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  checkin: {
    __typename: 'checkin' as const,
    id: 42,
  },
})
