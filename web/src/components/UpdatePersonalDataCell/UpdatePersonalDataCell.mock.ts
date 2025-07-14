// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  updatePersonalData: [
    {
      __typename: 'UpdatePersonalData' as const,
      id: 42,
    },
    {
      __typename: 'UpdatePersonalData' as const,
      id: 43,
    },
    {
      __typename: 'UpdatePersonalData' as const,
      id: 44,
    },
  ],
})
