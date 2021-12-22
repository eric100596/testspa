// const http = require("http");
// const { request, response } = require("http");
// const server = http
//   .createServer((request, response) => {
//     if (request.url === "/status" && request.method === "GET") {
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.write(
//         JSON.stringify({ message: "Service healthy & THIS IS A TEST!!" })
//       );
//       response.end();
//     }
//   })
//   .listen(4040);

// console.log("Listening on port 4040");

const dotenv = require("dotenv");
// 'Import' the Express module instead of http
const express = require("express");
// Initialize the Express application
const app = express();

dotenv.config();

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(express.json());
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(
    JSON.stringify({ message: "Service healthy and THIS IS BEST!" })
  );
});

// app
// .route("/pizzas")
// .get((request, response) => {
//   response.send(
//     JSON.stringify({
//       size: "Large",
//       sauce: "Red",
//       toppings: ["Pepperoni"]
//    })
// );
//   })
// .post((request, response) => ) {
//   response.send(JSON.stringify({ message: "Success" }));
// });

app.route("/pizzas").get((request, response) => {
  response.send(
    JSON.stringify({
      size: "Large",
      sauce: "Red",
      toppings: ["Pepperoni"]
    })
  );
});
app.post("/pizzas/:id", (request, response) => {
  const id = request.params.id;
  response.status(418).json({
    message: "Success",
    pizzas_id: id
  });
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
