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
    // modelDatastore.list(KIND, (err, entities) => {
    //     if (err) {
    //         next(err);
    //         return;
    //     }

    //     let faceList = entities || null;
    //     console.log(entities)

    //     res.render("trustList", { faceList: faceList });
    // });

    console.log(router.io, router.socket)

    res.render("trustList", { faceList: null });
});
router.post(
    "/addFace",
    myImages.multer.single("image"),
    myImages.sendUploadToGCS,
    (req, res, next) => {

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
            res.json({ state: 0, msg: 'A new face is added!' })
            res.redirect('/trustList');
        });
    });

router.get("/deleteFace", (req, res, next) => {


    let id = req.query.id;

    modelDatastore.delete(KIND, id, (err) => {
        if (err) {
            next(err);
            return;
        }

        res.redirect('/trustList');
    });

});


module.exports = router;