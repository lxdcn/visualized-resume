import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'

import ProjectCard from '../../components/ProjectCard'
import SectionWithQuery from '../SectionWithQuery'

const QUERY = gql`
  query {
    allProjects {
      name
      link
      desc
      githubUrls
      stacks
    }
  }
`

const defaultProjects = [
  {
    name: ' ',
    desc: '',
    githubUrls: ['https://example.com'],
    stacks: [' ', ' ', ' ', ' ', ' ', ' ',]
  },
  {
    name: ' ',
    desc: '',
    githubUrls: ['https://example.com'],
    stacks: [' ', ' ', ' ', ' ', ' ', ' ',]
  },

]

const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  }
})

export default () => {
  const classes = useStyles()

  return (
    <SectionWithQuery queryGql={QUERY} headerText='Side Projects I built'>
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
