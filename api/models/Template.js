/**
* Template.js
*
* @description :: A template is just a reference for new suite instances.
              :: Needs a separate model so a TTL can be set on Suite
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    description:{
      type: 'string',
      required: true
    },
    tests: {
      collection: 'test',
      via: 'template'
    },
    suites: {
      collection: 'suite',
      via: 'template'
    },
    project: {
      model: 'project'
    },
    platforms: {
      collection: 'platform',
      via: 'templates',
      dominant: true
    },
    devices: {
      model: 'device'
    }
  }
};

