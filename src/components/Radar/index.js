import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import DetailSection from './detail-section'
import { initateSvg, drawBackgroundCirclesAndAxis, drawBlips } from './d3/radar-in-d3'

const RADAR_WIDTH = 800
const RADAR_HEIGHT = 600

const styles = theme => ({
  root: {
    // backgroundColor: '#f3f9fe',
    position: 'absolute',
    display: 'flex',
    flexWrap: 'nowrap',
  },
})

let count = 0

class Radar extends Component {
  constructor(props) {
    super(props)

    this.divId = `radar-chart-div-${count++}`
    this.svgId = `radar-chart-${count++}`
    this.radius = Math.min(RADAR_WIDTH/2, RADAR_HEIGHT/2) * 0.95

    this.state = {
      clickedBlip: { quadrant: '', name: '' },
      hoveredQuadrantIndex: 0,
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
    const { divId, svgId, radius } = this
    const { blips } = this.props

    const hoverOnQuadrant = quadrantIndex => this.setState({ hoveredQuadrantIndex: quadrantIndex })


    const { svg, g } = initateSvg(divId, svgId, RADAR_WIDTH, RADAR_HEIGHT)
    drawBackgroundCirclesAndAxis(svg, g, RADAR_WIDTH, RADAR_HEIGHT, radius, blips, hoverOnQuadrant)
    drawBlips(svg, g, radius, blips, hoverOnQuadrant, (quadrant, name) => this.clickOnBlip(quadrant, name))
  }

  componentWillMount() {
  }

  render() {
    const { classes, blips } = this.props
    const { hoveredQuadrantIndex, clickedBlip } = this.state
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
        <DetailSection
          radarWidth={RADAR_WIDTH}
          expand={hoveredQuadrantIndex === 3}
          quadrantName={quadrants[3]}
          onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
          entries={blipsGroupByQuadrant[quadrants[3]]}
          clickedBlip={clickedBlip}
          flipped={true}
        />
        <DetailSection radarWidth={RADAR_WIDTH}
          expand={hoveredQuadrantIndex === 2}
          quadrantName={quadrants[2]}
          onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
          entries={blipsGroupByQuadrant[quadrants[2]]}
          clickedBlip={clickedBlip}
          flipped={true}
        />
        <div id={divId}>
          <svg id={svgId}></svg>
        </div>
        <DetailSection
          radarWidth={RADAR_WIDTH}
          expand={hoveredQuadrantIndex === 0}
          quadrantName={quadrants[0]}
          onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
          clickedBlip={clickedBlip}
          entries={blipsGroupByQuadrant[quadrants[0]]}
         />
        <DetailSection
          radarWidth={RADAR_WIDTH}
          expand={hoveredQuadrantIndex === 1}
          quadrantName={quadrants[1]}
          onClickBlip={(quadrant, name) => this.clickOnBlip(quadrant, name)}
          clickedBlip={clickedBlip}
          entries={blipsGroupByQuadrant[quadrants[1]]}
        />
      </div>
    )
  }
}

Radar.propTypes = {
  blips: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default withStyles(styles)(Radar)
