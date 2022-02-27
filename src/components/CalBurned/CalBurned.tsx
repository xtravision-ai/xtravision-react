import React from 'react';
import { Typography } from '@mui/material';
import { CalBurnedProps } from './CalBurned.types';
import { makeStyles } from '@mui/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const useStyles = makeStyles(() => ({
  coloriesBurnt: {
    color: 'white',
    fontSize: '35px',
    cursor: 'none',
  },
  calBurnedContainer: {
    padding: '10px 20px 10px 20px',
    color: 'white',
    backgroundColor: '#39434a',
    display: 'flex',
    position: 'absolute',
    zIndex: 3,
    right: '30px',
    alignItems: 'center',
    borderRadius: '42px',
  },
  motivationMsg: {
    fontSize: '90px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#000',
    opacity: 0.8,
    position: 'absolute',
    top: '42%',
    right: '9%',
    zIndex: 999,
    padding: '2px',
    borderRadius: '15px',
  },
  fireIcon: {
    height: '35px',
    marginRight: '10px',
  },
}));

const CalBurned = ({ calBurned, style }: CalBurnedProps) => {
  const classes = useStyles();

  if (!calBurned) return <></>;

  return (
    <>
      <div className={classes.calBurnedContainer} style={style}>
        <LocalFireDepartmentIcon />
        <Typography className={classes.coloriesBurnt}>
          Calories: {calBurned}
        </Typography>
      </div>
      {calBurned > 1 && calBurned % 50 === 0 && (
        <div className={classes.motivationMsg}>Great Job!</div>
      )}
      {calBurned > 1 && calBurned % 50 === 1 && (
        <div className={classes.motivationMsg}>Keep Burning</div>
      )}
    </>
  );
};

export default CalBurned;
