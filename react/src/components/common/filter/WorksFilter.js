import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import { font, color, buttonBlue, buttonWhite } from 'styles/__utils';
import cx from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {ENV_MODE_DEV} from 'lib/setting';
import _ from 'lodash';


const WorksPopContentState={
  filter:{
    "stage":[],
    "type":[],
    "hidden":1
  },
}
function WorksPopContent(props) {
  const { onClose } = props;
  const [values,setValues] = useImmer(WorksPopContentState);

  const filterTopStatusList = [
    {
      id: 1,
      value: "create",
      text: "Create",
    },
    {
      id: 2,
      value: "working",
      text: "Working",
    },
    {
      id: 3,
      value: "upload",
      text: "Upload",
    },
    {
      id: 4,
      value: "read",
      text: "Read",
    },
    {
      id: 5,
      value: "Downloaded",
      text: "Downloaded",
    },
    {
      id: 6,
      value: "completed",
      text: "Completed",
    },
  ];
  const filterTypeBtnList = [
    {
      id: 1,
      value: "owner",
      text: "Owner"
    },
    {
      id: 2,
      value: "partner",
      text: "Partner"
    },
  ];
  const filterSortBtnList = [
    {
      id: 1,
      value: "only Hidden",
      text: "Only Hidden"
    },
    {
      id: 2,
      value: "include a hidden list",
      text: "Include a hidden list"
    },
  ];

  const handleChange = config => {
    const {type, value} = config;
    console.log(config);
    setValues(draft=>{
      if(type !== 'hidden'){
        const targetStateList = values.filter[type];
        const new_list  = targetStateList.indexOf(value) === -1 
        ? _.union([...targetStateList],[value])
        : _.filter(targetStateList,item=>item !== value)
        draft.filter[type] = new_list
      }else{
        console.log(config,'fff');
        draft.hidden = value;
      }
    })
  }

  const handleClick = config=>{
    console.log(values.filter);
  }

  useEffect(()=>{
    // DEBUG: 여기부터 해봐야함. 기본으로 받은거있으면 업로드해주기
    console.log();
  },[])

  return (
    <Styled.WorksPopContent>
      <div className="filter__rows">
        <h3 className="filter__title top">Status</h3>
        <div className="filter__body">
          {filterTopStatusList.map((item, idx) => {
            return (
              <span key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="clinic"
                      color="primary"
                      onChange={() => handleChange({ type: "stage", value: item.id })}
                    // checked={!!values.type.clinic}
                    />
                  }
                  label={item.text}
                />
              </span>
            )
          })}
        </div>
      </div>
      <div className="filter__rows">
        <h3 className="filter__title">Status</h3>
        <div className="filter__body">
          {filterTypeBtnList.map((item, idx) => {
            return (
              <span key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="clinic"
                      color="primary"
                      onChange={() => handleChange({ type: "type", value: item.id })}
                    // checked={!!values.type.clinic}
                    />
                  }
                  label={item.text}
                />
              </span>
            )
          })}
        </div>
      </div>
      <div className="filter__rows">
        <h3 className="filter__title">Status</h3>
        <div className="filter__body">
        <RadioGroup aria-label="gender" name="gender1" value={+values.hidden} 
          onChange={(e)=>handleChange({ type: "hidden", value: e.target.value })}
        >
          {filterSortBtnList.map((item, idx) => {
            return (
              <span key={idx}>
                <FormControlLabel
                  value={item.id}
                  control={
                    <Radio
                      // value={item.id}
                      color="primary"
                      // onChange={() => handleChange({ type: "hidden", value: item.id })}
                    // checked={!!values.type.clinic}
                    />
                  }
                  label={item.text}
                />
              </span>
            )
          })}
          </RadioGroup>
        </div>
      </div>
      <div className="filter__rows ">
        <div className="btn__box">
          <button className="close__btn" onClick={onClose}>Cancel</button>
          <button className="apply__btn" onClick={() => {
            if(ENV_MODE_DEV){
              handleClick({type:"apply"})
            }else {
              alert('Coming soon.')
            }
          }}>Apply</button>
        </div>
      </div>
    </Styled.WorksPopContent>
  )
}


const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const PopoverState = {

}

export default function SimplePopover(props) {
  const classes = useStyles();
  const [values, setValues] = useImmer(PopoverState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { content, popover, className } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Styled.SimplePopover>
        <button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          className={cx("filter__btn", className)}
        >
          {content}
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {popover || <WorksPopContent onClose={handleClose} />}
        </Popover>
      </Styled.SimplePopover>
    </>
  );
}

const Styled = {
  WorksPopContent: styled.div`
    &{
      width:328px;
      height:400px;
      padding:25px;

      .filter__title{
        ${font(14, color.black_font)};
        font-weight:bold;
        border-bottom:1px solid ${color.gray_border6};
        padding-bottom:5px;
        margin-bottom:5px;
        margin-top:30px;
        &.top{
          margin-top:0;
        }
      }
      .close__btn{
        position: relative;
        ${buttonWhite};
        left:-5px;
        margin-right:10px;
      }
      .apply__btn{
        ${buttonBlue};
      }
      .btn__box{
        text-align:center;
        margin-top:20px;
      }
      .MuiIconButton-root{
        padding:0;
      }
      .MuiCheckbox-colorPrimary.Mui-checked, .MuiRadio-colorPrimary.Mui-checked{
        color:${color.blue};
      }
    }
  `,
  SimplePopover: styled.span`
    .filter__btn{
      cursor: pointer;
    }
  `
}