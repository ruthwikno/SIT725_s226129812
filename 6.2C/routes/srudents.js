const express = require("express");
const router = express.Router();

let students = [
  { id: 1, name: "Alice Johnson", age: 20, course: "Computer Science", marks: [85, 90, 78] },
  { id: 2, name: "Bob Smith", age: 22, course: "Engineering", marks: [70, 65, 80] },
  { id: 3, name: "Clara Lee", age: 21, course: "Mathematics", marks: [95, 92, 88] },
];

let nextId = 4;

// GET /api/students - return all students
router.get("/", (req, res) => {
  res.status(200).json({ success: true, students });
});

// GET /api/students/:id - return a single student
router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }
  res.status(200).json({ success: true, student });
});

// POST /api/students - add a new student
router.post("/", (req, res) => {
  const { name, age, course, marks } = req.body;

  if (!name || !age || !course || !marks) {
    return res.status(400).json({ success: false, message: "All fields are required: name, age, course, marks" });
  }

  if (!Array.isArray(marks) || marks.length === 0) {
    return res.status(400).json({ success: false, message: "Marks must be a non-empty array" });
  }

  const newStudent = { id: nextId++, name, age, course, marks };
  students.push(newStudent);
  res.status(201).json({ success: true, student: newStudent });
});

module.exports = router;
