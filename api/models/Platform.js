/**
* Platform.js
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
    /*projects: {
      collection: 'project',
      via: 'platforms'
    },
    */
    devices: {
      collection: 'device',
      via: 'platforms'
    },
    templates: {
      collection: 'template',
      via: 'platforms'
    }
  }
};

