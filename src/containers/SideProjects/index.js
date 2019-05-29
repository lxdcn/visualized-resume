import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'

import ProjectCard from '../../components/ProjectCard'
import SectionWithQuery from '../SectionWithQuery'

const QUERY = gql`
  query {
    allProjects {
      from
      to
      desc
    }
  }
`

const defaultProjects = [
  {
    name: '(This Web App)',
    desc: '',
    githubUrls: [
      'https://example.com'
    ],
    stacks: [
    ]
  },
  {
    name: '(This Web App)',
    desc: '',
    githubUrls: [
      'https://example.com'
    ],
    stacks: [
    ]
  },

]

const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    flexWrap: 'wrap',
  }
})

export default () => {
  const classes = useStyles()

  return (
    <SectionWithQuery queryGql={QUERY} headerText='h3. Heading'>
      {({ allProjects }) => (
        <div className={classes.cards}>
          {(allProjects || defaultProjects).map(
            (project, index) => <ProjectCard key={index} project={project} />
          )}
        </div>
      )}
    </SectionWithQuery>
  )
}
