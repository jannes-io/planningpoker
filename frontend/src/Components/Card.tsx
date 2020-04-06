import React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.spacing(25),
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.type === 'dark' ? '#353535' : '#f1f1f1',
      WebkitBoxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      MozBoxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
  },
}));

interface ICardProps {
  card: string;
  wide?: boolean;
  label?: string;
  onSelectCard?: (card: string) => void;
}

const Card: React.FC<ICardProps> = ({ card, wide, label, onSelectCard }) => {
  const classes = useStyles();

  const SizedGrid: React.FC = ({ children }) => (wide
    ? <Grid item xs={6} sm={6} md={4}>{children}</Grid>
    : <Grid item xs={6} sm={4} md={2}>{children}</Grid>);

  return <SizedGrid>
    <Paper
      variant="outlined"
      elevation={3}
      className={classes.paper}
      onClick={() => onSelectCard !== undefined && onSelectCard(card)}
    >
      <Typography variant="h4">
        {card}
      </Typography>
      {label !== undefined ? <Typography>{label}</Typography> : null}
    </Paper>
  </SizedGrid>;
};

export default Card;
