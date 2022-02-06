import React, { useCallback } from 'react';
import { AppBar, Container, IconButton, makeStyles, Toolbar, Typography, useScrollTrigger, useTheme } from '@material-ui/core';
import Landing from '../src/Landing';
import Skills from '../src/Skills';
import Projects from '../src/Project';
import Experience from '../src/Experience';
import About from '../src/About';
import data from '../resumeData.json';
import { darkTheme, lightTheme } from '../src/theme';
import { Brightness4, Brightness7 } from '@material-ui/icons';
const { name, projects } = data

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: "none",
  }
}))

export async function getStaticProps() {
  const baseURI = projects.baseURI
  var fetchUserGithubData = await fetch(baseURI + '/repos').then((res => {
    if(res.statusCode < 300)
    return res.json()
  }))

  if(fetchUserGithubData && (fetchUserGithubData.length > 0)){
    for(var i = 0; i < fetchUserGithubData.length; i++){
      fetchUserGithubData[i].languages = await fetch(fetchUserGithubData[i].languages_url)
                          .then(res => {
                            if(res.statusCode < 300)
                            return res.json()
                          },()=>{})
    }
  }
  if(!!fetchUserGithubData == false){
    fetchUserGithubData = ""
  }
  return {
    props: {
      projects: fetchUserGithubData
    },
    revalidate: 60
  }
}

export default function Index({ projects, setTheme }) {

  const classes = useStyles()

  const trigger = useScrollTrigger({ disableHysteresis: true })

  const theme = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme => theme.palette.type === 'dark' ? lightTheme : darkTheme)
  }, [setTheme])

  return (
    <div className={classes.root}>
      <AppBar color={!trigger ? "transparent" : "inherit"} className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            { name }
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleTheme}>
            {theme.palette.type === "dark" ? <Brightness7/> : <Brightness4/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
      <Container>
        <Landing />
        <Skills />{
          projects && <Projects data={projects}/>
        }
        <Experience/>
        <About/>
      </Container>
    </div>
  );
}