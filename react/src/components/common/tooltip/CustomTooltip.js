import React from "react";
import HelpIcon from '@material-ui/icons/Help';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import styled from 'styled-components';
import cx from 'classnames';
import { color,floatClear } from 'styles/__utils';



/**
 *  <CustomTooltip
      title={<CustomTooltipContent partnerInfo={partnerInfo}/>}
      placement="bottom-start"
      open={true}
      
  >
    <span className="CreateCase_load tx">{ `${receiverName} ${hasManager}` }</span>
  </CustomTooltip>
 */

const defaultTheme = createMuiTheme();
const TextOnlyTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "transparent",
  }
})(Tooltip);

function CustomTooltip(props) {
  const {
    type, 
    children =<></>,
    title, 
    placement="right-start",
    _style,
    interactive,
    open,
    block,
    baseStyle,
    iconStyle} = props;

  const typeIcon = {
    'help': HelpIcon,
  }
  let Icon = typeIcon[type];

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <Styled.CustomTooltip  className={cx({block:block})}>
        <TextOnlyTooltip 
          title={<Styled.TootipStyle baseStyle={baseStyle} _style={_style}>{title}</Styled.TootipStyle>}
          interactive={interactive}
          placement={placement}
          open={open}
        >
          <div className="tooltip__wapper" className={cx({block:block})}>
          {children} 
          {Icon &&
            <Styled.HelpIcon iconStyle={iconStyle}><Icon /></Styled.HelpIcon> 
          }
          </div>
        </TextOnlyTooltip>
      </Styled.CustomTooltip>
    </MuiThemeProvider>
  );
}

export default CustomTooltip;

const Styled = {
  CustomTooltip: styled.div`
    display:inline-block;
    ${floatClear};
    &.block{
      width:100%;
      ${floatClear};
    }
    .tooltip__wapper{
      display:inline-block;
      ${floatClear};
      &.block{
        width:100%;
        ${floatClear};
      } 
    }
  `,
  TootipStyle: styled.div`
    position:relative;
    display:inline-block;
    font-size:12px;
    padding:10px;
    background:rgba(0,0,0,.7);
    color:white;
    ${({baseStyle})=> baseStyle && `background: rgba(0,0,0,.7); border-radius: 5px`}
    ${({_style})=> _style && _style};
  `,
  HelpIcon:styled.span`
    position:relative;
    color:${color.gray_icon};
    top:5px;
    cursor: pointer;
    font-size:20px;
    ${({iconStyle})=> iconStyle && iconStyle};
  `
}

// const theme = createMuiTheme({
//   overrides: {
//     MuiTooltip: {
//       tooltip: {
//         fontSize: "30px",
//         color: "yellow",
//         backgroundColor: "gray"
//       }
//     }
//   }
// });
// const BlueOnGreenTooltip = withStyles({
//   tooltip: {
//     color: "lightblue",
//     backgroundColor: "green"
//   }
// })(Tooltip);