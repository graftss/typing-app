import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';

import TypingTest from '../TypingTest';
import TypingTestResults from '../TypingTestResults';
import connect from '../../state/connect';

const connections = {

};

class TypingTestRoute extends Component {
  render() {
    return (
      <Container>
        <Segment>
          <TypingTestResults />
          <TypingTest />
        </Segment>
      </Container>
    )
  }
}

export default connect(connections)(TypingTestRoute);
