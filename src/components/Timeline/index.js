import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import marked from 'marked';

import initateSvg from './d3/initiate-svg'
import drawAxis from './d3/draw-axis'
import drawDescBackground from './d3/draw-desc-background'

const moment = require('moment')

const styles = theme => ({
  root: {
    // backgroundColor: '#f3f9fe',
  },
  descDiv: {
    position: 'absolute',
    padding: 20,
    paddingLeft: 50,
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

  positionDescDiv(ranges) {
    this.setState({
      descRectLocations: ranges.map((_, index) => document.getElementById(`desc-rect-${index}`).getBoundingClientRect())
                               .map(({ top, left, height, width }) => ({
                                  top: top + window.pageYOffset || document.documentElement.scrollTop,
                                  left: left + window.pageXOffset || document.documentElement.scrollLeft,
                                  height,
                                  width
                                }))
    })
  }

  componentDidMount() {
    const { divId, svgId } = this
    const { ranges } = this.props
    const yearSeries = this.extractYearSeries(ranges)

    const DEFAULT_WIDTH = 800
    const SLIM_WIDTH_PADDING = 20
    const svgWidth = Math.min(DEFAULT_WIDTH, window.innerWidth - SLIM_WIDTH_PADDING)
    // const svgWidth = 400

    const svg = initateSvg(divId, svgId, svgWidth, yearSeries.length)
    const axisRightBoundary = drawAxis(svg, svgWidth, yearSeries)
    drawDescBackground(svg, axisRightBoundary, svgWidth, yearSeries, ranges)

    this.positionDescDiv(ranges)
    // window.onresize = () => this.positionDescDiv(ranges)
  }

  render() {
    const { classes } = this.props
    const { ranges } = this.props
    const { descRectLocations } = this.state
    const { divId, svgId } = this

    return (
      <div id={divId} className={classes.root}>
        <svg id={svgId}></svg>
        {ranges.map((range, index) => (
          <div key={index} className={classes.descDiv} id={`desc-div-${index}`}
               style={{  ...descRectLocations[index]  }}
               dangerouslySetInnerHTML={{ __html: range.desc ? marked(range.desc) : ''}} />
        ))}
      </div>
    )
  }
}

Timeline.propTypes = {
  ranges: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default withStyles(styles)(Timeline)
