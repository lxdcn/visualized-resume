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
      badge
      desc
    }
  }
`

const defaultBlips = [
  { quadrant: 'I', name: '', score: 10, },
  { quadrant: 'IV', name: '', score: 10, },
  { quadrant: 'III', name: '', score: 10, },
  { quadrant: 'II', name: '', score: 10, },
]

export default () => (
  <Radar blips={ defaultBlips } />
)
