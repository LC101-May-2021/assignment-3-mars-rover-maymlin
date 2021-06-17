class Rover {
  // a position is a number representing the rover's position
  constructor(position,) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let response = {};
    response.message = message.name;
    response.results = [];

    // for(const command of message.commands) {
    //   if (command.commandType === "MODE_CHANGE") {
    //     this.mode = command.value;
    //   }
    // }
    
    for (const command of message.commands) {
      let commandResult = {};

      if (command.commandType === 'STATUS_CHECK') {
        command.completed = true;
        commandResult.roverStatus = {};
        commandResult.roverStatus["mode"] = this.mode;
        commandResult.roverStatus["generatorWatts"] = this.generatorWatts;
        commandResult.roverStatus["position"] = this.position;
      } else if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        commandResult.completed = true;
      } else if (command.commandType === 'MOVE') {
        if (this.mode === 'NORMAL') {
          this.position = command.value;
          commandResult.completed = true;
        } else {
          commandResult.completed = false;
        }
      } else {
        commandResult.completed = true;
      }
     
      response.results.push(commandResult);
    }

  // console.log(response);
  // console.log(this.position);
     
    return response;
  }  
}

module.exports = Rover;