import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import SkillSetRadar from '../SkillSetRadar'
import ExperienceTimeline from '../ExperienceTimeline'

import { LAYERS } from '../../reducers/ui-state'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    filter: ({ showLayer }) => {
      if (showLayer === LAYERS.LOGIN) return 'blur(4px)'
      if (showLayer === LAYERS.LOADING) return 'blur(2.5px)'
      return null
    },
  }
})

const Resume = props => {
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <SkillSetRadar />
      <ExperienceTimeline />
    </div>
  )
}


const mapStateToProps = state => ({
  showLayer: state.uiState.showLayer
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resume)
