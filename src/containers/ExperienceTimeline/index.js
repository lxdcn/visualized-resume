import React from 'react'
import gql from 'graphql-tag'

import Timeline from '../../components/Timeline'
import SectionWithQuery from '../SectionWithQuery'

const ALL_RANGES_QUERY = gql`
  query {
    allRanges {
      from
      to
      desc
    }
  }
`

const defaultRanges = [
  { from: '2017-09', to: '2019-06', desc: '' },
  { from: '2014-01', to: '2017-03', desc: '' },
  { from: '2012-03', to: '2014-01', desc: '' },
]

export default () => (
  <SectionWithQuery queryGql={ALL_RANGES_QUERY} headerText='Experience Timeline'>
    {({ allRanges }) => <Timeline ranges={ allRanges || defaultRanges } />}
  </SectionWithQuery>
)
