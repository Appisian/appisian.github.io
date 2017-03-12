// ******************************************** //
// MARK: - Global variables
// ******************************************** //
/* Context */
var canvas, ctx

/* Audio */
var audio,
    musicEnded = false, 
    ctxAudio, 
    analyser, 
    source, 
    audioBuffer, 
    gainNode

/* Canvas elements */
var particlesManager = [], 
    reversedBarManager = [], 
    barManager = [], 
    image, 
    loopParticles = 0, 
    repeatWithDelay = 0,
    bars = 200,
    slicePerimCircle = Math.PI * 2 / bars,
    sourceImage = "assets/totoro.png",
    dividingTotoroSize = 1,
    totoroBigger = false

canvas = document.querySelector("canvas")
ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight



// ******************************************** //
// MARK: - Init audio
// ******************************************** //
function audioInit(){
    audio = new Audio()
	audio.crossOrigin = "anonymous"
	audio.controls = true
	audio.loop = false
	audio.autoplay = false
    
    ctxAudio = new AudioContext()
    analyser = ctxAudio.createAnalyser()
    
    loadSound()
}



// ******************************************** //
// MARK: - Load sound
// ******************************************** //
function loadSound(){
    var request = new XMLHttpRequest();
    request.open('GET', 'assets/ghasper.mp3', true);
    request.responseType = 'arraybuffer';
    
    // Retreive the music
    request.onload = function() {
        ctxAudio.decodeAudioData(request.response, function(buffer) {
            
            // success callback
            audioBuffer = buffer
            
            // Create sound from buffer
            source = ctxAudio.createBufferSource()
            source.buffer = audioBuffer
            
            source.addEventListener("ended",function(){
                musicEnded = true
            })
            
            // Create the filter
            filter = ctxAudio.createBiquadFilter()
            gainNode = ctxAudio.createGain();
            
            // Create the audio graph.
            source.connect(gainNode)
            gainNode.connect(analyser)
            
            analyser.connect(ctxAudio.destination)
            
            gainNode.gain.value = volumeBar.value
            updateVolume()
            
            // play sound
            source.start()
            
            // Call some functions
            initManager()
            infiniteParticles()
            loadCanvas()

        }, function(){
          // error callback
          //
        })
      }
      request.send()
}



// ******************************************** //
// MARK: - Audio volume
// ******************************************** //
var volumeBar = document.querySelector(".volumeBar")

// Disabled events of range input
volumeBar.disabled = true

// If range input value is modified
volumeBar.addEventListener("change",function(){
    updateVolume()
    gainNode.gain.value = this.value
})

// Update the text
function updateVolume(){
    document.querySelector(".currentVolume").innerHTML = volumeBar.value * 100 + "%"
}



// ******************************************** //
// MARK: - Init bars and reversed bars
// ******************************************** //
function initManager() {
    // Init the barManager with bar items and the reversedBarManager with reversed bar items
    for (var i = 0; i < bars; i++) {
        var bar = new Bar(ctx, slicePerimCircle * i)
        barManager.push(bar)

        var reversedBar = new ReversedBar(ctx, slicePerimCircle * i)
        reversedBarManager.push(reversedBar)
    }
}



// ******************************************** //
// MARK: - Init particles
// ******************************************** //
function infiniteParticles(){
    // Create 70 particles max
    if(loopParticles < 70){
        // Init the particle items with random velocity
        var particle = new Particle(ctx, Math.random() * bars, dividingTotoroSize)
        particlesManager.push(particle)

        loopParticles++
        
        // Repeat function with a random time up to 500 ms 
        clearInterval(repeatWithDelay)
        repeatWithDelay = setInterval(infiniteParticles, Math.random() * 500)
    }
    else {
        clearInterval(0)
    }
}



// ******************************************** //
// MARK: - Init shockwave 
// ******************************************** //
var shockwave = new Shockwave(ctx)



// ******************************************** //
// MARK: - Make a shockwave
// ******************************************** //
function makeAShockwave(){
    
    // Still update til the shockwave is out from canvas
    if(shockwave.size < canvas.width){
        requestAnimationFrame(makeAShockwave)
        shockwave.update()
        shockwave.draw()
        sourceImage = "assets/totoro-up.png"
    }
    else {
        // Reset settings of the shockwave object
        shockwave.size = 0
        shockwave.lineWidth = 0
        sourceImage = "assets/totoro.png"
    }
}



// ******************************************** //
// MARK: - Load canvas animation
// ******************************************** //
function loadCanvas(){
    
    requestAnimationFrame(loadCanvas)
    
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    // Get data from analyser (0 to 255) to frequencyArray
	frenquencyArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(frenquencyArray);      
    
    // Gradient for canvas
	var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 120, canvas.width/2, canvas.height/2, canvas.width)
	grd.addColorStop(0, "rgb(64, 64, 64)")
	grd.addColorStop(1, "rgba(0, 0, 0, 1)")
	ctx.fillStyle = grd
	ctx.fillRect(0, 0, canvas.width, canvas.height)

    
    // Get 3 high and low frequencies and making the avarage
    var highFreq = (frenquencyArray[69] * volumeBar.value / dividingTotoroSize  + frenquencyArray[70] * volumeBar.value / dividingTotoroSize + frenquencyArray[71] * volumeBar.value / dividingTotoroSize) / 3
    var lowFreq = (frenquencyArray[0] * volumeBar.value / dividingTotoroSize  + frenquencyArray[1] * volumeBar.value / dividingTotoroSize + frenquencyArray[2] * volumeBar.value / dividingTotoroSize) /3
    
    // Setting particles speed
    var speedUp = 1
    if(musicEnded == false){
        for(var i = 0; i < particlesManager.length; i++){
            if(highFreq > (150 * volumeBar.value / dividingTotoroSize)) {
                speedUp = 1.1
                
            }
            particlesManager[i].update(speedUp)
            particlesManager[i].draw()
        }
    }
    
    // Displaying Totoro
    image = new Image()
    ctx.beginPath()
    image.src = sourceImage
    ctx.drawImage(image, 0, 0 , image.width, image.height, canvas.width/2 - image.width/(2*dividingTotoroSize), canvas.height/2 - image.height/(2*dividingTotoroSize), image.width/dividingTotoroSize, image.height/dividingTotoroSize)
    ctx.closePath()
    
    // Update and draw barManager and reversedBarManager items
    for(var i = 0; i < barManager.length; i++){
        barManager[i].update(slicePerimCircle * i, frenquencyArray[i], dividingTotoroSize)
        barManager[i].draw()
    }
    for(var i = 0; i < reversedBarManager.length; i++){
        reversedBarManager[i].update(slicePerimCircle * i, frenquencyArray[i], dividingTotoroSize)
        reversedBarManager[i].draw()
    }

    // Display shockwave
    if(lowFreq > (220 * volumeBar.value / dividingTotoroSize)){
        if(shockwave.size === 0){
            makeAShockwave()
        }   
    }
    
    // Activation of range input
    if(volumeBar.disabled == true){
        volumeBar.disabled = false
    }
    
    // Stop animation of Totoro
    if(musicEnded == false){
        if(totoroBigger == true){
            dividingTotoroSize += .005
            if(dividingTotoroSize >= 1.5){
                totoroBigger = false
            }
        } else {
            dividingTotoroSize -= .005
            if(dividingTotoroSize <= 1){
                totoroBigger = true
            }
        }
    }
    
}

audioInit()
