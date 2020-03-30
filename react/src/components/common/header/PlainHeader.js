import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function PlainHeader(props) {
  const { auth: authReducer } = useSelector(state => state);
  const { signIn } = authReducer;
  const { isAutheticated } = signIn;

  return (
    <div>
      <div>
      <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/project">프로젝트 </Link>
      </div>
      <div>
        {!isAutheticated && <Link to="/auth/signin">로그인</Link>}
      </div>
      <div>
        {!isAutheticated && <Link to="/auth/signup">회원가입</Link>}
      </div>
      <div>
        <Link to="/auth/logout">로그아웃</Link>
      </div>
    </div>
  );
}

export default PlainHeader;