# Simple Node framework

## what

- A simple node framework with zero dependency
- An Express like framework that implements the middleware pattern
- For demonstration purpose only, not for production (maybe later)

## why

To get the idea behind node frameworks specially express (the most popular node framework)

## How

- Middlewares handling is being implemented using the chain of responsibility pattern, check `lib/App.js` to see the implementaion details
- Extending the `http.ServerResponse` object functionality by adding some util method that make it easier to send response, it uses the builder pattern to build the response before sending it to the client, check `lib/Response.js`
- Adding `BodyParser` middleware that parse the request body by listening to the `http.IncommingMessage` on `data` event and keep concatinating the incomming buffer chunks until the `end` event fires, then it will call the next middleware after adding the `body` object to the `req` , so later we can access the body in our controllers the same way we access it in Express -> `req.body`
