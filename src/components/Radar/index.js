import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_BLIPS_QUERY = gql`
  {
    allBlips {
      quadrant
      name
      score
      desc
    }
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

  queryOnCompleted() {
    console.log('queryOnCompleted')
    // set status completed, cancel spinner
  }

  queryOnError() {
    console.log('queryonError')
    // set status 401, show cover
    // set status error, show sorry
  }

  render() {
    return (
      <Query query={ALL_BLIPS_QUERY} onCompleted={() => this.queryOnCompleted()} onError={() => this.queryOnError()}>
        {
          ({ loading, error, data }) => {
            let blips = defaultBlipsData
            if (data && data.allBlips) {
              blips = data.allBlips
            }
            if (loading) {
              // set status loading
            }
            console.log(error)
            return (
              <div>
                { blips.map((blip, idx) => <div key={idx}>{blip.quadrant}</div>) }
              </div>
            )
          }
        }
      </Query>
    )
  }
}

export default Radar
