import React from 'react';
import { DashboardTemplate } from 'components/base/template';
import { NavContainer } from 'containers/nav';
import {PlainHeaderContainer} from 'containers/header'

const Action = React.memo(function Action() {
  return (
    <DashboardTemplate
      header={<PlainHeaderContainer/>}
      nav={<NavContainer type="dashboard" />}
      title="Action"
    >
      Action
    </DashboardTemplate>
  );
})


export default Action;


