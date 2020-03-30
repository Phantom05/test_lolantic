import React from 'react';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import { buttonBlue } from 'styles/__utils';

function ModalWorkSpaceChange(props) {
  const {
    handleClick
  } = props;
  const [value, setValue] = useImmer({
    workSpace: '',
  });

  const handleChange = e => {
    const event = e.target.value;
    setValue(draft => {
      draft.workSpace = event;
    });
  }

  return (
    <Styled.WorkSpace>
      <h2>Workspace 변경하기</h2>
      <div className="works_cont">
        <div className="works_input">
          <input
            value={value.workSpace}
            placeholder="지정할 workspace 경로를 넣으세요."
            onChange={handleChange}
          />
        </div>
        <button 
        className="change_btn" 
        onClick={() => handleClick({type: 'updateWorkSpace'})(value.workSpace)}
        >
          Change
        </button>
      </div>  
    </Styled.WorkSpace>
  );
}

const Styled = {
  WorkSpace: styled.div`
    padding: 30px 30px 0;
    height: 200px;

    h2{
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .works_cont{
      position: relative;
      margin-top: 30px;
      
      .works_input{
        input{
          display: inline-block;
          height: 30px;
          width: 100%;
          padding: 0 10px;
        }
      }
    }

    .change_btn{
      display: block;
      width: 100px;
      margin: 0 auto;
      margin-top: 35px;
      ${buttonBlue};
      box-shadow:none;  
      &:hover{
        box-shadow:none;
      }
      cursor: pointer;
    }
  `,
}

export default ModalWorkSpaceChange;