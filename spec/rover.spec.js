const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let newRover = new Rover(300);
    let newRoverVals = [newRover.position, newRover.mode, newRover.generatorWatts];
    expect(newRoverVals).toEqual([300, 'NORMAL', 110]);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [];
    let message = new Message('Test message with no commands', commands);
    let newRover = new Rover(98382);
    let response = newRover.receiveMessage(message);
    expect(response.message).toEqual('Test message with no commands');
  });
  
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with no commands', commands);
    let newRover = new Rover(98382);
    let response = newRover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  // For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object --- mode, generatorWatts, and position. The test should check each of these for accuracy

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with status_check command', commands);
    let newRover = new Rover(98382);
    let response = newRover.receiveMessage(message);
    let status = [response.results[0].roverStatus.mode, response.results[0].roverStatus.generatorWatts, response.results[0].roverStatus.position]

    expect(status).toEqual(['NORMAL', 110, 98382]);
  });


  // The test should check the completed property and rover mode for accuracy.
  // The rover has two modes that can be passed a values to a mode change command, 'LOW_POWER' and 'NORMAL'.

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with mode_change command', commands);
    let newRover = new Rover(98382);
    let response = newRover.receiveMessage(message);
    let status = [response.results[0].completed, newRover.mode]

    expect(status).toEqual([true, 'LOW_POWER']);
  });

  // The test should check the completed property for accuracy and confirm that the rover position did not change.
  
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MOVE', 7400)];
    let message = new Message('Test message with move command while mode is low_power', commands);
    let newRover = new Rover(98382);
    newRover.mode = "LOW_POWER";
    let response = newRover.receiveMessage(message);
    let status = [response.results[0].completed, newRover.position]

    expect(status).toEqual([false, 98382]);
  });

  // A MOVE command will update the rover's position with the position value in the command.

  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 7400)];
    let message = new Message('Test message with move command', commands);
    let newRover = new Rover(98382);
    newRover.mode = "NORMAL";
    let response = newRover.receiveMessage(message);
    let status = newRover.position;

    expect(status).toEqual(7400);
  });

});
