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
    'currentGoal',
    'goalIndex',
    'testInput',
    'testComplete',
    'testPrompt',
    'testRunning',
    'testWaitingToStart',
  ],
};

class TypingTest extends Component {
  componentDidMount() {
    this.inputRef.focus();
  }

  onKeyPress = (e) => {
    const {
      testRunning,
      testNewPrompt,
      testStart,
      testWaitingToStart,
    } = this.props;

    if (e.charCode === 13 && !testRunning) {
      testNewPrompt({ wordCount: 50 });
    } else if (testWaitingToStart) {
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
      testInputChange(nextInput);
    }
  }

  handleInputRef = input => this.inputRef = input;

  computeErrorIndex() {
    const { testInput, currentGoal } = this.props;

    for (let i = 0; i < testInput.length; i++) {
      if (testInput[i] !== currentGoal[i]) {
        return i;
      }
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
        <Prompt
          errorIndex={this.computeErrorIndex()}
          goalIndex={goalIndex}
          prompt={testPrompt}
        />
        <Input
          handleRef={this.handleInputRef}
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
