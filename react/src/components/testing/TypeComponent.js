import React,{useState} from 'react';


function TypeComponent({onChange}) {
    const [values,setValues] = useState({
        input1:'',
        input2:""
    });

    const handleChange =(e) =>{
        const {name,value} = e.target;
        setValues({...values,[name]:value});
    }

    onChange && onChange(values);
    
    return (
        <div>
            <input type="text" name="input1" onChange={handleChange} value={values.input1} /> <br />
            <input type="text" name="input2" onChange={handleChange} value={values.input2}/> 
        </div>
    );
}

export default TypeComponent;