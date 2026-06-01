const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { calculateAverageGrade } = require("../helpers");

chai.use(chaiHttp);
const expect = chai.expect;

// ─── REST API Tests: GET /api/students ───────────────────────────────────────

describe("GET /api/students", () => {

  it("should return a list of all students with status 200", (done) => {
    chai.request(app)
      .get("/api/students")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.students).to.be.an("array");
        expect(res.body.students.length).to.be.greaterThan(0);
        done();
      });
  });

  it("should return students with id, name, course, age and marks fields", (done) => {
    chai.request(app)
      .get("/api/students")
      .end((err, res) => {
        const student = res.body.students[0];
        expect(student).to.have.property("id");
        expect(student).to.have.property("name");
        expect(student).to.have.property("course");
        expect(student).to.have.property("age");
        expect(student).to.have.property("marks");
        done();
      });
  });

  it("should return 404 when a student ID does not exist", (done) => {
    chai.request(app)
      .get("/api/students/9999")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal("Student not found");
        done();
      });
  });

  it("should return 400 when adding a student with missing fields", (done) => {
    chai.request(app)
      .post("/api/students")
      .send({ name: "Incomplete Student" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
        done();
      });
  });

  it("should successfully add a new student and return 201", (done) => {
    chai.request(app)
      .post("/api/students")
      .send({ name: "David Brown", age: 23, course: "Physics", marks: [80, 75, 90] })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.student).to.have.property("id");
        expect(res.body.student.name).to.equal("David Brown");
        done();
      });
  });

});

// ─── Calculation Function Tests: calculateAverageGrade() ─────────────────────

describe("calculateAverageGrade()", () => {

  it("should return the correct average for a normal set of marks", () => {
    expect(calculateAverageGrade([80, 90, 70])).to.equal(80);
  });

  it("should return the correct average rounded to 2 decimal places", () => {
    expect(calculateAverageGrade([80, 85, 90])).to.equal(85);
  });

  it("should return 100 when all marks are 100", () => {
    expect(calculateAverageGrade([100, 100, 100])).to.equal(100);
  });

  it("should return 0 when all marks are 0", () => {
    expect(calculateAverageGrade([0, 0, 0])).to.equal(0);
  });

  it("should throw an error when marks array is empty", () => {
    expect(() => calculateAverageGrade([])).to.throw("Marks array cannot be empty");
  });

  it("should throw an error when input is not an array", () => {
    expect(() => calculateAverageGrade("not an array")).to.throw("Marks must be an array");
  });

  it("should throw an error when a mark is greater than 100", () => {
    expect(() => calculateAverageGrade([50, 110, 80])).to.throw("Each mark must be between 0 and 100");
  });

  it("should throw an error when a mark is negative", () => {
    expect(() => calculateAverageGrade([50, -10, 80])).to.throw("Each mark must be between 0 and 100");
  });

});
