var addNewFaceModel_form = document.getElementById("addNewFaceModel_form");

let cropImageBinary = null;

getCropImage(function(result) {
    cropImageBinary = result;
});

trustFace_DeleteListner();
trustFace_UploadListner();

function getCropImage(cb) {
    $('#addNewFaceModel_faceUpload').imageupload(null, function() {

        let $image = $('#image');

        $image.cropper({
            aspectRatio: 4 / 3,
            crop: function(event) {
                let x = event.detail.x;
                let y = event.detail.y;
                let width = event.detail.width;
                let height = event.detail.height;

                let uploadedImage = new Image();
                let cropCanvs = document.createElement("canvas");

                let ctx = cropCanvs.getContext('2d');

                uploadedImage.src = $image.attr('src');

                uploadedImage.onload = function() {
                    cropCanvs.width = uploadedImage.width;
                    cropCanvs.height = uploadedImage.height;

                    ctx.drawImage(uploadedImage, x, y, width, height, 0, 0, width, height);

                    cropCanvs.toBlob((blob) => {
                        var reader = new FileReader();

                        reader.onloadend = function() {
                            cb(reader.result);
                        }

                        reader.readAsBinaryString(blob);
                    })
                }
            }
        });
    });
}




function trustFace_DeleteListner() {
    $(".trustFaces__deleteBtn").each(function(index) {
        $(this).on('click', function() {
            let id = $(this).data('id');
            $("#deleteFaceModelInputId").attr('value', id);
        });
    });
}

function trustFace_UploadListner() {
    $('#addNewFaceModel_submitBtn').on('click', function() {
        if (cropImageBinary) {

            let nameInput = $('#addNewFaceModel_nameInput').val();
            let descriptionInput = $('#addNewFaceModel_descriptionInput').val();

            let postData = {
                name: nameInput,
                description: descriptionInput,
                imgBinary: cropImageBinary
            }

            socket.emit('add face', postData);

            cropImageBinary = null;
        }
    })
}