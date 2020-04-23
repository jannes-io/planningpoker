import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core';
import useSocket from '../Hooks/Socket';

const DisconnectAlert: React.FC = () => {
  const { connected } = useSocket();

  if (connected) {
    return null;
  }

  return <Dialog open>
    <DialogTitle>Connection lost!</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Oh no! We are trying to reconnect you with the game server.
      </DialogContentText>
      <LinearProgress />
    </DialogContent>
  </Dialog>;
};

export default DisconnectAlert;
