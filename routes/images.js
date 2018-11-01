var express = require('express');
var myImages = require('../lib/my-images');
var socketIo = require('socket.io');
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

        socketIo.on('connection', function(socket) {
            console.log('1234');
        });
        res.redirect('/')

    });
});

/**
 * GET /books/:id
 *
 * Display a book.
 */
router.get('/:image', (req, res, next) => {
    modelDatastore.read(req.params.image, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        console.log(entity.imageUrl)
        res.render('view.ejs', {
            image: entity
        });
    });
});


module.exports = router;