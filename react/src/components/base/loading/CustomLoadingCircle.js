import React from 'react';
import {color} from 'styles/__utils';
import styled from 'styled-components';

/**
 * 
 * @param {*} props 
 */
function CustomLoadingCircle(props) {
  const {size, color, weight, speed} = props;
  return (
    <Styled.CustomLoadingCircle 
      size={size} 
      color={color} 
      weight={weight} 
      speed={speed}>
        <span className="spinner-icon"></span>
    </Styled.CustomLoadingCircle>
  );
}

export default CustomLoadingCircle;


const barSize = 27;
const barColor = color.blue;
const barWeight = 2;
const barSpeed = 1;

const Styled ={
  CustomLoadingCircle:styled.span`

  & > .spinner-icon{
      display:inline-block;
      width: ${({size})=>size ? size : barSize}px;
      height: ${({size})=>size ? size : barSize}px;
      border: solid ${({weight})=> weight? weight: barWeight}px transparent;
      border-top-color:  ${({color})=> color ? color : barColor};
      border-left-color: ${({color})=> color ? color : barColor};
      border-bottom-color: ${({color})=> color ? color : barColor};
      border-radius: 50%;
      animation: loading-bar-spinner ${({speed})=> speed? speed : barSpeed}s linear infinite;
  }

  @keyframes loading-bar-spinner {
    0%   { transform: rotate(0deg);   transform: rotate(0deg); }
    100% { transform: rotate(360deg); transform: rotate(360deg); }
  }

  `
}