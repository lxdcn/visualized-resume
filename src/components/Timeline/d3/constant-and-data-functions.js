const moment = require('moment')

export const PER_YEAR_HEIGHT = 100
export const totalHeight = howManyYears => (howManyYears + 1) * PER_YEAR_HEIGHT

export const rangesToMonthDiff = (ranges, maxYear) => ranges.map(({ from, to }) => ({
  monthDiffWithMaxYear: moment('' + maxYear + '-01').diff(moment(to), 'months'),
  monthDiffWithEachOther: moment(to).diff(moment(from), 'months')
}))
