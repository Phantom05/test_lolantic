import React, { useEffect } from 'react';
import { DashboardTemplate } from 'components/base/template';
import { WorkContainer } from 'containers/works';
import { NavContainer } from 'containers/nav';
import { PatientSearchContainer } from 'containers/search';
import {PlainHeader} from 'components/common/header';

const Works = React.memo(function Works() {
  return (
    <DashboardTemplate
      header={<PlainHeader/>}
      nav={<NavContainer type="dashboard" />}
      title="Works"
    >
      Works
    </DashboardTemplate>
  );
})


export default Works;


