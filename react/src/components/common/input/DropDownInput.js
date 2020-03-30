
import React, { useEffect, useRef } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import cx from 'classnames';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {useDidUpdateEffect} from 'lib/utils';
import {compareProp} from 'lib/library';
import { font,color , 
  // fontFamily
} from 'styles/__utils';

/**
 * <TestDropInput 
    value={values.senderName}
    keywordList={info.responsibilityList}
    onBlur={(e) => handleBlur('senderName', e)}
    // itemStyle
    boxStyle={{
      marginTop:8
    }}
    inputStyle={{
      padding: `8px 15px`,
      width: `100%`,
      height: `34px`,
      fontSize: 12,
    }}
  />
 * @param {*} props 
 */


// NOTE: 시간이 없어서 여기까지, 확장성 있게 기능 추가해야함
const defaultStyle = {
  // position: 'fixed',
  // position: 'absolute',
  // top: '35px', // height of your input
  // left:0,
  // width: '100%',
  // borderRadius: '3px',
  // border:`1px solid #eee`,
  // boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  // background: 'rgba(255, 255, 255, 0.9)',
  // padding: '2px 0',
  // fontSize: '90%',
  // overflow: 'auto',
  // maxHeight: '200px',
  // minWidth:'100%',

  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  // maxHeight: '200px', // TODO: don't cheat, let it flow to the bottom
}

const DropDownInputState = {
  keywordList: [],
  keyword: "",
  focused: false,
  open: false,
  allOpen: false,
  isLoad:false,
}

const DropDownInput = React.memo(function DropDownInput(props) {
  const [values, setValues] = useImmer(DropDownInputState);
  const { keywordList,onBlur, itemStyle, inputStyle, boxStyle,defaultValue } = props;
  const inputRef = useRef(null);

  const handelClick = config => {
    const {type} = config;
    if (inputRef.current) {
      // console.log(e.target);
      if(type === 'allBtn'){
        inputRef.current.focus();
      }
      setValues(draft => {
        draft.allOpen = true;
      })
    }
  }
  const handleChange = e => {
    const targetValue = e.target.value;
    console.log('흠..');
    
    setValues(draft => {
      draft.keyword = targetValue;
      draft.allOpen = false;
    })
  }
  const handleSelect = value => {
    setValues(draft => {
      draft.keyword = value
    })
  }
  const handleBlur = e => {
    setValues(draft => {
      draft.focused = false;
    })
  }
  const handleFocus = e=>{
    setValues(draft => {
      draft.focused = true;
    })
  }

  useEffect(() => {
    const hasKeywordList = keywordList && keywordList.length > 0;
      setValues(draft => {
        if(defaultValue){
          draft.keyword =   defaultValue;
        }
        if (hasKeywordList) {
          draft.keywordList = keywordList.map((item, idx) => ({ id: idx, title: item }));
        }
        draft.isLoad = true;
      });
      if(defaultValue){
        onBlur && onBlur(defaultValue);
      }
  }, []);


  useDidUpdateEffect(() => {
    const isBlur = values.focused === false;
    if (isBlur) {
      if(!values.isLoad) return;
      if (values.keyword && values.keyword.trim().length > 0) {
        onBlur && onBlur(values.keyword);
      }
    }
  }, [values.focused]);

  const options = values.keywordList;
  const inputPropStyle = { 
    onBlur: handleBlur,
    onFocus:handleFocus, 
    className: "comboBox__input", 
    style: inputStyle
  };

  // console.log(values.focused);
  // DEBUG: 이부분 해보기
  
  return (
    <Styled.DropDownInput style={boxStyle}>
      <div className="box" style={inputStyle}>
        <ReactAutocomplete
          ref={inputRef}
          items={options}
          shouldItemRender={(item, value) => {
            return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 || values.allOpen
          }}
          getItemValue={item => item.title}
          renderItem={(item, highlighted) =>
            <div key={item.id} className={cx("comboBox__item", { hover: highlighted })} style={itemStyle}>
              {item.title}
            </div>
          }
          value={values.keyword}
          inputProps={inputPropStyle}
          onChange={handleChange}
          onSelect={handleSelect}
          menuStyle={{ ...defaultStyle, zIndex: 1 }}
        // open={true}
        />
        <span className="arrowBtn" onClick={()=>handelClick({type:"allBtn"})}>
          {/* <span className="arrowBtnIcon"> */}
            <ArrowDropDownIcon  className="arrowBtnIcon"/>
          {/* </span> */}
        </span>
      </div>
    </Styled.DropDownInput>
  )
},(prevProp,nextProp)=>{
  return compareProp(nextProp, prevProp, [
    'keywordList', 
    '_style', 
    'onBlur', 
    'value', 
    'itemStyle', 
    'inputStyle', 
    'boxStyle',
    
  ])
})


export default DropDownInput;



const Styled = {
    DropDownInput: styled.div`
        position: relative;
        /* border:1px solid rgba(0, 0, 0, 0.23); */
        border-radius:4px;
        &:hover:after{
          border:2px solid ${color.blue};
        }
    & {
      .box{
        position:relative;
        border-radius:4px;
      }
      .arrowBtn{
        display:inline-block;
        position:absolute;
        right:10px;
        top:50%;
        z-index:1;
        width:30px;
        height:30px;
        cursor: pointer;
        transform:translateY(-50%);
        border-radius:100%;
        /* border:1px solid #eee; */
        background:white;
        &:hover{
          background:#eee;
        }
      }
      .arrowBtnIcon{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      }
      .comboBox__input{
        position:absolute;
        top:0;
        left:0;
        display:inline-block;
        width:100%;
        height:100%;
        border:0;
        ${font(12)};
        outline:none;
        border-radius:4px;
        border:1px solid rgba(0, 0, 0, 0.23);
        &:focus{
          border:2px solid ${color.blue};
        }
      }
      .comboBox__item{
        background:transparent;
        cursor: pointer;
        line-height:initial;
        padding:5px;
        ${font(12)};
        &.hover{
          background:#eee;
        }
      }
    }
  `
}



