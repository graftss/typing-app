import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';

export default ({
  onChange,
  onKeyPress,
  placeholder,
  value,
}) => (
  <SemanticInput
    onChange={onChange}
    onKeyPress={onKeyPress}
    value={value}
    placeholder={placeholder}
  />
);
