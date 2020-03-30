import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from 'components/App';
import store from 'store';
// import { PersistGate } from 'redux-persist/integration/react';
// const { store, persistor } = configureStore;

class Root extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
          {/* </PersistGate> */}
        </Provider>
      </Router>
    );
  }
}

export default Root;