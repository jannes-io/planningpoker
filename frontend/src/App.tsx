import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import RoomSelector from './Components/RoomSelector';
import Layout from './Components/Layout';
import RoomJoiner from './Components/RoomJoiner';

const isDarkMode = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches;

const theme = createMuiTheme({
  palette: {
    type: isDarkMode ? 'dark' : 'light',
  },
});

const App: React.FC = () => <MuiThemeProvider theme={theme}>
  <BrowserRouter>
    <SnackbarProvider>
      <Layout>
        <Switch>
          <Route exact path="/"><RoomSelector /></Route>
          <Route path="/:id"><RoomJoiner /></Route>
          <Route path="*"><Redirect to="/" /></Route>
        </Switch>
      </Layout>
    </SnackbarProvider>
  </BrowserRouter>
</MuiThemeProvider>;

export default App;
