import React from 'react';
import {SignInContainer} from 'containers/auth';
import {AuthTemplate} from 'components/base/template';
import {FooterContainer} from 'containers/footer';
// import PartnerListSearchContainer from 'containers/search/PartnerListSearchContainer';

function AuthSignIn(props) {
  return (
    <AuthTemplate  footer={<FooterContainer />} >
      <SignInContainer/>
      {/* <PartnerListSearchContainer/> */}
    </AuthTemplate>
  );
}

export default AuthSignIn;