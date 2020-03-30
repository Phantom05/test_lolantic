import React from 'react';
import TypeCompoenent from './TypeComponent';
function ParentContainer(props) {
    const onChange = (value) =>{
        console.log(value)
    }
    return (
        <div>
            <TypeCompoenent onChange={onChange}/>
        </div>
    );
}

export default ParentContainer;