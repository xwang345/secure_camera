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
                arr: null,
                matched: false
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
                if (trustFacesObj.arr === null) {
                    trustFacesObj.arr = faceList;

                    faceList.forEach((element, index, array) => {
                        compareFaces(element.url, imgUrl, function(result) {
                            console.log(result)
                            if (!result) {
                                $('#imgShowBoxFaceDetectPanel').html(`
                                    <p style="color: red; ">There is not any trust face!</p>
                                `);
                            }

                            let similarity = result.FaceMatches[0].Similarity;
                            if (similarity > 75) {
                                trustFacesObj.matched = true;
                                let oldHtml = $('#imgShowBoxFaceDetectPanel').html();
                                let newHtml = oldHtml + `
                                <div id="imgShowBoxFaceDetectCard${element.name}${index}" class="card bg-success text-white imgShowBox__faceDetectCard" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element.name}</h5>
                                        <p class="card-text">${element.description}</p>
                                    </div>
                                </div>
                                `;
                                $('#imgShowBoxFaceDetectPanel').html(newHtml)
                                faceDetectCardEventListener(`#imgShowBoxFaceDetectCard${element.name}${index}`, result);
                            }

                            if (index === array.length - 1 && trustFacesObj.matched === false) {
                                let oldHtml = $('#imgShowBoxFaceDetectPanel').html();
                                let newHtml = oldHtml + `
                                <div id="imgShowBoxFaceDetectCard_unknown_${index}" class="card bg-success text-white imgShowBox__faceDetectCard" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">Unknown Face</h5>
                                    </div>
                                </div>
                                `;
                                $('#imgShowBoxFaceDetectPanel').html(newHtml)
                                faceDetectCardEventListener(`#imgShowBoxFaceDetectCard_unknown_${index}`, result);
                            }

                        })
                    })
                }
            })
        });
    });
}

function faceDetectCardEventListener(faceDetectCardId, data) {
    $(faceDetectCardId).click(function() {
        let imageElement = $('.imgShowBox__img:first');
        let boundingBox = data.FaceMatches[0].Face.BoundingBox;
        let imgShowBoxBoundingBox = $('.imgShowBox__imgBoundingBox')
        imgShowBoxBoundingBox
            .css('width', Math.round(boundingBox.Width * imageElement.width()) + 'px')
            .css('height', Math.round(boundingBox.Height * imageElement.height()) + 'px')
            .css('top', Math.round(boundingBox.Top * imageElement.height()) + 'px')
            .css('left', Math.round(boundingBox.Left * imageElement.width()) + 'px')
            .css('opacity', 1)
    })
}