# Patch It

A video game QA tool, designed to help testers build & maintain comprehensive test suites. Supports discrete projects, platforms, and devices. Uses template structure to generate new interactive tests.

Graceful at many viewport resolutions. 

## Installation

### Production Dependencies

## Use Instructions: Tester

## Use Instructions: Lead

## Use Instructions: Dev

## API

## Development Dependencies

### Style guide

#### Naming Conventions
* Sails.js APIs are PascalCase and live in /api. e.g. `sails generate api test` will generate `/api/controllers/TestController.js` & `/api/models/Test.js`
* AngularJS controllers are named *Ctrl, to differentiate them from server-side Sails controllers. Additionally, each controller should be named after its model and action/purpose:  <ModelActionCtrl> e.g. `TemplateEditCtrl`. 
* ALL controller methods (server + client) will be named in lowerCamelCase, where the lowercase prefix is the action/purpose. e.g. `addTestItem()`  
* Template names are caterpillar-case, where the first argument is the template's serve route and the following arguments express purpose or sub-routes. e.g. `template-new.jade` & `template-edit.jade`

#### Folder organization

#### Front-end & Back-end are decoupled