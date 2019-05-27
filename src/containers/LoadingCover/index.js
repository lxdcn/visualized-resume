import React from 'react'
import { withStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  root: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
}

const LoadingCover = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress/>
  </div>
)

export default withStyles(styles)(LoadingCover)
