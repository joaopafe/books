const express = require("express");
const PORT = process.env.PORT || 3000;
const bookRouter = require("./book/bookRoutes");
const { errors } = require("celebrate");

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ message: `Listening at port ${PORT}` });
});

app.use("/book", bookRouter);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

app.use(errors());
