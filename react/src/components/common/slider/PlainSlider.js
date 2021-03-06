import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function valuetext(value) {
  return `${value}km`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const {marks} = props;

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        // step={5}
        marks={marks}
        max={marks[marks.length-1].value}
        valueLabelDisplay="on"
      />
    </div>
  );
}