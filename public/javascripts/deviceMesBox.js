$("#imgShowBoxId .closeBtn:first").click(function() {
    $("#imgShowBoxId")
        .toggleClass("imgShowBox--close")
        .toggleClass("imgShowBox");
});

socket.on("reload images", function(entities) {
    loadImages(entities);
    if ($("#deviceMesBox").css("width") == "0px") {
        $("#deviceBtnMesCount").css("opacity", 1);
        let num = Number($("#deviceBtnMesCount .mesCount__number:first").text());
        $("#deviceBtnMesCount .mesCount__number:first").html(++num);
    }
});

socket.on("load images", function(entities) {
    loadImages(entities);
});


function loadImages(entities) {
    var content = "";

    entities.forEach(e => {
        var eTime = new Date(e.time);

        var imgElement = `
                <div class="deviceMesBox__imgElement">
                    <span class="deviceMesBox__imgTime">
                      ${eTime.toLocaleString()}
                    </span>
                    <img src=${e.imageUrl} alt="Snapshot" />
                </div>
            `;

        content += imgElement;
    });

    $(".deviceMesBox__mesWindow:first").html(content);

    ImageEventListener(".deviceMesBox__imgElement", "#imgShowBoxId", ".imgShowBox__imgContainer");
}

function ImageEventListener(imgEleClass, imgShowId, imgShowBox__imgContainer) {

    $(imgEleClass).each(function(index) {
        $(this).click(function() {
            let trustFacesObj = {
                faceList: null,
                faceInSnapshot: null

            };

            $('#imgShowBoxFaceDetectPanel').html('');
            $('.imgShowBox__imgBoundingBox').css('opacity', 0)

            let imgUrl = $(this).children("img:first").attr("src");

            $(imgShowId)
                .toggleClass("imgShowBox--close")
                .toggleClass("imgShowBox");

            $(imgShowBox__imgContainer + ':first')
                .children("img:first")
                .attr("src", imgUrl);

            socket.emit('request trustFaces');
            socket.on('get trustFaces', function(faceList) {
                if (trustFacesObj.faceList === null) {
                    trustFacesObj.faceList = faceList;

                    faceList.forEach((element, index, array) => {
                        compareFaces(element.url, imgUrl, function(result) {

                            if (!result) {
                                $('#imgShowBoxFaceDetectPanel').html(`
                                    <p style="color: red; ">There is not any trust face!</p>
                                `);
                            } else {

                                if (!trustFacesObj.faceInSnapshot) {
                                    trustFacesObj.faceInSnapshot = {}
                                    result.FaceMatches.forEach(e => {
                                        let snapBoundingBox = e.Face.BoundingBox
                                        let snapshotId = "" +
                                            'Width:' + snapBoundingBox.Width.toFixed(2) +
                                            'Height:' + snapBoundingBox.Height.toFixed(2) +
                                            'Top:' + snapBoundingBox.Top.toFixed(2) +
                                            'Left:' + snapBoundingBox.Left.toFixed(2) +
                                            "";

                                        trustFacesObj.faceInSnapshot[snapshotId] = e;
                                    })
                                }
                                let firstFace = result.FaceMatches[0];
                                let firstFaceBoundingBox = firstFace.Face.BoundingBox;
                                let firstFaceId = "" +
                                    'Width:' + firstFaceBoundingBox.Width.toFixed(2) +
                                    'Height:' + firstFaceBoundingBox.Height.toFixed(2) +
                                    'Top:' + firstFaceBoundingBox.Top.toFixed(2) +
                                    'Left:' + firstFaceBoundingBox.Left.toFixed(2) +
                                    "";
                                let similarity = firstFace.Similarity;
                                if (similarity >= 75) {

                                    if (similarity >= trustFacesObj.faceInSnapshot[firstFaceId].Similarity) {
                                        trustFacesObj.faceInSnapshot[firstFaceId] = firstFace;
                                    }
                                    let faceCardId = element.name.replace(/\s+/g, "") + Date.now().toString();
                                    let oldHtml = $('#imgShowBoxFaceDetectPanel').html();
                                    let newHtml = oldHtml + `
                                        <div id="imgShowBoxFaceDetectCard_${faceCardId}" class="card bg-success text-white imgShowBox__faceDetectCard" style="width: 18rem;">
                                            <div class="card-body">
                                                <h5 class="card-title">${element.name}</h5>
                                                <p class="card-text">${element.description}</p>
                                            </div>
                                        </div>
                                    `;
                                    $('#imgShowBoxFaceDetectPanel').html(newHtml)
                                    faceDetectCardEventListener(`#imgShowBoxFaceDetectCard_${faceCardId}`, firstFace);
                                }

                                if (index === array.length - 1) {
                                    Object.keys(trustFacesObj.faceInSnapshot).forEach(key => {
                                        console.log(trustFacesObj.faceInSnapshot[key])
                                        if (trustFacesObj.faceInSnapshot[key].Similarity < 75) {
                                            console.log('-----')
                                            let faceCardId = Date.now().toString() + Math.floor(Math.random(10000)).toString();
                                            let oldHtml = $('#imgShowBoxFaceDetectPanel').html();
                                            let newHtml = oldHtml + `
                                            <div id="imgShowBoxFaceDetectCard_unknown_${faceCardId}" class="card bg-danger text-white imgShowBox__faceDetectCard" style="width: 18rem;">
                                                <div class="card-body">
                                                    <h5 class="card-title">Unknown Face</h5>
                                                </div>
                                            </div>
                                            `;
                                            $('#imgShowBoxFaceDetectPanel').html(newHtml)
                                            faceDetectCardEventListener(`#imgShowBoxFaceDetectCard_unknown_${faceCardId}`, trustFacesObj.faceInSnapshot[key], 'red');
                                        }
                                    })
                                }

                            }

                        })
                    });
                }
            })
        });
    });
}

function faceDetectCardEventListener(faceDetectCardId, data, color) {
    $(faceDetectCardId).click(function() {
        console.log(123)
        let imageElement = $('.imgShowBox__img:first');
        let boundingBox = data.Face.BoundingBox;
        let imgShowBoxBoundingBox = $('.imgShowBox__imgBoundingBox');

        color = color || 'yellow';

        imgShowBoxBoundingBox
            .css('width', Math.round(boundingBox.Width * imageElement.width()) + 'px')
            .css('height', Math.round(boundingBox.Height * imageElement.height()) + 'px')
            .css('top', Math.round(boundingBox.Top * imageElement.height()) + 'px')
            .css('left', Math.round(boundingBox.Left * imageElement.width()) + 'px')
            .css('border-color', color)
            .css('opacity', 1);
    })
}