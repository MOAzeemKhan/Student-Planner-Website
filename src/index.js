const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

app.use(express.json());

app.set("view engine", "hbs");  // Setting view engine as hbs
app.set("views", path.join(__dirname, "../templates"));  // Setting views directory
// Serve static files (CSS, images, etc.) from the "public" directory
app.use('/public', express.static('public'));

app.use(express.urlencoded({extended: false}));  // To parse the form data
app.get("/", (req, res) => {
    res.render("login");
})

app.get("/signup",(req, res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    const data={
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data])
    res.render("home", { name: req.body.name});
})

app.get("/login",(req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });
        if (user) {
            // User found in the database
            if (user.password === req.body.password) {
                // Correct password
                res.render("home", { name: req.body.name}); // Redirect to the home page or provide a success message
            } else {
                // Incorrect password
                res.send("Incorrect password");
            }
        } else {
            // User not found
            res.send("User not found");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred while logging in");
    }
});
// To-Do List route
app.get("/todo", (req, res) => {
    res.render("todo");
});

// Notes route
app.get("/notes", (req, res) => {
    res.render("notes");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
