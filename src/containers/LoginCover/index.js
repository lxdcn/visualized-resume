import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

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
    zIndex: 10,
  },
  form: {
    width: '21em',
    maxWidth: '90%',
    display: 'flex',
    justifyContent: 'center',
  },
  textField: {
    fontFamily: 'monospace',
  }
}

class LoginCover extends Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off" className={classes.form}>
          <TextField
            className={classes.textField}
            placeholder="Please enter the key (hash in URL)"
            margin="normal"
            fullWidth
            variant="outlined"
            autoFocus
            spellcheck="false"
          />
        </form>
      </div>

    )
  }
}

export default withStyles(styles)(LoginCover)
