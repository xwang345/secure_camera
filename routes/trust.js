const express = require("express");
const { createCanvas, loadImage } = require('canvas')
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

        let reqData = req.body;
        let data = {};
        data.name = reqData.name;
        data.description = reqData.description;

        if (req.file && req.file.cloudStoragePublicUrl) {

            loadImage(req.file.cloudStoragePublicUrl).then((image) => {
                const canvas = createCanvas(reqData.width, reqData.height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, reqData.x, reqData.y, reqData.width, reqData.height, 0, 0, reqData.width, reqData.height);
                console.log(canvas.toDataURL())
                data.imageUrl = canvas.toDataURL();
            })
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