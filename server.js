const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (req.files === null) {
    console.log("no file uploaded");
  }
  const file = req.files.file;
  file.mv(`${__dirname}/public/${file.name}`, (err) => {
    if (err) {
      console.log(err);
    }
    res.json({ filename: file.name, filePath: `/public/${file.name}` });
  });
});

app.listen(3001, () => {
  console.log("server running at 3001");
});
