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

    ImageEventListener(".deviceMesBox__imgElement", "#imgShowBoxId", ".imgShowBox__controlPanel");
}

function ImageEventListener(imgEleClass, imgShowId, imgShowId_ControlPanel) {

    $(imgEleClass).each(function(index) {
        $(this).click(function() {
            let trustFacesObj = {
                arr: null
            };

            let imgUrl = $(this).children("img:first").attr("src");

            $(imgShowId)
                .toggleClass("imgShowBox--close")
                .toggleClass("imgShowBox");

            $(imgShowId_ControlPanel + ':first')
                .children("img:first")
                .attr("src", imgUrl);

            socket.emit('request trustFaces');
            socket.on('get trustFaces', function(faceList) {
                if (trustFacesObj.arr === null) {
                    trustFacesObj.arr = faceList;

                    faceList.forEach((element) => {
                        compareFaces(element.url, imgUrl, function(result) {
                            let similarity = result.FaceMatches[0].Similarity;
                            console.log(result)
                            if (similarity > 75) {
                                let oldHtml = $('#imgShowBoxFaceDetectPanel').html();
                                let newHtml = oldHtml + `
                                <div class="card imgShowBox__faceDetectCard" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${element.name}</h5>
                                        <p class="card-text">${element.description}</p>
                                    </div>
                                </div>
                                `;

                                $('#imgShowBoxFaceDetectPanel').html(newHtml)
                            }

                        })
                    })
                }
            })
        });
    });
}