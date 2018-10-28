import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import { Button, Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";


// this
export default class ConstrainedMessage extends React.Component {
    constructor () {
        super()
        this.state = {
            isHidden: true
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    render () {
        const { objects, stage } = this.props;
        return (
            <div>
                <button onClick={this.toggleHidden.bind(this)} >
                    Click to show modal
                </button>
                {!this.state.isHidden && <Child />}
            </div>
        )
    }
}

const Child = () => (
    <div className='modal'>
        Hello, World!
    </div>
)