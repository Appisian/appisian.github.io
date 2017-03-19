/**
 * Created by Appisian on 19/03/2017.
 */

// Check if user on iOS
var iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// Check if has multi-touch on screen
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
if (iOS) document.body.classList.add('iOS');


// On click / tap animation
var square = (function() {
    // Retreive fontSize of root element
    var getFontSize = function() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    var canvas = document.querySelector('.square');
    var ctx = canvas.getContext('2d');
    var x = 0;
    var y = 0;
    var animations = [];

    var setCanvasSize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    var updateCoords = function(e) {
        x = e.clientX || e.touches[0].clientX;
        y = e.clientY || e.touches[0].clientY;
    }

    var colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99'];

    var createCircle = function(x,y) {
        var p = {};
        p.x = x;
        p.y = y;
        p.color = colors[anime.random(0, colors.length - 1)];
        p.radius = 0;
        p.alpha = 1;
        p.lineWidth = 6;
        p.draw = function() {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            // ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
            ctx.lineWidth = p.lineWidth;
            ctx.strokeStyle = p.color;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        return p;
    }


    var removeAnimation = function(animation) {
        var index = animations.indexOf(animation);
        if (index > -1) animations.splice(index, 1);
    }

    var animateParticules = function(x, y) {
        setCanvasSize();
        var circle = createCircle(x, y);
        var circleAnimation = anime({
            targets: circle,
            radius: function() { return anime.random(getFontSize() * 8.75, getFontSize() * 11.25); },
            lineWidth: 0,
            alpha: {
                value: 0,
                easing: 'linear',
                duration: function() { return anime.random(400, 600); }
            },
            duration: function() { return anime.random(1200, 1800); },
            easing: 'easeOutExpo',
            complete: removeAnimation
        });
        animations.push(circleAnimation);
    }

    var mainLoop = anime({
        duration: Infinity,
        update: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            animations.forEach(function(anim) {
                anim.animatables.forEach(function(animatable) {
                    animatable.target.draw();
                });
            });
        }
    });

    document.addEventListener(tap, function(e) {
        updateCoords(e);
        animateParticules(x, y);
    }, false);

    window.addEventListener('resize', setCanvasSize, false);

    return {
        boom: animateParticules
    }
})();


if(window.scrollTop > window.innerHeight){
    console.log('ok')
}


var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

if (document.attachEvent) //if IE (and Opera depending on user setting)
    document.attachEvent("on"+mousewheelevt, displaywheel)
else if (document.addEventListener) //WC3 browsers
    document.addEventListener(mousewheelevt, displaywheel, false)

// Scroll
function displaywheel(e){

    var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta

    if(delta > 0){ // Up
        console.log("up")
    } else { // Down
        // $("#works-section").css("top", 0)
    }
}

$(window).on("scroll", function(){
    if($(window).scrollTop() > 0) {
        $("header").addClass("borderBottom")
    } else {
        $("header").removeClass("borderBottom")
    }
})

