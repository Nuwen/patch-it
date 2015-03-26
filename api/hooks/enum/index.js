/**
 * fw extended models hook
 */


module.exports = function (sails) {

  var includeAll = require('include-all');
  var _ = require('lodash');

  var hook = {

    enumOptions: {},

    // These are the extended properties that needs to be moved from
    // _attributes to ext_attributes
    extProperties: ['enum_options'],


    defaults: {
        // defaults
        opts: {}
    },

    configure: function() {

    },

    // Load all files of *.enum.json
    loadEnumerations: function() {

      var options = includeAll({ 
        dirname       : sails.config.paths.models,
        filter        : /(.+)\.enum\.json$/,
        replaceExpr   : /^.*\//,
        flattenDirectories: true,
      });

      _.extend(this.enumOptions, options);

      sails.emit('hook:extmodel:loaded');
    },

    // Update models with enum options
    enumUpdateModels: function(identity, key, modelId) {
      var prop = sails.models[modelId]._attributes[key].enum;
      prop = prop || [];
      // Since ext_attributes is an object (map), get the keys (left hand side)
      // Append to original enum using "union", so only uniq values are placed
      prop = _.union(prop, _.keys(this.enumOptions[identity]));
      sails.models[modelId]._attributes[key].enum = prop;
      sails.models[modelId]._validator.validations[key].in = prop;
      sails.models[modelId].definition[key].enum = prop;
    },

    // Move extended properties to their right place
    moveExtProperties: function() {

      var self = this;
      // Move ext properties from attributes to ext_attributes
      _.each(sails.models, function(modelConfig, modelId) {

        sails.models[modelId].ext_attributes = modelConfig.ext_attributes || {};
        _.each(modelConfig._attributes, function(opts, key) {
          if(!(_.isObject(opts))) return;
          _.each(opts, function(val, prop) {
            // If Property in extProperties
            if(_.indexOf(self.extProperties, prop) > -1) {
              sails.models[modelId].ext_attributes[key] = sails.models[modelId].ext_attributes[key] || {};
              sails.models[modelId].ext_attributes[key][prop] = val;
              delete(sails.models[modelId]._attributes[key][prop]);
              delete(sails.models[modelId]._validator.validations[key][prop]);
              delete(sails.models[modelId].definition[key][prop]);
            }
          });
        });
      });
    },

    // All those properties (for all models) that have enum_options - identity
    // (reading from a file)
    updateEnumForIdentity: function() {

      var self = this;
      // Get each model and find params
      _.each(sails.models, function(modelConfig, modelId) {

        var extAttr = modelConfig.ext_attributes;
        if(!extAttr) return;

        _.each(extAttr, function(opts, key) {

          // If the extended attribute is not in the original model
          if(!modelConfig._attributes[key]) return;

          if(opts.enum_options && opts.enum_options.identity && self.enumOptions[opts.enum_options.identity])
            self.enumUpdateModels(opts.enum_options.identity, key, modelId);
        });
      });

    },

    // Set auto beforeValidate callback for each model
    // Call this function once only
    setAutoValidateCallback: function() {

      var self = this;
      // Get each model and find params
      _.each(sails.models, function(modelConfig, modelId) {

        var extAttr = modelConfig.ext_attributes;
        if(!extAttr) return;

        _.each(extAttr, function(opts, key) {
          if(opts.enum_options && opts.enum_options.model && opts.enum_options.fields) {
            sails.models[modelId]._callbacks.beforeValidate.push( function(values, cb) {
              // Set our own function for beforeValidate
              hook.updateEnumForModel(modelId, values, cb);
            });
            return false; // only once per model
          }
        });
      });

    },

    // All those properties that have enum_options with `model` will be updated
    // also check if such attributes are there in the values
    updateEnumForModel: function(modelId, values, next) {

      if(!sails.models[modelId].ext_attributes)
        return next();

      var myopts = {};

      // Get all attributes that have enum_options as model
      _.each(sails.models[modelId].ext_attributes, function(opts, key) {
        if(! key in values) return;
        if(!(_.isObject(opts))) return;
        if(!opts.enum_options) return;
        if(!opts.enum_options.model) return;

        myopts.model = opts.enum_options.model;
        myopts.fields = opts.enum_options.fields;
        myopts.key = key;
        return false;
      });

      if(!(myopts.model && myopts.fields))
        return next();

      // Now enum_options: { model: xx, fields: xx } is found
      // Fetch from the model
      if(!sails.models[myopts.model])
        return next(new Error("Model: " + modelId + "key:" + key + " references enum_options for model:" + myopts.model + " which does not exist"));

      async.series([
        function(cb) {
          sails.models[myopts.model].find().exec(function(err, rows) {
            if(err) cb(err);

            var prop = _.uniq(_.pluck(rows, myopts.fields));
            sails.models[modelId]._attributes[myopts.key].enum = prop;
            sails.models[modelId]._validator.validations[myopts.key].in = prop;
            sails.models[modelId].definition[myopts.key].enum = prop;
            return cb();
          });
        },
      ], function(err) {
        if(err) return next(err);
        return next();
      });
    },

    updateModels: function() {

      var self = this;

      this.moveExtProperties();

      this.updateEnumForIdentity();

    },



    // Run when sails loads-- be sure and call `next()`.
    initialize: function (next) {

      var self = this;

      this.loadEnumerations();

      // Check the models after the ORM gets loaded
      sails.after(['hook:orm:loaded', 'hook:extmodel:loaded'], function() {
        self.updateModels();
        self.setAutoValidateCallback();
      });

      // If the models get reloaded
      sails.on('hook:orm:reloaded', function() {
        self.updateModels();
      });

      return next();
    },

    routes: {
        before: {
        },

        after: {
        }
    }

  };

  return hook;
};
