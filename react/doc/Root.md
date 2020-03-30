# Root.js

```js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from 'components/App';
import store from 'store';
class Root extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
            <App />
        </Provider>
      </Router>
    );
  }
}

export default Root;
```

