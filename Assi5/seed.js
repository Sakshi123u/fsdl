const mongoose = require('mongoose');
const Department = require('./models/Department');
require('dotenv').config();

// Use your MONGO_URI from .env or local string
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/collegeDB';

mongoose.connect(dbURI)
  .then(() => console.log("MongoDB Connected for seeding..."))
  .catch(err => console.log(err));

const engineeringDepartments = [
  {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    description: "Focusing on artificial intelligence, machine learning, and advanced software architecture.",
    head: "Dr. Rajesh Kumar",
    programs: ["B.Tech CSE", "M.Tech AI"]
  },
  {
    name: "Mechanical Engineering",
    shortName: "ME",
    description: "In-depth study of thermodynamics, robotics, and advanced manufacturing systems.",
    head: "Dr. Amit Sharma",
    programs: ["B.Tech ME", "M.Tech Robotics"]
  },
  {
    name: "Civil Engineering",
    shortName: "CE",
    description: "Expertise in structural integrity, urban planning, and sustainable infrastructure.",
    head: "Dr. Priya Iyer",
    programs: ["B.Tech CE", "M.Tech Structures"]
  },
  {
    name: "Electrical Engineering",
    shortName: "EE",
    description: "Specializing in power systems, renewable energy, and smart grid technology.",
    head: "Dr. Vikram Malhotra",
    programs: ["B.Tech EE", "M.Tech Power Systems"]
  },
  {
    name: "Electronics & Communication",
    shortName: "ECE",
    description: "Covers VLSI design, wireless communication, and embedded systems.",
    head: "Dr. Ananya Reddy",
    programs: ["B.Tech ECE", "M.Tech VLSI"]
  },
  {
    name: "Computer Science & ML",
    shortName: "CSE(AIML)",
    description: "Focusing on artificial intelligence, machine learning, and advanced software architecture.",
    head: "Dr. Rajeshri Kumar",
    programs: ["B.Tech CSE", "M.Tech AI"]
  }
];

const seedDB = async () => {
  try {
    await Department.deleteMany({}); // Clears old data
    await Department.insertMany(engineeringDepartments);
    console.log("Engineering Departments Seeded Successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();