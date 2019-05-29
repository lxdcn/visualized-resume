import React from 'react'
import gql from 'graphql-tag'

import Radar from '../../components/Radar'
import SectionWithQuery from '../SectionWithQuery'

const ALL_BLIPS_QUERY = gql`
  query {
    allBlips {
      quadrant
      name
      score
      desc
    }
  }
`

const defaultBlipsData = [
  { quadrant: 'I', name: 'a', score: 10,  },
  { quadrant: 'IV', name: '', score: 10,  },
  { quadrant: 'III', name: '', score: 10,  },
  { quadrant: 'II', name: '', score: 10,  },
]

export default () => (
  <SectionWithQuery queryGql={ALL_BLIPS_QUERY} headerText='h3. Heading'>
    {({ allBlips }) => <Radar blips={ allBlips || defaultBlipsData } />}
  </SectionWithQuery>
)
