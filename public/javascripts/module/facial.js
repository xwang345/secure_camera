function compareFaces(file1, file2) {
    AnonLog();

    // Load base64 encoded image for display 
    var reader1 = new FileReader();
    reader1.onload = (function(theFile) {
        return function(e1) {
            // Load base64 encoded image for display 
            var reader2 = new FileReader();
            reader2.onload = (function(theFile) {
                return function(e2) {
                    //Call Rekognition  
                    AWS.region = "us-east-2";
                    var rekognition = new AWS.Rekognition();
                    var params = {
                        SourceImage: {
                            Bytes: e1.target.result
                        },
                        TargetImage: {
                            Bytes: e2.target.result
                        },
                        SimilarityThreshold: 0.0
                    };
                    rekognition.compareFaces(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else {
                            return data.FaceMatches[0].Similarity;
                        }
                    });
                };
            })(file2);
            reader2.readAsArrayBuffer(file2);
        };
    })(file1);
    reader1.readAsArrayBuffer(file1);
}

function detectFaces(imageUrl, cb) {
    AnonLog();

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var url = URL.createObjectURL(this.response);
        var img = new Image();
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        img.src = url;
        img.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);

            console.log(canvas);
            URL.revokeObjectURL(url);
        };

    };
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr.send();

    // let image = new Image();
    // image.src = imageUrl;

    // let canvas = document.createElement("canvas");
    // let ctx = canvas.getContext('2d');

    // image.onload = function() {

    //     canvas.width = image.width;
    //     canvas.height = image.height;

    //     ctx.drawImage(image, 0, 0);

    //     console.log(canvas);

    //     canvas.toBlob((blob) => {
    //         console.log(12345)

    //         var reader = new FileReader();

    //         reader.onloadend = function() {
    //             return function(e) {

    //                 AWS.region = "us-east-2";
    //                 var rekognition = new AWS.Rekognition();
    //                 var params = {
    //                     Image: {
    //                         Bytes: e.target.result
    //                     }
    //                 };

    //                 rekognition.detectFaces(params, function(err, data) {
    //                     if (err) console.log(err, err.stack); // an error occurred
    //                     else {
    //                         cb(data);
    //                     }
    //                 });
    //             };
    //         }

    //         reader.readAsArrayBuffer(blob);
    //     })
    // }
}



//Provides anonymous log on to AWS services
function AnonLog() {

    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'us-east-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:eaa573bd-b153-4088-8a64-384862359380',
    });
    // Make the call to obtain credentials
    AWS.config.credentials.get(function() {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
    });
}

function dataURLToBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}