import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';

export default ({
  handleRef,
  onChange,
  onKeyPress,
  placeholder,
  value,
}) => (
  <SemanticInput
    ref={handleRef}
    onChange={onChange}
    onKeyPress={onKeyPress}
    value={value}
    placeholder={placeholder}
  />
);
