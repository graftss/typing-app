import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class Prompt extends Component {
  formatGoal(goal) {
    const { errorIndex } = this.props;

    if (errorIndex === goal.length) {
      return (
        <span className="goal">
          {goal}
          <span className="goal-error"> </span>
        </span>
      )
    } else if (errorIndex !== undefined) {
      const preError = goal.slice(0, errorIndex);
      const error = goal[errorIndex];
      const postError = goal.slice(errorIndex + 1);

      return (
        <span className="goal">
          <span className="goal-pre-error">{preError}</span>
          <span className="goal-error">{error}</span>
          <span className="goal-post-error">{postError}</span>
        </span>
      );
    } else {
      return <span className="goal">{goal}</span>
    }
  }

  formatBeforeGoal(words) {
    const { completedGoalColor } = this.props;

    return (
      <span>
        {words.map((word, index) => (
          <span
            key={index}
            style={{color: completedGoalColor(index)}}
          >
            {`${word} `}
          </span>
        ))}
      </span>
    )
  }

  formatPrompt() {
    const { completedGoalColor, goalIndex, prompt } = this.props;

    const words = prompt.split(' ');

    const goal = words[goalIndex] || '';
    const afterGoal = words.slice(goalIndex + 1).join(' ');

    return (
      <span>
        {this.formatBeforeGoal(words.slice(0, goalIndex))}
        {this.formatGoal(goal)}
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
