import React,{useEffect} from 'react';
import {icon_test_teeth_module } from 'components/base/images';
import {useImmer} from 'use-immer';
import styled from 'styled-components';
import { CustomLoadingCircle } from 'components/base/loading';

const intialState = {
  isLoad:false
}
const TeethModule = React.memo(function TeethModule(props) {
  const [values,setValues] = useImmer(intialState);

  useEffect(()=>{
    setValues(draft=>{
      draft.isLoad  =true;
    })
  },[]);

  if(!values.isLoad ){
    return <WhiteSpaceLoading />
  }
  return (
    <Styled.TeethModule >
      <img src={icon_test_teeth_module} alt="" style={{width:`100%`}}/>
    </Styled.TeethModule>
  );
});

function WhiteSpaceLoading(){
  return (
    <Styled.WhiteSpaceLoading>
      <span className="loader">
        <CustomLoadingCircle/>
      </span>
    </Styled.WhiteSpaceLoading>
  )
}


const Styled ={
  WhiteSpaceLoading:styled.div`
    position:relative;
    min-height:60vh;
    &{
      .loader{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      }
    }
  `,
  TeethModule:styled.div`
    
  `
}

export default TeethModule;