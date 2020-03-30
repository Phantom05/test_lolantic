import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {color} from 'styles/__utils';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/**
 * <DatePicker 
    value={date}
    className="CreateCase_input date"
    onChange={handleDateChange}
  />
 * @param {*} props 
 */
function DatePicker(props) {
  return (
    <Styled.DatePicker>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            {...props}
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            id="date-picker-inline"
            inputVariant="outlined"
            
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Styled.GlobalStyles />
    </Styled.DatePicker>
  );
}

const Styled = {
  DatePicker:styled.div`
  & {
    .MuiOutlinedInput-adornedEnd{
      width:100%;
    }
  }
  `,
    GlobalStyles:createGlobalStyle`
      .MuiPickersDay-daySelected{
        background-color:${color.blue} !important;
      };
    `
}

export default DatePicker;