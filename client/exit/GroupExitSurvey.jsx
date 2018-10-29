import React from "react";

import {Centered} from "meteor/empirica:core";

import {
    Button,
    Classes,
    FormGroup,
    RadioGroup,
    TextArea,
    Intent,
    Radio
} from "@blueprintjs/core";



export default class GroupExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = {
    age: "",
      gender: "",
      education: "",
      strategy: "",
      fair: "",
      agreement:"",
    feedback: ""};


    handleChange = event => {
        const el = event.currentTarget;
        this.setState({ [el.name]: el.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    };
    exitMessage = (player, game) => {
    return (

      <div>
        {" "}
        <h1> Exit Survey </h1>
        <br />
        <h3>
          Please submit the following code to receive your bonus:{" "}
          <em>{player._id}</em>.
        </h3>

      </div>
    );
  };

  exitForm = (game) => {
    const {
      strategy,
      fair,
      feedback,
        age,
        gender,
        education,
        agreement
    } = this.state;

    const negoIssues = game.get("issueList");
      console.log("final existing", game);
    return (
        <div>
            {" "}
            <p>
                Please answer the following short survey. You do not have to provide
                any information you feel uncomfortable with.
            </p>
            <form onSubmit={this.handleSubmit}>
                {/*The following are the offer related outcomes*/}
                <div className="form-line">
                    <RadioGroup
                        inline={true}
                        name="agreement"
                        label="Have you reach an agreement?"
                        onChange={this.handleChange}
                        selectedValue={agreement}
                    >
                        <Radio
                            selected={agreement}
                            name="agreement"
                            value="yes"
                            label="Yes"
                            onChange={this.handleChange}
                        />
                        <Radio
                            selected={agreement}
                            name="agreement"
                            value="no"
                            label="No"
                            onChange={this.handleChange}
                        />

                    </RadioGroup>
                </div>

                <div className="form-line">
                    <FormGroup
                        inline={true}
                        label={"Age"}
                        labelFor={"age"}
                        className={"form-group"}
                    >
                        <input
                            id="age"
                            className={Classes.INPUT}
                            type="number"
                            min="0"
                            max="150"
                            step="1"
                            dir="auto"
                            name="age"
                            value={age}
                            onChange={this.handleChange}
                            // required
                        />
                    </FormGroup>

                    <FormGroup
                        inline={true}
                        label={"Gender"}
                        labelFor={"gender"}
                        className={"form-group"}
                    >
                        <input
                            id="gender"
                            className={Classes.INPUT}
                            type="text"
                            dir="auto"
                            name="gender"
                            value={gender}
                            onChange={this.handleChange}
                            // required
                        />
                    </FormGroup>
                </div>

                <div className="form-line">
                    <RadioGroup
                        inline={true}
                        name="education"
                        label="Highest Education Qualification?"
                        onChange={this.handleChange}
                        selectedValue={education}
                    >
                        <Radio
                            selected={education}
                            name="education"
                            value="high-school"
                            label="High School"
                            onChange={this.handleChange}
                        />
                        <Radio
                            selected={education}
                            name="education"
                            value="bachelor"
                            label="Bachelor's Degree"
                            onChange={this.handleChange}
                        />
                        <Radio
                            selected={education}
                            name="education"
                            value="master"
                            label="Master's or higher"
                            onChange={this.handleChange}
                        />
                        <Radio
                            selected={education}
                            name="education"
                            value="other"
                            label="Other"
                            onChange={this.handleChange}
                        />
                    </RadioGroup>
                </div>

                <div className="form-line thirds">
                    <FormGroup
                        className={"form-group"}
                        inline={false}
                        label={"How would you describe your strategy in the game?"}
                        labelFor={"strategy"}
                        //className={"form-group"}
                    >
              <TextArea
                  id="strategy"
                  large={true}
                  intent={Intent.PRIMARY}
                  onChange={this.handleChange}
                  value={strategy}
                  fill={true}
                  name="strategy"
              />
                    </FormGroup>

                    <FormGroup
                        className={"form-group"}
                        inline={false}
                        label={"Do you feel the pay was fair?"}
                        labelFor={"fair"}
                        //className={"form-group"}
                    >
              <TextArea
                  id="fair"
                  name="fair"
                  large={true}
                  intent={Intent.PRIMARY}
                  onChange={this.handleChange}
                  value={fair}
                  fill={true}
              />
                    </FormGroup>

                    <FormGroup
                        className={"form-group"}
                        inline={false}
                        label={"Feedback, including problems you encountered."}
                        labelFor={"fair"}
                        //className={"form-group"}
                    >
              <TextArea
                  id="feedback"
                  name="feedback"
                  large={true}
                  intent={Intent.PRIMARY}
                  onChange={this.handleChange}
                  value={feedback}
                  fill={true}
              />
                    </FormGroup>
                </div>

                <Button type="submit" intent={"primary"} rightIcon={"key-enter"}>
                    Submit
                </Button>
            </form>{" "}
        </div>
    );
  };

  render() {
    const { player, game } = this.props;
    return (
      <Centered>
        <div className="exit-survey">
          {this.exitMessage(player, game)}
          <hr />
          {this.exitForm(game)}
        </div>
      </Centered>
    );
  }
}
