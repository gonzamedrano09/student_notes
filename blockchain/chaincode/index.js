'use strict';

const Course = require('./lib/course');
const InstanceType = require('./lib/instance_type');
const Instance = require('./lib/instance');

module.exports.Course = Course;
module.exports.InstanceType = InstanceType;
module.exports.Instance = Instance;

module.exports.contracts = [ Course, InstanceType, Instance ];
