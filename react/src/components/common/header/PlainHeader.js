import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {color} from 'styles/__utils';
import {mapper} from 'lib/mapper';
import {ProfileMenu} from 'components/common/menu';

function PlainHeader(props) {
  const { auth: authReducer } = useSelector(state => state);
  const { signIn } = authReducer;
  const { isAutheticated } = signIn;

  return (
    <Styled.PlainHeader>
      Dashboard Kit {isAutheticated && <ProfileMenu />}
      <div>
        {!isAutheticated && <Link to={mapper.pageUrl.login}>로그인</Link>}
      </div>
      <div>
        {!isAutheticated && <Link to="/auth/signup">회원가입</Link>}
      </div>
      
      


    </Styled.PlainHeader>
  );
}

export default PlainHeader;

const Styled = {
  PlainHeader: styled.header`
    background:${color.blue};
    position:relative;
    min-height:30px;
    &{

    }
  `
}