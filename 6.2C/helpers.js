/**
 * Calculates the average grade of a student from an array of marks.
 * @param {number[]} marks - Array of marks (each between 0 and 100)
 * @returns {number} Average grade rounded to 2 decimal places
 */
function calculateAverageGrade(marks) {
  if (!Array.isArray(marks)) {
    throw new Error("Marks must be an array");
  }

  if (marks.length === 0) {
    throw new Error("Marks array cannot be empty");
  }

  for (const mark of marks) {
    if (typeof mark !== "number" || isNaN(mark)) {
      throw new Error("All marks must be valid numbers");
    }
    if (mark < 0 || mark > 100) {
      throw new Error("Each mark must be between 0 and 100");
    }
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  return Math.round((total / marks.length) * 100) / 100;
}

module.exports = { calculateAverageGrade };
