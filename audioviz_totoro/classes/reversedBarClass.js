class ReversedBar {
                
    constructor(ctx, slicePerimCircle) {
        this.ctx = ctx
        
        this.radius = 120 // Circle radius
        this.position = vec2.create()

        this.position[0] = Math.cos(slicePerimCircle) * this.radius // from this x
        this.position[1] = Math.sin(slicePerimCircle) * this.radius // from this y
        
        this.barX_To = 0 // to this x 
        this.barY_To = 0 // to this y
                
        this.frequency = 0 
        this.barWidth = 0
        
        this.reverse = 1
        
    }

    update(slicePerimCircle, freq, dividingSize) {
        this.frequency = freq
        this.barWidth = freq * 0.04
        
        if(this.frequency != 0){
            this.barX_To = Math.cos(slicePerimCircle) * -1 * freq * .08
            this.barY_To = Math.sin(slicePerimCircle) * -1 * freq * .08
        }
        else {
            // Display a small point
            this.barX_To = 1
            this.barY_To = 1
        }

        // Change the position with the dividingSize (zoom in/zoom out circle)
        this.position[0] = Math.cos(slicePerimCircle) * this.radius / dividingSize
        this.position[1] = Math.sin(slicePerimCircle) * this.radius / dividingSize
    }

    draw() {
        var ctx = this.ctx
        
        ctx.save()
        var lineColor = "rgba(255,255,255,.2)"
						
        // Lines
        ctx.translate(canvas.width/2, canvas.height/2)
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



