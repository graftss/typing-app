import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const connections = {
  actions: [
    'testInputChange',
    'testSetPassage',
  ],
  selectors: [
    'currentPrompt',
    'goalIndex',
    'prompts',
    'promptIndex',
    'testInput',
  ],
};

class TypingTest extends Component {
  componentWillMount() {
    this.props.testSetPassage('haha made you look dummy');
  }

  onChange = (e) => {
    const { testInput, testInputChange } = this.props;
    const nextInput = e.target.value;

    // stop a single input from adding more than one character,
    // e.g. by pasting
    if (nextInput.length <= testInput.length + 1) {
      testInputChange(e.target.value);
    }
  }

  render() {
    const { currentPrompt, goalIndex, testInput } = this.props;

    return (
      <Container id="TypingTest-container">
        <Prompt goalIndex={goalIndex} prompt={currentPrompt} />
        <Input onChange={this.onChange} value={testInput} />
      </Container>
    )
  }
}

export default connect(connections)(TypingTest);
