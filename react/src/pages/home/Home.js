import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomeContainer } from 'containers/home';
import { DashboardNav } from 'components/common/nav';
import { DashboardTemplate } from 'components/base/template';
import {PlainHeaderContainer} from 'containers/header'

function Home(props) {
  return (
    <DashboardTemplate
      nav={<DashboardNav />}
      header={<PlainHeaderContainer />}
      title="Dashboard"
    >
      Home
    </DashboardTemplate>
  );
}

export default withRouter(Home);