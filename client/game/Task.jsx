import React from "react";

import Room from "./Room.jsx";
import Timer from "./Timer.jsx";
import {HTMLTable} from "@blueprintjs/core";
import Division from "./Division.jsx"
import ConstrainedMSG from "./ConstrainedMessage"

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: false };
  }

  componentDidMount() {
    const { player } = this.props;
    setTimeout(() => this.setState({ activeButton: true }), 5000); //we make the satisfied button active after 5 seconds
    if (player.stage.submitted) {
      this.setState({ activeButton: false });
    }
  }

  handleSatisfaction = (satisfied, event) => {
    const { game, player, stage } = this.props;
    event.preventDefault();

    //if everyone submitted then, there is nothing to handle
    if (player.stage.submitted) {
      return;
    }

    //if it is only one player, and satisfied, we want to lock everything
    if (game.players.length === 1 && satisfied) {
      this.setState({ activeButton: false });
    } else {
      //if they are group (or individual that clicked unsatisfied), we want to momentarily disable the button so they don't spam, but they can change their mind so we unlock it after 1.5 seconds
      this.setState({ activeButton: false });
      setTimeout(() => this.setState({ activeButton: true }), 800); //preventing spam by a group
    }

    player.set("satisfied", satisfied);
    stage.append("log", {
      verb: "playerSatisfaction",
      subjectId: player._id,
      state: satisfied ? "satisfied" : "unsatisfied",
      at: new Date()
    });
  };

  render() {
    const { game, stage, player } = this.props;
    // Dan : get other people
      // //const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const task = stage.get("task");
    const violatedConstraints = stage.get("violatedConstraints") || [];
    const negoSetting = stage.get("negoSetting");
    const roomName = []

    return (
      <div className="task">


        <div className="board">
            <div className="all-rooms">
                <div className="payoff">
                    <HTMLTable className="bp3-table">
                        <caption><strong>Payoff Table</strong></caption>
                        <thead>
                        <tr>
                            <th>Objects</th>
                            {negoSetting.map(issue => <th key={issue.name}>{issue.name}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        <tr key="payoffValue">
                            <th>Value (points/item)</th>
                            {negoSetting.map(issue => <td key={issue.name}>{issue.value}</td>)}
                        </tr>
                        </tbody>
                    </HTMLTable>
                </div>

            </div>
          <div className="all-rooms">
              <Division
                  room="deck"
                  stage={stage}
                  game={game}
                  player={player}

                  isDeck
              />

            <div className="rooms">
              {game.players.map(p => (
                <Division
                  key={p._id + '-room'}
                  room={p._id + '-room'}
                  stage={stage}
                  game={game}
                  player={p}
                  isSelf = {p._id === player._id}
                  currentPlayer = {player._id}

                />
              ))}
            </div>
          </div>
            {/* All the messages conponent*/}
            <div className="all-rooms">
                <ConstrainedMSG
                objects = {negoSetting}
                stage={stage}
                game={game}
                player={player}
                />
            </div>
          <div className="response">
              <button
                type="button"
                className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
                  player.get("satisfied") ? "bp3-minimal" : ""
                }`}
                onClick={this.handleSatisfaction.bind(this, false)}
                disabled={!this.state.activeButton}
              >
                Unsatisfied
              </button>
            <button
              type="button"
              className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
                player.get("satisfied") ? "" : "bp3-minimal"
              }`}
              onClick={this.handleSatisfaction.bind(this, true)}
              disabled={!this.state.activeButton}
            >
              Accept Offer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
