class DetailCircle {
    constructor(svg, nameClass,
                DATA_TYPE, DATA_COLOR, DATA_TEXT, DATA_TEXT_DETAIL,
                ARC, OUTERARC, type){
        
        this.svg = svg
        this.type = type
        
        // g
        this.linesName = "lines_" + nameClass
        this.linesNameJob = "linesJob_" + nameClass
        this.slicesName = "slices_" + nameClass
        this.labelsName = "labels_" + nameClass
        this.labelsDetail = "labels_Detail_" + nameClass
        this.labelsNameJob = "labelsJob_" + nameClass
        this.imagesBeer = "imagesBeer_" + nameClass
        this.shadowCircleOnCircle = "shadowCircles_" + nameClass
        this.circleOnCircle = "circles_" + nameClass
        this.circleOnCircleJob = "circlesJob_" + nameClass
        this.shadowBackButton1 = "shadowBack1_" + nameClass
        this.shadowBackButton2 = "shadowBack2_" + nameClass
        this.backButton = "back_" + nameClass
        
        svg.append("g").attr("class", this.linesName)
        svg.append("g").attr("class", this.linesNameJob)
        svg.append("g").attr("class", this.slicesName)
        svg.append("g").attr("class", this.labelsName)
        svg.append("g").attr("class", this.labelsDetail)
        svg.append("g").attr("class", this.labelsNameJob)
        svg.append("g").attr("class", this.imagesBeer)
        svg.append("g").attr("class", this.shadowCircleOnCircle)
        svg.append("g").attr("class", this.circleOnCircle)
        svg.append("g").attr("class", this.circleOnCircleJob)
        
        var backClass = svg.append("g").attr("class", "backClass")
        backClass.append("g").attr("class", this.shadowBackButton1)
        backClass.append("g").attr("class", this.shadowBackButton2)
        backClass.append("g").attr("class", this.backButton)
        
        // Arc
        this.ARC = ARC
        this.OUTERARC = OUTERARC
            
        // Retreive data
        this.DATA_TYPE = DATA_TYPE
        this.DATA_COLOR = DATA_COLOR
        this.DATA_TEXT = DATA_TEXT
        this.DATA_TEXT_DETAIL = DATA_TEXT_DETAIL
        
        this.DATA_BEER = ["BAR 124", "BORDEAUX BAR 143...", "BAR 315", "BAR 1142"]
    }
    
    draw() {

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
        .style('opacity', 0)
      
        .transition()
        .delay(300)
        .duration(500)
        .style('opacity', 1)
        
      
      
      // SHADOW OF DOT ON CIRCLE
        let dotShadow = svg.select("." + this.shadowCircleOnCircle).selectAll("circle")
        .data(pie(this.DATA_TYPE))
        .enter().append('circle')
        .attr({
            'fill': (d, i) => {
                var color_fill
                if(this.DATA_TYPE[i] === 2){
                    color_fill = this.DATA_COLOR 
                }
                else {
                    color_fill = "#1AFFD3"
                }

                return color_fill
            },
            'r' : (d, i) => {
                let radius_detail_circle
                if(this.DATA_TYPE[i] === 2){
                    radius_detail_circle = 20
                }
                else {
                    radius_detail_circle = 0
                }
                return radius_detail_circle
            },
            'transform': d => {
              let pos = this.ARC.centroid(d)
              return 'translate(' + pos + ')'
            },
            'opacity': 0
        })
        .on("mouseover", function(d, i) {
            var cas = svg.selectAll('.nbHover_' + i)
            .transition()
            .delay(100)
            .duration(100)
            .style('opacity', 1)
        })
        .on("mouseout", function(d, i) {
            var cas = svg.selectAll('.nbHover_' + i)
            .transition()
            .delay(100)
            .duration(100)
            .style('opacity', 0)
        })
        .transition()
        .delay((d, i) => (i * arcAnimDelay) + initialAnimDelay)
        .duration(arcAnimDur * this.DATA_TYPE.length)
        .style('opacity', 0.5)
        .transition()
        .delay((d, i) => (arcAnimDur * this.DATA_TYPE.length) + (i * secIndividualdelay))
        .duration(secDur)
      
      
        // DOT ON CIRCLE
        let dot = svg.select("." + this.circleOnCircle).selectAll("circle")
        .data(pie(this.DATA_TYPE))
        .enter().append('circle')
        .attr({
            'fill': (d, i) => {
                var color_fill
                if(this.DATA_TYPE[i] === 2){
                    color_fill = this.DATA_COLOR 
                }
                else {
                    color_fill = "#1AFFD3"
                }

                return color_fill
            },
            'class' : (d, i) => "detail_" + i,
            'r' : (d, i) => {
                let radius_detail_circle
                if(this.DATA_TYPE[i] === 2){
                    radius_detail_circle = 10 
                }
                else {
                    radius_detail_circle = 5
                }
                return radius_detail_circle
            },
            'transform': d => {
              let pos = this.ARC.centroid(d)
              return 'translate(' + pos + ')'
            }
        })
        .on("mouseover", function(d, i) {
            var cas = svg.selectAll('.nbHover_' + i)
            .transition()
            .delay(100)
            .duration(100)
            .style('opacity', 1)
        })
        .on("mouseout", function(d, i) {
            var cas = svg.selectAll('.nbHover_' + i)
            .transition()
            .delay(100)
            .duration(100)
            .style('opacity', 0)
        })
        .attr('opacity', 0)
        .transition()
        .style('opacity', 1)
        .delay((d, i) => 500+ (i * 150))
        .duration(50 * this.DATA_TYPE.length)
        
        // DOT ON CIRCLE FOR JOB
        if(this.type === "job"){
            let dot = svg.select("." + this.circleOnCircleJob).selectAll("circle")
            .data(pie(this.DATA_TYPE))
            .enter().append('circle')
            .attr({
            'fill': "#FFFFFF",
                'class' : (d, i) => "detail_" + i,
                'r' : 5,
                'transform': d => {
                  let pos = this.ARC.centroid(d)
                  return 'translate(' + pos + ')'
                }
            })
            .on("mouseover", function(d, i) {
                var cas = svg.selectAll('.nbHover_' + i)
                .transition()
                .delay(100)
                .duration(100)
                .style('opacity', 1)
            })
            .on("mouseout", function(d, i) {
                var cas = svg.selectAll('.nbHover_' + i)
                .transition()
                .delay(100)
                .duration(100)
                .style('opacity', 0)
            })
            .attr('opacity', 0)
            .transition()
            .style('opacity', 1)
            .delay((d, i) => 500+ (i * 150))
            .duration(50 * this.DATA_TYPE.length)   
        }


    // Texts for date
        let midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2
        let text = svg.select("." + this.labelsName).selectAll("text")
        .data(pie(this.DATA_TYPE))
        .enter()
        .append('text')
        .style("opacity", 0)
        .style("font-size", (d, i) => {
            var fontSize
            if(this.DATA_TYPE[i] === 2){
                fontSize  = "25px"
            } else {
                fontSize = "20px"
            }
            return fontSize
        })
        .text((d, i) => this.DATA_TEXT[i])
        .attr('class', (d, i) => 'nbHover_' + i)
        .attr({
            'fill': (d, i) => {
                var color_fill
                if(this.DATA_TYPE[i] === 2){
                    color_fill = this.DATA_COLOR 
                }
                else {
                    color_fill = "#1AFFD3"
                }

                return color_fill
            }
        })
        .attr('transform', d => {
          let pos = this.OUTERARC.centroid(d)
          pos[1] -= 10
          pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
          return 'translate(' + pos + ')'
        })
        .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")
        
      
        // Texts for detail
        let textDetail = svg.select("." + this.labelsDetail).selectAll("text")
        .data(pie(this.DATA_TYPE))
        .enter()
        .append('text')
        .style("opacity", 0)
        .style("font-size", (d, i) => {
            var fontSize
            if(this.DATA_TYPE[i] === 2){
                fontSize  = "40px"
            } else {
                fontSize = "18px"
            }
            return fontSize
        })
        .style("text-shadow", (d, i) => {
            var textShadow
            if(this.DATA_TYPE[i] === 2){
                textShadow  = '-1px 0 ' + this.DATA_COLOR + ', 0 1px ' + this.DATA_COLOR +', 1px 0 ' + this.DATA_COLOR +', 0 -1px ' + this.DATA_COLOR
            } else if(this.type === "mention" || this.type === "domain"){
                textShadow  = '-1px 0 #1AFFD3, 0 1px #1AFFD3, 1px 0 #1AFFD3, 0 -1px #1AFFD3'
            } 
            else {
                textShadow = "none"
            }
            return textShadow
        })
        .text((d, i) => this.DATA_TEXT_DETAIL[i])
        .attr({'class': (d, i) => {
            var setClasses
            if(this.DATA_TYPE[i] === 2 || this.type === "mention" || this.type === "domain"){
                setClasses  = 'nbHover_' + i + ' noFillText'
            } else {
                setClasses = 'nbHover_' + i
            }
            
            return setClasses
            }
          })
        .attr({
            'fill': (d, i) => {
                var color_fill
                if(this.DATA_TYPE[i] === 2){
                    color_fill = this.DATA_COLOR 
                }
                else {
                    color_fill = "#1AFFD3"
                }

                return color_fill
            }
        })
        .attr({'transform': (d, i) => {
              let pos = this.OUTERARC.centroid(d)
              if(this.DATA_TYPE[i] === 2){
                pos[1] += 45
              } else {
                  pos[1] += 25
              }
              pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
              return 'translate(' + pos + ')'
            }
        })
        .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")

        
        // Text Job
        if(this.type === "job"){
            let textJob = svg.select("." + this.labelsNameJob).selectAll("text")
            .data(pie(this.DATA_TYPE))
            .enter()
            .append('text')
            .style("opacity", 0)
            .style("font-size", "20px")
            .text((d, i) => this.DATA_BEER[i])
            .attr('class', (d, i) => 'nbHover_' + i)
            .attr({'fill': '#FFFFFF'})
            .attr('transform', d => {
              let pos = this.OUTERARC.centroid(d)
              pos[1] += 85
              pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
              if(pos[0] >= 0){
                  pos[0] += 60
              }
              return 'translate(' + pos + ')'
            })
            .style('text-anchor', d => midAngle(d) < Math.PI ? "end" : "end")
            
            
            let images = svg.select("." + this.imagesBeer).selectAll("image")
                .data(pie(this.DATA_TYPE))
                .enter()
                .append('image')
                .style("opacity", 0)
                .attr('xlink:href', 'assets/images/beer_icon.png')
                .attr('class', (d, i) => 'nbHover_' + i + ' img-beer')
                .attr('transform', d => {
                  let pos = this.OUTERARC.centroid(d)
                  pos[1] += 57
                  pos[0] = radius * 1.3 * (midAngle(d) < Math.PI ? 1 : -1)
                  if(pos[0] < 0){
                      pos[0] -= 30
                  }
                  return 'translate(' + pos + ')'
                })
                .attr("width", "30")
                .attr("height", "30")
            
        }
        
        
        
    // Polylines
      let polyline = svg.select("." + this.linesName).selectAll("polyline")
        .data(pie(this.DATA_TYPE))
        .enter().append("polyline")
        .style("opacity", 1)
        .attr('class', (d, i) => 'nbHover_' + i)
        .attr({
            'stroke': (d, i) => {
                var color_fill
                if(this.DATA_TYPE[i] === 2){
                    color_fill = this.DATA_COLOR 
                }
                else {
                    color_fill = "#1AFFD3"
                }

                return color_fill
            }
        })
        .attr('points', d => {
          let pos = this.OUTERARC.centroid(d)
          pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1) + 70 * (midAngle(d) < Math.PI ? 1 : -1)
          return [this.ARC.centroid(d), this.OUTERARC.centroid(d), pos]
        })
        .style('opacity', 0)
      
      // Polylines Job
      if(this.type === "job"){
          let polylineJob = svg.select("." + this.linesNameJob).selectAll("polyline")
            .data(pie(this.DATA_TYPE))
            .enter().append("polyline")
            .style("opacity", 1)
            .attr('class', (d, i) => 'nbHover_' + i)
            .attr({'stroke': "#FFFFFF"})
            .attr('points', d => {
              let pos = this.OUTERARC.centroid(d)
              pos[0] = radius * 1.2 * (midAngle(d) < Math.PI ? 1 : -1) + 70 * (midAngle(d) < Math.PI ? 1 : -1)
              pos[1] += 60

              return [this.ARC.centroid(d), [this.OUTERARC.centroid(d)[0]+= (40 * (midAngle(d) < Math.PI ? 1 : -1)),this.OUTERARC.centroid(d)[1]+= 60], [pos[0]+=(50 * (midAngle(d) < Math.PI ? -1 : 1)), pos[1]]]
            })
            .style('opacity', 0)
        }
      
      
      // Back button
        let backButtonShadow1 = svg.select("." + this.shadowBackButton1).selectAll("circle")
        .data([1])
        .enter().append('circle')
        .attr({
            'fill': '#34d6b7',
            'r': 11,
            'transform': d => {
              let pos = this.ARC.centroid(d)
              return 'translate(' + pos + ')'
            },
            'opacity' : .5
        })
        .on("mousedown", function(d, i){
            $("#detail_svg").fadeOut(200, function(){
                document.querySelector("#detail_svg").remove()
                $("#main_svg").fadeIn(200)
                document.querySelector(".title-wrapper").innerHTML = "<span></span>"
            })
        })
        
        let backButtonShadow2 = svg.select("." + this.shadowBackButton2).selectAll("circle")
        .data([1])
        .enter().append('circle')
        .attr({
            'fill': '#1ed8b4',
            'r' : 8,
            'transform': d => {
              let pos = this.ARC.centroid(d)
              return 'translate(' + pos + ')'
            },
            'opacity' : 5
        })
        .on("mousedown", function(d, i){
            $("#detail_svg").fadeOut(200, function(){
                document.querySelector("#detail_svg").remove()
                $("#main_svg").fadeIn(200)
                document.querySelector(".title-wrapper").innerHTML = "<span></span>"
            })
        })
      
        let backButton = svg.select("." + this.backButton).selectAll("circle")
        .data([1])
        .enter().append('circle')
        .attr({
            'fill': '#1AFFD3',
            'r' : 5,
            'transform': d => {
              let pos = this.ARC.centroid(d)
              return 'translate(' + pos + ')'
            }
        })
        .on("mousedown", function(d, i){
            $("#detail_svg").fadeOut(200, function(){
                document.querySelector("#detail_svg").remove()
                $("#main_svg").fadeIn(200)
                document.querySelector(".title-wrapper").innerHTML = "<span></span>"
            })
        })
        
    }
}
