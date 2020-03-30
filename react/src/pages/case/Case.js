import React from 'react';
import {DashboardTemplate} from 'components/base/template';
import {CaseContainer} from 'containers/case';
import {NavContainer} from 'containers/nav';
import {PlainHeader} from 'components/common/header';

function Case(props) {
  return (
    <DashboardTemplate
      header={<PlainHeader />}
      nav={<NavContainer type="dashboard" />}
      title="Dashboard"
      // rightSpace={<NavContainer type="executor" />}
    >
      Dashboard
    </DashboardTemplate>
  );
}

export default Case;