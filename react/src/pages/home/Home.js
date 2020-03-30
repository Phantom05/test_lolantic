import React from 'react';
import { withRouter } from 'react-router-dom';
import {HomeContainer} from 'containers/home';
import {DashboardNav} from 'components/common/nav';
import {DashboardTemplate} from 'components/base/template';

function Home(props) {
  return (
  <DashboardTemplate nav={<DashboardNav/>} >
    <HomeContainer />
  </DashboardTemplate>
  );
}

export default withRouter(Home);