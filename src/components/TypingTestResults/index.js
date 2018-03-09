import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import connect from '../../state/connect';

const connections = {
  selectors: [
    'testComplete',
    'testResults',
    'testRuntime',
  ],
};

const TypingTestResults = ({
  testComplete,
  testResults: {
    characters,
    duration,
    wpm,
  },
  testRuntime,
}) => (
  <Container >
    <Segment>
      <div>
        You typed {characters} characters in {duration} seconds, at a speed of {wpm} wpm.
      </div>
    </Segment>
  </Container>
);

export default connect(connections)(TypingTestResults);
