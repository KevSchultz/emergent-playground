const express = require("express");
const app = express();
const port = 80;

const path = require("path");

app.use(express.static(path.join(__dirname, 'build')));

// Catch all route for client side routing (must be the last route defined)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
