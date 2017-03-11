// ### CREATE CIRCLE_DETAIL FROM TYPE(JOB, YEAR, DOMAIN OR MENTION) WITH ITS OWN DATAS ### //
function detail_circle(type, data) {
    
    var DETAIL_DATA
    var COLOR_DETAIL
    var DETAIL_LABEL
    var DETAIL_LABEL_DETAIL
    
    
    var help_span = document.querySelector('#help-wrapper span')
    if(help_span.innerHTML !== "APPUYE POUR FAIRE UN RETOUR"){
        var help_span = document.querySelector('#help-wrapper span')
        document.querySelector('.help-content').style.marginTop = "50px"
        help_span.innerHTML = "APPUYE POUR FAIRE UN RETOUR"
        $('#help-wrapper').fadeIn()
    }
        
    d3.select("svg > g")
        .attr('id', 'main_svg')
    
    document.querySelector("#main_svg").style.display = 'none'
    
    
    svg = d3.select('.chart-wrapper svg')
        .append('g')
        .attr('id', 'detail_svg')
        
    svg.attr({
      'transform': 'translate(' + width / 2 + ',' + height / 2 + ')'
    });
    
    switch(type){
        case 'job':
            COLOR_DETAIL = COLOR_JOB
            addToTitleWrapper("ICI C’EST CHEZ NOUS ET CA CHOUFFE !!!", "#FFFFFF")
            
            if(data == "0"){
                changeMainTitle("Développeurs")
                DETAIL_DATA = DETAIL_DATA_DEV
                DETAIL_LABEL = DETAIL_LABEL_DEV
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_DEV
            }
            else if(data == "1"){
                changeMainTitle("Graphistes")
                DETAIL_DATA = DETAIL_DATA_GRAPH
                DETAIL_LABEL = DETAIL_LABEL_GRAPH
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_GRAPH
            }
            
        break
        case 'year':
            COLOR_DETAIL = COLOR_YEAR
            addToTitleWrapper("en quelques dates", COLOR_DETAIL)
            
            if(data == "0"){
                changeMainTitle("1991")
                DETAIL_DATA = DETAIL_DATA_1991
                DETAIL_LABEL = DETAIL_LABEL_1991
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_1991
            }
            else if(data == "1"){
                changeMainTitle("1993")
                DETAIL_DATA = DETAIL_DATA_1993
                DETAIL_LABEL = DETAIL_LABEL_1993
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_1993
            }
            else if(data == "2"){
                changeMainTitle("1994")
                DETAIL_DATA = DETAIL_DATA_1994
                DETAIL_LABEL = DETAIL_LABEL_1994
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_1994
            }
            else if(data == "3"){
                changeMainTitle("1995")
                DETAIL_DATA = DETAIL_DATA_1995
                DETAIL_LABEL = DETAIL_LABEL_1995
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_1995
            }
            else if(data == "4"){
                changeMainTitle("1996")
                DETAIL_DATA = DETAIL_DATA_1996
                DETAIL_LABEL = DETAIL_LABEL_1996
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_1996
            }
            
        break
        case 'domain':
            COLOR_DETAIL = COLOR_DOMAIN
            addToTitleWrapper("VERS L’INFINI ET AU DELÀ", COLOR_DETAIL)
            
            if(data == "0"){
                changeMainTitle("bac es")
                DETAIL_DATA = DETAIL_DATA_ES
                DETAIL_LABEL = DETAIL_LABEL_ES
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_ES
            }
            else if(data == "1"){
                changeMainTitle("bac STI2D")
                DETAIL_DATA = DETAIL_DATA_STI2D
                DETAIL_LABEL = DETAIL_LABEL_STI2D
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_STI2D   
            }
            else if(data == "2"){
                changeMainTitle("bac stmg")
                DETAIL_DATA = DETAIL_DATA_STMG
                DETAIL_LABEL = DETAIL_LABEL_STMG
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_STMG
            }
            else if(data == "3"){
                changeMainTitle("bac pro")
                DETAIL_DATA = DETAIL_DATA_PRO
                DETAIL_LABEL = DETAIL_LABEL_PRO
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_PRO
            }
            else if(data == "4"){
                changeMainTitle("bac STD2A")
                DETAIL_DATA = DETAIL_DATA_STD2A
                DETAIL_LABEL = DETAIL_LABEL_STD2A
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_STD2A
            }
            else if(data == "5"){
                changeMainTitle("bac s")
                DETAIL_DATA = DETAIL_DATA_S
                DETAIL_LABEL = DETAIL_LABEL_S
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_S
            }
            else if(data == "6"){
                changeMainTitle("bac l")
                DETAIL_DATA = DETAIL_DATA_L
                DETAIL_LABEL = DETAIL_LABEL_L
                DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_L
            }
            
        break
        case 'mention':
            COLOR_DETAIL = COLOR_MENTION
            addToTitleWrapper("LES BDDI Très Bien Mentionné 2009-2015", COLOR_DETAIL)
            changeMainTitle("BRAVO !")
           
            
            DETAIL_DATA = DETAIL_DATA_MENTION
            DETAIL_LABEL = DETAIL_LABEL_MENTION
            DETAIL_LABEL_DETAIL = DETAIL_LABEL_DETAIL_MENTION
            
        break
    }
    

    var CIRCLE_DETAIL = new DetailCircle(svg, "detail", DETAIL_DATA, COLOR_DETAIL, DETAIL_LABEL, DETAIL_LABEL_DETAIL, ARC_DETAIL, OUTERARC_DETAIL, type)
    
    CIRCLE_DETAIL.draw()
    
}