const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: `Listening at port ${PORT}` });
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
