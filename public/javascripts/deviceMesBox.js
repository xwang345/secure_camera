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
            let imgUrl = $(this).children("img:first").attr("src");

            $(imgShowId)
                .toggleClass("imgShowBox--close")
                .toggleClass("imgShowBox");

            $(imgShowId_ControlPanel + ':first')
                .children("img:first")
                .attr("src", imgUrl);

            detectFaces(imgUrl, function(result) {
                console.log(123);
                console.log(result);
            });
        });
    });
}