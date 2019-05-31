const moment = require('moment')

export const PER_YEAR_HEIGHT = 140
export const totalHeight = howManyYears => (howManyYears + 1) * PER_YEAR_HEIGHT

export const addMonthDiffToRanges = (ranges, maxYear) => ranges.map(({ from, to, desc }) => ({
  monthDiffWithMaxYear: moment('' + maxYear + '-01').diff(moment(to), 'months'),
  monthDiffWithEachOther: moment(to).diff(moment(from), 'months'),
  desc
}))
