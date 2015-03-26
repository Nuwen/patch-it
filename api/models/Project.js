/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    // users assigned to project
    users: {
      collection: 'user',
      via: 'projects'
    },
    platforms: {
      collection: 'platform',
      via: 'project'
    },
    templates: {
      collection: 'template',
      via: 'project'
    },
    suites: {
      collection: 'suite',
      via: 'project'
    }
  }
};

