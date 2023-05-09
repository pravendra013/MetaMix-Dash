// import React, { useRef, useEffect, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { Box3, Vector3, DoubleSide, MeshStandardMaterial, PointLight, AmbientLight, DirectionalLight } from 'three';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';
// import * as crypt from '../utils/crypto.js';
// import { Dialog, DialogContent, IconButton } from '@mui/material';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import Box from '@mui/material/Box';

// //raw_mhd_mha
// import '@kitware/vtk.js/favicon';
// import '@kitware/vtk.js/Rendering/Profiles/Volume';
// import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';
// import vtkLiteHttpDataAccessHelper from '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper';
// import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
// import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
// import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
// import vtkITKHelper from '@kitware/vtk.js/Common/DataModel/ITKHelper';
// import vtkRenderer from '@kitware/vtk.js/Rendering/WebGPU/Renderer';
// // import vtk from 'vtk.js';

// import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
// import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
// // import vtkRenderWindowInteractor from 'vtk.js-interactorstylempw/Rendering/Core/RenderWindowInteractor';

// const scene = new THREE.Scene();
// const slicerMesh = new THREE.Mesh();

// //main
// function View3D({ setPopup, URL, extension }) {
//     const groupRef = useRef(scene);
//     const slicerRef = useRef(slicerMesh);
//     const [planeVisible, setPlaneVisible] = useState(true);
//     const [planePosition, setPlanePosition] = useState(new Vector3());
//     const [stl, setStl] = useState(false);
//     const [obj, setObj] = useState(false);
//     const [fbx, setFbx] = useState(false);
//     const [mha, setMha] = useState(false);
//     const containerRef = useRef();

//     const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

//     // const render = useRef(0);

//     //mha_variables
//     const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//         background: [0, 0, 0],
//         container: containerRef.current
//     });
//     fullScreenRenderer.getContainer().style.zIndex = '1';

//     const renderer = fullScreenRenderer.getRenderer();

//     // const renderWindow = fullScreenRenderer.getRenderWindow();

//     const renderWindow = vtkRenderWindow.newInstance({
//         background: [1, 0, 0],
//         container: containerRef.current
//     });

//     // const renderer = renderWindow.getRenderer();
//     renderWindow.addRenderer(renderer);
//     renderWindow.render();

//     const actor = vtkVolume.newInstance();
//     const mapper = vtkVolumeMapper.newInstance();
//     mapper.setSampleDistance(0.7);
//     actor.setMapper(mapper);

//     const ctfun = vtkColorTransferFunction.newInstance();

//     ctfun.addRGBPoint(2000.0, 1.0, 1.0, 1.0); //white color
//     const ofun = vtkPiecewiseFunction.newInstance();
//     ofun.addPoint(0.0, 0.0);
//     ofun.addPoint(120.0, 0.7);
//     ofun.addPoint(300.0, 0.6);
//     actor.getProperty().setRGBTransferFunction(0, ctfun);
//     actor.getProperty().setScalarOpacity(0, ofun);
//     actor.getProperty().setScalarOpacityUnitDistance(0, 3.5);
//     actor.getProperty().setInterpolationTypeToLinear();
//     actor.getProperty().setUseGradientOpacity(0, true);
//     actor.getProperty().setGradientOpacityMinimumValue(1, 10);
//     actor.getProperty().setGradientOpacityMinimumOpacity(1, 1.0);
//     actor.getProperty().setGradientOpacityMaximumValue(0, 250);
//     actor.getProperty().setGradientOpacityMaximumOpacity(0, 8.0);
//     actor.getProperty().setShade(true);
//     actor.getProperty().setAmbient(0.4);
//     actor.getProperty().setDiffuse(0.3);
//     actor.getProperty().setSpecular(0.5);
//     actor.getProperty().setSpecularPower(6.0);

//     // const url = 'http://localhost:9000/ftp/output_new.mha?${new Date().getTime()}';
//     const url = 'http://localhost:9000/ftp/output_new.mha';
//     const fileName = 'output_new.mha';

//     useEffect(() => {
//         const renderSTL = (url) => {
//             const loader = new STLLoader();

//             loader.load(`${url}?${new Date().getTime()}`, (geometry) => {
//                 const material = new MeshStandardMaterial({
//                     color: 'white', // set color to white
//                     metalness: 0.11,
//                     roughness: 0.51,
//                     side: DoubleSide
//                 });

//                 const mesh = new THREE.Mesh(geometry, material);

//                 scene.current.add(mesh);

//                 const bbox = new Box3().setFromObject(mesh);
//                 const center = bbox.getCenter(new Vector3());
//                 mesh.position.sub(center); // center the model

//                 scene.current.scale.set(0.1, 0.1, 0.1);

//                 setPlanePosition(center);

//                 slicerMesh.current.position.x = bbox.max.x;

//                 // Add lights to the scene
//                 const pointLight = new PointLight(0xffffff, 0.7);
//                 pointLight.position.set(1, 1, 1);
//                 scene.current.add(pointLight);
//                 const ambientLight = new AmbientLight(0xbfbfbf, 0.5);
//                 scene.current.add(ambientLight);

//                 const directionalLight = new DirectionalLight(0xffffff, 1);
//                 directionalLight.position.set(1, 1, 1);
//                 scene.current.add(directionalLight);
//             });
//             setStl(true);
//         };

//         const renderOBJ = (url) => {
//             const loader = new OBJLoader(); // use the OBJLoader instead of FBXLoader
//             loader.load(`${url}?${new Date().getTime()}`, (object) => {
//                 object.traverse((child) => {
//                     if (child.isMesh) {
//                         // Set the material to the original color
//                         child.material.color = child.geometry.attributes.color;

//                         child.material.metalness = 0.1;
//                         child.material.roughness = 0.1;
//                         child.material.side = DoubleSide;

//                         const bbox = new Box3().setFromObject(child);
//                         const center = bbox.getCenter(new Vector3());
//                         child.position.sub(center); // center the model

//                         scene.current.add(child);

//                         scene.current.scale.set(15, 15, 15);

//                         // Set the position of the slicer

//                         slicerMesh.current.position.x = bbox.max.x;

//                         // Add lights to the scene
//                         const pointLight = new PointLight(0xffffff, 0.3);
//                         pointLight.position.set(1, 1, 1);
//                         scene.current.add(pointLight);
//                         const ambientLight = new AmbientLight(0xbfbfbf, 0.3);
//                         scene.current.add(ambientLight);

//                         const directionalLight = new DirectionalLight(0xffffff, 0.2);
//                         directionalLight.position.set(1, 1, 1);
//                         scene.current.add(directionalLight);
//                     }
//                 });
//             });
//             setObj(true);
//         };

//         const renderFBX = (url) => {
//             const loader = new FBXLoader();
//             groupRef.current.children.length = 0;
//             loader.load(`${url}?${new Date().getTime()}`, (object) => {
//                 object.traverse((child) => {
//                     if (child.isMesh) {
//                         // Set the material to the original color
//                         child.material.color = child.geometry.attributes.color;

//                         child.material.metalness = 0.1;
//                         child.material.roughness = 0.5;
//                         child.material.side = DoubleSide;

//                         const bbox = new Box3().setFromObject(child);
//                         const center = bbox.getCenter(new Vector3());
//                         child.position.sub(center); // center the model

//                         scene.current.add(child);

//                         scene.current.scale.set(0.04, 0.04, 0.04);

//                         // Set the position of the slicer
//                         setPlanePosition(center);
//                         // slicerRef.current.position.x = bbox.max.x;
//                         slicerMesh.current.position.x = bbox.max.x;

//                         // Add lights to the scene
//                         const pointLight = new PointLight(0xffffff, 1);
//                         pointLight.position.set(1, 1, 1);
//                         scene.current.add(pointLight);
//                         const ambientLight = new AmbientLight(0xbfbfbf, 1);
//                         scene.current.add(ambientLight);

//                         const directionalLight = new DirectionalLight(0xffffff, 0.5);
//                         directionalLight.position.set(1, 1, 1);
//                         scene.current.add(directionalLight);
//                     }
//                 });
//             });
//             setFbx(true);
//         };

//         async function update() {
//             const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(url);

//             const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(null, volumeArrayBuffer, fileName);
//             console.log(itkImage, 'itk');

//             webWorker.terminate();
//             renderWindow.render();

//             const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);

//             mapper.setInputData(vtkImage);
//             renderer.addVolume(actor);
//             renderer.resetCamera();
//             renderer.getActiveCamera().zoom(1); //size
//             renderer.getActiveCamera().elevation(50); //camera angle
//             renderer.updateLightsGeometryToFollowCamera();
//             renderWindow.render();

//             console.log(vtkImage, 'image');
//             setMha(true);
//         }
//         vtkResourceLoader.loadScript('https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js').then(update);

//         if (extension === '.stl') renderSTL(URL);
//         else if (extension === '.obj') renderOBJ(URL);
//         else if (extension === '.fbx') renderFBX(URL);
//         else if (extension === '.mha' || extension === '.raw' || extension === '.mhd') update();
//     }, [URL]);

//     useEffect(() => {
//         const handleResize = () => {
//             setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const togglePlane = () => {
//         setPlaneVisible(!planeVisible);
//     };

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 maxWidth="lg"
//                 fullWidth
//                 onClose={() => {
//                     setPopup(false);
//                 }}
//                 onBackdropClick={() => {
//                     setPopup(false);
//                 }}
//                 onEscapeKeyDown={() => {
//                     setPopup(false);
//                 }}
//             >
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '0',
//                         right: '0'
//                     }}
//                 >
//                     <IconButton
//                         onClick={() => {
//                             setPopup(false);
//                         }}
//                         sx={{ zIndex: 1 }}
//                     >
//                         <CancelRoundedIcon sx={{ backgroundColor: 'grey' }} />
//                     </IconButton>
//                 </Box>

//                 <DialogContent
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: '100%',
//                         backgroundColor: 'black'
//                     }}
//                 >
//                     {stl && (
//                         <div style={{ position: 'relative' }}>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     marginLeft: '-1.4rem',
//                                     backgroundColor: 'black'
//                                 }}
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {obj && (
//                         <div style={{ position: 'relative' }}>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     backgroundColor: 'black'
//                                 }}
//                                 colorManagement
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {fbx && (
//                         <div>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     backgroundColor: 'black'
//                                 }}
//                                 colorManagement
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {mha && (
//                         <>
//                             <div ref={containerRef} style={{ width: 'auto', height: 'auto' }} />
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }

// export default View3D;

// ==================object show on full screen=============
// import React, { useRef, useEffect, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { Box3, Vector3, DoubleSide, MeshStandardMaterial, PointLight, AmbientLight, DirectionalLight } from 'three';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';
// import * as crypt from '../utils/crypto.js';
// import { Dialog, DialogContent, IconButton } from '@mui/material';
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import Box from '@mui/material/Box';

// //raw_mhd_mha
// import '@kitware/vtk.js/favicon';
// import '@kitware/vtk.js/Rendering/Profiles/Volume';
// import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';
// import vtkLiteHttpDataAccessHelper from '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper';
// import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
// import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
// import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
// import vtkITKHelper from '@kitware/vtk.js/Common/DataModel/ITKHelper';
// import vtkRenderer from '@kitware/vtk.js/Rendering/WebGPU/Renderer';
// // import vtk from 'vtk.js';

// import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';

// const scene = new THREE.Scene();
// const slicerMesh = new THREE.Mesh();

// //main
// function View3D({ setPopup, URL, extension }) {
//     const groupRef = useRef(scene);
//     const slicerRef = useRef(slicerMesh);
//     const [planeVisible, setPlaneVisible] = useState(true);
//     const [planePosition, setPlanePosition] = useState(new Vector3());
//     const [stl, setStl] = useState(false);
//     const [obj, setObj] = useState(false);
//     const [fbx, setFbx] = useState(false);
//     const [mha, setMha] = useState(false);
//     const containerRef = useRef();

//     const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

//     // const render = useRef(0);

//     //mha_variables

//     // const url = 'http://localhost:9000/ftp/output_new.mha?${new Date().getTime()}';
//     const url = 'http://localhost:9000/ftp/output_new.mha';
//     const fileName = 'output_new.mha';

//     useEffect(() => {
//         const renderSTL = (url) => {
//             const loader = new STLLoader();

//             loader.load(`${url}?${new Date().getTime()}`, (geometry) => {
//                 const material = new MeshStandardMaterial({
//                     color: 'white', // set color to white
//                     metalness: 0.11,
//                     roughness: 0.51,
//                     side: DoubleSide
//                 });

//                 const mesh = new THREE.Mesh(geometry, material);

//                 scene.current.add(mesh);

//                 const bbox = new Box3().setFromObject(mesh);
//                 const center = bbox.getCenter(new Vector3());
//                 mesh.position.sub(center); // center the model

//                 scene.current.scale.set(0.1, 0.1, 0.1);

//                 setPlanePosition(center);

//                 slicerMesh.current.position.x = bbox.max.x;

//                 // Add lights to the scene
//                 const pointLight = new PointLight(0xffffff, 0.7);
//                 pointLight.position.set(1, 1, 1);
//                 scene.current.add(pointLight);
//                 const ambientLight = new AmbientLight(0xbfbfbf, 0.5);
//                 scene.current.add(ambientLight);

//                 const directionalLight = new DirectionalLight(0xffffff, 1);
//                 directionalLight.position.set(1, 1, 1);
//                 scene.current.add(directionalLight);
//             });
//             setStl(true);
//         };

//         const renderOBJ = (url) => {
//             const loader = new OBJLoader(); // use the OBJLoader instead of FBXLoader
//             loader.load(`${url}?${new Date().getTime()}`, (object) => {
//                 object.traverse((child) => {
//                     if (child.isMesh) {
//                         // Set the material to the original color
//                         child.material.color = child.geometry.attributes.color;

//                         child.material.metalness = 0.1;
//                         child.material.roughness = 0.1;
//                         child.material.side = DoubleSide;

//                         const bbox = new Box3().setFromObject(child);
//                         const center = bbox.getCenter(new Vector3());
//                         child.position.sub(center); // center the model

//                         scene.current.add(child);

//                         scene.current.scale.set(15, 15, 15);

//                         // Set the position of the slicer

//                         slicerMesh.current.position.x = bbox.max.x;

//                         // Add lights to the scene
//                         const pointLight = new PointLight(0xffffff, 0.3);
//                         pointLight.position.set(1, 1, 1);
//                         scene.current.add(pointLight);
//                         const ambientLight = new AmbientLight(0xbfbfbf, 0.3);
//                         scene.current.add(ambientLight);

//                         const directionalLight = new DirectionalLight(0xffffff, 0.2);
//                         directionalLight.position.set(1, 1, 1);
//                         scene.current.add(directionalLight);
//                     }
//                 });
//             });
//             setObj(true);
//         };

//         const renderFBX = (url) => {
//             const loader = new FBXLoader();
//             groupRef.current.children.length = 0;
//             loader.load(`${url}?${new Date().getTime()}`, (object) => {
//                 object.traverse((child) => {
//                     if (child.isMesh) {
//                         // Set the material to the original color
//                         child.material.color = child.geometry.attributes.color;

//                         child.material.metalness = 0.1;
//                         child.material.roughness = 0.5;
//                         child.material.side = DoubleSide;

//                         const bbox = new Box3().setFromObject(child);
//                         const center = bbox.getCenter(new Vector3());
//                         child.position.sub(center); // center the model

//                         scene.current.add(child);

//                         scene.current.scale.set(0.04, 0.04, 0.04);

//                         // Set the position of the slicer
//                         setPlanePosition(center);
//                         // slicerRef.current.position.x = bbox.max.x;
//                         slicerMesh.current.position.x = bbox.max.x;

//                         // Add lights to the scene
//                         const pointLight = new PointLight(0xffffff, 1);
//                         pointLight.position.set(1, 1, 1);
//                         scene.current.add(pointLight);
//                         const ambientLight = new AmbientLight(0xbfbfbf, 1);
//                         scene.current.add(ambientLight);

//                         const directionalLight = new DirectionalLight(0xffffff, 0.5);
//                         directionalLight.position.set(1, 1, 1);
//                         scene.current.add(directionalLight);
//                     }
//                 });
//             });
//             setFbx(true);
//         };

//         async function update() {
//             const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(url);

//             const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(null, volumeArrayBuffer, fileName);
//             console.log(itkImage, 'itk');

//             webWorker.terminate();
//             const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);

//             // const renderer = vtkRenderer.newInstance();
//             // const renderWindow = vtkRenderWindow.newInstance({
//             //     background: [0, 0, 0],
//             //     container: containerRef.current
//             // });
//             // renderWindow.addRenderer(renderer);
//             const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//                 background: [0, 0, 0],
//                 container: containerRef.current
//             });
//             fullScreenRenderer.getContainer().style.zIndex = '1';
//             const renderer = fullScreenRenderer.getRenderer();

//             const renderWindow = fullScreenRenderer.getRenderWindow();

//             renderWindow.render();

//             const actor = vtkVolume.newInstance();
//             const mapper = vtkVolumeMapper.newInstance();
//             mapper.setSampleDistance(0.7);
//             actor.setMapper(mapper);

//             const ctfun = vtkColorTransferFunction.newInstance();

//             ctfun.addRGBPoint(2000.0, 1.0, 1.0, 1.0); //white color
//             const ofun = vtkPiecewiseFunction.newInstance();
//             ofun.addPoint(0.0, 0.0);
//             ofun.addPoint(120.0, 0.7);
//             ofun.addPoint(300.0, 0.6);
//             actor.getProperty().setRGBTransferFunction(0, ctfun);
//             actor.getProperty().setScalarOpacity(0, ofun);
//             actor.getProperty().setScalarOpacityUnitDistance(0, 3.5);
//             actor.getProperty().setInterpolationTypeToLinear();
//             actor.getProperty().setUseGradientOpacity(0, true);
//             actor.getProperty().setGradientOpacityMinimumValue(1, 10);
//             actor.getProperty().setGradientOpacityMinimumOpacity(1, 1.0);
//             actor.getProperty().setGradientOpacityMaximumValue(0, 250);
//             actor.getProperty().setGradientOpacityMaximumOpacity(0, 8.0);
//             actor.getProperty().setShade(true);
//             actor.getProperty().setAmbient(0.4);
//             actor.getProperty().setDiffuse(0.3);
//             actor.getProperty().setSpecular(0.5);
//             actor.getProperty().setSpecularPower(6.0);

//             renderWindow.render();

//             mapper.setInputData(vtkImage);
//             renderer.addVolume(actor);
//             renderer.resetCamera();
//             renderer.getActiveCamera().zoom(0.7); //size
//             renderer.getActiveCamera().elevation(70); //camera angle
//             renderer.updateLightsGeometryToFollowCamera();
//             renderWindow.render();

//             console.log(vtkImage, 'image');
//             setMha(true);
//         }
//         vtkResourceLoader.loadScript('https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js').then(update);

//         if (extension === '.stl') renderSTL(URL);
//         else if (extension === '.obj') renderOBJ(URL);
//         else if (extension === '.fbx') renderFBX(URL);
//         else if (extension === '.mha' || extension === '.raw' || extension === '.mhd') update();
//     }, [URL]);

//     useEffect(() => {
//         const handleResize = () => {
//             setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const togglePlane = () => {
//         setPlaneVisible(!planeVisible);
//     };

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 maxWidth="lg"
//                 fullWidth
//                 onClose={() => {
//                     setPopup(false);
//                 }}
//                 onBackdropClick={() => {
//                     setPopup(false);
//                 }}
//                 onEscapeKeyDown={() => {
//                     setPopup(false);
//                 }}
//             >
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '0',
//                         right: '0'
//                     }}
//                 >
//                     <IconButton
//                         onClick={() => {
//                             setPopup(false);
//                         }}
//                         sx={{ zIndex: 1 }}
//                     >
//                         <CancelRoundedIcon sx={{ backgroundColor: 'grey' }} />
//                     </IconButton>
//                 </Box>

//                 <DialogContent
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: '100%',
//                         backgroundColor: 'black'
//                     }}
//                 >
//                     {stl && (
//                         <div style={{ position: 'relative' }}>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     marginLeft: '-1.4rem',
//                                     backgroundColor: 'black'
//                                 }}
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {obj && (
//                         <div style={{ position: 'relative' }}>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     backgroundColor: 'black'
//                                 }}
//                                 colorManagement
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {fbx && (
//                         <div>
//                             <Canvas
//                                 style={{
//                                     height: canvasSize.height,
//                                     width: canvasSize.width,
//                                     backgroundColor: 'black'
//                                 }}
//                                 colorManagement
//                                 camera={{ position: [0, 0, 50], fov: 70 }}
//                                 color="black"
//                             >
//                                 <group ref={scene} />
//                                 {planeVisible && (
//                                     <mesh ref={slicerMesh} position={planePosition}>
//                                         <meshBasicMaterial
//                                             transparent
//                                             color="white"
//                                             opacity={0.5}
//                                             side={THREE.DoubleSide}
//                                             wireframe
//                                             wireframeLinewidth={2}
//                                         />
//                                     </mesh>
//                                 )}
//                                 <OrbitControls />
//                             </Canvas>
//                         </div>
//                     )}

//                     {mha && <div ref={containerRef} />}
//                     {/* <div ref={containerRef} /> */}
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }

// export default View3D;
// ===================C  L   O   S   E   D==================

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Box3, Vector3, DoubleSide, MeshStandardMaterial, PointLight, AmbientLight, DirectionalLight } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import * as crypt from '../utils/crypto.js';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Box from '@mui/material/Box';

//raw_mhd_mha
import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import vtkResourceLoader from '@kitware/vtk.js/IO/Core/ResourceLoader';
import vtkLiteHttpDataAccessHelper from '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkITKHelper from '@kitware/vtk.js/Common/DataModel/ITKHelper';
import vtkRenderer from '@kitware/vtk.js/Rendering/WebGPU/Renderer';
// import vtkWebGPURenderWindow from '@kitware/vtk.js/Sources/Rendering/';
import vtkWebGPURenderingWindow from '@kitware/vtk.js/Rendering/WebGPU/RenderWindow.js';
// import vtk from 'vtk.js';
import vtkPlane from '@kitware/vtk.js/Common/DataModel/Plane';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import { Slider } from '@mui/material';

const scene = new THREE.Scene();
const slicerMesh = new THREE.Mesh();

//main
function View3D({ setPopup, URL, extension }) {
    const groupRef = useRef(scene);
    const slicerRef = useRef(slicerMesh);
    const [planeVisible, setPlaneVisible] = useState(true);
    const [planePosition, setPlanePosition] = useState(new Vector3());
    const [stl, setStl] = useState(false);
    const [obj, setObj] = useState(false);
    const [fbx, setFbx] = useState(false);
    const [mha, setMha] = useState(false);
    const containerRef = useRef();
    const [sliderValue, setSliderValue] = useState(0);
    const [clipPlane, setClipPlane] = useState([sliderValue, 0, 0]);

    const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    // const render = useRef(0);

    //mha_variables

    // const url = 'http://localhost:9000/ftp/output_new.mha?${new Date().getTime()}';
    // const url = url;
    const url = 'http://localhost:9000/ftp/output_new.mha';
    const fileName = 'output_new.mha';

    useEffect(() => {
        const renderSTL = (url) => {
            const loader = new STLLoader();

            loader.load(`${url}?${new Date().getTime()}`, (geometry) => {
                const material = new MeshStandardMaterial({
                    color: 'white', // set color to white
                    metalness: 0.11,
                    roughness: 0.51,
                    side: DoubleSide
                });

                const mesh = new THREE.Mesh(geometry, material);

                scene.current.add(mesh);

                const bbox = new Box3().setFromObject(mesh);
                const center = bbox.getCenter(new Vector3());
                mesh.position.sub(center); // center the model

                scene.current.scale.set(0.1, 0.1, 0.1);

                setPlanePosition(center);

                slicerMesh.current.position.x = bbox.max.x;

                // Add lights to the scene
                const pointLight = new PointLight(0xffffff, 0.7);
                pointLight.position.set(1, 1, 1);
                scene.current.add(pointLight);
                const ambientLight = new AmbientLight(0xbfbfbf, 0.5);
                scene.current.add(ambientLight);

                const directionalLight = new DirectionalLight(0xffffff, 1);
                directionalLight.position.set(1, 1, 1);
                scene.current.add(directionalLight);
            });
            setStl(true);
            setMha(false);
        };

        const renderOBJ = (url) => {
            const loader = new OBJLoader(); // use the OBJLoader instead of FBXLoader
            loader.load(`${url}?${new Date().getTime()}`, (object) => {
                object.traverse((child) => {
                    if (child.isMesh) {
                        // Set the material to the original color
                        child.material.color = child.geometry.attributes.color;

                        child.material.metalness = 0.1;
                        child.material.roughness = 0.1;
                        child.material.side = DoubleSide;

                        const bbox = new Box3().setFromObject(child);
                        const center = bbox.getCenter(new Vector3());
                        child.position.sub(center); // center the model

                        scene.current.add(child);

                        scene.current.scale.set(15, 15, 15);

                        // Set the position of the slicer

                        slicerMesh.current.position.x = bbox.max.x;

                        // Add lights to the scene
                        const pointLight = new PointLight(0xffffff, 0.3);
                        pointLight.position.set(1, 1, 1);
                        scene.current.add(pointLight);
                        const ambientLight = new AmbientLight(0xbfbfbf, 0.3);
                        scene.current.add(ambientLight);

                        const directionalLight = new DirectionalLight(0xffffff, 0.2);
                        directionalLight.position.set(1, 1, 1);
                        scene.current.add(directionalLight);
                    }
                });
            });
            setObj(true);
            setMha(false);
        };

        const renderFBX = (url) => {
            const loader = new FBXLoader();
            groupRef.current.children.length = 0;
            loader.load(`${url}?${new Date().getTime()}`, (object) => {
                object.traverse((child) => {
                    if (child.isMesh) {
                        // Set the material to the original color
                        child.material.color = child.geometry.attributes.color;

                        child.material.metalness = 0.1;
                        child.material.roughness = 0.5;
                        child.material.side = DoubleSide;

                        const bbox = new Box3().setFromObject(child);
                        const center = bbox.getCenter(new Vector3());
                        child.position.sub(center); // center the model

                        scene.current.add(child);

                        scene.current.scale.set(0.04, 0.04, 0.04);

                        // Set the position of the slicer
                        setPlanePosition(center);
                        // slicerRef.current.position.x = bbox.max.x;
                        slicerMesh.current.position.x = bbox.max.x;

                        // Add lights to the scene
                        const pointLight = new PointLight(0xffffff, 1);
                        pointLight.position.set(1, 1, 1);
                        scene.current.add(pointLight);
                        const ambientLight = new AmbientLight(0xbfbfbf, 1);
                        scene.current.add(ambientLight);

                        const directionalLight = new DirectionalLight(0xffffff, 0.5);
                        directionalLight.position.set(1, 1, 1);
                        scene.current.add(directionalLight);
                    }
                });
            });
            setFbx(true);
            setMha(false);
        };

        async function update() {
            const volumeArrayBuffer = await vtkLiteHttpDataAccessHelper.fetchBinary(url);

            const { image: itkImage, webWorker } = await window.itk.readImageArrayBuffer(null, volumeArrayBuffer, fileName);
            console.log(itkImage, 'itk');

            webWorker.terminate();
            const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage);

            const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
                background: [0, 0, 0],
                container: containerRef.current
            });
            fullScreenRenderer.getContainer().style.zIndex = '1';
            // fullScreenRenderer.getContainer().style.display = 'none';
            const renderer = fullScreenRenderer.getRenderer();
            const renderWindow = fullScreenRenderer.getRenderWindow();

            // const renderer = renderWindow.getRenderer();

            // renderWindow.render();
            const actor = vtkVolume.newInstance();
            const mapper = vtkVolumeMapper.newInstance();
            mapper.setSampleDistance(0.3);
            actor.setMapper(mapper);

            // const planeX = vtkPlane.newInstance();
            // planeX.setNormal(1, 0, 0);
            // planeX.setOrigin(0, 0, 0);
            // mapper.addClippingPlane(planeX);
            const planeX = vtkPlane.newInstance();
            planeX.setNormal(0.8, 0, 0);
            planeX.setOrigin(clipPlane);
            mapper.addClippingPlane(planeX);

            const ctfun = vtkColorTransferFunction.newInstance();
            ctfun.addRGBPoint(2000.0, 1.0, 1.0, 1.0); //white color
            const ofun = vtkPiecewiseFunction.newInstance();
            ofun.addPoint(0.0, 0.0);
            ofun.addPoint(120.0, 0.7);
            ofun.addPoint(300.0, 0.6);
            actor.getProperty().setRGBTransferFunction(0, ctfun);
            actor.getProperty().setScalarOpacity(0, ofun);
            actor.getProperty().setScalarOpacityUnitDistance(0, 3.5);
            actor.getProperty().setInterpolationTypeToLinear();
            actor.getProperty().setUseGradientOpacity(0, true);
            actor.getProperty().setGradientOpacityMinimumValue(1, 10);
            actor.getProperty().setGradientOpacityMinimumOpacity(1, 1.0);
            actor.getProperty().setGradientOpacityMaximumValue(0, 250);
            actor.getProperty().setGradientOpacityMaximumOpacity(0, 8.0);
            actor.getProperty().setShade(true);
            actor.getProperty().setAmbient(0.4);
            actor.getProperty().setDiffuse(0.3);
            actor.getProperty().setSpecular(0.5);
            actor.getProperty().setSpecularPower(6.0);

            renderWindow.render();

            mapper.setInputData(vtkImage);
            renderer.addVolume(actor);
            renderer.resetCamera();
            renderer.getActiveCamera().zoom(0.7); //size
            renderer.getActiveCamera().elevation(90); //camera angle
            renderer.updateLightsGeometryToFollowCamera(20);
            renderWindow.render();

            console.log(vtkImage, 'image');
            setMha(true);
        }
        vtkResourceLoader.loadScript('https://cdn.jsdelivr.net/npm/itk-wasm@1.0.0-b.8/dist/umd/itk-wasm.js').then(update);

        if (extension === '.stl') renderSTL(URL);
        else if (extension === '.obj') renderOBJ(URL);
        else if (extension === '.fbx') renderFBX(URL);
        else if (extension === '.mha' || extension === '.raw' || extension === '.mhd') update();

        return () => {
            <>
                <Slider />
            </>;
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const togglePlane = () => {
        setPlaneVisible(!planeVisible);
    };
    // const mapper = vtkVolumeMapper.newInstance();
    const planeX = vtkPlane.newInstance();

    // planeX.setNormal(0.5, 0, 0);
    // planeX.setOrigin(clipPlane);
    // mapper.addClippingPlane(planeX);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        const newOrigin = [newValue, 0, 0];
        planeX.setOrigin(newOrigin);
        setClipPlane(event);

        console.log(handleSliderChange, 'slider');
        console.log(newValue, 'New value');
        // renderWindow.render();
    };

    return (
        <>
            <Dialog
                open={true}
                maxWidth="lg"
                fullWidth
                onClose={() => {
                    setPopup(false);
                }}
                onBackdropClick={() => {
                    setPopup(false);
                }}
                onEscapeKeyDown={() => {
                    setPopup(false);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0'
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setPopup(false);
                        }}
                        sx={{ zIndex: 1 }}
                    >
                        <CancelRoundedIcon sx={{ backgroundColor: 'grey' }} />
                    </IconButton>
                </Box>

                <DialogContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        backgroundColor: 'black'
                    }}
                >
                    {stl && (
                        <div style={{ position: 'relative' }}>
                            <Canvas
                                style={{
                                    height: canvasSize.height,
                                    width: canvasSize.width,
                                    marginLeft: '-1.4rem',
                                    backgroundColor: 'black'
                                }}
                                camera={{ position: [0, 0, 50], fov: 70 }}
                                color="black"
                            >
                                <group ref={scene} />
                                {planeVisible && (
                                    <mesh ref={slicerMesh} position={planePosition}>
                                        <meshBasicMaterial
                                            transparent
                                            color="white"
                                            opacity={0.5}
                                            side={THREE.DoubleSide}
                                            wireframe
                                            wireframeLinewidth={2}
                                        />
                                    </mesh>
                                )}
                                <OrbitControls />
                            </Canvas>
                        </div>
                    )}

                    {obj && (
                        <div style={{ position: 'relative' }}>
                            <Canvas
                                style={{
                                    height: canvasSize.height,
                                    width: canvasSize.width,
                                    backgroundColor: 'black'
                                }}
                                colorManagement
                                camera={{ position: [0, 0, 50], fov: 70 }}
                                color="black"
                            >
                                <group ref={scene} />
                                {planeVisible && (
                                    <mesh ref={slicerMesh} position={planePosition}>
                                        <meshBasicMaterial
                                            transparent
                                            color="white"
                                            opacity={0.5}
                                            side={THREE.DoubleSide}
                                            wireframe
                                            wireframeLinewidth={2}
                                        />
                                    </mesh>
                                )}
                                <OrbitControls />
                            </Canvas>
                        </div>
                    )}

                    {fbx && (
                        <div>
                            <Canvas
                                style={{
                                    height: canvasSize.height,
                                    width: canvasSize.width,
                                    backgroundColor: 'black'
                                }}
                                colorManagement
                                camera={{ position: [0, 0, 50], fov: 70 }}
                                color="black"
                            >
                                <group ref={scene} />
                                {planeVisible && (
                                    <mesh ref={slicerMesh} position={planePosition}>
                                        <meshBasicMaterial
                                            transparent
                                            color="white"
                                            opacity={0.5}
                                            side={THREE.DoubleSide}
                                            wireframe
                                            wireframeLinewidth={2}
                                        />
                                    </mesh>
                                )}
                                <OrbitControls />
                            </Canvas>
                        </div>
                    )}

                    {/* {mha && <div ref={containerRef} style={{ position: 'relative' }} />} */}
                    {mha && (
                        <div style={{ position: 'relative' }}>
                            {/* <Slider style={{ position: 'absolute', top: 10, left: 10 }} /> */}
                            <Slider
                                value={sliderValue}
                                min={-50}
                                max={50}
                                step={1}
                                onChange={handleSliderChange}
                                style={{ position: 'absolute', top: 10, left: 10 }}
                            />
                            <div ref={containerRef} />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default View3D;
