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
      아파트 거래량 <br/>
      주택 거래량 <br/>
      빌라 거래랑 <br/>

      아파트 경매 거래량,  <br/>
      주택 경매 거래량,  <br/>
      빌라 경매 거래량,  <br/>

      서울, 경기, <br/>
    </DashboardTemplate>
  );
})


export default Works;


