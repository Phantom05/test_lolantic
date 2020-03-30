import React from 'react';
import styled from 'styled-components';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



function PlainPaging(props) {
  const{
    handlepage,
    pagingdata
  } = props;

  return (
    <PlainPage {...props}>
      <>
      {
        <KeyboardArrowLeftIcon
        onClick={handlepage('prev')}
        style={{ fontSize: 30 }} 
        className={pagingdata.prevCheck? '' : 'disabled'}
        />
      }
      </>
      <>
      {
        <KeyboardArrowRightIcon
        onClick={handlepage('next')}
        style={{ fontSize: 30 }} 
        className={pagingdata.nextCheck? '' : 'disabled'}
        />
      }
      </>
    </PlainPage>
  );
}

const PlainPage = styled.div`
  .disabled{
    color: gray;
    opacity: 0.5;
    cursor: auto;
  }
`

export default PlainPaging;