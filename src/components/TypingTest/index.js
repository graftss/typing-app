import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const connections = {
  actions: ['testSetPassage'],
  selectors: ['currentPrompt', 'goalIndex', 'prompts', 'promptIndex'],
};

class TypingTest extends Component {
  componentWillMount() {
    this.props.testSetPassage('haha made you look dummy');
  }

  render() {
    const { goalIndex, currentPrompt } = this.props;

    return (
      <Container id="TypingTest-container">
        <Prompt goalIndex={goalIndex} prompt={currentPrompt} />
        <Input />
      </Container>
    )
  }
}

export default connect(connections)(TypingTest);
