import { makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { appTheme } from '../../types/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      height: '80vh',
    },
  },
  head: {
    width: '100%',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '120%',
    letterSpacing: '-0.0368em',
    color: '#FBFBFB',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  body: { padding: '0px 20px 0px 20px', height: 'inherit' },
  bodyAnglesContainer: {
    // position: 'absolute',
    // bottom: '90px',
    // right: '20px',
    marginTop: '15px',
    height: '100%',
    // width: '300px',
    padding: '0px 20px 0px 20px',
    // background: 'rgba(0, 0, 0, 0.4)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    fontFamily: 'CircularStd',
    // border: '2px solid #fff',
    [theme.breakpoints.down('md')]: {
      fontSize: '15px',
    },
  },
  flxCol: {},
  circleDiv: {
    color: '#fff',
    borderRadius: '100%',
    width: '41px',
    height: '41px',
    fontSize: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      width: '30px',
      height: '30px',
      fontSize: '22px',
    },
  },
  bodyAnglesItm: {
    display: 'flex',
    flexDirection: 'column',
    // padding: '5px 20px 5px 10px',
  },
  bodyAnglesTxt: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: '20px',
    color: '#fff',
    marginBottom: '15px',
    // textDecoration: 'underline',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  bodyAnglesVal: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bodyAnglesSubVal: {
    display: 'flex',
    fontSize: '35px',
    gap: '10px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  },
  bodyAnglesInfo: {
    marginTop: '-10px',
  },
  bgBlue: {
    backgroundColor: appTheme.blueColor,
  },
  bgRed: {
    backgroundColor: appTheme.redColor,
  },
}));

const RangeOfMotion = ({ angles }) => {
  const classes = useStyles();

  const BodyAnglesBoard = () => {
    const classes = useStyles();

    const data = [
      {
        key: 'Shoulder Abduction',
        L: Math.round(angles?.shoulder_left ?? 0) ?? '- -',
        R: Math.round(angles?.shoulder_right ?? 0) ?? '- -',
      },
      {
        key: 'Elbow Flexion/Extension',
        L: Math.round(angles?.elbow_left ?? 0) ?? '- -',
        R: Math.round(angles?.elbow_right ?? 0) ?? '- -',
      },

      {
        key: 'Knee Flexion',
        L: Math.round(angles?.knee_left ?? 0) ?? '- -',
        R: Math.round(angles?.knee_right ?? 0) ?? '- -',
      },
    ];

    return (
      <div className={classes.bodyAnglesContainer}>
        {data?.map((d, i) => (
          <div key={`romAngKey_${i}`}>
            <div className={classes.bodyAnglesItm}>
              <div className={classes.bodyAnglesTxt}>{d?.key}</div>
              <div className={classes.bodyAnglesVal}>
                <div className={classes.bodyAnglesSubVal}>
                  <div className={clsx(classes.circleDiv, classes.bgRed)}>
                    L
                  </div>
                  <div className={classes.bodyAnglesInfo}>
                    {d?.L >= 0 ? d?.L : '- -'}
                    {d?.L >= 0 ? <sup>o</sup> : <></>}
                  </div>
                </div>

                <div className={classes.bodyAnglesSubVal}>
                  <div className={clsx(classes.circleDiv, classes.bgBlue)}>
                    R
                  </div>
                  <div className={classes.bodyAnglesInfo}>
                    {d?.R >= 0 ? d?.R : '- -'}
                    {d?.R >= 0 ? <sup>o</sup> : <></>}
                  </div>
                </div>
              </div>
            </div>
            {d?.key != 'Knee Flexion' && (
              <hr
                style={{
                  width: '100%',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.head}>Range of Motion</div>
      <div className={classes.body}>
        <BodyAnglesBoard />
      </div>
    </div>
  );
};

export default RangeOfMotion;
