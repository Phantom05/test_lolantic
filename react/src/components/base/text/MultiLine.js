import React from 'react';

function MultiLine(props) {
  const {children,clamp} = props;

  console.log(children,'!');
  return (
    <div>
      {children}
    </div>
  );
}

export default MultiLine;