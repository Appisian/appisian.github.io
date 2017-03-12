class Bar {
                
    constructor(ctx, freq, slicePerimCircle) {
        this.ctx = ctx
        
        this.radius = 120 // Circle radius
        this.position = vec2.create()

        this.position[0] = canvas.width / 2 + Math.cos(slicePerimCircle) * this.radius // from this x
        this.position[1] = canvas.height / 2 + Math.sin(slicePerimCircle) * this.radius // from this y
        
        this.barX_To = 0 // to this x 
        this.barY_To = 0 // to this y
        
        this.frequency = 0
        this.barWidth = 0
        
        this.colorSelected = 0       
    }

    update(slicePerimCircle, freq, dividingSize) {
        this.frequency = freq
        this.barWidth = freq * 0.04
        
        if(this.frequency != 0){
            this.barX_To = Math.cos(slicePerimCircle) * freq * 1.5
		  this.barY_To = Math.sin(slicePerimCircle) * freq * 1.5
        }
        else {
            // Display a small point
            this.barX_To = 1
            this.barY_To = 1
        }
        
        // Change color when frequency is high
        if(this.frequency > 200){
            this.colorSelected = 1
        } else {
            this.colorSelected = 0
        }
        
        // Change the position with the dividingSize (zoom in/zoom out circle)
        this.position[0] = canvas.width / 2 + Math.cos(slicePerimCircle) * this.radius / dividingSize
        this.position[1] = canvas.height / 2 + Math.sin(slicePerimCircle) * this.radius / dividingSize
        
    }

    draw() {
        var ctx = this.ctx
        
        ctx.save()
        var lineColor
        
        // Change color
        if(this.colorSelected == 0){
            lineColor = "rgb("+  this.frequency +", 255,"+ this.frequency + ")"
        }
        else {
            lineColor = "rgb(255 , 255,"+ this.frequency +")"
        }
        
        // Lines
		ctx.strokeStyle = lineColor
		ctx.lineWidth = this.barWidth
		ctx.beginPath()
		ctx.moveTo(this.position[0], this.position[1])
		ctx.lineTo(this.position[0] + this.barX_To, this.position[1] + this.barY_To)
		ctx.stroke()
		ctx.closePath()
        
		ctx.restore()
    }

    
    
}



