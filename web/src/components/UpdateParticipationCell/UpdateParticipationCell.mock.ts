// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  updateParticipation: {
    __typename: 'UpdateParticipation' as const,
    id: 42,
  },
})
