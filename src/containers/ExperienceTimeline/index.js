import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Timeline from '../../components/Timeline'
import { actions as uiStateActions } from '../../reducers/ui-state'

const ALL_RANGES_QUERY = gql`
  query {
    allRanges {
      from
      to
      desc
    }
  }
`

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    width: '1000px',
  },
  header: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(4),
  }
})

const defaultRangesData = [
  { from: '2012-07', to: '2014-03', desc: '# hello, world' },
  { from: '2014-07', to: '2019-01', desc: '## world, hello' },
]

class ExperienceTimeline extends Component {
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
    const { classes, querySucceeded } = this.props
    const { querySkip } = this.state

    return (
      <Query query={ALL_RANGES_QUERY}
             onCompleted={querySucceeded}
             onError={error => this.queryOnError(error)}
             skip={querySkip}
             >
        {({ data, refetch }) => {
            this.refetch = refetch

            let ranges = defaultRangesData
            if (data && data.allRanges) {
              ranges = data.allRanges
            }

            return (
              <div className={classes.root}>
                <Typography variant='h2' className={classes.header} gutterBottom>
                  h3. Heading
                </Typography>
                <Timeline ranges={ranges} />
              </div>
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
)(withStyles(styles)(ExperienceTimeline))
