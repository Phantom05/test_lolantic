import React from 'react';
import styled,{ createGlobalStyle  } from 'styled-components';
import {CustomLoadingCircle} from 'components/base/loading';



const GlobalStyle = createGlobalStyle`
  body {
    /* overflow-y:hidden; */
    /* padding-right:18px !important;  */
    
  }
`

/**
 * <FullScreenLoading 
 *  dim={true}
 * />
 * @param {*} props 
 */
function FullScreenLoading(props) {
  // const {dim} = props;
  if(props.visible === false)  return null;
  return (
    <Styled.FullScreenLoading 
      style={props.style} styleConf={props.styleConf}
      {...props}
    >
      <GlobalStyle/>
      <span className="loading__center">
        <CustomLoadingCircle size={props.size?props.size:30}/>
      </span>
    </Styled.FullScreenLoading>
  );
}



const Styled={
  FullScreenLoading:styled.div`
    position:fixed;
    left: 0;
    top: 0;
    width:100%;
    height:100%;
    z-index:100000;
    ${({dim})=> dim && `background:rgba(0,0,0,.1)`};

    
    
    .loading__center{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
    ${props => props.styleConf && props.styleConf}
    ${props => props.style && {...props.style}}
  `
}

export default FullScreenLoading;




