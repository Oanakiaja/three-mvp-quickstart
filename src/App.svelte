<script lang="ts">
  import { onMount } from "svelte";
  import { OrbitControls } from "./three-utils";
  import * as THREE from "three";
  import Stats from "stats.js";

  let canvas;
  let renderer;
  let camera;
  let scene;
  let controls;
  let light;

  let stats;

  onMount(() => {
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);

    camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      500
    );
    camera.position.set(0, 50, 50);

    const onWindowChange = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateMatrix();
    };
    window.addEventListener("resize", onWindowChange);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.minDistance = 20;
    controls.maxDistance = 1000;

    scene = new THREE.Scene();

    const color = 0xffffff;
    const intensity = 1;
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;

    const planeSize = 40;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotation.x = Math.PI * -0.5;
    scene.add(planeMesh);

    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(cubeSize + 1, cubeSize / 2 , 0);
    scene.add(cubeMesh);

    const render = () => {
      stats.begin();
      renderer.render(scene, camera);
      stats.end();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  });
</script>

<main>
  <canvas id={"scene"} bind:this={canvas} />
</main>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
