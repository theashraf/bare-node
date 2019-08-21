const { createServer } = require("http");
const Response = require("./Response");
const bodyParser = require("./BodyParser");

class App {
  constructor() {
    this.middleware = [];

    this.middleware.push({ url: "*", method: "POST", fn: bodyParser.json });

    this.server = createServer({ ServerResponse: Response }, (req, res) => {
      this.middleware[0].fn(req, res, () => this.runMiddleware(req, res, 1));
    });
  }

  use(url, fn) {
    this.middleware.push({
      url,
      method: "*",
      fn
    });
  }

  get(url, fn) {
    this.middleware.push({ url, method: "GET", fn });
  }

  post(url, fn) {
    this.middleware.push({ url, method: "POST", fn });
  }

  runMiddleware(req, res, i) {
    if (
      typeof this.middleware[i].fn === "function" &&
      (this.middleware[i].method === req.method ||
        this.middleware[i].method === "*") &&
      (req.url === this.middleware[i].url || this.middleware[i].url === "*")
    ) {
      this.middleware[i].fn(req, res, () =>
        this.runMiddleware(req, res, i + 1)
      );
      return;
    }

    if (typeof this.middleware[i + 1].fn === "function") {
      this.runMiddleware(req, res, i + 1);
      return;
    }
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }

  close() {
    return this.server.close();
  }

  on(event, cb) {
    this.server.on(event, cb);
  }
}

module.exports = App;
