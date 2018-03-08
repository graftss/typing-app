import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class Prompt extends Component {
  formatPrompt() {
    const { goalIndex, prompt } = this.props;

    const words = prompt.split(' ');

    const beforeGoal = words.slice(0, goalIndex).join(' ');
    const goal = words[goalIndex];
    const afterGoal = words.slice(goalIndex + 1).join(' ');

    return (
      <span>
        <span className="before-goal"> {beforeGoal} </span>
        <span className="goal"> {goal}</span>
        <span className="after-goal"> {afterGoal} </span>
      </span>
    );
  }

  render() {
    return (
      <Segment raised className="prompt">
        {this.formatPrompt()}
      </Segment>
    );
  }
}
