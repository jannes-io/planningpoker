import React from 'react';
import {
  Container,
  createStyles,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import DisconnectAlert from './DisconnectAlert';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
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
    <DisconnectAlert />
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
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jannes-io"
            >
              Jannes Drijkoningen
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>;
};

export default Layout;
