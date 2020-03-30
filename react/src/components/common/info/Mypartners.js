import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";

import { font, color } from "styles/__utils";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { TextLine } from "components/common/textLabel";
import { PartnerListSearchForm } from "components/common/form";


function Mypartners(props) {
  const { onSubmit, handleClick } = props;

  const [values, setValues] = useImmer({
    isPartner: "1",
    selectCompany: "",
    setBaseAdd: false,
    myPartnerPage: false,
  });
  const { isPartner, myPartnerPage } = values;

  const classes = useStyles();

  // 파트너 등록 (파트너목록, 파트너요청하기) tab 변경 이벤트 관리
  const changeCont = useCallback(e => {
    console.log("handle change");
    const eventValue = e.target.value;
    setValues(draft => {
      draft.isPartner = eventValue;
      draft.myPartnerPage = false;
    });
  },[values.isPartner, values.myPartnerPage]);

  // 파트너 리스트 클릭 이벤트 관리
  const selectCompany = useCallback(value => {
    setValues(draft => {
      draft.selectCompany = value;
    });
  },[values.selectCompany]);

  // 기존 ui에서 있던, 디폴트 체크박스 이벤트관리
  const handleChange = e => {
    setValues(draft => {
      draft.setBaseAdd = !values.setBaseAdd;
    });
  };

let compnayListView = '';
// 업체목록 tab 활성화시 나타날 컴포넌트
if(isPartner === "1"){
  compnayListView = (
    <div className="listCont">
       <div className="contentTitle">
          <p>나의 파트너 목록</p>
        </div>
      <PartnerListSearchForm
        selectCompany={selectCompany}
        onSubmit={onSubmit}
        routeHistory={props.routeHistory}
        option="my"
        styleConf={{
          searchDivtype: "rowMode",
          radioExist: false,
          buttonExist: false,
          tableHeihgt: "350px"
        }}
      />
      <div className="btnGnb">
        <Button
          variant="contained"
          className={cx(classes.btn, `white`)}
          onClick={handleClick({
            type: "deletePartner",
            value: values.selectCompany.value
          })}
        >
          삭제
        </Button>
        <Button
          variant="contained"
          className={cx(classes.btn, `blue`)}
          onClick={handleClick({
            type: "addPartner",
            option: "default",
            value: values.selectCompany.value
          })}
        >
          기본 업체로 등록
        </Button>
      </div>
    </div>
   );

// 추가등록하기 tab 활성화시 나타날 컴포넌트
}else{
  compnayListView = (
    <>
    <div className="borderCont">
      <div className="contentTitle">
        <p>파트너 검색하기</p>
      </div>
      <PartnerListSearchForm
        selectCompany={selectCompany}
        onSubmit={onSubmit}
        styleConf={{
          searchDivtype: "rowMode",
          radioExist: true,
          buttonExist: false,
          tableHeihgt: "350px"
        }}
      />
      <div className="btnGnb">
        {/* <FormControlLabel
          control={
            <Checkbox
              value="addBaseCompany"
              color="primary"
              checked={values.setBaseAdd}
              onChange={handleChange}
            />
          }
          label="기본 업체로 등록하기"
        /> */}
        <Button
          variant="contained"
          className={cx(classes.btn, `blue`)}
          onClick={handleClick({
            type: "addPartner",
            // option: values.setBaseAdd ? "default" : "", //기본업체 등록 체크박스있을때
            option: "",
            value: values.selectCompany.value
          })}
        >
          파트너 요청하기
        </Button>
      </div>
    </div>
  </>
 );
}


  return (
    <Styled.MyPageWrap>
      <Styled.SelectBox>

        <div className="radioBox">
          <div className="radioLabel">
            <label>My Partners</label>
          </div>
          <div className="radioGroup">
            <RadioGroup
              aria-label="position"
              name="position"
              value={isPartner}
              onChange={changeCont}
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio color="primary" size="small" />}
                label={
                  <span className="mypagePartner__input public text">
                    파트너 목록
                  </span>
                }
                labelPlacement="end"
                onClick={handleClick({ type: "getMyPartner"})}
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" size="small" />}
                label={
                  <span className="mypagePartner__input public text">
                    파트너 요청하기
                  </span>
                }
                labelPlacement="end"
                onClick={handleClick({ type: "getPartner", option: "all" })}
              />
            </RadioGroup>
          </div>
        </div>
      </Styled.SelectBox>

      <div className="content">
        <>{compnayListView}</>
      </div>
    </Styled.MyPageWrap>
  );
}

const Styled = {
  MyPageWrap: styled.div`

  .MuiTypography-root{
    ${font(16, color.black_font)};
  }

  .MuiFormGroup-root{
    ${font(16, color.black_font)};
  }

  .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
  
  .MuiButton-root{
    ${font(16, color.white)};
    &.blue{
      padding: 5px 15px;
    }
  }

.content {
  padding: 10px;
  
  /* .listCont {
    margin-top: 10px;
  } */
  .borderCont {
    border-radius: 3px;
  }
  
  .btnGnb {
    text-align: right;
    margin-top: 20px;
    button + button{
      margin-left: 5px;
    }
    /* margin-top: 14px; */
  }
}

 .contentTitle {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${color.blue_line_bg};

    .titleItem {
      display: inline-block;
      text-align: center;
      &.titleLabel {
        margin-right: 30px;
      }
      &.titleCont {
        color: #777;
      }
    }
  }
  `,
SelectBox: styled.div`
  position: relative;
  .radioBox {
    display: flex;
    flex-flow: row nowrap;
    padding: 5px;
    border-bottom: 2px solid #777;
    .radioLabel {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      & label {
        ${font(16, color.black_font)};
      }
    }
    .radioGroup {
      margin-left: 30px;
    }
  }
`,
MypageListBox: styled.div`
  position: relative;
  margin-top: 25px;
  div + div {
    margin-top: 24px;
  }
  `
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  textField: {
    "&.fileInput": {
      flex: "4 1 auto",
      "& >div": {
        width: "100%"
      }
    },
    "&.emailInput": {
      flex: "9 1 auto"
    }
  },
  btn: {
    display: "inline-block",
    margin: "auto",
    border: `1px solid ${color.blue}`,
    boxShadow: "none",
    "&.bold": {
      fontWeight: "bold"
    },
    "&:hover": {
      border: `1px solid ${color.blue}`
    },
    "&.blue": {
      color: `white`,
      background: `${color.blue}`,
      "&:hover": {
        boxShadow: "none",
        background: `${color.blue_hover}`
      }
    },
    "&.white": {
      color: `${color.blue}`,
      background: `${color.white}`,
      "&:hover": {
        boxShadow: "none",
        background: `${color.white_hover}`
      }
    },
    "&.list": {
      position: "absolute",
      right: "115px",
      top: "50%",
      transform: "translateY(-50%)"
    }
  },
  input: {
    height: 35
  },
  label: {
    fontSize: 14,
    top: `-17%`
  }
}));

export default React.memo(Mypartners);
