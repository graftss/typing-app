import React, { Component } from 'react';

import TypingTest from '../TypingTest';
import TypingTestResults from '../TypingTestResults';
import connect from '../../state/connect';

const connections = {
  actions: ['testSetPrompt'],
  selectors: ['testComplete'],
};

class TypingTestRoute extends Component {
  componentWillMount() {
    this.props.testSetPrompt(`It's all the same.`);
  }

  render() {
    const { testComplete } = this.props;

    return (
      <div>
        <TypingTestResults />
        <TypingTest />
      </div>
    )
  }
}

export default connect(connections)(TypingTestRoute);
