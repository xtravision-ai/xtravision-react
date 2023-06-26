import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  textArea: {
    color: '#FBFBFB',
    display: 'flex',
    marginTop: '-60px',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  textBg: {
    fontSize: '50px',
  },
  textSm: {
    fontSize: '50px',
  },
}));

const ArcMeter = ({ reps }) => {
  const classes = useStyles();

  const getOpacity = cnt => {
    if (reps >= cnt) return 1;
    return 0.3;
  };

  const getStroke = cnt => {
    if (cnt == reps) return 'url(#paint0_linear_54_3810)';
    return '';
  };

  const getCol = cnt => {
    const defaultCol = '#00B0FF';
    return defaultCol;

    // Ajay: commenting below code as for now we are sticking to one color
    // if (reps >= cnt) {
    //   let col;
    //   switch (cnt) {
    //     case 2:
    //     case 9:
    //       col = '#71BBB5';
    //       break;
    //     case 3:
    //       col = '#E5C669';
    //       break;
    //     case 4:
    //       col = '#52B8CA';
    //       break;
    //     case 5:
    //       col = '#3DB6D7';
    //       break;
    //     case 6:
    //       col = '#FFC857';
    //       break;
    //     case 8:
    //       col = '#154A61';
    //       break;

    //     default:
    //       col = defaultCol;
    //       break;
    //   }
    //   return col;
    // }
    // return defaultCol;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width='386' height='160' viewBox='0 0 396 200' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect
          x='15'
          y='166.803'
          width='64'
          height='32'
          rx='4'
          strokeWidth='2'
          fill={getCol(1)}
          stroke={getStroke(1)}
          opacity={getOpacity(1)}
        />
        <rect
          x='80.7979'
          y='157.083'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-159.966 80.7979 157.083)'
          strokeWidth='2'
          fill={getCol(2)}
          stroke={getStroke(2)}
          opacity={getOpacity(2)}
        />
        <rect
          x='96.7537'
          y='118.543'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-139.955 96.7537 118.543)'
          strokeWidth='2'
          fill={getCol(3)}
          stroke={getStroke(3)}
          opacity={getOpacity(3)}
        />
        <rect
          x='124.697'
          y='87.9724'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-120.087 124.697 87.9724)'
          strokeWidth='2'
          fill={getCol(4)}
          stroke={getStroke(4)}
          opacity={getOpacity(4)}
        />
        <rect
          x='161.765'
          y='68.5916'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-100.02 161.765 68.5916)'
          strokeWidth='2'
          fill={getCol(5)}
          stroke={getStroke(5)}
          opacity={getOpacity(5)}
        />

        <rect
          x='203.079'
          y='63.0996'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-80.0257 203.079 63.0996)'
          strokeWidth='2'
          fill={getCol(6)}
          stroke={getStroke(6)}
          opacity={getOpacity(6)}
        />

        <rect
          x='243.892'
          y='72.1108'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-59.9742 243.892 72.1108)'
          strokeWidth='2'
          fill={getCol(7)}
          stroke={getStroke(7)}
          opacity={getOpacity(7)}
        />
        <rect
          x='280.283'
          y='94.4454'
          width='62'
          height='30'
          rx='3'
          transform='rotate(-40.0958 280.283 94.4454)'
          strokeWidth='2'
          fill={getCol(8)}
          stroke={getStroke(8)}
          opacity={getOpacity(8)}
        />
        <rect
          x='304.497'
          y='127.642'
          width='64'
          height='32'
          rx='4'
          transform='rotate(-19.9304 304.497 127.642)'
          strokeWidth='2'
          fill={getCol(9)}
          stroke={getStroke(9)}
          opacity={getOpacity(9)}
        />
        <rect
          x='317'
          y='167.262'
          width='64'
          height='32'
          rx='4'
          strokeWidth='2'
          fill={getCol(10)}
          stroke={getStroke(10)}
          opacity={getOpacity(10)}
        />
        <defs>
          <linearGradient
            id='paint0_linear_54_3810'
            x1='278.874'
            y1='94.3245'
            x2='344.597'
            y2='98.3756'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1DE9B6' />
            <stop offset='0.334094' stopColor='#00B0FF' />
            <stop offset='0.616243' stopColor='#00B8D4' />
            <stop offset='1' stopColor='#18FFFF' />
          </linearGradient>
        </defs>
      </svg>
      <div className={classes.textArea}>
        <div className={classes.textSm}>{reps ?? 0}</div>
        <div className={classes.textBg}>&nbsp;/&nbsp;10</div>
      </div>
    </div>
  );
};

export default ArcMeter;
