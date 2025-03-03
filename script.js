// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Background Color (Fix Black Screen)
renderer.setClearColor(0x202020); // Dark grey background

// Lighting (Fix Dark Model)
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Brighter ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load 3D Model
const loader = new THREE.GLTFLoader();
loader.load('isometric_room.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, -1, 0); // Adjust model position if needed
    model.scale.set(1, 1, 1); // Scale model
    scene.add(model);
}, undefined, function (error) {
    console.error('Error loading model:', error);
});

// Set Initial Camera Position
camera.position.set(0, 2, 5);

// Add Orbit Controls (to move the camera)
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

// Handle Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
