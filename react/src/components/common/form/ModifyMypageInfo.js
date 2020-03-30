import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import cx from 'classnames';
import { font,color} from 'styles/__utils';
import {CountrySelector} from 'components/common/input';
import _ from 'lodash';
import { DatePicker } from 'components/common/input';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';
import {
    icon_lock,
    icon_house,
    icon_person,
    icon_spot,
    icon_email,
  } from 'components/base/images';

import {
// INFO_PARTNERS_SAGAS,
// LISTING_COUNTRY_SAGAS,
// LISTING_LOCATION_SAGAS,
INFO_INFORMATION_UPDATE_SAGAS,
CHANGE_PROFILE_SAGAS
} from 'store/actions';


function ModifyMypageInfo(props) {
    const {
        countryData,
        cityData,
        onChange,
        userCode,
        info,
        handleModify,
        openModal
    } = props;

    const classes = useStyles();
    const {
        mypage: mypageReducer
    } = useSelector(state => state);

    const [values, setValues] = useImmer({
        isPublicCheck: info.open,
        profile: {
            value: null,
            name: info.profile,
            fileExtension: false
        },
        type: {
            clinic : info.type.clinic,
            lab : info.type.lab,
            milling : info.type.milling,
        },
        storeName: info.company? info.company : '',
        manager: info.manager? info.manager : '',
        person: info.name? info.name : '',
        phone: info.phone? info.phone : '',
        country: {
            active: true,
            current: ''
        },
        city: {
            active: false,
            current: '',
            precedeData: ''
        },
        address: info.address? info.address : '',
        licence: info.licenseData? info.licenseData.licenseCode : '',
        issueLicence: info.licenseData? moment(info.licenseData.licenseDate).unix() : moment().unix(),
        submitOn : false
    });

    const {
        isPublicCheck,
        profile: {name: profileName},
        storeName,
        manager,
        person,
        phone,
        city : { active: cityActive },
        licence,
        issueLicence,
        address,
    } = values;
    

    /**
     * CountrySelector 컴포넌트
     * @param {*} param0 object{select: input value 값, type: select 요소 종류}
     */
    const selectFunc = useCallback(({select, type}) => {
        // console.log("input", select, type);

        if(type === "country"){
            setValues(draft => {
                draft.country.current = select;
                draft.city.precedeData = select;
                draft.city.active = true;
                draft.city.current = '';
            });
        }
        if(type === "city"){
            setValues(draft => {
                draft.city.current = select;
            });
        }
    },[]);

    // date picker 값을 받아옴.
    const handleDateChange = useCallback(date => {
        const moDate = moment(date).unix();
        setValues(draft => {
            draft.issueLicence = moDate;
        })
    }, []);


    const devInsertAccount = () => {
        setValues(draft => {
          draft.isPublicCheck = "2";
          draft.type = {clinic: false, lab: true, milling: true};
          draft.storeName = "변경된 가게이름";
          draft.person = "변경자";
          draft.phone = "0101010101";
          draft.address = "변경한 주소"
        })
      };

      /**
       *  [File]
      let arr =[];
      arr.push(e.target.files[0])

      const testData = {
        userCode, 
        files:{
            profileFile:arr
            }
        }
        const formData = setFormData(testData);
        CHANGE_PROFILE_SAGAS(formData)
       */
      
    // 체크박스 혹은 인풋박스 이벤트 관리
    const handleChange = useCallback(prop => e => {
        const inputType = (prop === 'type') ? 'checked' : 'value';
        const targetValue = e.target[inputType];
        const targetKey = e.target.value;
        let targetFile= null;

        // 이미지 파일 선택시
        if(prop==='profile'){
            targetFile = e.target.files;
        }
        setValues(draft => {
          if (['profile'].indexOf(prop) !== -1) {
              if(prop==='profile'){
                  if(targetFile.lenght > 0){
                    
                  }else{
                      // 이미지 파일형식일때 데이터 가져오기
                    if(targetFile[0].type.startsWith('image/')){
                        draft[prop].name = targetFile[0].name;
                        draft[prop].value = targetFile[0];
                        draft[prop].fileExtension = true;
                        
                    }else{
                        draft[prop].name = '';
                        draft[prop].value = null;
                        draft[prop].fileExtension = false;
                    }
                  }
              }
          } else if(prop==='type'){
                draft[prop][targetKey] = targetValue;
            }else {
                draft[prop] = targetValue;
            }
        });
      },[]);
      
      // 수정하기 버튼 클릭 이벤트
      const onSubmit = _.debounce((value, countryData, cityData) => {
        // console.log('submit');
        const {
            profile: {value : profileValue},
            isPublicCheck,
            type,
            storeName,
            manager,
            person,
            phone,
            address,
            licence,
            issueLicence
        } = value;
        
        const activeCountry = value.country.current !== "";
        const activeCity = value.city.current !== "";
        const reqArea = activeCountry && activeCity;
        
        const isAllTrue = [
        activeCountry,
        reqArea];

        // 데이터 확인
        if(isAllTrue.every(x => x)){
            const dataConfig = {
                "jsonType"  : "update.req.json" ,
                "userCode"  : userCode,
                "open"      : isPublicCheck,
                "type"      : type,
                "company"   : storeName,
                "manager"   : manager,
                // "name"      : person,
                "phone"     : phone,
                "countryId": value.country.current,
                "statesId" : value.city.current,
                "address"  : address,
                "licenseData": type.lab? {
                    "licenseCode": licence? licence : "",
                    "licenseDate": issueLicence? moment.unix(issueLicence).format("YYYY-MM-DD") : ""
                } : null
            }
            
            // 이미지 파일 있으면 파일 전송요청
            if(profileValue){
                CHANGE_PROFILE_SAGAS({file: profileValue, userCode: userCode});
            }
            INFO_INFORMATION_UPDATE_SAGAS(dataConfig);
            // handleModify();
        }else{
            openModal('needData');
        }
      }, 200);

    // 버튼 클릭 이벤트 관리
    const handleClick = useCallback((config) => e => {
        const { type, value } = config;
        if (type === 'selected'){
            if (value === 'country') {
                setValues(draft => {
                draft.city.active = true;
                });
            }
            onChange({
                type: value,
                value: e.target.value
            })
        }else if (type === 'submit'){
        onSubmit(values);
        
        }else if (type === 'preventDefault'){
        e.preventDefault();
        // 이미지 파일 정보 삭제
        }else if(type === 'fileDelete'){
            console.log("DELETE", values.profile.value);
            setValues(draft => {
                draft[value].name = '';
                draft[value].value = null;
            });
        }else if(type === 'cancel'){
            
        }
    },[values]);
    
    
    return (
        <Styled.ModifyWrap>
            <form action="" className={classes.root}>
            {/* <button onClick={devInsertAccount}>dev</button> */}
            <div className='root'>
                <div className="row addInfoRow">
                    <div className="item label">
                    <label className="input__label">
                        <span className="label__img_box">
                            <img src={icon_person} alt="icon_lock" />
                        </span>
                        <span>
                            프로필 사진
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                        <div className="contWrap">
                            <TextField
                                error={false}
                                variant="outlined"
                                placeholder={profileName}
                                disabled
                                className={cx(classes.textField, 'fileInput')}
                            />
                            <label htmlFor="profile" className={cx(classes.btn, `blue`, `upload`)}
                            >+ Upload
                            <input 
                                type="file" 
                                value=""
                                accept=".gif,.png,.jpeg,.jpg" 
                                id="profile" 
                                name="profilePath" 
                                className={cx('file')} 
                                onChange={handleChange('profile')} />
                            </label>
                            <Button
                                variant="contained"
                                className={cx(classes.btn, `delete`, `white`)}
                                onClick={handleClick({type: 'fileDelete', value: 'profile'})}
                            >Delete</Button>
                        </div>
                        <div className={cx(`input__info`)}>
                            <span className={cx(`input__info_text`, { active: false })}>* 이미지 파일(.jpg, .jpeg, .png, .gif 등)만 업로드할 수 있습니다.</span>
                        </div>
                    </div>
                </div>
                
                <div className="row addInfoRow" >
                    <div className="item label">
                    <label htmlFor="isPublic" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_lock} alt="icon_lock" />
                        </span>
                        <span>
                        공개여부
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <RadioGroup aria-label="position" name="position" value={`${isPublicCheck}`} onChange={handleChange(`isPublicCheck`)} row>
                        <FormControlLabel
                        value="0"
                        control={<Radio color="primary" size="small" />}
                        label={<span className="mypageInfo__input public text">전체 공개</span>}
                        labelPlacement="end"

                        />
                        <FormControlLabel
                        value="1"
                        control={<Radio color="primary" size="small" />}
                        label={<span className="mypageInfo__input public text">파트너 맺은 업체에만 공개</span>}
                        labelPlacement="end"
                        />
                        <FormControlLabel
                        value="2"
                        control={<Radio color="primary" size="small" />}
                        label={<span className="mypageInfo__input public text">비공개</span>}
                        labelPlacement="end"
                        />
                    </RadioGroup>
                    <div className={cx(`input__info`)}>
                        <span className={cx(`input__info_text`, { active: false })}>* 비공개의 경우 기본적으로 타입, 업체명, 이름, 메일이 공개됩니다.</span>
                    </div>
                    </div>
                </div>

                <div className="row" >
                    <div className="item label">
                    <label htmlFor="storeName" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_house} alt="icon_house" />
                        </span>
                        <span>
                        업체명
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="storeName"
                        name="storeName"
                        value={storeName}
                        onChange={handleChange(`storeName`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div>

                <div className="row" >
                    <div className="item label">
                    <label htmlFor="manager" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_person} alt="icon_person" />
                        </span>
                        <span>
                        대표자
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="manager"
                        name="manager"
                        value={manager}
                        onChange={handleChange(`manager`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div>

                {/* <div className="row" >
                    <div className="item label">
                    <label htmlFor="person" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_person} alt="icon_person" />
                        </span>
                        <span>
                        담당자
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="person"
                        name="person"
                        value={person}
                        onChange={handleChange(`person`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div> */}

                <div className="row">
                    <div className="item label">
                    <label htmlFor="type" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_house} alt="icon_house" />
                        </span>
                        <span>
                            타입
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value="clinic"
                                    color="primary"
                                    onChange={handleChange('type')}
                                    checked={!!values.type.clinic}
                                />
                                }
                                label="Clinic"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value="lab"
                                    color="primary"
                                    onChange={handleChange('type')}
                                    checked={!!values.type.lab}
                                />
                                }
                                label="CAD Lab"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    value="milling"
                                    color="primary"
                                    onChange={handleChange('type')}
                                    checked={!!values.type.milling}
                                />
                                }
                                label="Milling"
                            />
                        </FormGroup>
                    </div>
                </div>

                <div className="row" >
                    <div className="item label">
                    <label htmlFor="region" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_spot} alt="icon_spot" />
                        </span>
                        <span>
                        지역
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                        <div className="contWrap">
                            {/* <FormControl className={classes.formControl} variant="outlined">
                                <Select
                                value={countryData.current}
                                onChange={handleClick({type:'selected',value:'country'})}
                                displayEmpty
                                className={classes.selectEmpty}
                                >
                                <MenuItem disabled value="">
                                    <em>국가선택</em>
                                </MenuItem>
                                {Array.isArray(countryData.list) && countryData.list.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl} disabled={!cityActive} variant="outlined">
                                <Select
                                value={cityData.current}
                                onChange={handleClick({type:"selected",value:"city"})}
                                displayEmpty
                                className={classes.selectEmpty}
                                >
                                <MenuItem disabled value="">
                                    <em>선택</em>
                                </MenuItem>
                                {Array.isArray(cityData.list) && cityData.list.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                                ))}
                                </Select>
                            </FormControl> */}
                            <CountrySelector 
                            className={classes.formControl}
                            parentState={selectFunc}
                            info={info.country_id}
                            data={countryData}
                            current={values.country.current}
                            type="country"
                            >
                                국가선택
                            </CountrySelector>
                            <CountrySelector 
                            className={classes.formControl}
                            disabled={!cityActive}
                            parentState={selectFunc}
                            info={info.states_id}
                            data={cityData}
                            current={values.city.current}
                            precedeData={values.city.precedeData}
                            type="city"
                            >
                                지역선택
                            </CountrySelector>
                        </div>
                    </div>
                </div>

                <div className={`row ${!values.type.lab && 'hidden'}`} >
                    <div className="item label">
                    <label htmlFor="licence" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_house} alt="icon_house" />
                        </span>
                        <span>
                        기공소 라이센스
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="licence"
                        name="licence"
                        value={licence}
                        onChange={handleChange(`licence`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div>

                <div className={`row ${!values.type.lab && 'hidden'}`} >
                    <div className="item label">
                    <label htmlFor="phone" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_person} alt="icon_phone" />
                        </span>
                        <span>
                        라이센스 발급일자
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                        <DatePicker
                        value={moment.unix(issueLicence).toDate()}
                        className="CreateCase_input date"
                        onChange={handleDateChange}
                        autoOk={true}
                        disablePast={false}
                        style={{width: '100%'}}
                        />
                    </div>
                </div>

                <div className="row" >
                    <div className="item label">
                    <label htmlFor="phone" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_person} alt="icon_phone" />
                        </span>
                        <span>
                        연락처
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange(`phone`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div>

                <div className="row" >
                    <div className="item label">
                    <label htmlFor="address" className="input__label">
                        <span className="label__img_box">
                        <img src={icon_house} alt="icon_house" />
                        </span>
                        <span>
                        주소
                        </span>
                    </label>
                    </div>
                    <div className="item cont">
                    <TextField
                        error={false}
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChange(`address`)}
                        variant="outlined"
                        fullWidth
                        className={cx(classes.textField)}
                    />
                    </div>
                </div>
            </div>
            </form>
            <div className="btnGnb">
                <Button
                    variant="contained"
                    className={cx(classes.btn, `white`, 'cancel')}
                    onClick={handleModify({type: 'viewModify',view: 'false'})}
                >취소</Button>
                <Button
                    variant="contained"
                    className={cx(classes.btn, `blue`, 'confirm')}
                    onClick={handleClick({type: 'submit'})}
                >수정 완료</Button>
            </div>
        </Styled.ModifyWrap>
    );
}

const Styled = {
  ModifyWrap: styled.div `
 
    .MuiSelect-outlined.MuiSelect-outlined{
        padding: 7px 14px;
    }
    /* .MuiOutlinedInput-notchedOutline{
        height: 34px;
    } */
    .MuiOutlinedInput-input{
        padding: 17px 14px;
    }
    .makeStyles-btn-218{
        height: 34px;
    }
    .row{
        display: table;
        width: 100%;

        &.addInfoRow{
            padding-bottom: 30px;
        }

        .item{
            display: table-cell;
            vertical-align: middle;
            ${font(16, color.gray_font)};
            
        }
        .label{
            width: 160px;
            &.cellTop{
                vertical-align: top;
            }
        }
        &.hidden{
            display: none;
        }
    }
    
    .row .cont{
        .contWrap{
            display: flex;
            align-items: center;
        }
    }

    .label__img_box{
        ${font(16, color.black_font)};
        display: none;
        opacity: 0;
    }
    
    .input__info{
        position: absolute;
        color: ${color.blue};
        padding-top: 5px;
        font-size: 12px;
    }

    .file{
        display: none;
        opacity: 0;
    }
    
    form{
        .root{
            width: 100%;
            & >div + div{
                margin-top: 10px;
            }
        }

        .btnGnb {
            text-align: right;
            margin-top: 30px;
            button + button{
            margin-left: 5px;
            }
            /* margin-top: 14px; */
        }
    }
    .input__label{
      ${font(16, color.black_font)};
      font-weight: bold;
    }
    .MuiTypography-body1{
      ${font(16, color.gray_font)};
    }
    .MuiCheckbox-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
    .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }

    .MuiOutlinedInput-root{
      border-radius: 3px;
    }
   
    .MuiOutlinedInput-input .Mui-focused fieldset{
        border: 2px solid ${color.blue};
  }
  .Mui-focused .MuiOutlinedInput-notchedOutline{
      border-color:${color.blue} !important;
    }
    .MuiButton-root {
      ${font(16, color.white)};
    }
    .MuiButton-label{
      border-radius: 3px;
      &.cancel {
        ${font(16, color.blue)};
      }
    }
    `
}

const useStyles = makeStyles(theme => ({
    root: { 
      width: '100%'
    },
    textField: {
      '&.fileInput': {
        flex: '4 1 auto',
        '& >div': {
            width: '100%'
        }
      },
      '&.emailInput': {
          flex: '9 1 auto',
      }
    },
    btn: {
      display: 'inline-block',
      margin: 'auto',
      border: `1px solid ${color.blue}`,
      boxShadow: 'none',
      marginLeft: '5px',
      borderRadius: `3px`,
      background: `${color.btn_color}`,

      '&.bold': {
        fontWeight: 'bold'
      },
      '&:hover': {
        border: `1px solid ${color.blue}`,
        boxShadow: 'none',
        background: `${color.btn_color_hover}`
      },
      

      '&.emailCheck': {
        flex: '1 1 auto'
      },
      
      '&.delete': {
        // flex: '1 1 auto',
        padding: `2px 10px`,
        borderRadius: '3px',
        color: '#54ACDF',
        textTransform: 'none',
        background: `${color.white}`,
        color: `${color.blue}`,
      },
      
      '&.upload': {
          display: 'inline-flex',
          // flex: '1 1 auto',
          flexDirection: 'column',
          verticalAlign: 'top',
          cursor: 'pointer',
          padding: `4px 10px`,
          borderRadius: '3px',
          background: `${color.blue}`,
          color: `white`,
          '&:hover': {
              background: `${color.blue_hover}`,
          }
      },

      '&.cancel':{
        padding: `5px 15px`,
      },
      '&.confirm': {
          padding: `5px 15px`,
      }
    },
    formControl: {
      flex : '1 1 auto',
      '& + &':{
          marginLeft: '5px'
      }
    },
    input: {
      height: 35,
    },
    label: {
      fontSize: 14,
      top: `-17%`,
    },
    eyeIcon: {
      fontSize: 15
    },
  }));

export default React.memo(ModifyMypageInfo);