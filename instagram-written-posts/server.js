import { readFile } from "fs";
import { createServer } from "http";
import { join } from "path";

const __dirname = new URL(".", import.meta.url).pathname;

const server = createServer((req, res) => {
  // Set the content type to HTML
  res.setHeader("Content-Type", "text/html");

  // Read the index.html file
  readFile(join(__dirname, "index.html"), (err, data) => {
    if (err) {
      // If there was an error reading the file, return a 500 error
      res.writeHead(500);
      res.end(`Error loading index.html: ${err}`);
    } else {
      // If the file was read successfully, return it
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
