import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const DEFAULT_CARD_WIDTH = 400
const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
}))

const ProjectCard = ({ project }) => {
  const classes = useStyles()
  const { name, link, githubUrls, desc, stacks } = project
  const SLIM_CARD_MARGIN = 20

  const width = Math.min(DEFAULT_CARD_WIDTH, window.innerWidth - SLIM_CARD_MARGIN)

  return ( // TODO Refactor me
    <Card className={classes.card} style={{ width }}>
      <CardContent>
        <div className={classes.title}>
          {link ? (
            <Link
              href={link}
              color='textPrimary'
              variant='h5'
              display='inline'
              style={{ cursor: 'pointer' }}
              target='_blank'
              rel='noopener noreferrer'
            >
              {name}
            </Link>
          ): (
            <Typography variant='h5' display='inline'>
              {name}
            </Typography>
          )}
          <span>
            {githubUrls.map((githubUrl, idx) => (
              <Link
                key={idx}
                href={githubUrl}
                color='textPrimary'
                variant='h5'
                display='inline'
                style={{ cursor: 'pointer', marginLeft: 4}}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src='/github-mark.png' alt='Github' width={20} height={20}/>
              </Link>
            ))}
          </span>
        </div>
        <Divider />
        <br />

        {desc && (
          <Fragment>
            <Typography variant='body2'> {desc} </Typography>
            <br />
          </Fragment>
        )}

        <Typography variant='body1'> Stack: </Typography>

        <ul>
          {stacks.map((stack, idx) => (
            <li key={idx}>
              <Typography variant='body2'>{stack}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
