const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.set("port", port);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});