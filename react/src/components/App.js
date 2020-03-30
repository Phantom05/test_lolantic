import React, { useRef } from 'react';
import { NotFound } from 'components/base/helpers/error';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { PrivateRoute, LRoute } from 'components/base/route';
import Core from 'containers/base/Core';
import reset from "styled-reset";
import { Helmet } from 'react-helmet'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import { useSelector } from 'react-redux';
import { useDidUpdateEffect } from 'lib/utils';
import './App.css';
import { Refresh } from 'components/base/helpers/refresh';
import ListComponent from 'components/testing/ListComponent';
// import { Scrollbars } from 'react-custom-scrollbars';
import {
  Home,
  Auth,
  Case,
  Works,
  Mypage,
  Alert
} from 'pages';

const scrollControllerStyle = {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  background: `#FAFAFA`
}
const scrollWrapperStyle = {
  height: `100vh`,
  width: `100%`,
  overflowY: `scroll`,
  paddingRight: '20px',
}

// DOCS: doc/Appjs.md 
function App() {
  const { base: baseReducer } = useSelector(state => state);
  const scrollbarsRef = useRef();

  useDidUpdateEffect(() => {
    const scrollReducerAction = baseReducer.scrollbars.action;
    const { name, value } = scrollReducerAction;
    const actionFn = scrollbarsRef.current[scrollReducerAction.name];

    if (name === 'scrollTop') {
      window.scrollTo(0, value);
    }
    if (typeof actionFn === 'function') {
      actionFn(scrollReducerAction.value);

    }
  }, [baseReducer.scrollbars.action]);

  return (
    <>
      {/* <Scrollbars  style={{height: `100vh` }} ref={scrollbarsRef}> */}
      <div style={scrollControllerStyle}>
        <div style={scrollWrapperStyle} ref={scrollbarsRef}>
          <Helmet>
            <title>DOF Launcher</title>
          </Helmet>
          <Stlyed.GlobalStyles />
          <Core />
          <Switch>
            <PrivateRoute exact path="/" component={Home} redirect="/case" />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/case" component={Case} />
            <PrivateRoute path="/works/:list" component={Works} />
            <PrivateRoute path="/mypage" component={Mypage} />
            <PrivateRoute path="/alert" component={Alert} />
            <PrivateRoute exact path="/listtest" component={ListComponent} />
            <Route path="/refresh" component={Refresh} />
            <LRoute path="/auth" component={Auth} token />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      {/* </Scrollbars> */}
    </>
  );
}

const Stlyed = {
  GlobalStyles: createGlobalStyle`
  ${reset};
  a{
      text-decoration:none;
      color:inherit;
  }
  *{
      box-sizing:border-box !important;
  }
  body{
      font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
  }

  `
}
export default App;


