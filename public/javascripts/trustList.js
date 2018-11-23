$(document).ready(function() {
    let trustFaces_cropImg = null;

    getCropImage();
    trustFace_DeleteListner();
    trustFace_UploadListner();

    function getCropImage() {
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

                        let cropImg = new Image();

                        cropImg.src = cropCanvs.toDataURL('image/png', 1.0);
                        cropImg.onload = function() {
                            trustFaces_cropImg = cropImg;
                        }
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
            if (trustFaces_cropImg) {

                let nameInput = $('#addNewFaceModel_nameInput');
                let descriptionInput = $('#addNewFaceModel_descriptionInput');
                let actionUrl = window.location.href + $('#addNewFaceModel_form').attr('action');

                let postFormData = new FormData();
                postFormData.append('name', nameInput);
                postFormData.append('description', descriptionInput);
                postFormData.append('image', trustFaces_cropImg);

                $.ajax({
                    url: 'http://35.237.140.171/trust/addFace',
                    type: 'POST',
                    cache: false,
                    data: { 'haha': '123' },
                    processData: false,
                    contentType: false,
                    success: function(res) {
                        console.log('success', res)
                    },
                    error: function(res) {
                        console.log('fail', res)
                    }
                });
            }
        })
    }
});