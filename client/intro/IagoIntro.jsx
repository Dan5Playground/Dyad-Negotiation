import React from "react";

import { Centered } from "meteor/empirica:core";



export default class IagoIntro extends React.Component {
    render() {
        const { hasPrev, hasNext, onNext, onPrev, treatment, game } = this.props;
        const sampleIssues =
            [
                {name:"ball", quantity: 2, value: 3 },
                {name:"hat", quantity: 2, value: 1 },
                {name:"book", quantity: 1, value: 2}];
        return (
            <Centered>
                <div className="instructions">
                    <h1 className={"bp3-heading"}> Game Overview </h1>
                    <div className={"bp3-card"}>
                        <p>
                            Welcome to the AuctionWars Negotiation Game! In this game,
                            you'll be negotiating over the contents of an abandoned
                            storage locker. You and your partner have to decide how
                            to divide up a number of valuable items. These items are
                            worth different points based on how much you think you can
                            sell them for!
                        </p>
                        <p>
                            Please read the instructions below and Pay special
                            attention to the <strong>bold</strong> sections!
                        </p>
                    </div>
                    <h2>What you need to do:</h2>
                    { game.treatment.freeText?
                        <div>
                            <p>
                                <strong>Negotiate</strong> with another Tuker to divide
                            the objects listing below to get the <strong>MOST </strong>
                            points. You can type in the message box as shown in the picture.
                            You will have <strong > 5 minutes</strong> to come to an agreement.
                            </p>

                        </div>
                        :
                    <ul>
                        <li>
                            <strong>Negotiate</strong> with another Tuker to divide
                            the objects listing below to get the <strong>MOST </strong>
                            points. You can move items around on the game board to send
                            offers and accept offer. You will have <strong > 5
                            minutes</strong> to come to an agreement.

                            {/*<img src = "./resources/objects/ball.png" />
                            <HTMLTable className="bp3-table">
                                <caption><strong>Payoff Table</strong></caption>
                                <thead>
                                <tr>
                                    <th>Objects</th>
                                    {sampleIssues.map(issue => <th key={issue.name}>{issue.name}</th>)}
                                </tr>
                                </thead>
                                <tbody>
                                    <tr key="payoffValue">
                                        <th>Value (points/item)</th>
                                        {sampleIssues.map(issue => <td key={issue.name}>{issue.value}</td>)}
                                    </tr>
                                </tbody>
                            </HTMLTable>*/}
                            {/*<MakeOffer
                                key={"offerIntro"}
                                issues = {sampleIssues}
                            />*/}
                            <div style={{margin : "10px 2px 10px 2px"}}>
                                <img src = "./resources/UI/offer.png" width = "500px"/>
                            </div>

                        </li>
                        <li>
                            <strong>Ask Questions or justify your actions</strong> to your opponent by
                            clicking the messages listed as the following.

                            {/*<div className="bp3-card">
                                <button className="bp3-button">Ask your opponent's preference</button>
                                <button className="bp3-button">Tell your preference</button>
                                <button className="bp3-button">Justify your action</button>

                            </div>*/}
                            <div style={{margin : "10px 2px 10px 2px"}}>
                                <img src = "./resources/UI/message.png" width = "600px"/>
                            </div>
                        </li>
                        <li>
                            <strong>Send emoticons</strong> by clicking these emojis :).
                            <div>
                                <div className="bp3-card bp3-button-group">
                                    <button><img src = "./resources/emojis/angerface.png"
                                         width ="42px" height = "42px"/></button>
                                    <button><img src = "./resources/emojis/happyface.png"
                                                 width ="42px" height = "42px"/></button>
                                    <button><img src = "./resources/emojis/neutralface.png"
                                                 width ="42px" height = "45px"/></button>
                                    <button><img src = "./resources/emojis/sadface.png"
                                                 width ="42px" height = "42px"/></button>
                                    <button><img src = "./resources/emojis/shockface.png"
                                                 width ="42px" height = "42px" /></button>
                                </div>
                            </div>
                        </li>
                        <li>
                            Everything you do will appear in the chat log on the right side of
                            the screen so you can look it over.
                            <div style={{margin : "10px 2px 10px 2px"}}>
                                <img src = "./resources/UI/Log.png" width="400px"/>
                            </div>
                        </li>
                    </ul>}

                    <h2>Rewards:</h2>
                    <ul>
                        <li>You will get <span style={{color:"red"}}>$0.50</span> by finishing
                            this task no matter you reach an agreement or not. </li>
                        <li><strong>Bonus :</strong>If you reach an agreement within 5 minutes,
                            each point you have at the end of the game will give you one entry
                            into a lottery on MTurk for one of several<span
                                style={{color:"red"}}> $10.00 </span> bonus prizes.<strong>The more
                                points you have, the more likely you are to win!</strong></li>
                        <li>If your opponent doesn't show up after 15 minutes, you will get $0.30
                            for compensation of your time. </li>
                    </ul>

                    <h2>Notes:</h2>
                    <ul>
                    <li>
                        The game <strong>must be played on a desktop or laptop</strong>.
                        There is NO mobile support
                    </li>
                    <li>
                        <strong>
                            For the best experience, please maximize the window containing
                            this task or make it as large as possible.
                        </strong>
                    </li>
                    </ul>
                    <button
                        type="button"
                        className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
                        onClick={onPrev}
                        disabled={!hasPrev}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="bp3-button bp3-intent-primary"
                        onClick={onNext}
                        disabled={!hasNext}
                    >
                        Next
                        <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right"/>
                    </button>
                </div>
            </Centered>
        );
    }
}
