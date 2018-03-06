import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import connect from '../../state/connect';
import Input from './Input';
import Prompt from './Prompt';

const connections = {
  actions: ['testSetPassage'],
  selectors: ['prompt'],
};

class TypingTest extends Component {
  componentWillMount() {
    this.props.testSetPassage('haha made you look dummy');
  }

  render() {
    const { prompt } = this.props;

    return (
      <Container id="TypingTest-container">
        <Prompt prompt={prompt} />
        <Input />
      </Container>
    )
  }
}

export default connect(connections)(TypingTest);
