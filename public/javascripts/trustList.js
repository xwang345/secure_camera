$('#faceUpload').imageupload(null, function() {

    let $image = $('#image');

    $image.cropper({
        aspectRatio: 4 / 3,
        crop: function(event) {
            let x = event.detail.x;
            let y = event.detail.y;
            let width = event.detail.width;
            let height = event.detail.height;

            $('input[name="imageCropValue_x"]').attr("value", x);
            $('input[name="imageCropValue_y"]').attr("value", y);
            $('input[name="imageCropValue_width"]').attr("value", width);
            $('input[name="imageCropValue_height"]').attr("value", height);

        }
    });
});



// function imageTocanvas(x, y, width, height) {

//     var canvas = document.getElementById('myCanvas');
//     var c = canvas.getContext('2d');

//     var img = new Image();
//     img.src = "testImg.png";


//     img.onload = function() {
//         canvas.width = width;
//         canvas.height = height;

//         c.drawImage(img, x, y, width, height, 0, 0, width, height);
//     }
// }