import React from 'react';
import { Container, createStyles, CssBaseline, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
  },
  footerText: {
    textAlign: 'center',
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return <>
    <CssBaseline />
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.footerText}>
            {'Made with ❤ by '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jannes-io">Jannes Drijkoningen</a>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>;
};

export default Layout;
