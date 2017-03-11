// ### SOME GLOBALS VARIABLES ### //
var CIRCLE_JOB, CIRCLE_YEAR, CIRCLE_DOMAIN, CIRCLE_MENTION,
    MY_JOB, MY_YEAR, MY_DOMAIN, MY_MENTION,
    slice_selected, circle_selected

// ### CREATE CIRCLE_JOB & INIT EVENT ONCLICK TO CREATE CIRCLE_YEAR ### //
function init_job() {
    if(MY_JOB == undefined){

        changeMainTitle("Cette année en BDDI nous sommes :")
        document.querySelector(".title-wrapper span").style.color = COLOR_JOB

        CIRCLE_JOB = new Circle(svg, "job", DATA_JOB, COLOR_JOB, LABEL_JOB, LABEL_JOB_DETAIL, ARC_JOB, OUTERARC_JOB)
        CIRCLE_JOB.draw()

        var SLICE_PATHES = document.querySelectorAll('.slices_job path')
        for (var i = 0; i < SLICE_PATHES.length; i++) {
            SLICE_PATHES[i].addEventListener('click', function(){
                MY_JOB = this.getAttribute('class')

                CIRCLE_YEAR = new Circle(svg, "year", DATA_YEAR, COLOR_YEAR, LABEL_YEAR, LABEL_YEAR_DETAIL, ARC_YEAR, OUTERARC_YEAR)

                var legends = document.querySelectorAll('.lines_job, .labels_job,.labels_job, .labels_Percents_job')

                for(var j = 0; j < legends.length; j++){
                    $(legends[j]).css("opacity", 0)
                }

                CIRCLE_YEAR.draw()
                init_year()
            })
        }
    }
}

// ### INIT EVENT ONCLICK OF PATHES CIRCLE_YEAR TO CREATE CIRCLE_DOMAIN ### //
function init_year() {
    if(MY_YEAR == undefined){

        changeMainTitle("Nos étudiants sont nés en :")
        document.querySelector(".title-wrapper span").style.color = COLOR_YEAR

        var YEAR_PATHES = document.querySelectorAll('.slices_year path')
        for (var i = 0; i < YEAR_PATHES.length; i++) {
            YEAR_PATHES[i].addEventListener('click', function(){
                MY_YEAR = this.getAttribute('class')

                CIRCLE_DOMAIN = new Circle(svg, "domain", DATA_DOMAIN, COLOR_DOMAIN, LABEL_DOMAIN, LABEL_DOMAIN_DETAIL, ARC_DOMAIN, OUTERARC_DOMAIN)

                var legends = document.querySelectorAll('.lines_year, .labels_year, .labels_Percents_year')
                for(var j = 0; j < legends.length; j++){
                    $(legends[j]).css("opacity", 0)
                }

                CIRCLE_DOMAIN.draw()
                init_domain()

            })
        }
    }

}

// ### INIT EVENT ONCLICK OF PATHES CIRCLE_DOMAIN TO CREATE COLOR_MENTION ### //
function init_domain() {
    if(MY_DOMAIN == undefined){

        changeMainTitle("Nos étudiants ont passés un Bac :")
        document.querySelector(".title-wrapper span").style.color = COLOR_DOMAIN


        var DOMAIN_PATHES = document.querySelectorAll('.slices_domain path')

        for (var i = 0; i < DOMAIN_PATHES.length; i++) {
            DOMAIN_PATHES[i].addEventListener('click', function(){
                MY_DOMAIN = this.getAttribute('class')

                CIRCLE_MENTION = new Circle(svg, "mention", DATA_MENTION, COLOR_MENTION, LABEL_MENTION, LABEL_MENTION_DETAIL, ARC_MENTION, OUTERARC_MENTION)

                var legends = document.querySelectorAll('.lines_domain, .labels_domain, .labels_Percents_domain')
                for(var j = 0; j < legends.length; j++){
                    $(legends[j]).css("opacity", 0)
                }
                CIRCLE_MENTION.draw()
                init_mention()
            })
        }
    }
}

// ### INIT EVENT ONCLICK OF PATHES COLOR_MENTION TO INIT HOVER – MORE INFO ### //
function init_mention() {
    if(MY_MENTION == undefined){
        changeMainTitle("Et ont obtenus des mentions telles que :")
        document.querySelector(".title-wrapper span").style.color = COLOR_MENTION

        var MONTION_PATHES = document.querySelectorAll('.slices_mention path')

        for (var i = 0; i < MONTION_PATHES.length; i++) {
            MONTION_PATHES[i].addEventListener('click', function(){
                MY_MENTION = this.getAttribute('class')

                var legends = document.querySelectorAll('.lines_mention, .labels_mention', '.labels_Percents_mention')

                for(var j = 0; j < legends.length; j++){
                    $(legends[j]).css("opacity", 0)
                }   
                
                init_hover()
            })
        }
    }
}

// ### HOVER ON PATH MAKES LINES AND LABELS APPEAR & CLICK ON PATH WILL GENERATE UN NEW CIRCLE WITH OTHER DATAS ### //
function init_hover() {
    changeMainTitle("")
    
    var help_span = document.querySelector('#help-wrapper span')
    console.log(help_span.innerHTML)
    if(help_span.innerHTML !== "EXPLORE POUR PLUS D’INFOS" && help_span.innerHTML !== "APPUIE POUR FAIRE UN RETOUR"){
        var help_span = document.querySelector('#help-wrapper span')
        help_span.innerHTML = "EXPLORE POUR PLUS D’INFOS"
        $('#help-wrapper').fadeIn()

        var arraySlices = document.querySelectorAll("g[class^='slices_']")

        for(var i = 0; i < arraySlices.length; i++){
            arraySlices[i].addEventListener("mouseover", function(){
                var slice_type = splitString(this.getAttribute("class"), '_')

                var arrayLegends = document.querySelectorAll("g[class$='" + slice_type + "']")

                for(var j = 0; j < arrayLegends.length; j++){
                    arrayLegends[j].style.opacity = 1
                }
            })

            arraySlices[i].addEventListener("mouseout", function(){
                var slice_type = splitString(this.getAttribute("class"), '_')

                var arrayLegends = document.querySelectorAll("g.lines_" + slice_type + ", g.labels_" + slice_type +", g.labels_Percents_" + slice_type)

                for(var j = 0; j < arrayLegends.length; j++){
                    arrayLegends[j].style.opacity = 0
                }
            })
        }

        var arraySliceSelected = document.querySelectorAll("path")
        for(var i = 0; i < arraySliceSelected.length; i++){
            arraySliceSelected[i].addEventListener('click', function(){

                slice_selected = splitString(this.getAttribute('class'),'_')
                circle_selected = splitString(this.parentNode.getAttribute('class'), '_')

                detail_circle(circle_selected, slice_selected)
            })
        }

    }
}


