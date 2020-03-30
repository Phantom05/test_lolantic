import React from 'react';
import SignUpContainer from 'containers/auth/SignUpContainer';
import { AuthTemplate } from 'components/base/template';
// import { FooterContainer } from 'containers/footer';

function AuthSignUp(props) {
  return (
    <AuthTemplate staticPage={true}>
      <SignUpContainer 
        // footer={<FooterContainer />}
      />
    </AuthTemplate>
  );
}

export default AuthSignUp;