import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

/**
 * <VisibleEyes show={true}/>
 * @param {*} param0 
 */
function VisibleEyes({ show,size }) {
  const classes = useStyles(size);
  return (
    <>
      {show
        ? <Visibility className={classes.eyeIcon} />
        : <VisibilityOff className={classes.eyeIcon} />}
    </>
  );
}



const useStyles =prop=> makeStyles(theme => ({
    eyeIcon: {
      fontSize: prop?prop:15
    }
  }))();


export default VisibleEyes;