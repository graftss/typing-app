import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';

export default ({
  onChange,
  placeholder,
  value,
}) => (
  <SemanticInput
    onChange={onChange}
    value={value}
    placeholder={placeholder}
  />
);
