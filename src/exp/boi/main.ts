import { Scene, OrthographicCamera, WebGLRenderer, IcosahedronGeometry, MeshBasicMaterial, Mesh } from 'three';

const scene = new Scene();
const camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new IcosahedronGeometry( 100, 0 );
const material = new MeshBasicMaterial( { color: '#aff' } );
const ico = new Mesh( geometry, material );
scene.add( ico );

camera.position.z = 100;

function animate() {
	requestAnimationFrame( animate );
  ico.rotation.x += 0.01
  ico.rotation.y += 0.01
	renderer.render( scene, camera );
}

animate();