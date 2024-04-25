const express = require("express");
const cors = require("cors");
const { testConnection } = require("./db/Conn");
const commentsRoute = require("./routes/commentsRoutes");
const CreateTables = require("./db/models/setUp");

const app = express();
const port = 8001;

testConnection();
app.use(cors());
app.use(express.json());

// CreateTables();

app.use("/comments", commentsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
