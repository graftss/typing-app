import React, { Component } from 'react';

import TypingTest from '../TypingTest';
import TypingTestResults from '../TypingTestResults';
import connect from '../../state/connect';

const connections = {
  actions: ['testSetPrompts'],
  selectors: ['testComplete'],
};

class TypingTestRoute extends Component {
  componentWillMount() {
    this.props.testSetPrompts([`It's all the same. I have faith in him because I have faith in myself. And because I can believe in him, I can believe in myself. It's all the same as far as I'm concerned. That's what it means to be partners.`]);
  }

  render() {
    const { testComplete } = this.props;

    return testComplete ?
      <TypingTestResults /> :
      <TypingTest />;
  }
}

export default connect(connections)(TypingTestRoute);
