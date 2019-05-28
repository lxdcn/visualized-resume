import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Fat from './fat'
import Slim from './slim'

export default props => {
  const small = useMediaQuery(useTheme().breakpoints.down('sm'))
  return small ? <Slim {...props} /> : <Fat {...props} />
}
