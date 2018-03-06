import React from 'react';
import { Segment } from 'semantic-ui-react';

export default ({
  prompt,
}) => (
  <Segment raised style={{ textAlign: 'justify' }}>
    {prompt}
  </Segment>
);
