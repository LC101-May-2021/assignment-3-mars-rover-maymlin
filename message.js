class Message {
  // name is a string that is name of the Message
  // commands is an array of Command objects
  constructor(name, commands) {
     if (!name) {
       throw Error("Message name required.");
     }
     
     this.name = name;
     this.commands = commands;
  }
}

module.exports = Message;