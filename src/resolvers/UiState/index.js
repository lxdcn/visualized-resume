export const defaults = {
  uiState: {
    __typename: 'UiState',
    state: 'UNAUTHORIZED', // 'LOADING', 'SOME_LOADING_COMPLETED'
    lastQueryResult: '',
    skipQueries: false,
  },
}

export const resolvers = {
  Mutation: {
    updateState: (_, { state }, { cache }) => {
      console.log('Resolver, Mutation updateState')
      console.log(state)
      const data = {
        uiState: {
          __typename: 'UiState',
          state,
          skipQueries: true,
        }
      }
      cache.writeData({ data })
      return null
    },
  }
}
