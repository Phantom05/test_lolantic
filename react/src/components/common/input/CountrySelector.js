import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import cx from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useDidUpdateEffect} from 'lib/utils';

import {
    LISTING_COUNTRY_SAGAS,
    LISTING_LOCATION_SAGAS
} from 'store/actions';


/**
 * 
 * @param {*} props object 
 * {
 * type: select 요소 종류, 
 * parentState: 부모 컴포넌트의 state 변경 함수, 
 * data: select 요소 data, 
 * children: select base text,
 * current: select된 현재 요소 값,
 * precedeData: select가 2개일때 선행 값,
 * }
 */
function CountrySelector(props) {
    const {
        type,
        parentState,
        data,
        children,
        current,
        precedeData,
        info,
        ...rest
    } = props;
    
    const [values, setValues] = useImmer({
        selectVal: ''
    });

    const onChange = e => {
        const eventVal = e.target.value;
        setValues(draft => {
            draft.selectVal = eventVal;
        });
        
    }

    useEffect(() =>{
        if(type==="country"){
            console.log("Call Listing country saga");
            LISTING_COUNTRY_SAGAS();
        }

        if(type==="city" && rest.disabled === false){
            console.log("Call Listing city saga");
            LISTING_LOCATION_SAGAS({value: precedeData});
        }
        
    }, [precedeData]);

    useDidUpdateEffect(() => {
        parentState({select: values.selectVal, type: type});
    }, [values.selectVal]);

    useEffect(() => {
        parentState({select: info, type: type});
    },[]);


    return (
        <FormControl {...rest} variant="outlined">
            <Select
            value={current}
            onChange={onChange}
            displayEmpty
            >
            <MenuItem disabled value="">
                <em>{children}</em>
            </MenuItem>
            {Array.isArray(data.list) && data.list.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
            </Select>
        </FormControl>
    );
}

export default CountrySelector;