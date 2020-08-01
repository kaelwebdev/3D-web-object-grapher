/**
 * @author kaelwebdev / https://github.com/kaelwebdev
 */
var scene, camera, renderer, sceneCopy;
var ultiTiempo;
var labels = [];
var objetos = [];
var appW = window.innerWidth * 0.75;
var appH = window.innerHeight;

var seleccionado = 0;
var selectTextura;
var selectTT;

var cRLuz = 0;
var cGLuz = 0;
var cBLuz = 0;

var pXLuz = 1;
var pYLuz = 1;
var pZLuz = 1;

var rX = 4;
var rY = 4;

var direccional;

function webGLStart() {
	iniciarEscena();
	ultiTiempo = Date.now();
	animarEscena();
}

function crearLuz() {
	var luzColor = rgbToHex(cRLuz, cGLuz, cBLuz);
	console.log(luzColor);
	direccional = new THREE.DirectionalLight(luzColor, iLuz);
	direccional.position.set(pXLuz, pYLuz, pZLuz);
	scene.add(direccional);
}

function updatelight() {
	direccional.intensity = iLuz;
	direccional.color.setRGB(cRLuz, cGLuz, cBLuz);
	direccional.position.set(pXLuz, pYLuz, pZLuz);
	scene.add(direccional);
}

function crearPlanoCarteciano() {
	var grilla = new THREE.GridHelper(100, 10);
	scene.add(grilla);

	var axes = new THREE.AxisHelper(100);
	scene.add(axes);

	var yLabelTexture = textTure(128, "Bold", "48px", "Arial", "255,255,255,1", "Y", 64, 50);
	var yLabel = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),
		new THREE.MeshBasicMaterial({
			map: yLabelTexture,
			side: THREE.DoubleSide,
			transparent: true
		})
	);
	yLabel.position.set(0, 100, 0);
	labels.push(yLabel);
	scene.add(yLabel);

	var xLabelTexture = textTure(128, "Bold", "48px", "Arial", "255,255,255,1", "X", 64, 50);
	var xLabel = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),
		new THREE.MeshBasicMaterial({
			map: xLabelTexture,
			side: THREE.DoubleSide,
			transparent: true
		})
	);
	xLabel.position.set(100, 0, 0);
	labels.push(xLabel);
	scene.add(xLabel);

	var zLabelTexture = textTure(128, "Bold", "48px", "Arial", "255,255,255,1", "Z", 64, 50);
	var zLabel = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),
		new THREE.MeshBasicMaterial({
			map: zLabelTexture,
			side: THREE.DoubleSide,
			transparent: true
		})
	);
	zLabel.position.set(0, 0, 100);
	labels.push(zLabel);
	scene.add(zLabel);
}
function iniciarEscena() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColorHex( 0x1E2019, 1 );
	renderer.setSize(appW, appH);
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, appW / appH, 1, 500);
	camera.position.set(200, 200, 200);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	scene = new THREE.Scene();

	controlCamara = new THREE.OrbitControls(camera, renderer.domElement);

	crearLuz();

	crearPlanoCarteciano();

}

function animarEscena() {
	requestAnimationFrame(animarEscena);
	renderEscena();
	actualizarEscena();
}

function renderEscena() {
	renderer.render(scene, camera);
	//console.log("iLuz: "+iLuz);
}

function actualizarEscena() {
	var delta = (Date.now() - ultiTiempo) / 1000;
	ultiTiempo = Date.now();

	for (var i = 0; i < labels.length; i++) {
		labels[i].lookAt(camera.position);
	};

	controlCamara.update();

}