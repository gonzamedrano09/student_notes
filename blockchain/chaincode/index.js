'use strict';

const Course = require('./lib/course');
const InstanceType = require('./lib/instance_type');
const Professor = require('./lib/professor');
const Student = require('./lib/student');
const Instance = require('./lib/instance');
const Note = require('./lib/note');

module.exports.Course = Course;
module.exports.InstanceType = InstanceType;
module.exports.Professor = Professor;
module.exports.Student = Student;
module.exports.Instance = Instance;
module.exports.Note = Note;

module.exports.contracts = [ Course, InstanceType, Professor, Student, Instance, Note ];
