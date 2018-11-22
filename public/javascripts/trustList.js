$('#faceUpload').imageupload(null, function() {

    let image = $('.thumbnail:first')[0];
    console.log(image)

    // image.cropper({
    //     aspectRatio: 4 / 3,
    //     crop: function(event) {
    //         let x = event.detail.x;
    //         let y = event.detail.y;
    //         let width = event.detail.width;
    //         let height = event.detail.height;
    //         console.log(x, y, width, height)

    //     }
    // });
});

// let faceImg = $('#thumbnailImg');

// console.log(faceImg)

// faceImg.cropper({
//     aspectRatio: 4 / 3,
//     crop: function(event) {
//         let x = event.detail.x;
//         let y = event.detail.y;
//         let width = event.detail.width;
//         let height = event.detail.height;
//         console.log(x, y, width, height)
//             //imageTocanvas(x, y, width, height);
//     }
// });

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