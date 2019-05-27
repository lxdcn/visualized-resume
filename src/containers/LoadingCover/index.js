import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'

import { actions as uiStateActions } from '../../reducers/ui-state'


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

const LoadingCover = ({ classes, showErrorSnackbar, errorSnackbarClosed }) => (
  <div className={classes.root}>
    <CircularProgress/>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showErrorSnackbar}
        autoHideDuration={10000}
        onClose={() => errorSnackbarClosed()}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">Oh No! An unexpected error occurred when request data from API</span>}
        action={[
          <Button key="hmn" color="secondary" onClick={() => errorSnackbarClosed()}>
            OK
          </Button>,
        ]}
      />
  </div>
)

const mapStateToProps = state => ({
  showErrorSnackbar: state.uiState.showErrorSnackbar
})

const mapDispatchToProps = {
  ...uiStateActions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoadingCover))
