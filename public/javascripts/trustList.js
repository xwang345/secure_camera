$('#faceUpload').imageupload(null, function() {

    let $image = $('#image');

    var uploadedImage = new Image();
    let previewCanvas = $('#faceUploadCropPreview');
    let ctx = previewCanvas.getContext('2d');
    uploadedImage.src = $image.attr('src');

    $image.cropper({
        aspectRatio: 4 / 3,
        crop: function(event) {
            let x = event.detail.x;
            let y = event.detail.y;
            let width = event.detail.width;
            let height = event.detail.height;

            previewCanvas.width = uploadedImage.width;
            previewCanvas.height = uploadedImage.height;
            ctx.drawImage(uploadedImage, x, y, width, height, 0, 0, width, height);
        }
    });


});

$(".trustFaces__deleteBtn").each(function(index) {
    $(this).on('click', function() {
        let id = $(this).data('id');
        $("#deleteFaceModelInputId").attr('value', id);
    });
});