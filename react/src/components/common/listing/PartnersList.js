import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';
import RadioGroup from '@material-ui/core/RadioGroup';
import {PartnersListItem} from 'components/common/card';

// import {useImmer} from 'use-immer';


/**
 * onClick
 * list,info 
 * @param {*} props 
 */
function PartnersList(props) {
  let {
    list,
    info,
    typeList,
    option,
    selectOption,
    pCode,
  } = props;
  
  // list 선택 관리
  const handleClick = useCallback(config => e => {
    const {type} = config;
    if (type === 'selected') {
      const result={
        component:`PartnersList`,
        value:e.key
      }
      Object.assign(result,config,e);
      props.onClick && props.onClick(result);
    }
  },[]);

  // my partner list default partner sorting
  if(option === 'my'){
    if(list.length){
      //props로 받아온 list는 type에러가 발생하기 때문에 복사해올 array를 만들어준다.
      let partnerList = new Array();
      list.forEach(element => {
        partnerList.push(element);
      });

      let _index = 0;
      let prevList = [];

      // 내 파트너 리스트에서 디폴트 리스트 위로 정렬 및 (기본) 붙여주기
      partnerList.forEach((i, index) => {
        if(i.info.userCode === pCode){
          _index = index;
          prevList = partnerList.splice(_index, 1);
          partnerList.splice(0, 0, prevList[0]);
          partnerList[0] = {
            info:{
              ...partnerList[0].info,
              companyName: `(기본) ${i.info.companyName}`,
            }
          }
        } 
      });
      
      list = partnerList;
    }
  }

  return (
    <Styled.PartnersList>
      
        <div className="list__control">
          <div className="list__box_title">
            <Grid container justify="space-between" >
            <Grid item xs={1} className="list__box_item th">
                <span className="list__box_tx tx bold">선택</span>
              </Grid>
              <Grid item xs={2} className="list__box_item th">
                <span className="list__box_tx tx bold">고유번호</span>
              </Grid>
              <Grid item xs={3} className="list__box_item th">
                <span className="list__box_tx tx bold">업체명</span>
              </Grid>
              <Grid item xs={4} className="list__box_item th">
                <span className="list__box_tx tx bold">주소</span>
              </Grid>
              <Grid item xs={2} className="list__box_item th">
                <span className="list__box_tx tx bold">
                  타입
                </span>
              </Grid>
              
            </Grid>
          </div>

          <RadioGroup value={info.value} >
            <div className="list__box">
              {list.map((item, idx) => (
                <PartnersListItem key={idx} id={option === 'my'? item.info.userCode : item.info.code} typeList={typeList} {...item.info} option={option}
                  handleModal={props.handleModal}
                  selectOption={selectOption}
                  onClick={handleClick({ type: 'selected'})} 
                />
              ))}
            </div>
          </RadioGroup>
        </div>
    </Styled.PartnersList>
  );
}

const Styled = {
  PartnersList: styled.div`
    .list__control .MuiFormGroup-root{
      flex-wrap:nowrap;
    }
    .list__control{
      position: relative;
      /* height:400px;
      overflow:auto; */

      .list__box_title{
        position: sticky;
        top: 0;
        left: 0;
        overflow:hidden;
        z-index: 99;
      }
    }
    .partnerss__btn{
      ${buttonBlue};
      box-shadow:none;
      &:hover{
        box-shadow:none;
      }
    }
    .list__box_tx{
      &.tx{
        padding:0 5px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        ${font(14, color.black_font)};
        ${dotdotdot};
        width:100%;
      }
      &.bold{
        font-weight:600;
      }
    }
    .list__box_item{
      position:relative;
      height:50px;
      border-right:1px solid ${color.gray_border6};
      text-align:center;
      &.th{
        height: 40px;
      }
      &:last-child{
        border-right:0;
      }

    }
    .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
  `
}

export default PartnersList;