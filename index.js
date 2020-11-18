const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000
const fs = require('fs');


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('public'));

// Require the image filenames, store them in an array
    const imageFolder = './public/images/';
    const imageFileNames = [];
    fs.readdirSync(imageFolder).forEach(file => imageFileNames.push(file));
    console.log(imageFileNames);

    if (imageFileNames.includes('anklyosaurus'+'.png')) {
        console.log('YES!!!!!!!!!!!!!!!!!!!!!!!!!!');
    };

// Array with image filenames
app.get('/array', function (req, res) {
    res.send(imageFileNames);
});

