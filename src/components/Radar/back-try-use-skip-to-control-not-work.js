import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_BLIPS_QUERY = gql`
  query {
    allBlips {
      quadrant
      name
      score
      desc
    }
    uiState @client {
      skipQueries
    }
  }
`
const UPDATE_STATE = gql`
  mutation UpdateState($state: String!) {
    updateState(state: $state) @client
  }
`

const defaultBlipsData = [
  { quadrant: 'I', name: 'a', score: 10,  },
  { quadrant: 'IV', name: '', score: 10,  },
  { quadrant: 'III', name: '', score: 10,  },
  { quadrant: 'II', name: '', score: 10,  },
]

class Radar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  queryOnCompleted(client) {
    console.log('queryOnCompleted')
    client.writeData({ data: { state: 'SOME_LOADING_COMPLETED' } })
    // set status completed, cancel spinner
  }

  querying(client) {
    console.log('querying')
    client.writeData({ data: { state: 'LOADING' } })
    // set status completed, cancel spinner
  }

  queryOnError(client) {
    console.log('queryonError')
    client.writeData({ data: { state: 'UNAUTHORIZED' } })
    // set status 401, show cover
    // set status error, show sorry
  }


  render() {
    return (
      <Mutation mutation={UPDATE_STATE}>
        {(updateState, { data }) => {
          data = data || { updateState: {} }
          console.log('da----------------------ta')
          console.log(data.updateState.skipQueries)
          return (
            <Query query={ALL_BLIPS_QUERY}
                   onCompleted={() => updateState({ variables: { state: 'SOME_LOADING_COMPLETED' } })}
                   onError={() => updateState({ variables: { state: 'UNAUTHORIZED' } })}
                   skip={data.updateState.skipQueries || false}>
              {
                ({ loading, error, data, client }) => {
                  let blips = defaultBlipsData
                  if (data && data.allBlips) {
                    blips = data.allBlips
                  }
                  console.log('Radar rendering')
                  console.log(data)

                  if (loading) {
                    console.log('loading')
                    // updateState({ variables: { state: 'LOADING' } })
                    // setTimeout(() => updateState({ variables: { state: 'LOADING' } }), 1)
                  }

                  return (
                    <div>
                      { blips.map((blip, idx) => <div key={idx}>{blip.quadrant}</div>) }
                    </div>
                  )
                }
              }
            </Query>
          )

        }}
      </Mutation>
    )
  }
}

export default Radar
