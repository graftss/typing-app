import React, { Component } from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';

import connect from '../../state/connect';

const connections = {
  actions: ['testInputChange'],
  selectors: ['testInput'],
};

class Input extends Component {
  onChange = (e) => {
    const { testInput, testInputChange } = this.props;
    const nextInput = e.target.value;

    // stop a single input from adding more than one character,
    // e.g. by pasting
    if (nextInput.length <= testInput.length + 1) {
      testInputChange(e.target.value);
    }
  }

  render() {
    const { testInput } = this.props;

    return (
      <SemanticInput
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        value={testInput}
      />
    )
  }
}

export default connect(connections)(Input);
