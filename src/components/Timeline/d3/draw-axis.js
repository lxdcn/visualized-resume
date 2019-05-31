export default (svg, width, heightPerYear, height, yearSeries) => {
  const ARROW_HEAD_WIDTH = 8
  const ARROW_HEAD_HEIGHT = 8
  const AXIS_WIDTH = 4
  const SCALE_MARKER_WIDTH = 15
  const ARROW_OVER_HEAD = 0.5

  svg.append('defs')
       .append('marker')
         .attr('id', 'arrow-head')
         .attr('markerWidth', ARROW_HEAD_WIDTH)
         .attr('markerHeight', ARROW_HEAD_HEIGHT)
         .attr('refX', ARROW_HEAD_WIDTH / 2)
         .attr('refY', ARROW_HEAD_HEIGHT / 2)
           .append('path')
             .attr('d', 'M0,8 L4,0 L8,8 L4,5 Z')

  const g = svg.append('g')
                 .attr('class', 'axis')

  const axisLine = g.append('line')
                    .attr('class', 'axis')
                    .attr('x1', AXIS_WIDTH / 2)
                    .attr('y1', height)
                    .attr('x2', AXIS_WIDTH / 2)
                    .attr('y2', ARROW_HEAD_HEIGHT * 2)
                    .attr('stroke', 'black')
                    .attr('stroke-width', AXIS_WIDTH)
                    .attr('marker-end', 'url(#arrow-head)')

  const eachScale = g.selectAll('line.scale')
                     .data(yearSeries.reverse())
                     .enter()
                       .append('g')
                       .attr('class', 'scale')

  const eachScaleMarker = eachScale.append('line')
                                   .attr('x1', 0)
                                   .attr('y1', (d, i) => (i + ARROW_OVER_HEAD) * heightPerYear)
                                   .attr('x2', SCALE_MARKER_WIDTH)
                                   .attr('y2', (d, i) => (i + ARROW_OVER_HEAD) * heightPerYear)
                                   .attr('stroke-width', 1)
                                   .attr('stroke', 'black')

  const eachScaleText = eachScale.append('text')
                                 .attr('x', 0)
                                 .attr('y', (d, i) => (i + ARROW_OVER_HEAD) * heightPerYear)
                                 .text(d => d)
  const scaleTextBBox = index => eachScaleText.nodes()[index].getBBox()

  eachScaleText.attr('dy', (d, i) => scaleTextBBox(i).height / 4)
  axisLine.attr('x1', AXIS_WIDTH / 2 + scaleTextBBox(0).width + SCALE_MARKER_WIDTH / 2)
          .attr('x2', AXIS_WIDTH / 2 + scaleTextBBox(0).width + SCALE_MARKER_WIDTH / 2)
  eachScaleMarker.attr('x1', AXIS_WIDTH / 2 + scaleTextBBox(0).width)
                 .attr('x2', AXIS_WIDTH / 2 + scaleTextBBox(0).width + SCALE_MARKER_WIDTH)

  return AXIS_WIDTH + scaleTextBBox(0).width + SCALE_MARKER_WIDTH / 2
}
