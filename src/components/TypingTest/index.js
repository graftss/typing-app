import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './TypingTest.css';
import Input from './Input';
import Target from './Target';

class TypingTest extends Component {
  render() {
    return (
      <Container id="TypingTest-container">
        <Target />
        <Input />
      </Container>
    )
  }
}

export default TypingTest;
