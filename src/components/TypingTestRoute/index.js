import React, { Component } from 'react';

import TypingTest from '../TypingTest';
import TypingTestResults from '../TypingTestResults';
import connect from '../../state/connect';

const connections = {
  selectors: ['testComplete'],
};

class TypingTestRoute extends Component {
  render() {
    const { testComplete } = this.props;

    return testComplete ?
      <TypingTestResults /> :
      <TypingTest />;
  }
}

export default connect(connections)(TypingTestRoute);
