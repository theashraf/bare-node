const { ServerResponse } = require("http");
const fs = require("fs");

class Response extends ServerResponse {
  send(data) {
    this.setHeader("Content-Types", "text/plain");
    this.statusCode = 200;
    this.write(data);
    this.end();
    return this;
  }

  json(data) {
    this.setHeader("Content-Types", "application/json");
    this.statusCode = 200;
    this.write(JSON.stringify(data));
    this.end();
    return this;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  sendFile(path) {
    this.setHeader("Content-Type", "text/html");
    this.statusCode = 200;
    const readStream = fs.createReadStream(path, { encoding: "utf8" });
    readStream.pipe(this);
  }

  redirect(path) {
    this.statusCode = 302;
    this.setHeader("Location", path);
    this.end();
  }
}

module.exports = Response;
