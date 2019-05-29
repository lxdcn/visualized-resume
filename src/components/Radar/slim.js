import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import DetailSection from './detail-section'

import initateSvg from './d3/initate-svg'
import drawBackgroundCirclesAndAxis from './d3/draw-slim-background-circles-and-axis'
import drawQuadrantLabels from './d3/draw-slim-quadrant-labels'


const styles = theme => ({
  root: {
    // backgroundColor: '#f3f9fe',
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    textAlign: 'center',
  },
})

let count = 0

class Radar extends Component {
  constructor(props) {
    super(props)

    this.divId = `radar-chart-div-${count++}`
    this.svgId = `radar-chart-${count++}`
    this.radius = 200
    // this.radius = Math.min(RADAR_WIDTH/2, RADAR_HEIGHT/2) * 0.95

    this.svgRefs = {}

    this.state = {
      clickedBlip: { quadrant: '', name: '' },
      clickedQuadrantIndex: 0,
    }
  }

  clickOnBlip(quadrant, name){
    const { quadrant: prevQuadrant, name: prevName } = this.state.clickedBlip
    if (prevQuadrant === quadrant && prevName === name) {
      this.setState({ clickedBlip: { quadrant: '', name: '' } })
      return
    }
    this.setState({ clickedBlip: { quadrant, name } })
  }

  componentDidMount() {
    const { divId, svgId } = this
    const { clickedQuadrantIndex } = this.state
    const { blips } = this.props
    const quadrantNames = [...new Set(blips.map(blip => blip.quadrant))]

    const raderWidth = Math.min(window.innerWidth, 600)
    const raderHeight = raderWidth * (6 / 8)
    this.radius = Math.min(raderWidth/2, raderHeight/2) * 0.9

    console.log(raderWidth, raderHeight, this.radius)

    const clickOnQuadrant = quadrantIndex => this.setState({ clickedQuadrantIndex: quadrantIndex })

    const { g } = initateSvg(divId, svgId, raderWidth, raderHeight)
    const { backgroundG } = drawBackgroundCirclesAndAxis(g, this.radius, quadrantNames, clickedQuadrantIndex, clickOnQuadrant)
    const { quadrantLabelsG } = drawQuadrantLabels(g, this.radius, quadrantNames, clickedQuadrantIndex, clickOnQuadrant)

    this.svgRefs.g = g
    this.svgRefs.backgroundG = backgroundG
    this.svgRefs.quadrantLabelsG = quadrantLabelsG
  }

  componentDidUpdate(prevProps) {
    const { radius } = this
    const { blips } = this.props
    const { clickedQuadrantIndex } = this.state
    const quadrantNames = [...new Set(blips.map(blip => blip.quadrant))]

    if (blips !== prevProps.blips) {
      if (this.svgRefs.quadrantLabelsG) {
        this.svgRefs.quadrantLabelsG.remove()
      }
      if (this.svgRefs.blipsG) {
        this.svgRefs.blipsG.remove()
      }
      const clickOnQuadrant = quadrantIndex => this.setState({ clickedQuadrantIndex: quadrantIndex })

      const { quadrantLabelsG } = drawQuadrantLabels(this.svgRefs.g, radius, quadrantNames, clickedQuadrantIndex, clickOnQuadrant)
      this.svgRefs.quadrantLabelsG = quadrantLabelsG
    }
  }

  componentWillMount() {
  }

  render() {
    const { classes, blips } = this.props
    const { clickedQuadrantIndex, clickedBlip } = this.state
    const { divId, svgId } = this
    const blipsGroupByQuadrant = blips.reduce((acc, cur, idx) => {
      acc[cur.quadrant] = acc[cur.quadrant] || []
      acc[cur.quadrant].push({
        key: idx,
        quadrant: cur.quadrant,
        name: cur.name,
        desc: cur.desc || ''
      })
      return acc
    }, {})
    const quadrants = Object.keys(blipsGroupByQuadrant)

    return (
      <div className={classes.root}>
        <div id={divId}>
          <svg id={svgId}></svg>
        </div>
        {clickedQuadrantIndex === 3 &&
          <DetailSection
            radarWidth={800}
            expand={clickedQuadrantIndex === 3}
            quadrantName={quadrants[3]}
            onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
            entries={blipsGroupByQuadrant[quadrants[3]]}
            clickedBlip={clickedBlip}
          />}
        {clickedQuadrantIndex === 2 &&
          <DetailSection
            radarWidth={800}
            expand={clickedQuadrantIndex === 2}
            quadrantName={quadrants[2]}
            onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
            entries={blipsGroupByQuadrant[quadrants[2]]}
            clickedBlip={clickedBlip}
          />}
        {clickedQuadrantIndex === 0 &&
          <DetailSection
            radarWidth={800}
            expand={clickedQuadrantIndex === 0}
            quadrantName={quadrants[0]}
            onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
            clickedBlip={clickedBlip}
            entries={blipsGroupByQuadrant[quadrants[0]]}
           />}
        {clickedQuadrantIndex === 1 &&
          <DetailSection
            radarWidth={800}
            expand={clickedQuadrantIndex === 1}
            quadrantName={quadrants[1]}
            onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
            clickedBlip={clickedBlip}
            entries={blipsGroupByQuadrant[quadrants[1]]}
          />}
      </div>
    )
  }
}

Radar.propTypes = {
  blips: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default withStyles(styles)(Radar)
