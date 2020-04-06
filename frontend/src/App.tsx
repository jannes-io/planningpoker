import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import socketIOClient from 'socket.io-client';
import RoomSelector from './Components/RoomSelector';
import Layout from './Components/Layout';
import RoomJoiner from './Components/RoomJoiner';

const theme = createMuiTheme({
});

export const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL || '');

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
