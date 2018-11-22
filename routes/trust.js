const express = require("express");
const myImages = require("../lib/my-images");
const modelDatastore = require("../lib/model-datastore");

const router = express.Router();

const KIND = "TrustFace";

router.setSocketIo = function(socket, io) {
    router.io = io;
    router.socket = socket;
};

router.get("/", (req, res, next) => {
    modelDatastore.list(KIND, (err, entities) => {
        if (err) {
            next(err);
            return;
        }

        let faceList = entities || null;

        res.render("trustList", { faceList: faceList });
    });
});

// add a image to google cloud storage
router.post(
    "/addFace",
    myImages.multer.single("image"),
    myImages.sendUploadToGCS,
    (req, res, next) => {

        let data = req.body;

        if (req.file && req.file.cloudStoragePublicUrl) {
            console.log(123);
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

                res.redirect('/trustList');
            });
        });
    });


module.exports = router;