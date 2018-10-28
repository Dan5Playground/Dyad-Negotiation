import React from "react";
import Issue from "./Issue.jsx";

export default class Division extends React.Component {
  state = { hovered: false };

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({ hovered: true });
  };

  handleDragLeave = e => {
    this.setState({ hovered: false });
  };

  handleDrop = e => {
    const {currentPlayer, isSelf, stage, player, room } = this.props;
    const item = e.dataTransfer.getData("text/plain");
    stage.set(`item-${item}-dragger`, null); //maybe this fixes the problem of stucked colors
    const currentRoom = stage.get(`item-${item}-room`);

    this.setState({ hovered: false });
    console.log("The owner of this room is "+ currentPlayer);
    console.log("player " + player._id + " released " + item + " back to room " + room);

    // Avoid any unwanted drops!
    // We're using the native DnD system, which mean people can drag anything
    // onto these drop zones (e.g. files from their desktop) so we check this
    // is an existing student first.
    if (currentRoom === room) {
      //if they kept the student where it is, log that they stayed in the same place And don't change the answer
      /*stage.append("log", {
        verb: "releasedItem",
        subjectId: player._id,
        object: item
      });*/
      return;
    }

    stage.set(`item-${item}-room`, room);

    console.log("The owner of this room is "+ currentPlayer);
    console.log("player " + player._id + " moved " + item + " to room " + room);

    stage.append("log", {
      verb: "movedItem",
      // Dan : change it to the owner's id
      subjectId: currentPlayer,
      object: item,
      target: room,
      at: new Date()
    });
  };

  render() {
    const {  room, isDeck, stage, isSelf, ...rest } = this.props;
    const { hovered } = this.state;

    const negoIssues = stage.get("negoSetting");
    //console.log(negoIssues);
    let objectList = []
    // Dan : get all the objects
    negoIssues.forEach(issue => {
        const objName = issue.name;
        _.times(issue.quantity, i => {
                   objectList.push(objName+i.toString());
                })});
    const items = []
    objectList.forEach(item =>{
        if (stage.get(`item-${item}-room`) === room) {
                items.push(item);
              }
    })


    const classNameRoom = isDeck ? "deck bp3-elevation-1" : "room";
    const classNameHovered = hovered ? "bp3-elevation-3" : "";
    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`bp3-card ${classNameRoom} ${classNameHovered}`}
      >
        {/*Maybe move it to functions*/}
        {isDeck ? <h6 className='bp3-heading'>Undecided</h6> : null}
        {isSelf && !isDeck ? <h6 className='bp3-heading'>Yours</h6>:null}
        {!isSelf && !isDeck ? <h6 className='bp3-heading'>Opponent's</h6>:null}
        {items.map(item => (
          <Issue
            onDragStart={this.handleDragStart}
            key={item}
            item={item}
            room={room}
            stage={stage}
            {...rest}
          />
        ))}
      </div>
    );
  }
}
