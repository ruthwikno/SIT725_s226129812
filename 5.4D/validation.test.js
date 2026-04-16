/**
 * SIT725 – 5.4D Validation Tests (MANDATORY TEMPLATE)
 * Student ID: s226129812
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================

/**
 * makeValidBook — generates a payload that satisfies ALL schema rules:
 *   id        : string, 1–100 chars
 *   title     : string, 1–200 chars
 *   author    : string, 2–100 chars
 *   year      : integer, 1000–currentYear
 *   genre     : one of the allowed enum values
 *   summary   : string, 10–2000 chars
 *   price     : string representing a non-negative decimal
 */
function makeValidBook(id) {
  return {
    id,
    title: "Valid Book Title",
    author: "Valid Author",
    year: 2020,
    genre: "Other",
    summary: "A valid summary that is at least ten characters long.",
    price: "9.99"
  };
}

/**
 * makeValidUpdate — generates a valid update payload (no id field).
 */
function makeValidUpdate() {
  return {
    title: "Updated Book Title",
    author: "Updated Author",
    year: 2021,
    genre: "Fantasy",
    summary: "An updated summary that is long enough to be valid.",
    price: "12.50"
  };
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ── T01  Valid CREATE ─────────────────────────────────────────────────────
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ── T02  Duplicate ID ─────────────────────────────────────────────────────
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ── T03  Immutable ID on update ───────────────────────────────────────────
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ── T04  Unknown field CREATE ─────────────────────────────────────────────
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ── T05  Unknown field UPDATE ─────────────────────────────────────────────
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  // =====================================================================
  // REQUIRED FIELD VALIDATION (CREATE)
  // =====================================================================

  // ── T06  Missing title on CREATE ──────────────────────────────────────────
  await test({
    id: "T06",
    name: "Missing title on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 2}`); delete b.title; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ── T07  Missing author on CREATE ─────────────────────────────────────────
  await test({
    id: "T07",
    name: "Missing author on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 3}`); delete b.author; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ── T08  Missing year on CREATE ───────────────────────────────────────────
  await test({
    id: "T08",
    name: "Missing year on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 4}`); delete b.year; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ── T09  Missing genre on CREATE ──────────────────────────────────────────
  await test({
    id: "T09",
    name: "Missing genre on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 5}`); delete b.genre; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ── T10  Missing summary on CREATE ────────────────────────────────────────
  await test({
    id: "T10",
    name: "Missing summary on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 6}`); delete b.summary; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // ── T11  Missing price on CREATE ──────────────────────────────────────────
  await test({
    id: "T11",
    name: "Missing price on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: (() => { const b = makeValidBook(`b${Date.now() + 7}`); delete b.price; return b; })(),
    tags: ["CREATE_FAIL", "REQUIRED"]
  });

  // =====================================================================
  // TYPE VALIDATION
  // =====================================================================

  // ── T12  year is a string (wrong type) on CREATE ──────────────────────────
  await test({
    id: "T12",
    name: "year as string on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 8}`), year: "two thousand" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ── T13  price as a non-numeric string on CREATE ──────────────────────────
  await test({
    id: "T13",
    name: "price as non-numeric string on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 9}`), price: "free" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ── T14  title as number (wrong type) on CREATE ───────────────────────────
  await test({
    id: "T14",
    name: "title as number on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 10}`), title: 12345 },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ── T15  year as string on UPDATE ─────────────────────────────────────────
  await test({
    id: "T15",
    name: "year as string on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), year: "nineteen" },
    tags: ["UPDATE_FAIL", "TYPE"]
  });

  // =====================================================================
  // BOUNDARY TESTING
  // =====================================================================

  // ── T16  year below minimum (999) on CREATE ───────────────────────────────
  await test({
    id: "T16",
    name: "year below minimum (999) on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 11}`), year: 999 },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ── T17  year in future on CREATE ─────────────────────────────────────────
  await test({
    id: "T17",
    name: "year in future on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 12}`), year: new Date().getFullYear() + 1 },
    tags: ["CREATE_FAIL", "BOUNDARY", "TEMPORAL"]
  });

  // ── T18  price exactly 0 (boundary — should be valid) ─────────────────────
  await test({
    id: "T18",
    name: "price = 0 (boundary, valid) on CREATE",
    method: "POST",
    path: createPath,
    expected: 201,
    body: { ...makeValidBook(`b${Date.now() + 13}`), price: "0.00" },
    tags: []
  });

  // ── T19  price negative on CREATE ─────────────────────────────────────────
  await test({
    id: "T19",
    name: "price negative on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 14}`), price: "-1.00" },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ── T20  year = 1000 (lower boundary — should be valid) ───────────────────
  await test({
    id: "T20",
    name: "year = 1000 (lower boundary, valid) on CREATE",
    method: "POST",
    path: createPath,
    expected: 201,
    body: { ...makeValidBook(`b${Date.now() + 15}`), year: 1000 },
    tags: []
  });

  // ── T21  year in future on UPDATE ─────────────────────────────────────────
  await test({
    id: "T21",
    name: "year in future on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), year: new Date().getFullYear() + 5 },
    tags: ["UPDATE_FAIL", "BOUNDARY", "TEMPORAL"]
  });

  // =====================================================================
  // LENGTH VIOLATIONS
  // =====================================================================

  // ── T22  title too long (>200 chars) on CREATE ────────────────────────────
  await test({
    id: "T22",
    name: "title too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 16}`), title: "A".repeat(201) },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ── T23  author too short (<2 chars) on CREATE ────────────────────────────
  await test({
    id: "T23",
    name: "author too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 17}`), author: "A" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ── T24  author too long (>100 chars) on CREATE ───────────────────────────
  await test({
    id: "T24",
    name: "author too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 18}`), author: "B".repeat(101) },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ── T25  summary too short (<10 chars) on CREATE ──────────────────────────
  await test({
    id: "T25",
    name: "summary too short on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 19}`), summary: "Short" },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ── T26  summary too long (>2000 chars) on CREATE ────────────────────────
  await test({
    id: "T26",
    name: "summary too long on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 20}`), summary: "S".repeat(2001) },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ── T27  title too long on UPDATE ─────────────────────────────────────────
  await test({
    id: "T27",
    name: "title too long on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), title: "T".repeat(201) },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });

  // ── T28  summary too short on UPDATE ──────────────────────────────────────
  await test({
    id: "T28",
    name: "summary too short on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), summary: "Hi" },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });

  // =====================================================================
  // TEMPORAL RULES
  // =====================================================================

  // ── T29  year = current year (boundary, should be valid) ──────────────────
  await test({
    id: "T29",
    name: "year = current year (valid) on CREATE",
    method: "POST",
    path: createPath,
    expected: 201,
    body: { ...makeValidBook(`b${Date.now() + 21}`), year: new Date().getFullYear() },
    tags: []
  });

  // ── T30  year = 0 (before lower boundary) on CREATE ──────────────────────
  await test({
    id: "T30",
    name: "year = 0 on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 22}`), year: 0 },
    tags: ["CREATE_FAIL", "TEMPORAL", "BOUNDARY"]
  });

  // =====================================================================
  // GENRE ENUM VALIDATION
  // =====================================================================

  // ── T31  Invalid genre on CREATE ──────────────────────────────────────────
  await test({
    id: "T31",
    name: "Invalid genre on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 23}`), genre: "Cooking" },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ── T32  Invalid genre on UPDATE ──────────────────────────────────────────
  await test({
    id: "T32",
    name: "Invalid genre on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), genre: "Sports" },
    tags: ["UPDATE_FAIL", "TYPE"]
  });

  // =====================================================================
  // UPDATE-SPECIFIC VALIDATION
  // =====================================================================

  // ── T33  Update non-existent book ─────────────────────────────────────────
  await test({
    id: "T33",
    name: "Update non-existent book",
    method: "PUT",
    path: updatePath("does-not-exist-9999"),
    expected: 404,
    body: makeValidUpdate(),
    tags: ["UPDATE_FAIL"]
  });

  // ── T34  Valid UPDATE ─────────────────────────────────────────────────────
  await test({
    id: "T34",
    name: "Valid update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 200,
    body: makeValidUpdate(),
    tags: []
  });

  // ── T35  Price negative on UPDATE ─────────────────────────────────────────
  await test({
    id: "T35",
    name: "Price negative on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), price: "-5.00" },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ── T36  Multiple unknown fields on CREATE ────────────────────────────────
  await test({
    id: "T36",
    name: "Multiple unknown fields on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now() + 24}`), foo: 1, bar: 2 },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ── T37  Multiple unknown fields on UPDATE ────────────────────────────────
  await test({
    id: "T37",
    name: "Multiple unknown fields on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), inject: true, drop: "db" },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});