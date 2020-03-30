import React, {useEffect} from 'react';
import { useImmer } from 'use-immer';

import styled from 'styled-components';
import { buttonBlue } from 'styles/__utils';
import { font, color } from 'styles/__utils';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';

function OptionPage(props) {
  const {
    workSpace,
    syncTime,
    syncPending
  } = props;
  const [values, setValues] = useImmer({
    language: "1",
  });
  const {
    language,
  } = values;

  const {
    handleClick
  } = props;
  const typeList = [
    {
      id: "1",
      title: 'Korea'
    },
    {
      id: "2",
      title: 'English'
    }
  ];
  

  const OptionItem = Array.isArray(typeList) && typeList.map((i, index) => {
    return <option key={index} value={i.id} >{i.title}</option>
  });

  return (
    <Styled.OptionWrap>
      <div className="optionRow">
        <span className="label">
          WorksSpace
        </span>
          <div className="cont">
            <div className="path">
            {workSpace}
            </div>
          </div>
        
          <button
            className="folderBtn option__btn"
            onClick={handleClick({type: 'workspaceModal'})}
          >
              Change
          </button>
      </div>
      {/* <div className="optionRow">
        <span className="label">
          Language
        </span>
        <div className="cont">
          <select 
            id="language" 
            value={language}
            onChange={handleClick({type: 'select'})}
          >
            {
              OptionItem
            }
          </select>
        </div>
        <Button
          onClick={handleClick({ type: "click", option: 'ok' })}
          variant="contained"
          className="option__btn"
          component="span">OK</Button>
      </div> */}
      <div className="optionRow">
        <span className="label">
          Synchronization
        </span>
        <div className="cont">
          {syncTime}
          <CachedIcon className={`syncImg ${syncPending ? 'active' : ''}`} style={{ fontSize: 30 }} />
        </div>
        <button 
          className="option__btn folderBtn"
          onClick={handleClick({type: 'sync'})}
        >
          Sync
        </button>
      </div>
    </Styled.OptionWrap>
  );
}

const useStyles = makeStyles(theme => ({
  formControl: {
    width: `100%`,
    
  },
}));

const Styled = {
  OptionWrap : styled.div`
    padding: 16px;
  
    & .optionRow{
      height: 32px;
      margin-bottom: 20px;

      & .label{
        display: inline-block;
        width: 150px;
        font-weight: 700;
      }

      & .cont{
        display: inline-block;
        margin-left: 10px;
        width: 200px;
        color: ${color.gray_font};
        

        .syncImg{
          color: ${color.blue};
          width: 25px;
          height: 25px;
          vertical-align: top;
          margin-left: 10px;
          transition: all .2s;

          &.active{
            animation: 3s rotate infinite linear;
          }
          @keyframes rotate{
            from {transform: rotate(0)}
            to{transform: rotate(-360deg)}
          }
        }

        & select{
          padding: 6px 62px 6px 10px;
          font-size: 14px;

          & option{
            height: 100%;
          }
        }
      }

      & .folderBtn{
        display: inline-block;
        text-align: center;
        width: 80px;
        cursor: pointer;

    /* &.optionRow + .optionRow{
      margin-top: 25px;
    } */

    &.option__btn{
      ${buttonBlue};
      background: ${color.btn_color};
      padding: 0;
      box-shadow:none;
      margin-left: 60px;
      height: 100%;
      &:hover{
        box-shadow:none;
        background: ${color.btn_color_hover};
      }
    }
      }
    }


  `,
}

export default OptionPage;