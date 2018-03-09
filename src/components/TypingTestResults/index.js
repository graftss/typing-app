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
    <Grid container columns={5}>
      <Grid.Column />
      <Grid.Column>
        {characters} chars
      </Grid.Column>
      <Grid.Column>
        {wpm || 0} wpm
      </Grid.Column>
      <Grid.Column>
        {duration} seconds
      </Grid.Column>
      <Grid.Column />
    </Grid>
  </div>
);

export default connect(connections)(TypingTestResults);
