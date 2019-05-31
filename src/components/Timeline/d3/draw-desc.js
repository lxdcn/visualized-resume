import * as d3 from 'd3'
import marked from 'marked'

import { PER_YEAR_HEIGHT, addMonthDiffToRanges } from './constant-and-data-functions'


export default (svg, axisRightBoundary, width, yearSeries, ranges, styles) => {
  const maxYear = Math.max(...yearSeries)
  const maxYearY = PER_YEAR_HEIGHT
  const PER_MOMTH_HEIGHT = PER_YEAR_HEIGHT / 12

  const g = svg.append('g').attr('class', 'desc')

  const eachLinearGradient = svg.select('defs')
                                .selectAll('linearGradient.desc-rect')
                                .data(ranges)
                                .enter()
                                  .append('linearGradient')
                                  .attr('class', 'desc-rect')
                                  .attr('id', (d, i) => `lineargradient-desc-rect-${i}`)

  eachLinearGradient.append('stop')
                    .attr('offset', '10%')
                    .attr('stop-color', (d, i) => d3.schemePastel1[i])
                    .attr('stop-opacity', 0)
  eachLinearGradient.append('stop')
                    .attr('offset', '70%')
                    .attr('stop-color', (d, i) => d3.schemePastel1[i])
                    .attr('stop-opacity', 0.6)
  eachLinearGradient.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', (d, i) => d3.schemePastel1[i])
                    .attr('stop-opacity', 0.6)


  const eachDesc = g.selectAll('rect.range')
                    .data(addMonthDiffToRanges(ranges, maxYear))
                    .enter()
                      .append('g')
                      .attr('class', 'range')

  const COLOR_PADDING_RIGHT = 10
  eachDesc.append('rect')
          .attr('id', (d, i) => `desc-rect-${i}`)
          .attr('x', axisRightBoundary)
          .attr('y', d => maxYearY + d.monthDiffWithMaxYear * PER_MOMTH_HEIGHT)
          .attr('width', width - axisRightBoundary - COLOR_PADDING_RIGHT)
          .attr('height', d => d.monthDiffWithEachOther * PER_MOMTH_HEIGHT)
          .style('fill',  (d, i) => `url(#lineargradient-desc-rect-${i})`)

  const eachForeignObject = eachDesc.append('foreignObject')
                                    .attr('id', (d, i) => `desc-foreign-object-${i}`)
                                    .attr('x', axisRightBoundary)
                                    .attr('y', d => maxYearY + d.monthDiffWithMaxYear * PER_MOMTH_HEIGHT)
                                    .attr('width', width - axisRightBoundary - COLOR_PADDING_RIGHT)
                                    .attr('height', d => d.monthDiffWithEachOther * PER_MOMTH_HEIGHT)

  const eachDescDiv = eachForeignObject.append('xhtml:div')
                                         .attr('class', styles.descDiv)

  eachDescDiv.append('div')
             .html(({ desc }) => marked(desc))

  eachDesc.append('line')
          .attr('class', 'ceiling')
          .attr('x1', axisRightBoundary)
          .attr('y1', d => maxYearY + d.monthDiffWithMaxYear * PER_MOMTH_HEIGHT)
          .attr('x2', width)
          .attr('y2', d => maxYearY + d.monthDiffWithMaxYear * PER_MOMTH_HEIGHT)
          .attr('stroke-width', 0.5)
          .attr('stroke', 'black')
  eachDesc.append('line')
          .attr('class', 'floor')
          .attr('x1', axisRightBoundary)
          .attr('y1', d => maxYearY + (d.monthDiffWithMaxYear + d.monthDiffWithEachOther) * PER_MOMTH_HEIGHT)
          .attr('x2', width)
          .attr('y2', d => maxYearY + (d.monthDiffWithMaxYear + d.monthDiffWithEachOther) * PER_MOMTH_HEIGHT)
          .attr('stroke-width', 0.5)
          .attr('stroke', 'black')
}
