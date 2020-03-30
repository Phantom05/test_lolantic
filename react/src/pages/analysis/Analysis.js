import React from 'react';
import {DashboardTemplate} from 'components/base/template';
import {CaseContainer} from 'containers/case';
import {NavContainer} from 'containers/nav';
import {PlainHeaderContainer} from 'containers/header'
import {AnalysisContainer} from 'containers/analysis'


function Analysis(props) {
  return (
    <DashboardTemplate
      header={<PlainHeaderContainer />}
      nav={<NavContainer type="dashboard" />}
      title="Analysis"
    >
      <AnalysisContainer />
    </DashboardTemplate>
  );
}

export default Analysis;