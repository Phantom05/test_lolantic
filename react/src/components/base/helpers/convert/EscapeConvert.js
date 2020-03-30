import React from 'react';
const EscapeConvert = ({ prev, next, content }) => (
  content.split(prev).map((line, key) => {
    return (<span key={key}>{line}{next}</span>)
  })
)
export default EscapeConvert;

{/* <EscapeConvert
 prev={'\n'}
 next={<br />}
 content={"야호 \n ㅋㅋㅋ"}
/>  */}

 