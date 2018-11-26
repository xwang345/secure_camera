var addNewFaceModel_form = document.getElementById("addNewFaceModel_form");
var addNewFaceModel_submitBtn = $("#addNewFaceModel_submitBtn");

let cropImageBinary = null;

getCropImage(function(result) {
    cropImageBinary = result;
});

trustFace_DeleteListner();

addNewFaceModel_submitBtn.on('click', function() {

    if (cropImageBinary) {
        sendData(cropImageBinary);
    }
});

function sendData(cropImageBinary) {
    let name = $('#addNewFaceModel_nameInput')[0];
    let description = $('#addNewFaceModel_descriptionInput')[0];

    let file = {
        filename: new Date() + name.value,
        binary: cropImageBinary
    };

    // 我们需要一个XMLHttpRequest 实例
    let XHR = new XMLHttpRequest();

    // 我们需要一个分隔符来定义请求的每一部分。
    let boundary = "blob";

    // 将我们的请求主体存储于一个字符串中
    let data = "";

    // 所以，如果用户已经选择了一个文件

    // 在请求体中开始新的一部分
    data += "--" + boundary + "\r\n";

    // 把它描述成表单数据
    data += 'content-disposition: form-data; '
        // 定义表单数据的名称
        +
        'name="image"; '
        // 提供文件的真实名字
        +
        'filename="' + file.filename + '"\r\n';
    // 和文件的MIME类型
    data += 'Content-Type: ' + 'image/png' + '\r\n';

    // 元数据和数据之间有一条空行。
    data += '\r\n';

    // 添加二进制数据到请求体中
    data += file.binary + '\r\n';


    // 文本数据是简单的
    // 开始一个新的部分在请求体中
    data += "--" + boundary + "\r\n";

    // 说它是表单数据，并命名它
    data += 'content-disposition: form-data; name="' + name.name + '"\r\n';
    // 元数据和数据之间有一条空行。
    data += '\r\n';

    // 添加文本数据到请求体中
    data += name.value + "\r\n";

    data += "--" + boundary + "\r\n";

    // 说它是表单数据，并命名它
    data += 'content-disposition: form-data; name="' + description.name + '"\r\n';
    // 元数据和数据之间有一条空行。
    data += '\r\n';

    // 添加文本数据到请求体中
    data += description.value + "\r\n";

    // 一旦完成，关闭请求体
    data += "--" + boundary + "--";

    console.log(data)

    // 定义成功提交数据执行的语句
    XHR.addEventListener('load', function(event) {
        alert('success');
    });

    // 定义发生错误时做的事
    XHR.addEventListener('error', function(event) {
        alert('error');
    });

    // 建立请求
    XHR.open('POST', 'http://35.237.140.171/trust/addFace');

    // 添加需要的HTTP报头来处理多部分表单数据POST请求
    XHR.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
    // 最后，发送数据。
    XHR.send(data);
}

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

// function trustFace_UploadListner() {
//     $('#addNewFaceModel_submitBtn').on('click', function() {
//         if (trustFaces_cropImg) {

//             let nameInput = $('#addNewFaceModel_nameInput').val();
//             let descriptionInput = $('#addNewFaceModel_descriptionInput').val();

//             let postData = {
//                 name: nameInput,
//                 description: descriptionInput,
//                 //imageSrc: trustFaces_cropImg.src
//             }

//             socket.emit('add face', postData);


//             trustFaces_cropImg = null;
//         }
//     })
// }