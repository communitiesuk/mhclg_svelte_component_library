# Tile server

Set up tile-server to serve the tiles locally

Make a server.cjs file that looks like this:

```javascript
const express = require("express");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const cors = require("cors");

const app = express();
const PORT = 8080;
const TILE_DIR = path.join(__dirname, "tiles-with-imd-data"); // your z/x/y.pbf folder

app.use(cors()); // Enables CORS for all routes

// Set correct headers for .pbf files
app.get("/:z/:x/:y.pbf", (req, res) => {
  const { z, x, y } = req.params;
  const tilePath = path.join(TILE_DIR, z, x, `${y}.pbf`);

  if (!fs.existsSync(tilePath)) {
    return res.status(404).send("Tile not found");
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/x-protobuf");
  res.setHeader("Content-Encoding", "gzip");

  fs.createReadStream(tilePath).pipe(res);
});

// Optional: serve an index or static frontend here

app.listen(PORT, () => {
  console.log(`Tile server running at http://localhost:${PORT}/`);
});
```

Then from the terminal run:

```console
node server.cjs
```
