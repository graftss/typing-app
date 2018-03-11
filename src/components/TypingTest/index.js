import React, { Component } from 'react';
import interpolate from 'color-interpolate';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const mix = (x, low, high) => {
  if (x <= low) return 0;
  if (x >= high) return 1;
  return (x - low) / (high - low);
};

const connections = {
  actions: [
    'addSlowWordsFromTest',
    'testInputChange',
    'testNewPrompt',
    'testStart',
  ],
  selectors: [
    'currentGoal',
    'goalWpm',
    'goalIndex',
    'testInput',
    'testComplete',
    'testPrompt',
    'testRunning',
    'testWaitingToStart',
    'testWpm',
  ],
};

class TypingTest extends Component {
  componentDidMount() {
    this.inputRef.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.testComplete && !prevProps.testComplete) {
      this.onTestComplete();
    }
  }

  onTestComplete() {
    this.props.addSlowWordsFromTest();
  }

  onKeyPress = (e) => {
    const {
      testNewPrompt,
      testRunning,
      testStart,
      testWaitingToStart,
    } = this.props;

    if (e.charCode === 13 && !testRunning) {
      testNewPrompt({ wordCount: 3 });
    } else if (testWaitingToStart) {
      testStart();
    }
  }

  onChange = (e) => {
    const { testInput, testInputChange } = this.props;

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

  completedGoalColor = goalIndex => {
    const { goalWpm, testWpm } = this.props;
    const wpm = goalWpm(goalIndex);

    const wpmRatio = mix(wpm, testWpm * .7, testWpm * 1.3);
    const colormap = interpolate(['red', 'black', 'green']);

    return colormap(wpmRatio);
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
          completedGoalColor={this.completedGoalColor}
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
