import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'


const DEFAULT_WIDTH = 200
const styles = theme => ({
  root: {
    paddingTop: 40,
    cursor: 'default',
    userSelect: 'none',
    transition: 'width 0.2s ease-out',
    overflow: 'hidden',
    transform: ({ flipped }) => flipped ? 'scale(-1, 1)' : null,
  },
  entries: {
    height: '80%',
    columnGap: 0,
    width: DEFAULT_WIDTH,
    columnWidth: DEFAULT_WIDTH,
    // paddingLeft: 10,
  },
  entry: {
    transform: ({ flipped }) => flipped ? 'scale(-1, 1)' : null,
  },
  quadrantName: {
    textTransform: 'uppercase',
    width: DEFAULT_WIDTH,
    transform: ({ flipped }) => flipped ? 'scale(-1, 1)' : null,
    fontWeight: 'bold',
  },
  blipName: {
    cursor: 'pointer',
  },
  desc: {
    overflow: 'hidden',
    wordWrap: 'break-word',
    marginTop: 0,
    transition: 'max-height 0.3s linear, margin-bottom 0.3s linear',
    fontWeight: 100,
  },
})

class DetailSection extends Component {
  toggleDesc() {
    this.setState({
      open: !this.state.open
    })
  }

  componentDidMount() {
  }

  render() {
    const { classes, quadrantName, entries, expand, onClickBlip, clickedBlip, } = this.props

    const expandDesc = entry => clickedBlip && clickedBlip.quadrantIndex === entry.quadrantIndex && clickedBlip.name === entry.name
    const blipDescDynamicStyle = entry => ({
      maxHeight: expandDesc(entry) ? (10 + 24 * Math.ceil(entry.desc.length / 20.0)) : 0,
      marginBottom: expandDesc(entry) ? 10 : 0,
    })

    return (
      <section className={classes.root} style={{width: expand ? DEFAULT_WIDTH : 0}}>
        <Typography variant="h5" className={classes.quadrantName} gutterBottom> {quadrantName} </Typography>
        <div className={classes.entries}>
          {entries.map((entry, id) => (
            <div className={classes.entry} key={id}>
              <Typography
                variant="subtitle1"
                className={classes.blipName}
                onClick={() => onClickBlip(entry.quadrant, entry.name)}
              >
                {entry.name}
              </Typography>
              {entry.desc &&
                <p className={classes.desc} style={blipDescDynamicStyle(entry)}> {entry.desc} </p>
              }
            </div>
          ))}
        </div>

      </section>
    )
  }
}

DetailSection.defaultProps = {
  flipped: false
}

DetailSection.propTypes = {
  quadrantName: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  expand: PropTypes.bool.isRequired,
  onClickBlip: PropTypes.func,
  clickedBlip: PropTypes.object,
  flipped: PropTypes.bool,
}

export default withStyles(styles)(DetailSection)
