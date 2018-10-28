import Empirica from "meteor/empirica:core";

import "./callbacks.js";
import "./bots.js";
import { stepOneData, stepTwoData, constrainedMSG, negotiationData}
      from "./constants";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

Empirica.gameInit((game, treatment, players) => {
  console.log(
    "Game with a treatment: ",
    treatment,
    " will start, with workers",
    _.pluck(players, "id")
  );

  //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
  game.set("cumulativeScore", 0); // the total score at the end of the game
  game.set("nOptimalSolutions", 0); // will count how many times they've got the optimal answer
  game.set("justStarted", true); // I use this to play the sound on the UI when the game starts
  game.set("team", players.length > 1);
  // Dan : the messages are the same for everyone, add to game
    game.set("constrainedMSG", constrainedMSG);

  //we don't know the sequence yet
  let taskSequence = game.treatment.stepOne ? stepOneData : stepTwoData;
  // Dan : add different negotiation setting here
    // Dan : don't have practice cases
  let taskSetting = _.shuffle(negotiationData);


  if (game.treatment.shuffleTaskOrder) {
    //TODO: I need to make sure that I keep the first task fixed (if it has training)
    //taskSequence = _.shuffle(taskSequence); //this is full shuffle
    taskSequence = customShuffle(negotiationData); //this is with keeping the first practice round fixed
  }

  //we'll have 1 round, each task is one stage
    const round = game.addRound();
  // Dan : for negotiation, currently only support 1 round of negotiation
  /*_.times(taskSequence.length, i => {
    const stage = round.addStage({
      name: i === 0 ? "practice" : i,
      displayName: taskSequence[i].difficulty,
      durationInSeconds: game.treatment.stageDuration
    });
    stage.set("task", taskSequence[i]);
  });*/
  _.times(1, i => {
        const stage = round.addStage({
            name: "negotiation",
            displayName: "Negotiation",
            // Dan : for debuging, change it to a longer time

            durationInSeconds: 30*60//game.treatment.stageDuration // 5 mins used in IAGO
        });
        //stage.set("task", taskSequence[i]);
        stage.set("negoSetting", taskSetting[0]);
      stage.set("task", taskSequence[i]);
    });
});

// fix the first practice task and shuffle the rest
//to learn more:
//https://stackoverflow.com/questions/50536044/swapping-all-elements-of-an-array-except-for-first-and-last
function customShuffle(taskSequence) {
  // Find and remove first and last:
  const practiceTask = taskSequence[0];

  const firstIndex = taskSequence.indexOf(practiceTask);

  if (firstIndex !== -1) {
    taskSequence.splice(firstIndex, 1);
  }

  // Normal shuffle with the remaining elements using ES6:
  for (let i = taskSequence.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));

    [taskSequence[i], taskSequence[j]] = [taskSequence[j], taskSequence[i]];
  }

  // Add them back in their new position:
  if (firstIndex !== -1) {
    taskSequence.unshift(practiceTask);
  }

  return taskSequence;
}
