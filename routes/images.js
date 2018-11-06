var express = require('express');
var myImages = require('../lib/my-images');
var modelDatastore = require('../lib/model-datastore');

var router = express.Router();

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;

}

// add a image to google cloud storage
router.post('/add', myImages.multer.single('image'), myImages.sendUploadToGCS, (req, res, next) => {
    let data = req.body;

    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    modelDatastore.create(data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }

        // res.redirect(`${req.baseUrl}/loadAll`)

        modelDatastore.list((err, entities) => {
            if (err) {
                next(err);
                return;
            }

            if (router.io) {
                console.log('reload images');
                router.io.emit('reload images', entities);
                res.json({ result: 'success' });
            } else {
                res.json({ result: 'fail' });
            }

            res.end();
        })

    });
});

router.get('/loadAll', (req, res, next) => {
    modelDatastore.list((err, entities) => {
        if (err) {
            next(err);
            return;
        }

        if (router.io) {
            console.log('reload images');
            router.io.emit('reload images', entities);
            res.json({ result: 'success' });
        } else {
            res.json({ result: 'fail' });
        }

        res.end();
    })
});

module.exports = router;