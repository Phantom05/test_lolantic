
import React, { Component } from 'react';

class Blocker extends Component {
  componentDidMount() {
    if (!window) return;
    window.onbeforeunload = () => true;
  }

  componentWillUnmount() {
    if (!window) return;
    window.onbeforeunload = null;
  }

  render() {
    return null;
  }
}

export default Blocker;