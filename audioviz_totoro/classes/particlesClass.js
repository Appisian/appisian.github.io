class Particle {

    constructor(ctx, slicePerimCircle, dividingSize) {
        this.ctx = ctx
        
        this.radius = 5 // Circle radius
        this.speed = Math.random() * 2 + 0.5 // Random particle speed
        this.positionOnCircle = slicePerimCircle

        this.position = vec2.create()
        this.velocity = vec2.create()

        this.position[0] = canvas.width / 2
        this.position[1] = canvas.height / 2

        this.velocity[0] = this.speed * Math.cos(slicePerimCircle)
        this.velocity[1] = this.speed * Math.sin(slicePerimCircle)
        
        this.size = 1 / dividingSize // making it smaller when Totoro goes away
        
        // Setting random color for the particle
        this.fillColor = "rgb("+this.randomColor()+","+this.randomColor()+","+this.randomColor()+")"
    }

    update(speedUp = 1) {
        // Particle out of the canvas view
        if(this.position[0] > canvas.width || this.position[0] < 0 - 3 * this.size){
            this.reset()
        }
        else if(this.position[1] > canvas.height || this.position[1] < 0 - 3 * this.size){
            this.reset()
        }
        
        // Change speed and size
        this.velocity[0] *= speedUp
        this.velocity[1] *= speedUp
        this.size += .004
        
        // Make it move
        vec2.add(this.position, this.position, this.velocity)
    }

    draw() {
        var ctx = this.ctx
        
        ctx.save()
        ctx.translate(this.position[0], this.position[1])

        ctx.beginPath()
        ctx.arc(0, 0, 3 * this.size, 0, 2*Math.PI,true)
        ctx.globalCompositeOperation = "lighter"
        ctx.shadowColor = "white"
        ctx.shadowBlur = 10
        ctx.fillStyle = this.fillColor
        ctx.fill()
        ctx.closePath()

        ctx.restore()
    }
    
    reset() {
        
        // Reset setting
        this.speed = Math.random() * 2 + 1
        
        this.position[0] = canvas.width / 2
        this.position[1] = canvas.height / 2

        this.velocity[0] = this.speed * Math.cos(this.positionOnCircle)
        this.velocity[1] = this.speed * Math.sin(this.positionOnCircle)
        
        this.size = 1
        this.fillColor = "rgb("+this.randomColor()+","+this.randomColor()+","+this.randomColor()+")"
    }
    
    // Random color
    randomColor() {
        return Math.floor(Math.random() * 255)
    }
}