import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import styled from 'styled-components';
import { color } from 'styles/__utils';
import {
  withStyles
} from "@material-ui/core/styles";

/**
 * 
 *  <PlainTooltip
      type="help" 
      title={partnerTooltipText} 
      placement="right-start"
    />
 * @param {*} props 
 */

const CustomTooltip = withStyles({
  tooltip: {
    color: "lightblue",
    backgroundColor: "green"
  }
})(Tooltip);

function PlainTooltip(props) {
  const {
    type,
    children,
    placement,
    title,
    interactive,
    custom,
    open
  } = props;
  const typeIcon = {
    'help': HelpIcon,
  }
  let Icon = typeIcon[type];
  let tooltipDiv = '';
  const isCustom = !!custom ;
  const obj ={
    title: !isCustom ? <Styled.TootipStyle>{title}</Styled.TootipStyle> :
    <Styled.CustomTooltip>{custom}</Styled.CustomTooltip>
     ,
    interactive: interactive !== undefined ? (interactive ? true: false) : true,
    placement: placement && placement,
    className: type ? type : '',
  }
  
  
  // (title === undefined || title === null || title.length === undefined || title === false),
  const isBooleTooltip = [!title,!isCustom];
  if(isBooleTooltip.every(item=>item === true)){
    tooltipDiv = (
      <span className="tooltip__wapper">
        {Icon ? <Icon /> : children}
      </span>
    )
  }else{
      tooltipDiv = (
        <Tooltip {...obj}  open={open}>
          <span className="tooltip__wapper">
            {Icon ? <Icon /> : children}
          </span>
        </Tooltip>
      )
  }
  return (
    <Styled.PlainTooltip >
      {tooltipDiv}
    </Styled.PlainTooltip>
  );
}


const Styled = {
  PlainTooltip: styled.span`
    display:inline-block;
    .tooltip__wapper{
      display:inline-block;
    }
    .title{
      font-size:30px;
    }
    .help{
      position:relative;
      top:4px;
      color:${color.gray_icon};
      cursor: pointer;
      font-size:20px;
    }
  `,
  TootipStyle: styled.span`
    display:inline-block;
    font-size:12px;
    padding:5px;
  `,
  CustomTooltip:styled.div`
    top:-10px;
  
  `
}

export default PlainTooltip;