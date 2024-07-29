import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { useEffect, useRef } from 'react';
import clouds from './yea.png';
import earth from './nam.jpg';
import moonimg from './moon.jpg'

function App() {
  const show = useRef()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
  camera.position.setZ(50)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth - .1, window.innerHeight - .1)
  useEffect(() => {
    const geo = new THREE.SphereGeometry(15, 100, 100)
    const loader = new THREE.TextureLoader().load(earth)
    const mat = new THREE.MeshBasicMaterial({ map: loader })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.set(0, 0, .35)
    scene.add(mesh)

    const GeoCloud = new THREE.SphereGeometry(15.2, 100, 100);
    const CloudsLoader = new THREE.TextureLoader().load(clouds)
    const MatClouds = new THREE.MeshBasicMaterial({
      map: CloudsLoader,
      transparent: true
    })
    const CloudsMesh = new THREE.Mesh(GeoCloud, MatClouds)
    CloudsMesh.rotation.set(0, 0, .3)
    scene.add(CloudsMesh)

    const AtmosphereGeo = new THREE.SphereGeometry(15.8, 100, 100);
    const AtmosphereMat = new THREE.MeshBasicMaterial({
      color: '#00f',
      transparent: true,
      opacity: .05
    })
    const AtmoMesh = new THREE.Mesh(AtmosphereGeo, AtmosphereMat)
    scene.add(AtmoMesh)

    const OneAtmoGeo = new THREE.SphereGeometry(16.5, 100, 100);
    const OneAtmoMat = new THREE.MeshBasicMaterial({
      color: '#00f',
      transparent: true,
      opacity: .03
    })
    const OneAtmoMesh = new THREE.Mesh(OneAtmoGeo, OneAtmoMat)
    scene.add(OneAtmoMesh)
    for (let i = 0; i < 2500; i++) {
      const stargeo = new THREE.SphereGeometry(.115, 10, 10)
      const starmat = new THREE.MeshBasicMaterial({ color: '#fff' })
      const starmesh = new THREE.Mesh(stargeo, starmat)
      starmesh.position.x = THREE.MathUtils.randFloatSpread(500)
      starmesh.position.y = THREE.MathUtils.randFloatSpread(500)
      starmesh.position.z = THREE.MathUtils.randFloatSpread(500)
      scene.add(starmesh)
    }

    const Cop = new THREE.SphereGeometry(0, 100, 100)
    const copmat = new THREE.MeshBasicMaterial({
      color: '#fff',
      transparent: true,
      opacity: 0
    })
    const meshcop = new THREE.Mesh(Cop, copmat);
    scene.add(meshcop)

    const moonloader = new THREE.TextureLoader().load(moonimg)
    const moongeo = new THREE.SphereGeometry(4, 100, 100)
    const moonmat = new THREE.MeshBasicMaterial({
      map: moonloader
    })
    const moon = new THREE.Mesh(moongeo, moonmat)
    meshcop.add(moon)
    moon.position.setFromSphericalCoords(60, 300, 0)

    const controls = new OrbitControls(camera, renderer.domElement)
    function an() {
      requestAnimationFrame(an);
      mesh.rotation.y -= .0025;
      moon.rotation.y += .0035;
      meshcop.rotation.y += .0035;
      renderer.render(scene, camera)
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    an()
    show.current.appendChild(renderer.domElement)
  }, [])
  return (
    <div className="App" ref={show}>

    </div>
  );
}

export default App;
