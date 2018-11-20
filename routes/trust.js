const express = require("express");
const myImages = require("../lib/my-images");
const modelDatastore = require("../lib/model-datastore");

const router = express.Router();

const KIND = "trustFace";

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;
};

// add a image to google cloud storage
router.post("/addFace", myImages.multer.single("image"), myImages.sendUploadToGCS, (req, res, next) => {
    let data = req.body;

    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
    }

    // Save the data to the database.
    modelDatastore.create(KIND, data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }

        modelDatastore.list(KIND, (err, entities) => {
            if (err) {
                next(err);
                return;
            }

            console.log(entities)

            res.end();
        });
    });
});

router.get("/loadAll", (req, res, next) => {
    modelDatastore.list(KIND, (err, entities) => {
        if (err) {
            next(err);
            return;
        }

        console.log(entities)

        res.end();
    });
});


module.exports = router;