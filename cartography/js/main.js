// SVG Path
var s = Snap("#Calque_5");
var myPath = s.path("M1840.1,876l-32-23.2c-7-5-16.3-5.4-23.6-0.9l-66.3,40.5c-6.2,3.8-14,4.2-20.6,0.9l-195.3-96.4 c-15.6-7.7-15.9-29.7-0.6-37.9l181.6-97.3c14.8-7.9,15.1-28.9,0.6-37.3l-41.5-23.9c-14.1-8.1-14.3-28.3-0.4-36.7l89.6-54.4 c14.3-8.7,13.5-29.6-1.4-37.2l-204.7-104.8c-15.1-7.7-15.6-29-0.9-37.5l136.7-78.8c14.8-8.5,14.1-30.2-1.3-37.7l-187.4-91 c-15.9-7.7-16-30.4-0.2-38.3l123.3-61.6").attr({
    id: "path",
    fill: "none",
    strokeWidth: "0",
    stroke: "#ffffff",
    strokeMiterLimit: "10",
    strokeDasharray: "9 9",
    strokeLinecap: "round",
    strokeLinejoin:"round",
    strokeMiterlimit: "10",
    strokeDashOffset: "988.01"
});
var mainPath = myPath
var len = mainPath.getTotalLength()
var departurePoint =  mainPath.getPointAtLength(len)
var x = 1000

// SVG elements
var arrayMarkers = []
var circleA, circleB, g_user
var clicked = false

var startingPointA = Snap.path.getPointAtLength(mainPath, 0);
var pt = s.node.createSVGPoint();

// Variables to make appear the article date
var currentArticleID, rinitDisappear, lastValue

// Displaying categories from JSON
for (var i = 0; i < data_categories.length; i++) {
    $('.filter ul').append('<li data-cate="'+ data_categories[i].id +'" class="filter-cate"><div class="radio"></div>' + data_categories[i].name + '</li>')
}

// Displaying sitographies from JSON
for (var i = 0; i < data_sitography.length; i++) {
    data_sitography[i]
    $('#sitography_popup ul').append('<li>'+ data_sitography[i].text + '<br> <a href="' + data_sitography[i].link + '" class="link" target="_blank">'+ data_sitography[i].link + '</a></li>')
}

// Get data from JSON and display
function showArticle(id) {
    var title = $('.title_article')
    var date = $('.date_article')
    var img = $('.img_article img')
    var content = $('.content_article')
    var link = $('.button_read')
    img.attr('src',data_articles[id].img_link)
    title.html(data_articles[id].title)
    content.html(data_articles[id].text)
    date.html(data_articles[id].date)
    link.attr('href', data_articles[id].link)
}

// If in a certain radius of g_user / collision
function inRadius(dx, dy){


    for(var i = 0; i < arrayMarkers.length; i++){

        var artx = arrayMarkers[i].x
        var arty = arrayMarkers[i].y

        if((dx >= artx - 20 && dx <= artx + 20) && (dy >= arty -20 && dy <= arty + 20)){
          var display_marker = $('ellipse#'+arrayMarkers[i].article_id).css('display')
            if(currentArticleID != arrayMarkers[i].article_id && display_marker!="none" ){
                clearTimeout(rinitDisappear)
                lastValue = rinitDisappear

                $(".article").removeClass("fadeInRight")
                    .addClass("fadeOutRight")

                var articleIdentifier = arrayMarkers[i].article_id

                // Articles animation
                setTimeout(function () {
                    showArticle(articleIdentifier)
                    $(".article").removeClass("fadeOutRight")
                        .addClass("fadeInRight")
                }, 1000)

                currentArticleID = arrayMarkers[i].article_id

                $(".year").html(splitY(arrayMarkers[i].article_date))
                $(".month").html(splitDM(arrayMarkers[i].article_date))

                $(".month, .year").removeClass("fadeOutUp")
                    .removeClass("fadeOutDown")

                // Date animation
                if(!$(".month, .year").hasClass("animated")){
                    $(".date_wrapper").animate({
                        display: "flex",
                        opacity: 1
                    }, 400, function() {
                        $(".month").addClass("animated fadeInDown")
                        $(".year").addClass("animated fadeInUp")
                    });
                }

            } else {

                // Refresh time call
                if(rinitDisappear === lastValue){
                    rinitDisappear = setTimeout(function () {
                        animatedDate()
                    }, 2000)
                }
            }

        }


    }

}

// Animation date
function animatedDate() {
    $(".month").addClass("animated fadeOutUp")
    $(".year").addClass("animated fadeOutDown")
    $(".date_wrapper").animate({
        opacity: 0
    }, 400, function(){
        $(".year, .month").removeClass("animated")
            .removeClass("fadeInDown")
            .removeClass("fadeOutDown")
            .removeClass("fadeOutUp")
            .removeClass("fadeInUp")
    })
}

// Split Month / Day
function splitDM(string){
    var s = string.split(" ")

    return s[0] + " " + s[1]
}

// Split Year
function splitY(string){
    var s = string.split(" ")

    return s[2]
}


// Init all markers on SVG
function createAllMarkers() {
    // include g_user

    // Set article markers
    for(var i = 0; i < data_articles.length; i++){
        var getPoint =  mainPath.getPointAtLength(len / (data_articles.length-1) * i)

        var article_marker = {
            x: getPoint.x,
            y: getPoint.y,
            article_id: data_articles[i].id,
            article_date: data_articles[i].date,
            category: data_articles[i].category
        }

        arrayMarkers.push(article_marker)
        currentArticleID = arrayMarkers.length-1
    }


    // Draw article markers

    for(var i = 0; i < arrayMarkers.length; i++) {
        // add catégorie

        var article_circle = s.ellipse(arrayMarkers[i].x, arrayMarkers[i].y, 0, 0)
            .attr({
                fill: "#33FFCC",
                class: "markers",
                fillOpacity: "1"
            })

        article_circle.animate({rx: 15, ry: 10}, 500,mina.easeout);
        article_circle.node.id = arrayMarkers[i].article_id
        article_circle.node.className = "dot-marker"
        article_circle.node.setAttribute("data-cate", arrayMarkers[i].category )
    }



    // var circleA = s.circle(departurePoint.x, departurePoint.y, 50)
    circleA = s.ellipse(departurePoint.x, departurePoint.y, 30, 15)
        .attr({
            fill: "#4890FF",
            fillOpacity: "0"
        })
    circleA.node.id = 'marker'

    circleB = s.ellipse(departurePoint.x, departurePoint.y, 50, 25)
        .attr({
            fill: "#4890FF",
            fillOpacity: "0"
        })

    circleA.animate({fillOpacity: "1"}, 500, mina.easeout);
    circleB.animate({fillOpacity: ".2"}, 500, mina.easeout);

    setInterval(animatePulseCircleA, 2000);
    setInterval(animatePulseCircleB, 1000);



    g_user = s.g(circleA, circleB);

    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

    if (document.attachEvent) //if IE (and Opera depending on user setting)
        document.attachEvent("on"+mousewheelevt, displaywheel)
    else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, displaywheel, false)


}


// Scroll move g_user
function displaywheel(e){
    clicked = false

    if($(".popup").css("display") == "none"){
      var evt=window.event || e //equalize event object
      var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta

      if(delta > 0){ // Up
          if(x < 1000){
              x++
          }
          var phase = (x / 1000);
          var point = mainPath.getPointAtLength(len * phase);
          circleA.attr({ cx: point.x, cy: point.y })
          circleB.attr({ cx: point.x, cy: point.y })
          g_user.attr({ cx: point.x, cy: point.y })
      } else { // Down
          if(x > 0){
              x--
          }
          var phase = (x / 1000);
          var point = mainPath.getPointAtLength(len * phase);
          circleA.attr({ cx: point.x, cy: point.y })
          circleB.attr({ cx: point.x, cy: point.y })
          g_user.attr({ cx: point.x, cy: point.y })
      }
      inRadius(circleB.attr('cx'), circleB.attr('cy'))
    }


}


// FILTER MARKER BY CATEGORY
function filter() {
    // feedback for user onclick category selected
    $('.filter-cate').removeClass("checked")
    $(this).addClass("checked");

    // hide wrong elements
    $('.markers').fadeOut(300)


    // show selected elements
    var id_cate = $(this).attr("data-cate")
    var good_markers = $("ellipse:regex(data-cate, .*"+ id_cate +".*)")
    good_markers.fadeIn()

    // show all
    if($(this).hasClass("all")) {
        $('.markers').fadeIn()
    }

    setTimeout(function(){
      filterIsOn(circleB.attr("cx"), circleB.attr("cy"))
    }, 400)


}

function filterIsOn(dx, dy) {
  for(var i = 0; i < arrayMarkers.length; i++){

      var artx = arrayMarkers[i].x
      var arty = arrayMarkers[i].y

      if((dx >= artx - 20 && dx <= artx + 20) && (dy >= arty -20 && dy <= arty + 20)){
          // est dans la zone d'un marker
          var get_id = arrayMarkers[i].article_id
        var display_marker = $('ellipse#'+arrayMarkers[i].article_id).css('display')
          if(display_marker == "none" ){
            // est affiché non
            console.log("ok1")

            $(".article").removeClass("fadeInRight")
                .addClass("fadeOutRight")


          } else {
            console.log("ok")

            showArticle(get_id)
            $(".article").removeClass("fadeOutRight")
                .addClass("fadeInRight")
          }
      }
  }
}

// Retreive id category from radio buttons to display markers
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}


//Pulse animation
function animatePulseCircleA() {

    circleA.animate({rx: 30, ry: 15}, 1000, function(){
        circleA.animate({rx: 40, ry: 19}, 1000);
    });

}
function animatePulseCircleB() {

    circleB.animate({rx: 50, ry: 25}, 800, function(){
        circleB.animate({rx: 90, ry: 40}, 800);
    });

}

var posUser = Math.round(len),
posTarget;

moveUserPulse()
function moveUserPulse(){

    requestAnimationFrame(moveUserPulse)


    if(clicked){
        if(posUser >= posTarget){
            // true et False -> False
            if(Math.round(circleA.attr("cx")) != Math.round($("*[data-active='actived']").attr("cx")) || Math.round(circleA.attr("cy")) != Math.round($("*[data-active='actived']").attr("cy"))){
                if((Math.round(circleA.attr("cx")) >= Math.round($("*[data-active='actived']").attr("cx")) - 1 && Math.round(circleA.attr("cx")) <= Math.round($("*[data-active='actived']").attr("cx")) + 1) && (Math.round(circleA.attr("cy")) >= Math.round($("*[data-active='actived']").attr("cy")) -1 && Math.round(circleA.attr("cy")) <= Math.round($("*[data-active='actived']").attr("cy")) + 1)){

                    inRadius(circleB.attr("cx"),circleB.attr("cy"))
                } else {
                    x--

                    var phase = (x / 1000);
                    var point = mainPath.getPointAtLength(len * phase);
                    circleA.attr({ cx: point.x, cy: point.y })
                    circleB.attr({ cx: point.x, cy: point.y })
                    g_user.attr({ cx: point.x, cy: point.y })
                }


            }

        } else {

            if(Math.round(circleA.attr("cx")) != Math.round($("*[data-active='actived']").attr("cx")) || Math.round(circleA.attr("cy")) != Math.round($("*[data-active='actived']").attr("cy"))){
                if((Math.round(circleA.attr("cx")) >= Math.round($("*[data-active='actived']").attr("cx")) - 1 && Math.round(circleA.attr("cx")) <= Math.round($("*[data-active='actived']").attr("cx")) + 1) && (Math.round(circleA.attr("cy")) >= Math.round($("*[data-active='actived']").attr("cy")) -1 && Math.round(circleA.attr("cy")) <= Math.round($("*[data-active='actived']").attr("cy")) + 1)){

                    inRadius(circleB.attr("cx"),circleB.attr("cy"))

                } else {
                    x++

                    var phase = (x / 1000);
                    var point = mainPath.getPointAtLength(len * phase);
                    circleA.attr({ cx: point.x, cy: point.y })
                    circleB.attr({ cx: point.x, cy: point.y })
                    g_user.attr({ cx: point.x, cy: point.y })
                }

            }
        }
    }

}
