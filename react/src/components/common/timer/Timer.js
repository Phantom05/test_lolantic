import React from 'react';
import styled from 'styled-components';


function Timer(props) {
    console.log("Start");
    const {duration, zeroFill, start, done} = props;

    return (
        <Timer>
            timer
        </Timer>
    );
}


const Styled = {
    Timer: styled.div`

    `
}

export default Timer;