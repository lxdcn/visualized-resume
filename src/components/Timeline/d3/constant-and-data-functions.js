const moment = require('moment')

export const addMonthDiffToRanges = (ranges, maxYear) => ranges.map(({ from, to, desc }) => ({
  monthDiffWithMaxYear: moment('' + maxYear + '-01').diff(moment(to), 'months'),
  monthDiffWithEachOther: moment(to).diff(moment(from), 'months'),
  desc
}))
