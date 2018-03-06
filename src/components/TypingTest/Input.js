import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';

export default ({
  onChange,
  value,
}) => (
  <SemanticInput
    onChange={onChange}
    value={value}
  />
);
