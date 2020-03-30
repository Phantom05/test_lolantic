import React,{useEffect} from 'react';
import styled from 'styled-components';
import { color } from 'styles/__utils';
import { useImmer } from "use-immer";

function PlainDim(props) {
  const [isView,setIsView] = useImmer({
    view:true
  });

  if(!isView.view) return null;
  return (
    <Stlyed.PlainDim >
      
    </Stlyed.PlainDim>
  );
}

const Stlyed={
  PlainDim:styled.div`
      position:fixed;
      z-index:501;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,.2);
  `
}

export default PlainDim;