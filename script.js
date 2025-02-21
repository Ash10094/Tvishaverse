// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Brighter light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load 3D Model
const loader = new THREE.GLTFLoader();
loader.load('./isometric_room.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, -1, 0); // Adjust model position if needed
    model.scale.set(1, 1, 1); // Scale the model if too big or small
    scene.add(model);
}, undefined, function (error) {
    console.error('Error loading model:', error);
});

// Camera Position
camera.position.set(0, 2, 5); // Move camera further back

// Orbit Controls (optional, add this if you want to rotate the model)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
