import React from 'react';
import {DashboardTemplate} from 'components/base/template';
import {MyPageContainer } from 'containers/mypage'
import {NavContainer} from 'containers/nav';
import {PlainHeader} from 'components/common/header';

function Mypage(props) {
  return (
    <DashboardTemplate 
      header={<PlainHeader/>}
      nav={<NavContainer type="dashboard"/>} 
      title="My Page"
    >
      My page
    </DashboardTemplate>
  );
}

export default Mypage;