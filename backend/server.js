const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const path = require("path");
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
//deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "deployment") {
  app.use(express.static(path.join(__dirname, "/front-end/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
}
//deployment
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || "5000";
app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});
