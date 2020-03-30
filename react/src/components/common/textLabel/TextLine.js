import React from 'react';
import styled from 'styled-components';
import { color, font } from 'styles/__utils';


function TextLine(props) {
    const {styleConf, cont} = props;
    const {label, text, img, type} = cont;

    return (
        <Styled.TextLine {...styleConf}>
            <span className='txtLabel'>{label}</span>
            <span className='cont'>
            {
                type=== "txt"?
                text
                :
                <img src={img} alt="" />
            }    
            </span>
        </Styled.TextLine>
    );
}

const Styled = {
    TextLine: styled.div`
        position: relative;
        &:after{
            content: '';
            display: block;
            clear: both;
        }
        .txtLabel{
            position: absolute;
            left: 0;
            top: 0;
            width: 120px;
            height: 100%;
            margin-right: 30px;
            color: ${color.black_font};
            font-weight: bold;
        }
        .cont{
            display: inline-block;
            padding-left: 160px;
            /* color: ${props => props._color}; */
            color: ${color.gray_font};

            img{
                display: block;
                width: 100px;
                height: 100px;
                border: 1px solid ${props => props._color};
                border-radius: 10px;
            }
        }
     
    `,
}

export default TextLine;