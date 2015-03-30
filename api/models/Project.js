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
    platforms: {
      collection: 'platform',
      via: 'projects',
      dominant: true
    },
    devices: {
      collection: 'device',
      via: 'projects',
      dominant: true
    },
    users: {
      collection: 'user',
      via: 'projects'
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

