class Shockwave {
                
    constructor(ctx) {
        this.ctx = ctx // context
        
        this.position = vec2.create()

        this.position[0] = canvas.width/2 // x 
        this.position[1] = canvas.height/2 // y
        
        this.size = 0 // circle radius
        this.lineWidth = 5
    }

    update() {
        // Making it bigger
        this.size += 70
        this.lineWidth += 7
    }

    draw() {
        var ctx = this.ctx
        ctx.save()
        
        // Glowing effect
        ctx.shadowColor = "rgb(255 , 255, 240)"
        ctx.shadowBlur = 20
        
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = "rgb(255 , 255, 240)"
        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.size, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()
        
        ctx.restore()
        
    }
}



