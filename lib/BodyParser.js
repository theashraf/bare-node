class BodyParser {
  json(req, res, next) {
    if (req.headers["Content-Type"] === "application/json") {
      let body = "";
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        req.body = JSON.parse(body);
        next();
      });
    } else {
      next();
    }
  }
}

module.exports = new BodyParser();
