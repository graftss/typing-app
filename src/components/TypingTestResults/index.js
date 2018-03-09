import React from 'react';
import { Grid } from 'semantic-ui-react';

import './TypingTestResults.css';
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
  <div className="test-results">
    <Grid container columns={3}>
      <Grid.Column>
        <span className="test-results-quantity">{characters} </span>
        chars
      </Grid.Column>
      <Grid.Column>
        <span className="test-results-quantity">{wpm || 0} </span>
        wpm
      </Grid.Column>
      <Grid.Column>
        <span className="test-results-quantity">{duration} </span>
        seconds
      </Grid.Column>
    </Grid>
  </div>
);

export default connect(connections)(TypingTestResults);
