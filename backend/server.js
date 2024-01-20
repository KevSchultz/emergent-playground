const express = require("express");
const app = express();
const port = 80;

const path = require("path");

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
