//Loads selected image and unencodes image bytes for Rekognition DetectFaces API

var compareBtn = document.getElementById("compareBtn");
var compareResult = document.getElementById("compareResult");
compareBtn.onclick = function() {
    ProcessImage();
}

function ProcessImage() {
    AnonLog();
    var control1 = document.getElementById("img1");
    var control2 = document.getElementById("img2");
    var file1 = control1.files[0];
    var file2 = control2.files[0];

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
                            let similarity = data.FaceMatches[0].Similarity;
                            if (similarity > 70) {
                                compareResult.innerText = 'Matched';
                            } else {
                                compareResult.innerText = 'Not Matched';
                            }
                        }
                    });
                };
            })(file2);
            reader2.readAsArrayBuffer(file2);
        };
    })(file1);
    reader1.readAsArrayBuffer(file1);
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