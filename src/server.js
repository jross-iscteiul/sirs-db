const app = require("./app");
const https = require("https");
var http = require("http");
const fs = require("fs");

const key = fs.readFileSync("./key.pem", "utf-8");
const cert = fs.readFileSync("./cert.pem", "utf-8");
const options = {
  key: key,
  cert: cert,
};

/* var httpServer = http.createServer(app); */
const server = https.createServer(options, app);

server.listen(3000, () => {
  console.log("server starting on port : " + 3000);
});

//teste
