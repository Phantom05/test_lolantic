import React from 'react';
import {ResetPasswordContainer} from 'containers/auth';
import {AuthTemplate} from 'components/base/template';
import {FooterContainer} from 'containers/footer';

function AuthResetPassword(props) {
  return (
    <AuthTemplate  footer={<FooterContainer />} >
      <ResetPasswordContainer/>
    </AuthTemplate>
  );
}


export default AuthResetPassword;