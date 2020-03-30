import React from 'react';
import styled from 'styled-components';

function NoDataSearch(props) {
  const {children,text ,style} = props;
  return (
    <Styled.NoDataSearch style={style} className="NoDataSearch">
      <>{text}</>
      <>{children} </>
    </Styled.NoDataSearch>
  );
}

const Styled={
  NoDataSearch:styled.div`
    text-align:center;
    padding:20px;
  `
}

export default NoDataSearch;