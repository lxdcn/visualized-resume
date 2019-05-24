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
        {updateState => {
          // setTimeout(() => updateState({ variables: { state: 'UNAUTHORIZED' } }), 4000)
          return (
            <Query query={ALL_BLIPS_QUERY}
                   onCompleted={() => updateState({ variables: { state: 'SOME_LOADING_COMPLETED' } })}
                   onError={(error) => {
                     console.log(error)
                     // updateState({ variables: { state: 'UNAUTHORIZED' } })
                   }}
                   >
              {
                ({ loading, error, data, client }) => {
                  let blips = defaultBlipsData
                  if (data && data.allBlips) {
                    blips = data.allBlips
                  }
                  console.log('Radar rendering')

                  if (loading) {
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
