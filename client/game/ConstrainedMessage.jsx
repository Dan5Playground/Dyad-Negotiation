import React from "react";

import { Centered } from "meteor/empirica:core";
import { Menu, MenuItem, Tab, Tabs, Collapse, Alignment, Button, ButtonGroup, H5, IconName, Popover, Position, Switch } from "@blueprintjs/core";


// this
export default class ConstrainedMessage extends React.Component {
    constructor () {
        super()
        this.state = {
            isHidden: true,
            keepChildrenMounted : true
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    render () {
        const { objects, stage, game, player } = this.props;
        const messages = game.get("constrainedMSG");
        return (
            <div className="bp3-card bp3-fill">
                <Tabs style={{ minWidth: 120 }} >
                    <Tab id="othersPref" title="Ask the opponent's preference"
                         panel={<AskPreference
                             stage = {stage}
                             player = {player}
                         key = "ask" isAsking/>} />
                    <Tab id="ownPref" title="Tell you own preference"
                         panel={<AskPreference
                             stage = {stage}
                             player = {player}
                         key = "tell"/>} />
                    <Tab id="emoji" title="Send Emoji"
                         panel={<Emoji
                             stage = {stage}
                             player = {player}/>} />
                    <Tab id="msg" title="Justify your action"
                         panel={
                             <PredefinedMessages
                         msgs = {messages}
                             stage = {stage}
                             player = {player}/>} />

                </Tabs>
            </div>
        )
    }
}


class AskPreference extends React.Component {
    constructor () {
        super()
        this.state = {
            obj1: "",
            obj2: "",
            comparator : "",
            singleInput : false
        }
    }
    handleClick = e => {
        e.preventDefault();
        const { game, player, stage, isAsking } = this.props;
        const mapping = {
            ">": "more than",
            "<" :  "less than",
            "=" : "the same as"
        };
        let targetMSG = "";
        isAsking? targetMSG = "Do you like " + this.state.obj1 + "s " +
            mapping[this.state.comparator] + " " + this.state.obj2 + "s?":
        targetMSG = "I like "+ this.state.obj1 + "s " +
            mapping[this.state.comparator] + " " + this.state.obj2 +"s.";
        //console.log(s);
        stage.append("log", {
            verb: "preference",
            subjectId: player._id,
            target: targetMSG,
            at: new Date()
        });
    };

    render () {
        const {stage, isAsking} = this.props;
        const negoIssues = stage.get("negoSetting");
        let objectList = [];
        // Dan : get all the objects
        negoIssues.forEach(issue => {
            objectList.push(issue.name);
            });

        return(
          <div className="bp3-button-group">

              <select key = "issue1" name = "obj1" value = {this.state.obj1}
                      onChange={(e) => this.setState({"obj1":e.target.value })}>
                  <option value="" disabled>Select Object</option>
                  {objectList.map((obj ) => (
                      <option value={obj}>{obj}</option>))}
              </select>
              <select key = "comparator" name = "comparator"
                      value = {this.state.comparator}
                      onChange={(e) => this.setState({"comparator":e.target.value })}>
                  <option value="" disabled>Select Comparator</option>
                  <option value=">"> {'>'} </option>
                  <option value="<"> {'<'} </option>
                  <option value="="> {'='} </option>
                  {/*<option value="best"> {'<'} </option>
                  <option value="least"> {'='} </option>*/}

              </select>
              {this.state.singleInput ? null:
                  <select key = "issue2"
                          name = "obj2"
                          value = {this.state.obj2}
                          onChange={(e) => this.setState({"obj2":e.target.value })}>
                  <option value="" disabled>Select Object</option>
                  {objectList.map((obj ) => (
                      <option value={obj}>{obj}</option>))}
              </select>}
              <button className="bp3-button bp3-intent-primary"
                      onClick={this.handleClick} >
                  Send</button>

          </div>)
    }
};
class Emoji extends React.Component{
    handleClick = e => {
        e.preventDefault();
        const { game, player, stage } = this.props;
        //console.log(s);
        stage.append("log", {
            verb: "emoji",
            subjectId: player._id,
            target: e.target.src,
            at: new Date()
        });
    }
    render(){
        return (
            <div>
                <div className="bp3-card bp3-button-group">
                    <button className="bp3-button" onClick={this.handleClick}>
                        <img src = "./resources/emojis/angerface.png"
                                 width ="42px" height = "42px"/></button>
                    <button className="bp3-button" onClick={this.handleClick}>
                        <img src = "./resources/emojis/happyface.png"
                                 width ="42px" height = "42px"/></button>
                    <button className="bp3-button" onClick={this.handleClick}>
                        <img src = "./resources/emojis/neutralface.png"
                                 width ="42px" height = "45px"/></button>
                    <button className="bp3-button" onClick={this.handleClick}>
                        <img src = "./resources/emojis/sadface.png"
                                 width ="42px" height = "42px"/></button>
                    <button className="bp3-button" onClick={this.handleClick}>
                        <img src = "./resources/emojis/shockface.png"
                                 width ="42px" height = "42px" /></button>
                </div>
            </div>
        );
    }
}

class PredefinedMessages extends React.Component{

    handleClick = e => {
        e.preventDefault();
        const { game, player, stage } = this.props;
        //console.log(s);
        stage.append("log", {
            verb: "justification",
            subjectId: player._id,
            target: e.target.textContent,
            at: new Date()
        });
    }
    render () {
        const {msgs} = this.props;

        return(

            <div>
                <Menu>
                    {Object.keys(msgs).map((key) => (
                        <MenuItem key = {key} text={key + " messages"}>
                                {msgs[key].map((s , index) => (
                                    <MenuItem key = {"preMSG"+ key + index}
                                              text = {s}
                                    onClick={this.handleClick}>
                                    </MenuItem>
                                ))}

                        </MenuItem>
                    ))}
                </Menu>

            </div>)
    }
};
