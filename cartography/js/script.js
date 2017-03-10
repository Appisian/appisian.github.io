// Open popup
$('.open_popup').click(function() {
    var popup_id = $(this).attr('data-popup-id')
    $('#'+popup_id).fadeIn()
})
$('.close_popup').click(function(){
    var popup_id = $(this).parents(".popup").attr('id')
    $('#'+popup_id).fadeOut()
})

// GO button
$('.button_launch').on('click', function() {

    $(".launch").addClass('animated fadeOutUp')

    setTimeout(function () {
        $(".main").css("display","flex")
        $("#Calque_5").css("animation-play-state","running")

        // SVG animation drawing, markers, filter, sitography and article
        setTimeout(function () {
            myPath.attr({
                stroke: '#fff',
                strokeWidth: 18,
                fill: 'none',
                // Draw Path
                "stroke-dasharray": lenB + " " + lenB,
                "stroke-dashoffset": lenB
            }).animate({"stroke-dashoffset": 10}, 2500,mina.easeinout, function(){
                createAllMarkers()
                $(".filter, .sitography_btn, .download_btn").addClass("animated fadeInLeft")
                $(".credits").addClass("animated fadeInUp")
                $(".article").addClass("animated fadeInRight")
                // Default we show the first article
                showArticle(arrayMarkers.length-1)
                $(".year").html(splitY(arrayMarkers[arrayMarkers.length-1].article_date))
                $(".month").html(splitDM(arrayMarkers[arrayMarkers.length-1].article_date))
                $(".date_wrapper").animate({
                    display: "flex",
                    opacity: 1
                }, 400, function() {
                    $(".month").addClass("animated fadeInDown")
                    $(".year").addClass("animated fadeInUp")

                    rinitDisappear = setTimeout(function () {
                        animatedDate()
                    }, 2000)

                });
            })
        }, 1000)
    }, 2000)

    var lenB = myPath.getTotalLength();
});


$('.filter>ul').on('click', ".filter-cate", filter) // bubbling for trigger event on generated elements

// Onclick marker
var moveToX, moveToY
$(document).on('click', ".markers", function() {

    $('.markers').removeClass('marker_clicked')
        .attr("data-active","")
        // .removeAttribute("data-active")
    $(this).addClass('marker_clicked')
    $(this).attr("data-active","actived")
    //show text

    moveToX = Math.round($(this).attr('cx'))
    moveToY = Math.round($(this).attr('cy'))

    var user_g_x = Math.round(circleA.attr("cx"))
    var user_g_y = Math.round(circleA.attr("cy"))
    for(var i = 0; i <  2000; i++){
        var phase1 = (i / 2000);
        var point1 = mainPath.getPointAtLength(2000 * phase1);

        if((user_g_x >=  Math.round(point1.x) - 1 && user_g_x <=  Math.round(point1.x) + 1) &&  (user_g_y >=  Math.round(point1.y) -1 && user_g_y <=  Math.round(point1.y) + 1)){
            posUser = i
        }
        if(( Math.round(moveToX) >=  Math.round(point1.x) - 1 &&  Math.round(moveToX) <=  Math.round(point1.x) + 1) &&  (Math.round(moveToY) >=  Math.round(point1.y) -1 && Math.round(moveToY) <=  Math.round(point1.y) + 1)){
            posTarget = i
        }

    }

    clicked = true
})
