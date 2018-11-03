var express = require('express');
var myImages = require('../lib/my-images');
var modelDatastore = require('../lib/model-datastore');
var ioListener = require('../lib/ioListener');

var router = express.Router();

router.socket = function(socket, io) {
    ioListener.initialize(socket, io);
}

// add a image to google cloud storage
router.post('/add', myImages.multer.single('image'), myImages.sendUploadToGCS, (req, res, next) => {
    let data = req.body;

    data.time = new Date();

    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    modelDatastore.create(data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }

        res.redirect(`${req.baseUrl}/loadAll`)

    });
});

router.get('/loadAll', (req, res, next) => {
    modelDatastore.list((err, entities) => {
        if (err) {
            next(err);
            return;
        }

        io.emit('reload images', entities);

        res.redirect('/uploadImg');
    })
});

module.exports = router;