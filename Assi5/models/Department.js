const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true }, // e.g., "CSE"
  description: { type: String, required: true },
  head: { type: String, required: true },      // e.g., "Dr. Sarah Johnson"
  programs: [String]                           // e.g., ["B.Tech", "M.Tech"]
});

module.exports = mongoose.model('Department', departmentSchema);