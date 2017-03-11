class Circle {
    constructor(svg, nameClass,
                DATA_TYPE, DATA_COLOR, DATA_TEXT, DATA_TEXT_DETAIL,
                ARC, OUTERARC){
        
        this.svg = svg
        this.nameClass = nameClass
        
        // g
        this.linesName = "lines_" + nameClass
        this.slicesName = "slices_" + nameClass
        this.labelsName = "labels_" + nameClass
        this.labelsPercents = "labels_Percents_" + nameClass
        
        svg.append("g").attr("class", this.linesName)
        svg.append("g").attr("class", this.slicesName)
        svg.append("g").attr("class", this.labelsName)
        svg.append("g").attr("class", this.labelsPercents)
        
        // Arc
        this.ARC = ARC
        this.OUTERARC = OUTERARC
        
        // Retreive data
        this.DATA_TYPE = DATA_TYPE
        this.DATA_COLOR = DATA_COLOR
        this.DATA_TEXT = DATA_TEXT
        this.DATA_TEXT_DETAIL = DATA_TEXT_DETAIL
    }
    
    draw() {
        
        var getClassPath = this.slicesName
        
      // define slice
      let slice = svg.select("." + this.slicesName)
        .datum(this.DATA_TYPE)
        .selectAll('path')
        .data(pie)
        .enter().append('path')
        .attr({
          'fill': (d, i) => this.DATA_COLOR,
          'd': this.ARC,
          'class' : (d, i) => "nb_" + i
        })
        .on('mouseover', function(d, i){
            if(MY_JOB == undefined || MY_YEAR == undefined || MY_DOMAIN == undefined || MY_MENTION == undefined) {
                d3.selectAll('.' + getClassPath + ' path')
                .style('fill', 'white')
            }
            else {
                d3.selectAll('path')
                    .style('opacity', .34)
                d3.selectAll('text')
                    .style('opacity', .34)
                d3.selectAll('polyline')
                    .style('opacity', .34)
                d3.select(this)
                    .style('opacity', 1)
                console.log(i)
                d3.selectAll('.nbHover_' + i)
                    .style('opacity', 1)
                d3.selectAll('.nbHoverPolyline_' + i)
                    .style('opacity', 1)
                
            }
        })
        .on('mouseout', function(){
            if(MY_JOB == undefined || MY_YEAR == undefined || MY_DOMAIN == undefined || MY_MENTION == undefined) {
            d3.selectAll('.' + getClassPath + ' path')
                .style('fill', this.DATA_COLOR)
            } else {
                d3.selectAll('path')
                    .style('opacity', 1)
            }
        })
        .style('opacity', 0)
        .transition()
        .delay(300)
        .duration(500)
        .style('opacity', 1)

      // Texts for title label
        let midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2
        let text = svg.select("." + this.labelsName).selectAll("text")
        .data(pie(this.DATA_TYPE))
        .enter()
        .append('text')
        .style("opacity", 0)
        .style("font-size", (d, i) => {
            var fontSize = "20px"
            return fontSize
        })
        .text((d, i) => this.DATA_TEXT[i])
        .attr('class', (d, i) => 'nbHover_' + i)
        .attr({
            'fill': (d, i) => {
                var color_fill = this.DATA_COLOR 

                return color_fill
            }
        })
        .attr('transform', (d, i) => {
          let pos = this.OUTERARC.centroid(d)
          pos[1] -= 10
          
          if(this.nameClass === "year"){
            if(i == 1){
                pos[0] = radius * 1.7 * (midAngle(d) < Math.PI ? 1 : -1)
            }
            else {
                pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1)
            }
          }
            else if(this.nameClass === "mention"){
                if(i == 0){
                    pos[0] = radius * 1.25 * (midAngle(d) < Math.PI ? 1 : -1)
                }
                else if(i == 2){
                    pos[0] = radius * 1.2 * (midAngle(d) < Math.PI ? 1 : -1)
                }
                else if(i == 3){
                    pos[0] = radius * 1.35 * (midAngle(d) < Math.PI ? 1 : -1)
                }
                else {
                    pos[0] = radius * 1.45 * (midAngle(d) < Math.PI ? 1 : -1)
                }
          }
            else if(this.nameClass === "domain"){
                if(i%2 == 1){
                    if(i == 3){
                        pos[0] = radius * 1.75 * (midAngle(d) < Math.PI ? 1 : -1)
                    } 
                    else if(i == 5){
                        pos[0] = radius * 1.85 * (midAngle(d) < Math.PI ? 1 : -1)
                    } else {
                        pos[0] = radius * 1.7 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    
                }
                else {
                    if(i == 0){
                       pos[0] = radius * 1.5 * (midAngle(d) < Math.PI ? 1 : -1) 
                    }
                    else if(i == 6){
                        pos[0] = radius * 1.55 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else {
                         pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1) 
                    }
                    
                }
              }
            else if(this.nameClass === "job"){
                if(i%2 == 0){
                    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
                }
                else {
                    
                    pos[0] = radius * 1.1 * (midAngle(d) < Math.PI ? 1 : -1)
                }
            }
            
            else {
              pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
          }
          
          return 'translate(' + pos + ')'
        })
        .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")
        .transition()
        .delay(900)
        .duration(700)
        .style('opacity', 1)
        
      
        // Texts for detail
        let textDetail = svg.select("." + this.labelsPercents).selectAll("text")
        .data(pie(this.DATA_TYPE))
        .enter()
        .append('text')
        .style("opacity", 0)
        .style("font-size", (d, i) => {
            var fontSize = "38px"
            return fontSize
        })
        .style("text-shadow", (d, i) => {
            var textShadow
                textShadow  = '-1px 0 ' + this.DATA_COLOR + ', 0 1px ' + this.DATA_COLOR +', 1px 0 ' + this.DATA_COLOR +', 0 -1px ' + this.DATA_COLOR
            return textShadow
        })
        .text((d, i) => this.DATA_TEXT_DETAIL[i])
        .attr({'class': (d, i) => {
            var setClasses = 'nbHover_' + i
            return setClasses
            }
          })
        .attr({
            'fill': (d, i) => {
                var color_fill = "#17000A" 
                return color_fill
            }
        })
        .attr({'transform': (d, i) => {
              let pos = this.OUTERARC.centroid(d)
                pos[1] += 40
              
                if(this.nameClass === "year"){
                    if(i == 0){
                        pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else if(i == 1){
                        pos[0] = radius * 1.5 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else {
                        pos[0] = radius * 1.2 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                  } 
            
                else if(this.nameClass === "domain"){
                if(i%2 == 1){
                    if(i == 3){
                        pos[0] = radius * 1.75 * (midAngle(d) < Math.PI ? 1 : -1)
                    } 
                    else if(i == 5){
                        pos[0] = radius * 1.6 * (midAngle(d) < Math.PI ? 1 : -1)
                    } else {
                        pos[0] = radius * 1.7 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    
                }
                else {
                    if(i == 0){
                       pos[0] = radius * 1.3 * (midAngle(d) < Math.PI ? 1 : -1) 
                    }
                    else if(i == 6){
                        pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else {
                         pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1) 
                    }
                    
                }
              }
                else if(this.nameClass === "mention"){
                    if(i == 0){
                        pos[0] = radius * 1.3 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else if(i == 2){
                        pos[0] = radius * 1.3 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else if(i == 3){
                        pos[0] = radius * 1.4 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                    else {
                        pos[0] = radius * 1.35 * (midAngle(d) < Math.PI ? 1 : -1)
                    }
                  }
                    else {
                      pos[0] = radius * 1.3 *  (midAngle(d) < Math.PI ? 1 : -1)
                  }
                
              return 'translate(' + pos + ')'
            }
        })
        .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")
        .transition()
        .delay(900)
        .duration(700)
        .style('opacity', 1)


    // Polylines
      let polyline = svg.select("." + this.linesName).selectAll("polyline")
        .data(pie(this.DATA_TYPE))
        .enter().append("polyline")
        .style("opacity", 1)
        .style('stroke', this.DATA_COLOR)
        .attr('points', d => {
          let pos = this.OUTERARC.centroid(d)
          pos[0] = radius * .95 * (midAngle(d) < Math.PI ? 1 : -1)

          return [this.ARC.centroid(d), this.ARC.centroid(d), this.ARC.centroid(d)]
        })
        .attr({'class': (d, i) => {
            var setClasses = 'nbHoverPolyline_' + i
            return setClasses
            }
          })
        .transition()
        .duration(300)
        .delay(700)
        .attr('points', (d, i) => {
          let pos = this.OUTERARC.centroid(d)
          if(this.nameClass === "year"){
                if(i == 1){
                    pos[0] = radius * 1.9* (midAngle(d) < Math.PI ? 1 : -1)
                }
              else {
                  pos[0] = radius * 1.6* (midAngle(d) < Math.PI ? 1 : -1)
              }
          } else if(this.nameClass === "domain"){
                if(i%2 == 1){
                    pos[0] = radius * 1.9* (midAngle(d) < Math.PI ? 1 : -1)
                }
              else {
                  pos[0] = radius * 1.6* (midAngle(d) < Math.PI ? 1 : -1)
              }
          } 
            
            else {
                pos[0] = radius * 1.6* (midAngle(d) < Math.PI ? 1 : -1)
          }
         
          return [this.ARC.centroid(d), this.OUTERARC.centroid(d), pos]
        })
    }
}