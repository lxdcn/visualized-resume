import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import marked from 'marked';

import initateSvg from './d3/initiate-svg'
import drawAxis from './d3/draw-axis'
import drawDesc from './d3/draw-desc'

const moment = require('moment')

const styles = theme => ({
  root: {
    // backgroundColor: '#f3f9fe',
  },
  descDiv: {
    paddingLeft: ({ smallMedia }) => smallMedia ? 20 : 50,
    paddingRight: 10,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  }
})

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.divId = 'timeline-svg-div'
    this.svgId = 'timeline-svg'
    this.state = {
      descRectLocations: [
      ]
    }
  }

  extractYearSeries(ranges) {
    const boundariesInMomentObject = ranges.map(range => range.from).concat(ranges.map(range => range.to))
                                           .map(boundary => moment(boundary))
                                           .sort((a, b) => a.valueOf() - b.valueOf())
    const startingYear = boundariesInMomentObject[0].year()
    const endingYear = boundariesInMomentObject[boundariesInMomentObject.length - 1].year() + 1

    const yearSeries = []
    for (let year = startingYear; year <= endingYear; year++) { yearSeries.push(year) }
    return yearSeries
  }

  dimensionalSizes() {
    const { ranges, smallMedia } = this.props
    const yearSeries = this.extractYearSeries(ranges)

    const DEFAULT_WIDTH = 800
    const DEFAULT_HEIGHT_PER_YEAR = 140

    let width = DEFAULT_WIDTH, heightPerYear = DEFAULT_HEIGHT_PER_YEAR

    if (smallMedia) {
      const SLIM_DEFAULT_WIDTH = 500
      const SLIM_WIDTH_PADDING = 20 //TODO

      width = Math.min(window.innerWidth - SLIM_WIDTH_PADDING, SLIM_DEFAULT_WIDTH)
      heightPerYear = DEFAULT_HEIGHT_PER_YEAR * (DEFAULT_WIDTH / width) * 0.8
    }

    const height = yearSeries.length * heightPerYear
    return { width, heightPerYear, height }
  }

  drawSvg() {
    const { divId, svgId } = this
    const { ranges, classes } = this.props
    const yearSeries = this.extractYearSeries(ranges)
    const { width, heightPerYear, height } = this.dimensionalSizes()

    const svg = initateSvg(divId, svgId, width, height)
    const axisRightBoundary = drawAxis(svg, width, heightPerYear, height, yearSeries)
    drawDesc(svg, axisRightBoundary, width, heightPerYear, yearSeries, ranges, {
      descDiv: classes.descDiv
    })
  }

  componentDidMount() {
    this.drawSvg()
  }

  componentDidUpdate(prevProps) {
    const { ranges, smallMedia } = this.props

    if (ranges !== prevProps.ranges || smallMedia !== prevProps.smallMedia) {
      this.drawSvg()
    }
  }

  render() {
    const { classes } = this.props
    const { ranges } = this.props
    const { descRectLocations } = this.state
    const { divId, svgId } = this

    return (
      <div id={divId} className={classes.root}>
        <svg id={svgId}></svg>
      </div>
    )
  }
}

Timeline.propTypes = {
  ranges: PropTypes.arrayOf(PropTypes.object).isRequired,
  smallMedia: PropTypes.bool.isRequired,
}

export const StyledTimeline = withStyles(styles)(Timeline)

export default props => (
  <StyledTimeline
    {...props}
    smallMedia={useMediaQuery(useTheme().breakpoints.down('sm'))}
  />
)
