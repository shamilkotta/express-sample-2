const express = require("express");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");

const errorHandler = require("./middleware/errorHandler");
const indexRouter = require("./routes/index");

const app = express();

// view engine
app.set("views", "./views");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: `${__dirname}/views`,
  })
);

// static path
app.use("/static", express.static(`${__dirname}/public`));

// set parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route
app.use("/", indexRouter);
// 404
app.use((req, res, next) => {
  next(new Error("Not found"));
});
// handle errors
app.use(errorHandler);

module.exports = app;
