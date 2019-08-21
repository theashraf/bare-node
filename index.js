const App = require("./lib/App");

const app = new App();

// logger middleware
app.use("*", (req, res, next) => {
  console.log(req.method + "  " + req.url);
  next();
});

// home route
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

// echo
app.post("/echo", (req, res, next) => {
  console.log(req.body);
  res.status(201).json(req.body);
});

// 404 not found
app.use("*", (req, res, next) => {
  res.status(404).sendFile(__dirname + "/404.html");
});

app.listen(3000, () => console.log("server is running on port 3000"));
