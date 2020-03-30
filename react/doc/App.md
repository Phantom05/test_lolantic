## App.js



```js
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
```



+ PrivateRouter
+ Route
+ LRoute
+ Core

Reducer의 baseReducer.scrolbaes.action아 변동했을떄 `useDidUpdateEffect`함수 실행, 함수의 매개변수에 따라 scroll의 높이를 수정