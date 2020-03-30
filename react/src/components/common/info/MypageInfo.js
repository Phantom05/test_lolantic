import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import { font, color } from 'styles/__utils';
import {TextLine} from 'components/common/textLabel';
import {ModifyMypageInfo} from 'components/common/form';
import cx from 'classnames';
import {compareProp} from 'lib/library';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function MypageInfo(props) {
    const {
        initData,
        onChange,
        onClick,
        countryData,
        cityData,
        userCode,
        viewModify,
        handleClick,
        openModal
    } = props;
    // console.log("RERERERERER", props);
    const classes = useStyles();
    
    const [valid, setValid] = useImmer({
        viewModify: false,
        info:{
            profile: null,
            myCode: "",
            open: 0,
            company: "",
            manager: "",
            // name: "",
            email: "",
            phone: "",
            address: "",
            type: [],
            country_id: 0,
            country: "",
            states_id: 0,
            state: "",
            licenseData: null,
       }
    })

    const textConf = {
        profile: '프로필 사진',
        open: '공개여부',
        company: '업체명',
        manager: '대표자',
        type: '타입',
        regionName: '지역',
        licence: '기공소 라이센스',
        issueLicence: '라이센스 발급일자',
        phone: '연락처',
        address: '주소'
    };

    const styleConf = {
        _color: "#777777"
    }

    // 디폴트 프로필 이미지
    const defaultProfilePath = "data:image/jpeg;base64,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";
    
    // 렌더링 시 또는 내 정보 변경이 일어났을 때 정보 세팅
    useEffect(() => {
        if(Object.keys(initData).length){
            // console.log("!!!@!@!", initData);
            let koreaAuthState = '';
            if(initData.country_id=== 116 && initData.licenseData){
                if(initData.licenseData.state === 0){
                    koreaAuthState = '(신청)';
                }else if(initData.licenseData.state === 1){
                    koreaAuthState = '(인증완료)';
                }else{
                    koreaAuthState = '(거부)';
                }
            }
            setValid(draft =>{
                draft.info = {
                    profile: initData.profile? initData.profile : defaultProfilePath,
                    myCode: initData.myCode,
                    open: initData.open === 0 ? "전체 공개" : (initData.open === 1 ? "파트너 맺은 업체에만 공개" : "비공개"),
                    company: initData.company,
                    manager: initData.manager,
                    type: `${Object.keys(initData.type).map(i => {
                      return initData.type[i] ? `${i.toUpperCase()}` : '';
                    }).join(' ')}`,
                    // name: initData.name,
                    email: initData.email,
                    regionName: `${initData.country && initData.state ? `${initData.country} / ${initData.state}` : ''}`,
                    licence: initData.licenseData? `${initData.licenseData.licenseCode} ${koreaAuthState}` : '',
                    issueLicence: initData.licenseData? moment(initData.licenseData.licenseDate).format("YYYY-MM-DD") : '',
                    phone: initData.phone,
                    address: initData.address,
                }
            });

            props.routeHistory();
        }
    },[initData]);
    
    return (
        <Styled.MyPageWrap>
            <div className="account">
                <div className="wrap_title">
                    <span className="title">계정 정보</span>
                    <Button
                        variant="contained"
                        className={cx(classes.btn, `passwordChange`)}
                        onClick={handleClick({type: 'passwordChange'})}
                    >비밀번호 변경</Button>
                </div>
                <div className="wrap_cont">
                    <Styled.MypageListBox>
                        <TextLine
                        styleConf={styleConf}
                        cont={{
                            label: "이메일 주소",
                            text: valid.info.email,
                            type: "txt"
                        }}
                        />
                        <TextLine
                        styleConf={styleConf}
                        cont={{
                            label: "고유번호",
                            text: valid.info.myCode,
                            type: "txt"
                        }}
                        />
                    </Styled.MypageListBox>
                </div>
            </div>
            <div className="basic">
                <div className="wrap_title">
                    <span className="title">기본정보</span>
                    {
                        viewModify?
                        null
                        :
                        <Button
                            variant="contained"
                            className={cx(classes.btn, `modify`)}
                            onClick={handleClick({type: 'viewModify'})}
                        >MODIFY</Button>
                    }
                </div>
                <div className="wrap_cont">
                    {
                        viewModify?
                        <ModifyMypageInfo
                        onClick={onClick}
                        onChange={onChange}
                        countryData={countryData}
                        cityData={cityData}
                        handleModify={handleClick}
                        info={initData}
                        userCode={userCode}
                        openModal={openModal}
                        />
                        :
                        <Styled.MypageListBox>
                        {   
                            Object.keys(valid.info).filter(i => (i !== 'email' && i !== 'myCode')).map((i, index) => {
                                if(i !== 'profile'){
                                    if(i === 'licence' || i === 'issueLicence'){
                                        if(initData.type.lab){
                                            return (
                                                <TextLine
                                                key={index}
                                                styleConf={styleConf}
                                                cont={{
                                                    label: textConf[i],
                                                    text: valid.info[i],
                                                    type: "txt"
                                                }}
                                                />
                                            )
                                        }
                                    }else{
                                        return (
                                            <TextLine
                                            key={index}
                                            styleConf={styleConf}
                                            cont={{
                                                label: textConf[i],
                                                text: valid.info[i],
                                                type: "txt"
                                            }}
                                            />
                                        )
                                    }
                                }else if(i === 'profile'){
                                    return (
                                    <TextLine 
                                    key={index}
                                    styleConf={styleConf}
                                    cont={{
                                        label: textConf[i],
                                        img: valid.info[i],
                                        type: "img"
                                    }}
                                    />
                                    )
                                }
                            })
                        }
                        </Styled.MypageListBox>
                    }
                </div>
            </div>           
        </Styled.MyPageWrap>
    );
}

const useStyles = makeStyles(theme => ({
    btn: {
      display: 'inline-block',
      margin: 'auto',
      border: `1px solid ${color.btn_color}`,
      background: `${color.btn_color}`,
      boxShadow: 'none',
      '&.bold': {
        fontWeight: 'bold'
      },
      '&:hover': {
        border: `1px solid ${color.btn_color_hover}`,
        boxShadow: 'none',
        background: `${color.btn_color_hover}`,
      },
    }
  }));

const Styled = {
    MyPageWrap: styled.div`
     padding: 16px 6px;
     .account{
        padding: 0 10px;
        padding-bottom: 30px;
        border-bottom: 1px solid #E2E7EA;
     }

     .basic{
        padding: 0 10px;
        margin-top: 30px;
     }

    .wrap_title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title{
            font-family: Noto Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 25px;
            color: #242F35;
        }
        button{
            margin: 0;
        }
    }
     
    .wrap_cont{
        margin-top: 28px;
        margin-left: 110px;
    }
   .MuiButton-root{
      ${font(16, color.white)};
      padding: 5px 15px;
     }

     .btnGnb {
        text-align: right;
        margin-top: 30px;
        button + button{
        margin-left: 5px;
        }
        /* margin-top: 14px; */
    }
    
    `,
    MypageListBox: styled.div`
        position: relative;
        width: 695px;

        div + div{
            margin-top: 20px;
        }

        .txtLabel{
        ${font(14, color.black_font)};
        }
        .cont {
        ${font(14, color.gray_font)};
        }
     
    `,
    
    
}

export default React.memo(MypageInfo);