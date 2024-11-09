// Curve.js
import * as THREE from "three";

const curvePath = [
  new THREE.Vector3(0, 0, 0), // Stage 3 position
  new THREE.Vector3(2, 1, 1), // Control point for the curve
  new THREE.Vector3(4, 1, 0), // Stage 4 position
];

const circularPath = new THREE.CatmullRomCurve3(curvePath, false, "catmullrom");

export default circularPath;
