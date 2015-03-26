/**
* Test.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true
    },
    suite: {
      model: 'suite'
    },
    template: {
      model: 'template'
    },
    // Stored cmds to be injected into user's clipboard
    cmd: {
      type: 'string'
    },
    // Instructions for test task
    instructions: {
      type: 'string'
    },
    // Associated Jira bug
    jira: {
      type: 'string'
    },
    // Current status of this task
    status: {
      type: 'string',
      enum: ['pending', 'pass', 'fail']
    }
  }
};

