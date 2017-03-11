// ### HELPER EVENT ### //
document.querySelector("#help-wrapper").addEventListener('click', function(){
    $(this).fadeOut()
})

$(".cercle_wrapper").click(function(){
    $(".hp-wrapper").slideUp(1500)
})


// ### USEFUL VARIABLES FOR SVG ELEMENT ### //
const width = document.querySelector('.chart-wrapper').offsetWidth,
      height = document.querySelector('.chart-wrapper').offsetHeight,
      minOfWH = Math.min(width, height) / 2,
      initialAnimDelay = 300,
      arcAnimDelay = 150,
      arcAnimDur = 500,
      secDur = 1000,
      secIndividualdelay = 200
let radius

// Set max size of g wrapper
if (minOfWH > 200) {
  radius = 200
} else {
  radius = minOfWH
}

var svg = d3.select('.chart-wrapper').append('svg')
  .attr({
    'width': width,
    'height': height,
    'class': 'pieChart'
  })
  .append('g')

// Set svg horizontally center and vertically center
svg.attr({
  'transform': 'translate(' + width / 2 + ',' + height / 2 + ')'
});


// ### USEFUL VARIABLES FOR CREATE CIRCLES WHICH HAVE SLICES, PARAMETERS : RADIUS/SIZE  ### //
let ARC_JOB = d3.svg.arc() // JOB
    .outerRadius(radius * 0.52)
    .innerRadius(radius * 0.45)
    .padAngle(.03)

let OUTERARC_JOB = d3.svg.arc() // JOB
  .innerRadius(radius * 0.85)
  .outerRadius(radius * 0.85)

let ARC_YEAR = d3.svg.arc() // BIRTH YEAR
    .outerRadius(radius * 0.67)
    .innerRadius(radius * 0.60)
    .padAngle(.03)

let OUTERARC_YEAR = d3.svg.arc() // BIRTH YEAR
  .innerRadius(radius * 1.1)
  .outerRadius(radius * 1.1)

let ARC_DOMAIN = d3.svg.arc() // DOMAIN
    .outerRadius(radius * 0.82)
    .innerRadius(radius * 0.75)
    .padAngle(.03)

let OUTERARC_DOMAIN = d3.svg.arc() // DOMAIN
  .innerRadius(radius * 1)
  .outerRadius(radius * 1)

let ARC_MENTION = d3.svg.arc() // MENTION
    .outerRadius(radius * 0.97)
    .innerRadius(radius * 0.90)
    .padAngle(.03)

let OUTERARC_MENTION = d3.svg.arc() // MENTION
  .innerRadius(radius * 1.15)
  .outerRadius(radius * 1.15)

let ARC_DETAIL = d3.svg.arc() // DETAIL
    .outerRadius(radius * 0.72)
    .innerRadius(radius * 0.71)

let OUTERARC_DETAIL = d3.svg.arc() // DETAIL
  .innerRadius(radius * 0.85)
  .outerRadius(radius * 0.85)

// ### INIT PIE ### //
let pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d; })


// ### INIT PIE ### //
init_job()


