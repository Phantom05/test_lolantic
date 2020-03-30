import React from 'react';
import {  makeStyles,withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {color} from 'styles/__utils';
import cx from 'classnames';

// b2dfdb
// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  colorPrimary:{
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
  root: {
    position: 'relative',
  },
  top: {
    color: color.gray,
  },
  bottom: {
    color: color.white,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
});

const ColorCircularProgress = withStyles({
  root: {
    color: color.blue,
  },
  
})(CircularProgress);



function FacebookProgress(props) {
  const classes = useStylesFacebook();
  const {size,theme} = props;
  return (
    <span className={cx(classes.root)}>
      <ColorCircularProgress 
        value={100}
        className={classes.top}
        size={size?size:24}
        thickness={4}
        {...props}
      />
    </span>
  );
}

export default function LoadingCircle(props) {
  const {className,size, theme } = props;

  return (
    <FacebookProgress className={className} size={size} theme={theme}/>
  );
}

      {/* <CircularProgress
        // variant="determinate"
        value={100}
        className={classes.top}
        size={size?size:24}
        thickness={4}
        {...props}
      /> */}
      {/* <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={size?size:24}
        thickness={4}
        {...props}
      /> */}