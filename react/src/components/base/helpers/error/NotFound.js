import React from 'react';
import styled from 'styled-components';

function NotFound(props) {
  console.log(props,'not found props');
  return (
    <Stlyed.NotFound>
      404 NotFound
    </Stlyed.NotFound>
  );
}

const Stlyed = {
  NotFound:styled.div`
    font-size:18px;
  `
}

export default NotFound;