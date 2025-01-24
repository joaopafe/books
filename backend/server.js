const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const bookRouter = require("./book/bookRoutes");

const app = express();

app.use("/book", bookRouter);

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(errors());
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
