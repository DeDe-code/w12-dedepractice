const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 9000;

app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.get("/images", (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/images.json`));
});

app.post("/upload", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.image;
  const newData = {
    id: 0,
    url: `/${req.body.title}.jpg`,
    title: req.body.title,
    uploadDate: "2022. 11. 12.",
    phName: req.body.phName,
  };
  uploadPath = `${__dirname}/../frontend/public/img/${req.body.title}.jpg`;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    fs.readFile(`${__dirname}/data/images.json`, (err, data) => {
      if (err) return res.status(500).send(err);

      let imagesData = JSON.parse(data);
      newData.id = imagesData[imagesData.length - 1].id + 1;

      imagesData.push(newData);

      fs.writeFile(
        `${__dirname}/data/images.json`,
        JSON.stringify(imagesData, null, 2),
        (err) => {
          if (err) return res.status(500).send(err);
          console.log("the file has been saved");
          res.json(newData);
        }
      );
    });
  });
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
