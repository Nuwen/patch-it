/**
* Devices.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    // Dxdiag, system profiler, etc
    spec: {
      type: 'binary'
    },
    // Relationships 
    projects: {
      collection: 'project',
      via: 'devices'
    },
    platforms: {
      
    },
    users: {
      collection: 'user',
      via: 'devices'
    },
    templates: {
      collection: 'template',
      via: 'devices'
    }
  }
};

