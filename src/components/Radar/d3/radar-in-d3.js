import * as d3 from 'd3'

import forceWithinQuandrant from './force-within-quadrant'
import forcePlaceholdingCirclesTailingDad from './force-placeholding-circles-tailing-dad'

const initateSvg = (divId, svgId, width, height) => {
  const _divId = `#${divId}`
  const _svgId = `#${svgId}`

  d3.select(_divId).select(_svgId).remove()

  const svg = d3.select(_divId).append('svg')
                               .attr('id', svgId)
                               .attr('width', width)
                               .attr('height', height)
                               .style('user-select', 'none')
  const g = svg.append('g')
               .attr('transform', `translate(${width/2}, ${height/2})`)
  return { svg, g }
}


const hoverInQuadrantEffect = (g, quadrantIndex) => {
  g.selectAll(`.quadrant-${quadrantIndex} path`)
   .transition()
   .duration('100')
   .style('fill-opacity', (d, i) => (1 - 0.2 * i))

  g.select(`g.quadrant-labels > text.quadrant-label-${quadrantIndex}`)
   .transition()
   .duration('100')
   .attr('font-weight', 700)
}

const hoverOutQuadrantEffect = (g, quadrantIndex) => {
  g.selectAll(`.quadrant-${quadrantIndex} path`)
   .transition()
   .duration('100')
   .style('fill-opacity', (d, i) => (0.7 - 0.2 * i))

  g.select(`g.quadrant-labels > text.quadrant-label-${quadrantIndex}`)
   .transition()
   .duration('100')
   .attr('font-weight', 200)
}


const drawBackgroundCirclesAndAxis = (svg, g, width, height, radius, blips, hoverOnQuadrant) => {
  const quadrantNames = [...new Set(blips.map(blip => blip.quadrant))]
  const quadrantCount = quadrantNames.length

  const arcs = d3.pie()(new Array(quadrantCount).fill(1))

  const arcConfig = (annulusIndex, focus = false) => { // Relationship between padAngle and radius see: https://github.com/d3/d3-shape#arc_padAngle
    const cornerRadiusValue = annulusIndex === 2 ? 4 : 0
    let padAngleValue = (1.0 / (annulusIndex + 1)) * 0.01
    let outerRadiusValue = radius / 3 * (annulusIndex + 1)
    let innerRadiusValue = 3

    if (focus) {
      innerRadiusValue = innerRadiusValue  + 14
      padAngleValue = padAngleValue * 14
      outerRadiusValue = outerRadiusValue + 14
    }
    return d3.arc()
             .padAngle(padAngleValue)
             .innerRadius(innerRadiusValue)
             .cornerRadius(cornerRadiusValue)
             .outerRadius(outerRadiusValue)
  }

  const newBlipCoordinatesOnFocus = (x, y) => {
    const r = Math.sqrt(x * x + y * y)
    const sin = y / r
    const cos = x / r
    const newR = r + 14
    return { x: sin * newR, y: cos * newR}
  }

  const eachQuadrantRectBackdrop = g.append('g').attr('class', 'quadrant-rect-backdrop')
                                              .selectAll('rect')
                                              .data(quadrantNames)
                                              .enter()
                                                .append('rect')
                                                .attr('x', (d, i) => i === 0 || i === 1 ? 0 : - width / 2)
                                                .attr('y', (d, i) => i === 1 || i === 2 ? 0 : - height / 2)
                                                .attr('width', width / 2)
                                                .attr('height', height / 2)
                                                .attr('fill-opacity', 0)
                                                .style('z-index', -100)
                                                .on('mouseover', (d, i) => {
                                                  hoverInQuadrantEffect(g, i)
                                                  hoverOnQuadrant(i)
                                                })
                                                .on('mouseout', (d, i) => {
                                                  hoverOutQuadrantEffect(g, i)
                                                })

  const quadrantG = g.append('g').attr('class', 'background-circle')
                               .selectAll('path')
                               .data(arcs)
                               .enter()
                                 .append('g')
                                 .attr('class', (d, i) => `quadrant-${i}`)

  quadrantG.selectAll('path')
         .data((d, i) => [{d, i}, {d, i}, {d, i}])
         .enter().append('path')
         .attr('class', ({ d }, i) => `annulus-${i}`)
         .style('fill', '#DBDBDB')
         .attr('d', ({ d }, i) => arcConfig(i)(d) )
         .style('fill-opacity', (d, i) => (0.7 - 0.2 * i))
         .style('z-index', 0)
         .on('mouseover', ({ d, i }, j) => {  // i is quadrant index, j is annulusIndex
           hoverInQuadrantEffect(g, i)
           hoverOnQuadrant(i)
         })
         .on('mouseout', ({ d, i }, j) => {
           hoverOutQuadrantEffect(g, i)
         })

  const eachQuadrantLabel = g.append('g').attr('class', 'quadrant-labels')
                                       .selectAll('text')
                                       .data(quadrantNames)
                                       .enter()
                                         .append('text')
                                         .attr('class', (d, i) => `quadrant-label-${i}`)
                                         .attr('x', (d, i) => Math.sin(Math.PI/4) * radius * (i === 0 || i === 1 ? 1 : -1))
                                         .attr('y', (d, i) => Math.sin(Math.PI/4) * radius * (i === 1 || i === 2 ? 1 : -1))
                                         .attr('font-size', '1.5em')
                                         .attr('font-weight', 200)
                                         .text(d => d.toUpperCase())
                                         .on('mouseover', (d, i) => {
                                           hoverInQuadrantEffect(g, i)
                                           hoverOnQuadrant(i)
                                         })
                                         .on('mouseout', (d, i) => {
                                           hoverOutQuadrantEffect(g, i)
                                         })

  const quadrantLabelBBox = index => eachQuadrantLabel.nodes()[index].getBBox()

  eachQuadrantLabel.attr('dx', (d, i) =>  (i === 0 || i === 1 ? 0 : -quadrantLabelBBox(i).width))
  eachQuadrantLabel.attr('dy', (d, i) =>  (i === 0 || i === 3 ? 0 : 0.5 * quadrantLabelBBox(i).height))
}


const enhanceBlipsData = (radius, blips) => {
  const blipShapes = [ { shapeName: 'rect', }, { shapeName: 'circle', } ]

  const uniqueQuadrantNames = [...new Set(blips.map(blip => blip.quadrant))]
  const minAndMaxOfBlipScore = blips.map(blip => blip.score)
                                   .reduce((acc, cur) => [Math.min(acc[0], cur), Math.max(acc[1], cur)], [Infinity, -Infinity])
  const scoreToRadiusScale = d3.scaleLinear().domain(minAndMaxOfBlipScore).range([radius, 50])

  return blips.map(blip => {
    const quadrantIndex = uniqueQuadrantNames.indexOf(blip.quadrant)
    const r = scoreToRadiusScale(blip.score)
    return {
      ...blip,
      r,
      quadrantIndex,
      ...blipShapes[quadrantIndex % blipShapes.length],
      x: 0,
      y: 0,
    }
  })
}

const drawBlips = (svg, g, radius, blips, hoverOnQuadrant, clickOnBlip) => {
  const color = d3.scaleOrdinal(d3.schemeCategory10)
  const enhancedBlips = enhanceBlipsData(radius, blips)

  const eachBlip = g.append('g')
                    .attr('class', 'blips')
                    .selectAll('g.blip')
                    .data(enhancedBlips)
                    .enter()
                      .append('g')
                      .attr('class', 'blip')
                      .attr('quadrant-name', d => d.quadrant)
                      .attr('quadrant-index', d => d.quadrantIndex)
                      .style('cursor', 'pointer')
                      .style('pointer-events', 'click')
                      .on('mouseover', ({ quadrantIndex }) => {
                        hoverInQuadrantEffect(g, quadrantIndex)
                        hoverOnQuadrant(quadrantIndex)
                      })
                      .on('mouseout', ({ quadrantIndex}) => {
                        hoverOutQuadrantEffect(g, quadrantIndex)
                      })
                      .on('click', ({ quadrant, name }) => {
                        clickOnBlip(quadrant, name)
                      })

  const eachBlipSymbol = eachBlip.append(d => document.createElementNS(d3.namespaces.svg, d.shapeName))
                                 .attr('class', 'blip-element blip-symbol')
                                 .style('fill', d => color(d.quadrantIndex))
                                 .attr('width', 22)
                                 .attr('height', 22)
                                 .attr('r', 12)
                                 .attr('rx', '0.4em')
                                 .attr('ry', '0.4em')

  const eachBlipText = eachBlip.append('text')
                               .attr('class', 'blip-element blip-text')
                               .text(d => d.name)

  const blipSymbolBBox = index => eachBlipSymbol.nodes()[index].getBBox()
  const blipTextBBox = index => eachBlipText.nodes()[index].getBBox()

  const positionSymbolAndText = withPlaceholdingCircles => {
    return () => {
      eachBlipSymbol.attr('x', ({ x }, i) => x - blipSymbolBBox(i).width / 2)
                    .attr('y', ({ y }, i) => y - blipSymbolBBox(i).height / 2)
                    .attr('cx', ({ x }) => x)
                    .attr('cy', ({ y }) => y)

      eachBlipText.attr('x', ({ quadrantIndex, x }, i) => (quadrantIndex === 0 || quadrantIndex === 1) ? (x + blipSymbolBBox(i).width / 2) : (x - blipTextBBox(i).width - blipSymbolBBox(i).width / 2))
                  .attr('y', ({ quadrantIndex, y }, i) => (quadrantIndex === 1 || quadrantIndex === 2) ? (y + blipTextBBox(i).height / 2) : y)

      if (withPlaceholdingCircles) {
        eachPlaceholdingCircle.attr('cx', ({ x }) => x)
                              .attr('cy', ({ y }) => y)
      }
    }
  }

  const simulation = d3.forceSimulation(enhancedBlips)
                       .force('radial', d3.forceRadial(d => d.r))
                       .force('in-quandrant', forceWithinQuandrant())
                       .on('tick', positionSymbolAndText(false))
                       .alphaDecay(0.01)


  const BLIP_COLLIDE_RADIUS_MARGIN = 10
  const addPlaceholdingCircleForRadialCollideForce = blips => blips.flatMap((blip, index) => {
    blip.radius = Math.max(blipSymbolBBox(index).width, blipSymbolBBox(index).height) / 2 + BLIP_COLLIDE_RADIUS_MARGIN
    const placeholdingCircleAmount = blipTextBBox(index).height === 0 ? 0 : Math.floor(blipTextBBox(index).width / blipTextBBox(index).height)
    return [
      blip,
      ...[...Array(placeholdingCircleAmount).keys()].map(nthForBlip => ({
        dad: blip,
        isPlaceholder: true,
        nth: nthForBlip,
        radius: blipTextBBox(index).height / 2,
        x: 0,
        y: 0,
      }))
    ]
  })
  const withPlaceholdingCircles = addPlaceholdingCircleForRadialCollideForce(enhancedBlips)

  const eachPlaceholdingCircle = g.select('g.blips').selectAll('g.fake-circle')
                                                    .data(withPlaceholdingCircles.filter(d => d.isPlaceholder))
                                                    .enter()
                                                      .append('g')
                                                      .attr('class', 'fake-circle')
                                                      .append('circle')
                                                      .style('pointer-events', 'none')
                                                      .attr('r', d => d.radius)
                                                      .attr('cx', d => d.x)
                                                      .attr('cy', d => d.x)
                                                      .attr('fill-opacity', 0)
                                                      .attr('stroke', '#000000')
                                                      .attr('stroke-opacity', 0.1)
                                                      .attr('dad-name', d => d.dad.name)

  const simulation2 = d3.forceSimulation(withPlaceholdingCircles)
                        .force('collide', d3.forceCollide(d => d.radius).strength(0.999))
                        .force('position-placeholding-circles', forcePlaceholdingCirclesTailingDad())
                        .on('tick', positionSymbolAndText(true))
                        .alphaDecay(0.01)
}


export { initateSvg, drawBackgroundCirclesAndAxis, drawBlips }
