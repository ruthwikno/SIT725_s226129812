const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" folder

app.use(express.static(path.join(__dirname, "public")));

// GET endpoint to calculate the arithmetic operation of a numbers

app.get("/calculate", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = req.query.operation;

    if (isNaN(num1) || isNaN(num2)) {
        return res.send("Error: Please provide valid numbers.");
    }

    let result;

    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) {
                return res.send("Error: Cannot divide by zero.");
            }
            result = num1 / num2;
            break;
        default:
            return res.send("Error: Invalid operation selected.");
    }

    const symbols = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/"
    };

    res.send(`Result: ${num1} ${symbols[operation]} ${num2} = ${result}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

console.log("Loaded server file from:", __filename);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});