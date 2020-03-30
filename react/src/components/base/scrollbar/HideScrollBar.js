import React, { Component } from 'react';

class HideScrollbar extends Component {
  componentDidMount() {
    if (!document.body) return;
    document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    if (!document.body) return;
    document.body.style.overflowY = 'auto';
  }

  render() {
    return null;
  }
}

export default HideScrollbar;