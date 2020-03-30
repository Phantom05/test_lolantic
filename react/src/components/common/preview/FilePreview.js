import React from 'react';


function Item(){
  return (
    <input type="file"/>
  )
}

function View(){
  return (
    <div>
      <Item />
      <FilePreview />
    </div>
  )
}

function FilePreview(props) {
  return (
    <div>
      FilePreview
    </div>
  );
}

export default View;