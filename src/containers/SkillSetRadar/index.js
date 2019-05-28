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
    this.refetch = null
    this.state = {
      querySkip: true
    }
  }

  componentDidUpdate(prevProps) {
    const { sendRequestToggleFlag } = this.props
    if (sendRequestToggleFlag !== prevProps.sendRequestToggleFlag && this.refetch) {
      if (this.state.querySkip) {
        this.setState({ querySkip: false })
      }
      this.refetch()
    }
  }

  queryOnError(error) {
    const { unauthorizedReceived, otherQueryError } = this.props
    console.error(error)

    if (error.networkError && error.networkError.statusCode === 401) {
      unauthorizedReceived()
    } else {
      otherQueryError()
    }
  }


  render() {
    const { querySucceeded } = this.props
    const { querySkip } = this.state

    return (
      <Query query={ALL_BLIPS_QUERY}
             onCompleted={querySucceeded}
             onError={error => this.queryOnError(error)}
             skip={querySkip}
             >
        {({ data, refetch }) => {
            this.refetch = refetch

            let blips = defaultBlipsData
            if (data && data.allBlips) {
              blips = data.allBlips
            }

            return (
              <Radar blips={blips} />
            )
          }}
      </Query>
    )
  }
}


const mapStateToProps = state => ({
  sendRequestToggleFlag: state.uiState.sendRequestToggleFlag
})

const mapDispatchToProps = {
  ...uiStateActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillSetRadar)
