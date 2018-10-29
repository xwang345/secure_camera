var express = require('express');
var myImages = require('../lib/my-images');
var modelDatastore = require('../lib/model-datastore');

var router = express.Router();

/* GET home page. */
router.post('/add', myImages.multer.single('image'), myImages.sendUploadToGCS, (req, res, next) => {
    let data = req.body;

    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    modelDatastore.create(data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
});


module.exports = router;