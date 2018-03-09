import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const connections = {
  actions: [
    'testInputChange',
    'testNewPrompt',
    'testStart',
  ],
  selectors: [
    'goalIndex',
    'testInput',
    'testComplete',
    'testPrompt',
    'testRunning',
  ],
};

class TypingTest extends Component {
  onKeyPress = (e) => {
    const { testRunning, testNewPrompt, testStart } = this.props;

    if (e.charCode === 13 && !testRunning) {
      testNewPrompt(30);
      testStart();
    }
  }

  onChange = (e) => {
    const {
      testComplete,
      testInput,
      testInputChange,
      testRunning,
    } = this.props;

    const nextInput = e.target.value;

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
      testRunning,
    } = this.props;

    return (
      <Container id="TypingTest-container">
        <Prompt goalIndex={goalIndex} prompt={testPrompt} />
        <Input
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder={testRunning ? '' : 'Press enter to start.'}
          value={testInput}
        />
      </Container>
    )
  }
}

export default connect(connections)(TypingTest);
