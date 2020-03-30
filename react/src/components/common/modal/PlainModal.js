import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import cx from 'classnames';

/**
 * 
 * const handleModalClick = ()=>{
    setValues(draft=>{
      draft.modal = !draft.modal;
    });
  }
 *  <PlainModal 
 *      type = "caseLoad" // 있으면 지정 없으면 plain
        isOpen={values.modal.isShow}
        content={<ModalLoginContent /> }
        onClick={handleModalClick}
        dim={false}
        width={200} // 있으면 지정 없으면 360
      />
 * @param {*} props 
 */
function PlainModal(props) {
  const {isOpen,content,type,onClick,dim,width} = props;
  const handleCloseDim = dim === false?null: ()=>onClick('dim');
  let classes = PlainStyles({width:width});
  let loadClasses = loadStyles({width:width});
  
  if(type === 'caseLoad'){
    classes = loadClasses;
  };

  
  return (
    <Styled.PlainModal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen} // 원래 open
        onClose={handleCloseDim }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={cx(classes.paper)}>
            {content}
          </div>
        </Fade>
      </Modal>

    </Styled.PlainModal>
  );
}

const loadStyles = prop => {
  prop = prop || {};
  return makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      fontSize:30,
      width:prop.width?prop.width:360,
      borderRadius:5,
      outline:'none'
    },
  }))();
  
}

const PlainStyles =prop=>{
  prop = prop || {};
  return makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      fontSize:30,
      width:prop.width?prop.width:360,
      borderRadius:5,
      outline:'none'
    },
  }))()
}
 

const Styled = {
  PlainModal:styled.div`
    /* .modal__content{
      border-radius:5px;
      background:black;
      font-size:50px;
    } */
  `
}
export default PlainModal;
