/**
 * Initializes ThreeJS camera, scene, renderer and sphere objects
 */
function init() {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;

	scene = new THREE.Scene();

	for ( var i = 0; i < imgArray.length; i += 5 ) {
		var div = document.createElement( 'div' );
		div.className = 'pictureBox';
		div.style.backgroundImage = 'url("'+imgArray[i]+'")'

		var object = new THREE.CSS3DObject( div );
		scene.add( object );

		objects.push( object );
	}

	var vector = new THREE.Vector3();
	var spherical = new THREE.Spherical();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();
		spherical.set( 800, phi, theta );
		object.position.setFromSpherical( spherical );
		sphere.push( object );
	}

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );

	for (var i = objects.length - 1; i >= 0; i--) {
		setPos(objects[i], sphere[i]);
	}

	render();
	animate();

	window.addEventListener( 'resize', onWindowResize, false );

}

/**
 * Updates an object position and orientation
 *
 * @param      {object}  obj     The picture object
 * @param      {object}  target  The sphere target object
 */
function setPos(obj, target) {
	obj.position.x = target.position.x;
	obj.position.y = target.position.y;
	obj.position.z = target.position.z;
	var vector = new THREE.Vector3();
	vector.copy(target.position).multiplyScalar( 3 );
	obj.lookAt(vector);
}

/**
 * Updates scene size and proportions on windows resize
 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

	render();
	animate();
}

var clockwise = true;
var vx = 0;
var camAngle = 0;

/**
 * Updates the camera rotation acording to the mouse position
 * Calls render
 */
function animate() {
	var target = new THREE.Vector3(0, 0, 0);
	camAngle += 0.004;
	if (camAngle > 2*Math.PI) camAngle = 0;
	if (clockwise) {
        camera.position.x = (3000 * Math.sin(-camAngle * vx));
        camera.position.z = (3000 * Math.cos(-camAngle * vx));
	} else {
        camera.position.x = (3000 * Math.sin(camAngle * vx));
        camera.position.z = (3000 * Math.cos(camAngle * vx));
	}
	camera.lookAt(target);

	render();
	requestAnimationFrame(animate);
}

/**
 * Renders scene
 */
function render() {
	renderer.render( scene, camera );
}

/**
 * Takes a number from one range and calculates the number mapped to other range
 *
 * @param      {number}  value   The value to map
 * @param      {number}  min     The minimum of the original range
 * @param      {number}  max     The maximum of the original range
 * @param      {number}  newMin  The minimum of the new range
 * @param      {number}  newMax  The maximum of the new range
 * @return     {number}  The value mapped to the new range
 */
function mapN(value, min, max, newMin, newMax) {
	return (value - min) / (max - min) * (newMax - newMin) + newMin;
}

/**
 * Updates values on mouse movement
 */
document.addEventListener("mousemove", function(e) {
	var minV = 0;
	var maxV = 10;
	if(e.screenX < window.innerWidth / 2) {
		clockwise = false;
		vx = mapN(e.screenX, 0, innerWidth / 2, maxV, minV);
	} else {
		clockwise = true;
		vx = mapN(e.screenX, innerWidth / 2, innerWidth, minV, maxV);
	}
});