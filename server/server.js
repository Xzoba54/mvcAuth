const express = require("express");
const app = express();
const cors = require("cors");

const AuthRoute = require("./routes/Auth.Route");
const DashboardRoute = require("./routes/Pages.Route");
const UsersRoute = require("./routes/Users.Route");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/pages", DashboardRoute);
app.use("/api/v1/users", UsersRoute);

app.listen(5000);
