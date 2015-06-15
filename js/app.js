var mesh, camera, scene, renderer;

function init(stl_name) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 200;
    scene.add( camera );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = 0; 
    directionalLight.position.y = 0; 
    directionalLight.position.z = 1; 
    directionalLight.position.normalize();
    scene.add( directionalLight );
    
    var material = new THREE.MeshLambertMaterial({
        overdraw:true,
        color: 0xfdd017,
        shading: THREE.FlatShading
    });
    
    var loader = new THREE.STLLoader();
    loader.load( stl_name, function ( geometry ) {
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = 5;
        mesh.rotation.z = .25;
        scene.add( mesh );
    });

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    renderer.domElement.style.top = '800px';
    
    renderer.render( scene, camera );
}

function animate() {
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    render();
}

function render() {
    if (mesh) {
        mesh.rotation.z += 0.01;
    }
    renderer.render( scene, camera );
}
