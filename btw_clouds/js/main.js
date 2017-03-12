var renderer, 
    scene, 
    camera, 
    composer, 
    circle, 
    shield, 
    particle,
    mat_shader,
    mat_liquid

var mouseX = 0, 
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2

var position,
    target,
    tween

var frame = 0;
var uniforms = 
{
  time: { type: "f", value: 0.0 },
  emissive: { type: "v3", value: new THREE.Color(0xffffff)}
};

var audio,
    ctxAudio, 
    analyser, 
    source, 
    audioBuffer


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

function loadSound(){

    var request = new XMLHttpRequest();
    request.open('GET', 'space.mp3', true);
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


            // play sound
            source.start()


        }, function(){
          // error callback
          //
        })
      }
      request.send()
}

window.onload = function() {
    audioInit()
    init();
    animate();
    document.addEventListener( 'mousemove', onDocumentMouseMove, true );
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x5c5c5c, 1);
    document.getElementById('canvas').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 500;
    camera.position.y = 100;
    scene.add(camera);

    circle = new THREE.Object3D();
    particle = new THREE.Object3D();
    terrain_down = new THREE.Object3D();
    terrain_up = new THREE.Object3D();
    shield = new THREE.Object3D();
    
    scene.add(circle);
    scene.add(particle);
    scene.add(shield);
    scene.add(terrain_down);
    scene.add(terrain_up);
    

    
    // Shield
    var shield_form = new THREE.PointLight( 0xffffff, 2, 150 );
    shield_form.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(10, 1),
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true })
      )
    );

    shield_form.scale.x = shield_form.scale.y = shield_form.scale.z = 10;
    shield.add(shield_form);
    
    
    
    // Liquid sphere
    mat_liquid = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } )
    
    var	liquid_sphere = new THREE.Mesh( 
        new THREE.SphereGeometry( 60, 35, 35), 
        mat_liquid
    );
    
    circle.add( liquid_sphere );

 
    // Fog
    scene.fog = new THREE.Fog(0x5c5c5c,.1, 3000);
    
    
    // Plane
    var modifyGeo = new THREE.PlaneBufferGeometry( 50000, 50000, 1200, 1200 )
    var speed = new Float32Array( modifyGeo.getIndex().count );
    
    for ( var i = 0, len = modifyGeo.getIndex().count; i < len; i++) {
        speed[i] = Math.random() * 2 - 1;
    }
    modifyGeo.addAttribute( 'speed', new THREE.BufferAttribute( speed, 1 ) );
    
    mat_shader = new THREE.ShaderMaterial( {
            uniforms: THREE.UniformsUtils.merge( [
                THREE.ShaderLib.phong.uniforms, uniforms
            ]),
            lights: true,
            fog: true,
            side: THREE.DoubleSide,
            vertexShader: document.getElementById( 'vertexShader-Final' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader-Final' ).textContent
        } )
    
    var plane = new THREE.Mesh( 
        modifyGeo,
        mat_shader        
    );
    plane.rotation.x = -Math.PI/2   
    plane.position.y = -500;
    terrain_down.add( plane );
    
    var plane2 = plane.clone()
    plane2.rotation.x = Math.PI / 2 
    plane2.position.y = 500;
    terrain_up.add(plane2)
    
    lightsD1 = new THREE.PointLight( 0x2c3e50, 1, 4000 );
    lightsD1.position.set( 0, 300, -700 );
    scene.add( lightsD1 );
  
    window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
    
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update( time );
    frenquencyArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frenquencyArray);
    
    var BasseFreq = function(){
        var average = (frenquencyArray[0] + frenquencyArray[1] * frenquencyArray[2]) / 3
        return average
    }

    
    var AiguFreq = function(){
        var average = (frenquencyArray[69] + frenquencyArray[70] * frenquencyArray[71]) / 3
        return average
    }
    
    shield.rotation.x -= 0.0010;
    shield.rotation.y += 0.0020;
    
    terrain_down.position.z += 3
    terrain_up.position.z += 3
    

    mat_shader.uniforms.time.value = frame;
    mat_liquid.uniforms.time.value = frame + Math.cos(Math.max(0, AiguFreq()));
    frame += .1;
    
    if(terrain_up.position.z > 10000){
        terrain_up.position.z = 0
        terrain_down.position.z = 0
    }
    

    camera.position.x += ( mouseX - camera.position.x ) * .005;
    camera.position.y += ( - mouseY - camera.position.y ) * .005;

    
    camera.lookAt( scene.position );
    
    renderer.clear();

    renderer.render( scene, camera )
};


function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;
}

var direction = new THREE.Vector3(0, 2, 0); 

$(document).keydown(function(e) {
    switch(e.which) {
        case 38:
            if( circle.position.y < 700) {
                position = {y: circle.position.y };
                target = {y: circle.position.y + 200 };
                tween = new TWEEN.Tween(position)
                    .to(target, 500)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .onUpdate(update);

                tween.start();
            }
        break;

        case 40: 
            if( circle.position.y > -700) {
                position = {y: circle.position.y };
                target = {y: circle.position.y - 200 };
                tween = new TWEEN.Tween(position)
                    .to(target,500)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .onUpdate(update);

                tween.start();
            }
        break;

        default: return;
    }
    e.preventDefault();
});

function update() {
    circle.position.y = position.y;
    shield.position.y = position.y;
}
