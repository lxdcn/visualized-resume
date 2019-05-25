import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Radar from '../../components/Radar'
import { actions as uiStateActions } from '../../reducers/ui-state'

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

const defaultBlipsData = [
  { quadrant: 'I', name: 'a', score: 10,  },
  { quadrant: 'IV', name: '', score: 10,  },
  { quadrant: 'III', name: '', score: 10,  },
  { quadrant: 'II', name: '', score: 10,  },
]

class SkillSetRadar extends Component {
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
    // set status completed, cancel spinner
  }

  queryOnError(error) {
    const { unauthorizedReceived, otherQueryError } = this.props
    console.log('queryonError')
    console.log(error)
    otherQueryError()

    // set status 401, show cover
    // set status error, show sorry
  }


  render() {
    const { querySucceeded } = this.props
    return (
      <Query query={ALL_BLIPS_QUERY} onCompleted={querySucceeded} onError={error => this.queryOnError(error)}>
        {
          ({ loading, error, data, client }) => {
            let blips = defaultBlipsData
            if (data && data.allBlips) {
              blips = data.allBlips
            }

            if (loading) {
              // updateState({ variables: { state: 'LOADING' } })
              // setTimeout(() => updateState({ variables: { state: 'LOADING' } }), 1)
            }

            return (
              <Radar blips={blips} />
            )
          }
        }
      </Query>
    )
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  ...uiStateActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillSetRadar)
