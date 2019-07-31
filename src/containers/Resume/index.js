import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import SkillSetRadar from '../SkillSetRadar'
import ExperienceTimeline from '../ExperienceTimeline'
import SideProjects from '../SideProjects'

import { LAYERS } from '../../reducers/ui-state'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 100,
  }
})

const Resume = props => {
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <SkillSetRadar />
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
