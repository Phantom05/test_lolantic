import React, { useRef,  useLayoutEffect } from 'react';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import cx from 'classnames';
import {color,font, device } from 'styles/__utils';
import {getElementSize} from 'lib/library';

function DashboardTemplate({  nav, header, children,title,rightSpace, styleConf }) {
  const navRef      = useRef();
  const headerRef   = useRef();
  const childrenRef = useRef();
  const rightSpaceRef = useRef();
  const [cSize, setCSize] = useImmer({
    header     : { x: null, y: null },
    nav        : { x: null, y: null },
    children   : { x: null, y: null },
    rightSpace : { x: null, y: null } 
  });
 
  useLayoutEffect(()=>{
    if(navRef.current){
      setCSize(draft=>{
        draft.header   = getElementSize(headerRef.current);
        draft.nav      = getElementSize(navRef.current);
        draft.children = getElementSize(childrenRef.current);
        draft.rightSpace = getElementSize(rightSpaceRef.current);
      })
    }
  },[setCSize]);

  return (
    <Styled.DashboardTemplate  {...cSize} bg={color.gray_dashboard} styleConf={styleConf}>
      {header &&
        <div className={cx('DashboardTemplate__header')} children={header} ref={headerRef} />}
      {nav &&
        <div className={cx('DashboardTemplate__nav')} children={nav} ref={navRef} />}

      {children && 
        <div className={cx('DashboardTemplate__main')} ref={childrenRef}>
            {title && <div className="DashboardTemplate__title">{title}</div>}
            {children && 
              <div bg={"white"} className={cx("DashboardTemplate__children")}>{children}
              
              </div>}
        </div>
      }
      {rightSpace && 
          <div className={cx("DashboardTemplate__rightSpace")} children={rightSpace} ref={rightSpaceRef} />}
      
    </Styled.DashboardTemplate>
  );
}

const Styled = {
  DashboardTemplate: styled.div`
  ${({bg})=> bg && `background:${bg}`};
  min-height:100vh;
  &:after{
    display:block;
    content:'';
    clear: both;
  }

  .DashboardTemplate__header{
      position:fixed;
      left:0;
      top:0;
      width:100%;
      z-index:500
    }
    .DashboardTemplate__nav{
      z-index:500;
      position:fixed;
      left:0;
      top:${({header})=>header.y ? header.y:0 }px;
      height:${({header})=>header.y ?`calc(100% - ${header.y}px)`:'100%' };
    }
    .DashboardTemplate__main{
      ${({header})=>header.y && `margin-top:${header.y}px; height:calc(100% - ${header.y}px)`};
      ${({nav,rightSpace})=>nav.x && `margin-left:${nav.x}px; width:calc(100% - ${(rightSpace.x?rightSpace.x:0) + nav.x +2 - 0}px)`};
      ${({rightSpace})=> `padding:${rightSpace.x?'30px 0 30px 30px':'30px'}`};
      &:after{
        display:block;
        content:"";
        clear: both;
      }
      /* min-height:100vh; */
      float:left;
      /* max-width:${device.pc}; */
    }
    .DashboardTemplate__title{
      position:relative;
      background:white;
      margin-bottom:20px;
      padding:10px 20px;
      font-weight:600;
      ${font(18,color.black_font)};
      &:after{
        position:absolute;
        display:block;
        content:"";
        left:0;
        top:0;
        width:5px;
        min-height:100%;
        background:${color.blue_week};
      }
    }
    .DashboardTemplate__rightSpace{
      /* display:inline-block; */

      float:left;
    }
    .DashboardTemplate__children{
      position: relative;
      /* height:85vh; */
      overflow:auto;
      border-radius:10px;
      box-shadow: 2px 2px 5px rgba(36, 53, 51, 0.2);
      padding: 30px;
      width:100%;
      background:white;
      ${props => props.styleConf && props.styleConf};
      
    }
    .DashboardTemplate__move_btn{
      float: right;
      ${font(16,color.black_font)};
      cursor: pointer;
      
    }
  `
}

export default DashboardTemplate;