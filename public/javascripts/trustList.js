$('#faceUpload').imageupload(null, function() {

    let $image = $('#image');

    $image.cropper({
        aspectRatio: 4 / 3,
        crop: function(event) {
            let x = event.detail.x;
            let y = event.detail.y;
            let width = event.detail.width;
            let height = event.detail.height;

        }
    });
});

$(".trustFaces__deleteBtn").each((index) {
    $(this).on('click', () => {
        let id = $(this).data('id');
        $("#deleteFaceModelInputId").attr('value', id);
    })
})