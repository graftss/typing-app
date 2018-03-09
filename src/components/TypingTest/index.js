import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const connections = {
  actions: [
    'testInputChange',
    'testStart',
  ],
  selectors: [
    'goalIndex',
    'testInput',
    'testPrompt',
    'testRunning',
  ],
};

class TypingTest extends Component {
  onChange = (e) => {
    const { testInput, testInputChange, testRunning, testStart } = this.props;
    const nextInput = e.target.value;

    if (!testRunning) {
      testStart();
    }

    // stop a single input from adding more than one character,
    // e.g. by pasting
    if (nextInput.length <= testInput.length + 1) {
      testInputChange(e.target.value);
    }
  }

  render() {
    const {
      testPrompt,
      goalIndex,
      testInput,
    } = this.props;

    return (
      <Container id="TypingTest-container">
        <Prompt goalIndex={goalIndex} prompt={testPrompt} />
        <Input onChange={this.onChange} value={testInput} />
      </Container>
    )
  }
}

export default connect(connections)(TypingTest);
