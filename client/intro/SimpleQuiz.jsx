import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nParticipants: 0,
        duration: 0,
        mostValue: ""
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
          this.state.mostValue !== "1" ||
          this.state.nParticipants !== (game.treatment.playerCount -1).toString()||
          this.state.duration !== (game.treatment.stageDuration / 60).toString()
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
    const { nParticipants, duration, mostValue}
    = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1 className="bp3-heading"> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
              <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="number-of-participants">
                      1. How many opponents are you going to interact with?
                  </label>
                  <div className="bp3-form-content">
                      <input
                          id="nParticipants"
                          className="bp3-input"
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          dir="auto"
                          name="nParticipants"
                          value={nParticipants}
                          onChange={this.handleChange}
                          required
                      />
                  </div>
              </div>
              <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="number-of-participants">
                      2. What item is worth the most to you?
                  </label>
                  <RadioGroup
                      name="mostValue"
                      label="What item is worth the most to you? (Hint: value = points/item * item quality)"
                      onChange={this.handleChange}
                      selectedValue={mostValue}
                  >
                      <Radio
                          label="Painting"
                          value="1"
                          className={"pt-inline"}
                      />
                      <Radio
                          label="Lamp"
                          value="2"
                          className={"pt-inline"}
                      />
                      <Radio
                          label="Record"
                          value="3"
                          className={"pt-inline"}
                      />

                  </RadioGroup>
              </div>
              <div className="bp3-form-group">
                  <label className="bp3-label" htmlFor="length-of-negotiation">
                      3. How long do you have to reach an agreement with the opponent?
                  </label>
                  <div className="bp3-form-content">
                      <input
                          id="duration"
                          className="bp3-input"
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          dir="auto"
                          name="duration"
                          value={duration}
                          onChange={this.handleChange}
                          required
                      /> minutes
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
