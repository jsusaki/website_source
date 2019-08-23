// Initialize Resources
function init() {
    // Colors
    const BLACK = 0x000000;
    const DARK_GRAY = 0x0C0C0C0;
    const GRAY = 0x9C9C9C;
    const LIGHT_GRAY = 0x808080;
    const WHITE = 0xFFFFFF;

    const FOV = 50;
    const NEAR = 0.1;
    const FAR = 1000;
    const ASPECT_RATIO = window.innerWidth / window.innerHeight;

    //var windowHalfX = window.innerWidth / 2;
    //var windowHalfY = window.innerHeight / 2;

    cameraHorzLimit = 4;
    cameraVertLimit = 4;

    var scene = new THREE.Scene();
    //var stats = initStats();
    var clock = new THREE.Clock();

    var camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
    camera.position.set(0, 0, 13);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(BLACK, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMapEnabled = true;

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Axis
    //var axes = new THREE.AxisHelper(20);
    //scene.add(axes);

    // Grid
    //var gridXZ = new THREE.GridHelper(30, 30);
    //scene.add(gridXZ);

    // Ambient Light
    var ambientLight = new THREE.AmbientLight(0x0C0C0C);
    scene.add(ambientLight);

    // Spotlight
    var spotLight = new THREE.SpotLight(WHITE);
    spotLight.position.set(0, 5, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Track Ball Control
    var trackballControls = new THREE.TrackballControls(camera);
    trackballControls.rotateSpeed = 3;
    //trackballControls.zoomSpeed = 1.0;
    //trackballControls.panSpeed = 1.0;
    trackballControls.noZoom = true;
    trackballControls.noPan = true;
    trackballControls.staticMoving = false;
    trackballControls.dynamicDampingFactor = 0.5;
    trackballControls.enabled = false;


    // Create 3x3x3 Cube
    var group = new THREE.Object3D();

    var cubeSize = 1;
    var X_START_POS = -1 * cubeSize;
    var Y_START_POS = -1 * cubeSize;
    var Z_START_POS = -1 * cubeSize;
    var dx = 1, dy = 1, dz = 1;
    var cubeArray = [];
    var list = [];
    var ID = 1;

    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: 0.9 });

    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
            for (var i = 0; i < 3; i++) {
                cubeArray[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cubeArray[i].position.x = dx * i * X_START_POS + cubeSize;
                cubeArray[i].position.y = dy * j * Y_START_POS + cubeSize;
                cubeArray[i].position.z = dz * k * Z_START_POS + cubeSize;
                group.add(cubeArray[i]);
                list.push(cubeArray[i]);
            }
        }
    }

    group.rotation.x = 0;
    group.rotation.y = 0;
    group.rotation.z = 0;
    group.scale.x = 1;
    group.scale.y = 1;
    group.scale.z = 1;

    scene.add(group);

    for (i = 0; i < list.length; i++) {
        new TWEEN.Tween(list[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out)
            .start();
    }
    setInterval(changeID, 5000);


    // Create a Hidden Plane for Raycaster to track mouse position
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, visible: false });
    const hiddenPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    // Position hidden plane between the camera and object
    hiddenPlane.position.set(0, 0, 3);
    scene.add(hiddenPlane);

    // Create Mouse Position
    var mouse = new THREE.Vector2();
    var intersectPoint = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();

    // Get mouse coordinate
    function onMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // If window is resized, correct its window aspect ratio
    function onWindowResize() {
        camera.aspect = ASPECT_RATIO;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Renderer Output
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var group_rot;
    var ROT_SPEED = 1;
    // Animate Loop
    function animate() {
        TWEEN.update();
        updateCamera();
        requestAnimationFrame(animate);
        render();
    }

    // Offset the camera x/y based on the mouse's position in the window
    function updateCamera() {
        camera.position.x += (cameraHorzLimit * mouse.x - camera.position.x) * 0.05;
        camera.position.y += (cameraVertLimit * mouse.y - camera.position.y) * 0.05;
    }

    // Render Loop
    function render() {
        // Trackball control update
        var delta = clock.getDelta();
        trackballControls.update(delta);

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObject(hiddenPlane);
        if (intersects.length > 0) {
            intersectPoint = intersects[0].point;
        }

        renderer.render(scene, camera);
    }

    function changeID() {
        switch (ID) {
            case 1: CubeFormation(); break;
            case 2: CubeExpandedFormation(); break;
            case 3: RandomFormation(); break;
            case 4: CubeExpandedFormation(); break;
            default: CubeFormation(); break;
        }

        ID++;
        if (ID > 4) {
            ID = 1;
        }
    }

    var x, y, z
    // Cube
    function CubeFormation() {
        var c = 0;
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var i = 0; i < 3; i++) {
                    var rot = Math.PI / 2;
                    x = dx * i * X_START_POS + cubeSize;
                    y = dy * j * Y_START_POS + cubeSize;
                    z = dz * k * Z_START_POS + cubeSize;
                    new TWEEN.Tween(list[c].position).to({
                        x: x,
                        y: y,
                        z: z
                    }, 1000)
                        .easing(TWEEN.Easing.Exponential.InOut).start();

                    new TWEEN.Tween(list[c].rotation).to({
                        x: 0,
                        y: rot,
                        z: 0
                    }, 1000)
                        .easing(TWEEN.Easing.Cubic.InOut).start();
                    c++;
                }
            }
        }
    }

    // Expand
    function CubeExpandedFormation() {
        var c = 0;
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var i = 0; i < 3; i++) {
                    var rot = Math.PI / 2;
                    x = 2 * i * X_START_POS + cubeSize + 1;
                    y = 2 * j * Y_START_POS + cubeSize + 1;
                    z = 2 * k * Z_START_POS + cubeSize;
                    new TWEEN.Tween(list[c].position).to({
                        x: x,
                        y: y,
                        z: z
                    }, 1000)
                        .easing(TWEEN.Easing.Exponential.InOut).start();

                    new TWEEN.Tween(list[c].rotation).to({
                        x: 0,
                        y: rot,
                        z: 0
                    }, 1000)
                        .easing(TWEEN.Easing.Cubic.InOut).start();
                    c++;
                }
            }
        }
    }

    // Random
    function RandomFormation() {
        for (var i = 0; i < list.length; i++) {
            var rot = Math.PI / 2;
            var vx = Math.random() * 10 - 5;
            var vy = Math.random() * 10 - 5;
            var vz = Math.random() * 10 - 5;

            new TWEEN.Tween(list[i].position).to({
                x: vx,
                y: vy,
                z: vz
            }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();

            new TWEEN.Tween(list[i].rotation).to({
                x: 0,
                y: 0,
                z: 0
            }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    }

    // Game of Life
    function GameOfLife() {
        // Cell
        // Grid
        // Rule
    }
    animate();
}