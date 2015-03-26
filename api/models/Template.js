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
      unique: true
    },
    project: {
      model: 'project'
    },
    tests: {
      collection: 'test',
      via: 'template'
    },
    suites: {
      collection: 'suite',
      via: 'template'
    },
    platform: {
      type: 'array',
      enum: [],
      enum_options: {model: 'platform', fields: ['name']}
    }
  }
};

