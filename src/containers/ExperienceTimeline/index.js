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
  { from: '2012-07', to: '2014-03', desc: '# hello, world' },
  { from: '2014-07', to: '2019-01', desc: '## world, hello' },
]

export default () => (
  <SectionWithQuery queryGql={ALL_RANGES_QUERY} headerText='h3. Heading'>
    {({ allRanges }) => <Timeline ranges={ allRanges || defaultRanges } />}
  </SectionWithQuery>
)
