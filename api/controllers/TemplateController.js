/**
 * TemplateController
 *
 * @description :: Server-side logic for managing templates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	filter: function(req, res){
    var platform = req.param('platform');
    var project = req.param('project');
    sails.log.warn(platform);
    sails.log.warn(project);
    if ((platform.prop && platform.prop.constructor) ||
        (project.prop && platform.prop.constructor) === Array)
      { sails.log.warn('all')}
    }
};

