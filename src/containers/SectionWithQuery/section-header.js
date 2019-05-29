import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'

import { actions as uiStateActions } from '../../reducers/ui-state'

export default ({ width: screenWidth, text, className }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Typography variant={matches ? 'h4' : 'h2'} className={className} gutterBottom>
      {text}
    </Typography>
  )
}
