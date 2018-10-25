import React from "react";
import Issue from "./Issue.jsx"
import Division from "./Division.jsx"
import Room from "../game/Room";

export default class MakeOffer extends React.Component {
    state = { hovered: false };
    render() {
        const {issues} = this.props;
        const divStyle = {
            border : "solid 1px #ccc",
            padding: "10px",
            margin : "10px 10px 10px 10px"

        };
        const room = {
            position: "relative",
            // margin: -0.1rem -0.1rem 0 0;
            display: "flex"

        }
        // change the style when hover
        const { hovered } = this.state;
        const classNameHovered = hovered ? "bp3-elevation-3" : "";


        return (

            <div >
                <div  style={divStyle} >
                    <div style = {room} >
                        <div className="bp3-button-group">
                            {/*Show the payoff table*/}

                            { issues.map((issue) =>
                                <Issue
                                    key = {issue.name}
                                issue = {issue}/>
                                    )
                            }
                        </div>
                    </div>
                    <div>

                        <div className="bp3-button-group">
                            <div className={`bp3-card room ${classNameHovered}`}>
                                <label>Yours:    </label>
                            </div>
                            <div className={`bp3-card room ${classNameHovered}`}>
                                <label>The others: </label>
                            </div>
                        </div>
                    </div>
                    <button>Accept Offer</button>
                </div>


            </div>
        );
    }
}