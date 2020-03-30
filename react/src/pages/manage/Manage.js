import React from 'react';
import {DashboardTemplate} from 'components/base/template';
import {NavContainer} from 'containers/nav';
import {PlainHeaderContainer} from 'containers/header'


function Manage(props) {
  return (
    <DashboardTemplate
      header={<PlainHeaderContainer />}
      nav={<NavContainer type="dashboard" />}
      title="Manage"
    >
      Manage
    </DashboardTemplate>
  );
}

export default Manage;