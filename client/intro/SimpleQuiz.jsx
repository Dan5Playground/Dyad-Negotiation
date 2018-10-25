import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nParticipants: this.props.game.treatment.playerCount,
      nStories: ""
    };
  }

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = event => {
    const el = event.currentTarget;
    this.setState({ scoreOption: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { game } = this.props;
    console.log("Submitted the quiz");
      if (
          this.state.nStories !== "3" ||
          this.state.nParticipants !== game.treatment.playerCount
      ) {
          AlertToaster.show({
              message:
                  "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the insturctions"
          });
      } else {
          this.props.onNext();
      }


  };

  render() {
    const { hasPrev, onPrev, game } = this.props;
    const { nParticipants, nStories}
    = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1 className="bp3-heading"> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
              <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="number-of-participants">
                      1. How many stories do you need to write in this task?
                  </label>
                  <div className="bp3-form-content">
                      <input
                          id="nParticipants"
                          className="bp3-input"
                          type="number"
                          min="-10"
                          max="10"
                          step="1"
                          dir="auto"
                          name="nStories"
                          value={nStories}
                          onChange={this.handleChange}
                          required
                      />
                  </div>
              </div>





            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Back to instructions
            </button>
            <button type="submit" className="bp3-button bp3-intent-primary">
              Submit
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>
        </div>
      </Centered>
    );
  }
}
