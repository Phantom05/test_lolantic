

import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import cx from 'classnames';
import { font, fontFamily } from 'styles/__utils';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';
import { dashToCamelCase,stringCssToObject } from 'lib/library';

import { createGlobalStyle } from 'styled-components';


const DropDownInputState = {
  keywordList: [],
  keyword: "",
  focused: false,
  open: false
}

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = child => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}

        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

function DropDownInput(props) {
  const [values, setValues] = useImmer(DropDownInputState);
  const { keywordList, _style, onBlur, value, itemStyle } = props;
  const classes = useStyles({ _style, itemStyle })();

  const handleBlur = e => {
    console.log(e.target.value, 'e.target.value');
    const targetValue = e.target.value;
    setValues(draft => {
      draft.keyword = targetValue;
    });
  }

  useEffect(() => {
    if (values.keyword && values.keyword.trim().length > 0) {
      console.log('handleBlur');
      onBlur && onBlur(values.keyword)
    }
  }, [values.keyword])


  useEffect(() => {
    const hasKeywordList = keywordList && keywordList.length > 0;
    if (hasKeywordList) {
      setValues(draft => {
        draft.keywordList = keywordList;
      })
    }
  }, []);

  return (
    <Styled.DropDownInput _style={_style}>
      <Autocomplete
        id="virtualize-demo"
        disableListWrap
        defaultValue={value}
        classes={classes}
        freeSolo
        ListboxComponent={ListboxComponent}
        options={values.keywordList}
        renderInput={params => <TextField {...params} variant="outlined" />}
        renderOption={option => <Typography noWrap>{option}</Typography>}
        onBlur={handleBlur}
        open={true}
        // style={{fontSize:12}}
        // renderGroup={renderGroup}
        // groupBy={item => item}
      />
    <Styled.GlobalStyles />
    </Styled.DropDownInput>
  );
}



const useStyles = config => {
  const {itemStyle = ""} = config;
  const itemListCss = stringCssToObject(dashToCamelCase(itemStyle));
  const convertFontFamily = stringCssToObject(dashToCamelCase(fontFamily.join('')));
  return makeStyles({
    listbox: {
      '& ul': {
        padding: 0,
        margin: 0,
      },
      '& p': {
        fontSize:13,
        color:'black',
        ...convertFontFamily,
        ...itemListCss,
      }
    },
  });
}


const Styled = {
  GlobalStyles: createGlobalStyle`
  .MuiAutocomplete-listbox{
    max-height: 193px;
    overflow-y: scroll;
  }`,
  DropDownInput: styled.div`
    padding:0 !important;
    width:100%;
    &{
      .MuiFormControl-root.MuiTextField-root{
        padding:0;
        width:100%;  
      }
      .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
        ${font(14)};
        ${({ _style }) => _style};
      }
      
      .MuiAutocomplete-inputRoot.MuiAutocomplete-input{
        /* ${({ _style }) => _style}; */
      }
      .combo__btn{
        display:inline-block;
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        right:10px;
        cursor: pointer;
        border:1px solid red;
        width:30px;
        height:30px;
        border-radius:100%;
        & > .icon{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
        }
      }
      .combo__wrapper{
        position:relative;
        width:100%;
      }
      /* .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
        ${font(14)};
        padding:8px 10px;
        ${({ _style }) => _style};
      } */
      .MuiFormControl-root{
        width:100%;
      }
      .option_item{
        ${font(12)};
      }
    }
  `
}


const renderGroup = params => [
  <ListSubheader key={params.key} component="div">
    {params.key}
  </ListSubheader>,
  params.children,
];
function random(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}


export default DropDownInput;

console.warn = () => { }



// function DropDownInput(props) {
//   const [values, setValues] = useImmer(DropDownInputState);
//   const { keywordList, _style, onBlur, value } = props;

//   const {
//     getRootProps,
//     getInputLabelProps,
//     getInputProps,
//     getTagProps,
//     getListboxProps,
//     getOptionProps,
//     groupedOptions,
//     focused,
//     setAnchorEl,
//   } = useAutocomplete({
//     id: 'customized-hook-demo',
//     defaultValue: value,
//     multiple: false,
//     options: values.keywordList,
//     freeSolo: true,
//     getOptionLabel: option => option,
//     loading:true,
//     open:values.open
//   });

//   useEffect(() => {
//     const hasKeywordList = keywordList && keywordList.length > 0;
//     if (hasKeywordList) {
//       setValues(draft => {
//         draft.keywordList = keywordList;
//       })
//     }
//   }, []);

//   const handleBlur = e => {
//     console.log(e.target.value, 'e.target.value');
//     const targetValue = e.target.value;
//     // setValues(draft=>{
//     //   draft.keyword = targetValue;
//     //   draft.focused = false
//     // })
//     setValues(draft=>{
//       draft.open = false;
//     });
//   }

//   const handleClick = e => {
//     console.log('handleClick');
//     setValues(draft=>{
//       draft.open = true;
//     });
//   }

//   // const handleFocus = e =>{
//   //   console.log('handleFocus');
//   //   setValues(draft=>{
//   //     draft.focused = true
//   //   })
//   // };


//   // useEffect(()=>{
//   //   if(values.focused === false){
//   //     onBlur && onBlur(values.keyword);
//   //   }
//   // },[values.focused]);

//   console.log(focused, 'focused');
//   return (
//     <Styled.DropDownInput >
//       <NoSsr>
//         <div className="combo__wrapper">
//           <div {...getRootProps()}>
//             <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''} onBlur={handleBlur} >
//               <input {...getInputProps()} />
//               {/* <TextField {...getInputProps()} onBlur={handleBlur} variant="outlined"  style={{ width: '100%' }}/> */}
//             </InputWrapper>
//           </div>
//           <span className="combo__btn" onClick={handleClick}>
//             <span className="icon">All</span>
//           </span>
//           {groupedOptions.length > 0 ? (
//             <Listbox {...getListboxProps()} >
//               {groupedOptions.map((option, index) => (
//                 <li {...getOptionProps({ option, index })}>
//                   <span>{option}</span>
//                   {/* <CheckIcon fontSize="small" /> */}
//                 </li>
//               ))}
//             </Listbox>
//           ) : null}
//         </div>
//       </NoSsr>
//     </Styled.DropDownInput>
//   );
// }




// function DropDownInput(props) {
//   const [values, setValues] = useImmer(DropDownInputState);
//   const { keywordList, _style, onBlur,value } = props;

//   useEffect(() => {
//     const hasKeywordList = keywordList && keywordList.length > 0;
//     if (hasKeywordList) {
//       setValues(draft => {
//         draft.keywordList = keywordList;
//       })
//     }
//   }, []);

//   const handleBlur = e =>{
//     console.log(e.target.value,'e.target');
//     onBlur && onBlur(e);
//   }

//   console.log(values,'vaa1!!');

//   return (
//     <Styled.DropDownInput _style={_style}>
//       <Autocomplete
//         id="combo-box-demo"
//         freeSolo
//         defaultValue={value}
//         options={values.keywordList}
//         getOptionLabel={option => option}
//         style={{ width: '100%' }}
//         renderInput={params => <TextField {...params} variant="outlined" />}
//         onBlur={handleBlur}
//       />
//     </Styled.DropDownInput>
//   );
// }


// const InputWrapper = styled('div')`
//   width: 100%;
//   border: 1px solid #d9d9d9;
//   background-color: #fff;
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;

//   &:hover {
//     border-color: #40a9ff;
//   }

//   &.focused {
//     border-color: #40a9ff;
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     font-size: 14px;
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 0;
//     min-width: 30px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `;
// const Listbox = styled('ul')`
//   width: 100%;
//   margin: 2px 0 0;
//   padding: 0;
//   position: absolute;
//   list-style: none;
//   background-color: #fff;
//   overflow: auto;
//   max-height: 250px;
//   border-radius: 4px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//   z-index: 1;
//   line-height:initial;

//   & li {
//     padding: 5px 12px;
//     display: flex;

//     & span {
//       flex-grow: 1;
//     }

//     & svg {
//       color: transparent;
//     }
//   }

//   & li[aria-selected='true'] {
//     background-color: #fafafa;
//     font-weight: 600;

//     & svg {
//       color: #1890ff;
//     }
//   }

//   & li[data-focus='true'] {
//     background-color: #e6f7ff;
//     cursor: pointer;

//     & svg {
//       color: #000;
//     }
//   }
// `;



// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useImmer } from 'use-immer';
// import cx from 'classnames';
// import _ from 'lodash';
// import {color} from 'styles/__utils';
// import { useSelector } from 'react-redux';



// const DropDownInputState = {
//   keyword: "",
//   keywordList: [],
//   allShow: false,
//   keywordBoxShow: false,
//   inputFocus:false,
//   focus:false,
// }
// const options = ['김테스', '이테스', '박테스', '박테이', '이환'].sort();

// function DropDownInput(props) {
//   const [values, setValues] = useImmer(DropDownInputState);
//   // const { case: caseReducer} =  useSelector(state=>state);
//   const { keywordList } = props;

//   const handleChange = e => {
//     const targetValue = e.target.value;
//     setValues(draft => {
//       draft.keyword = targetValue;
//       draft.allShow = false;
//       draft.keywordBoxShow = targetValue.trim() !== "";
//     })
//   }

//   const handleClick = config => {
//     const { type, value } = config;
//     if (type === 'listView') {
//       setValues(draft => {
//         draft.allShow = true;
//         draft.keywordBoxShow = true;
//       });
//     } else if (type === 'item') {
//       const findKeyword = _.find(values.keywordList, item => item === value);
//       setValues(draft => {
//         draft.keyword = findKeyword;
//         draft.keywordBoxShow = false;
//       });
//     }
//   }
//   const handleFocus =e =>{
//     const targetValue = e.target.value;
//     setValues(draft => {
//       draft.keyword = targetValue;
//       draft.allShow = false;
//       draft.keywordBoxShow = targetValue.trim() !== "";
//       draft.focus = true;
//     })
//   }
//   const handleBlur= e =>{
//     const targetValue = e.target.value;
//     setValues(draft => {
//       draft.focus = false;
//     })
//   }

//   useEffect(() => {
//     const hasKeywordList = keywordList && keywordList.length > 0;
//     if (hasKeywordList) {
//       setValues(draft => {
//         // draft.keywordList = keywordList;
//         draft.keywordList = options;
//       })
//     }
//   }, []);

//   const new_option_list = values.keywordList.filter(item => {
//     return item.indexOf(values.keyword) !== -1 && values.keyword !== "" || values.allShow;
//   });

//   return (
//     <Styled.DropDownInput>
//       <div className="keyword__input_box">
//         <div className={cx('input__wrapper',{active:values.focus})}>
//           <input
//             id="$DropDownInputLabel"
//             type="text"
//             value={values.keyword}
//             className="keyword__input"
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//           />
//           <span onClick={() => handleClick({ type: "listView" })} className="allBtn">All</span>
//         </div>
//         <div className={cx('keyword__box', { active: values.keywordBoxShow })}>
//           {new_option_list.map((item, idx) => {
//             return <div className="keyword__item" key={idx} onClick={() => handleClick({ type: "item", value: item })}>{item}</div>
//           })}
//         </div>
//       </div>
//     </Styled.DropDownInput>
//   );
// }

// export default DropDownInput;

// const Styled = {
//   DropDownInput: styled.div`
//   width:100%;
//     & {
//       .input__wrapper{
//         &.active{
//           background:red;
//         }
//       }
//       .keyword__input{
//         display:block;
//         width:100%;
//         border:1px solid rgba(0, 0, 0, 0.23);
//         padding: 8px 15px;
//         border-radius:2px;
//         outline:none;
//       }
//       .keyword__input_box{
//         position:relative;
//       }
//       .keyword__box{
//         display:none;
//         position:absolute;
//         width:100%;
//         background:white;
//         border: 1px solid rgba(0,0,0,.15);
//         z-index:1;
//         top:35px;
//         /* top 인풋 크기 +2px */
//         box-shadow:0 6px 12px rgba(0,0,0,.175);
//         border-radius:0 0 4px 4px;
//         &.active {
//           display:block
//         }
//       }
//       .keyword__item{
//         background:white;
//         line-height:initial;
//         padding:5px;
//         &:hover{
//           background:#ececec;
//           cursor: pointer;
//         }
//         &:last-child{
//           border-radius:0 0 4px 4px;
//         }
//       }
//       .allBtn{
//         position:absolute;
//         display:inline-block;
//         cursor: pointer;
//         top:50%;
//         transform:translateY(-50%);
//         right:10px;
//       }
//     }
//   `
// }

