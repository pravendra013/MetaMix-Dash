// import React, { useRef } from "react";
// // import { Canvas } from "react-three-fiber";
// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";

// function App() {
//   const textureRef = useRef();

//   // const url = "path/to/raw/file.raw";
//   const url = "http://192.168.15.170:9006/ftp/report_id--176--newfile.raw";
//   console.log(url);

//   // const url = "http://192.168.15.170:9006/ftp/report_id--170--newfile.obj";
//   const width = 256;
//   const height = 256;
//   const length = 342;

//   const loader = new THREE.FileLoader();
//   loader.setResponseType("arraybuffer");
//   loader.load(url, (rawData) => {
//     const texture = new THREE.DataTexture(
//       rawData,
//       width,
//       height,
//       length
//       // THREE.RGBFormat
//     );

//     texture.minFilter = THREE.LinearFilter;
//     texture.magFilter = THREE.NearestFilter;

//     // Assign the texture to the textureRef object
//     textureRef.current = texture;
//   });

//   return (
//     <Canvas>
//       <mesh>
//         <planeBufferGeometry args={[5, 5, 5]} />
//         <meshBasicMaterial map={textureRef.current} />
//       </mesh>
//     </Canvas>
//   );
// }
// export default App;

// ++++++++++++++++++++++++++Slicer in obj+++++++++++++++++++

// ++++++++++++++++++++++++==STL==+++++++++++++++++++++++++++

// import React, { useRef, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// import { MeshBasicMaterial, Box3, Vector3 } from "three";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// function App() {
//   const groupRef = useRef();
//   const slicerRef = useRef();
//   const [planeVisible, setPlaneVisible] = useState(true);

//   useEffect(() => {
//     const loader = new STLLoader();
//     loader.load(
//       "http://192.168.15.170:9006/ftp/report_id--171--newfile.stl",
//       (geometry) => {
//         const material = new MeshBasicMaterial({ color: "white" });
//         const mesh = new THREE.Mesh(geometry, material);
//         const bbox = new Box3().setFromObject(mesh);
//         const center = bbox.getCenter(new Vector3());
//         mesh.position.sub(center); // center the model

//         groupRef.current.add(mesh);
//         groupRef.current.scale.set(10, 10, 10);

//         // Set the position of the slicer
//         slicerRef.current.position.x = bbox.max.x;
//       }
//     );
//   }, []);

//   const togglePlane = () => {
//     setPlaneVisible(!planeVisible);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <Canvas
//         style={{
//           height: "100vh",
//           width: "auto",
//           backgroundColor: "black",
//         }}
//         colorManagement
//         camera={{ position: [0, 0, 50], fov: 70 }}
//         color="black"
//       >
//         <group ref={groupRef} />
//         {planeVisible && (
//           <mesh ref={slicerRef}>
//             <planeBufferGeometry args={[5, 5]} />
//             <meshBasicMaterial color="red" side={THREE.DoubleSide} />
//           </mesh>
//         )}
//         <OrbitControls />
//       </Canvas>
//       <button
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           zIndex: 1,
//           width: "6rem",
//         }}
//         onClick={togglePlane}
//       >
//         {planeVisible ? "Hide Plane" : "Show Plane"}
//       </button>
//     </div>
//   );
// }

// export default App;

// import React, { useRef, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MeshNormalMaterial, Box3, Vector3 } from "three";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// function App() {
//   const groupRef = useRef();
//   const slicerRef = useRef();
//   const [planeVisible, setPlaneVisible] = useState(true);

//   useEffect(() => {
//     const loader = new OBJLoader();
//     loader.load(
//       "http://192.168.15.170:9006/ftp/report_id--170--newfile.obj",
//       (obj) => {
//         obj.traverse((child) => {
//           if (child.isMesh) {
//             // child.material = new MeshNormalMaterial(); // Assign a material to the mesh
//             child.material = new THREE.MeshBasicMaterial({
//               color: "white",
//               side: THREE.FrontSide,
//             }); // Assign a material to the mesh
//           }
//         });

//         const bbox = new Box3().setFromObject(obj);
//         const center = bbox.getCenter(new Vector3());
//         obj.position.sub(center); // center the model

//         groupRef.current.add(obj);
//         groupRef.current.scale.set(10, 10, 10);

//         // Set the position of the slicer
//         slicerRef.current.position.x = bbox.max.x;
//       }
//     );
//   }, []);

//   const togglePlane = () => {
//     setPlaneVisible(!planeVisible);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <Canvas
//         style={{
//           height: "100vh",
//           width: "auto",
//           backgroundColor: "black",
//         }}
//         colorManagement
//         camera={{ position: [0, 0, 50], fov: 70 }}
//         color="black"
//       >
//         <group ref={groupRef} />
//         {planeVisible && (
//           <mesh ref={slicerRef}>
//             <planeBufferGeometry args={[5, 5]} />
//             {/* <meshBasicMaterial color="lightgrey" side={THREE.DoubleSide} /> */}
//             <meshBasicMaterial
//               transparent
//               color="lightgrey"
//               borderColor="red"
//               // color="transparent"
//               opacity={0.5}
//               // side={THREE.DoubleSide}
//               side={THREE.FrontSide}
//               wireframe
//               wireframeLinewidth={2}
//             />
//           </mesh>
//         )}
//         <OrbitControls />
//       </Canvas>
//       <button
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           zIndex: 1,
//           width: "6rem",
//         }}
//         onClick={togglePlane}
//       >
//         {planeVisible ? "Hide Plane" : "Show Plane"}
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshNormalMaterial, Box3, Vector3, Plane } from "three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function App() {
  const groupRef = useRef();
  const slicerRef = useRef();
  const [planeVisible, setPlaneVisible] = useState(true);

  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      "http://192.168.15.170:9006/ftp/report_id--170--newfile.obj",
      (obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = new MeshNormalMaterial(); // Assign a material to the mesh
          }
        });

        const bbox = new Box3().setFromObject(obj);
        const center = bbox.getCenter(new Vector3());
        obj.position.sub(center); // center the model

        groupRef.current.add(obj);
        groupRef.current.scale.set(10, 10, 10);

        // Set the position of the slicer
        slicerRef.current.position.x = bbox.max.x;

        // Create a clipping plane
        const clipPlane = new Plane(new Vector3(1, 0, 0), 0);
        const clipPlanes = [clipPlane];

        // Apply the clipping plane to the material of the object
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material.clipping = true;
            child.material.clippingPlanes = clipPlanes;
            child.material.clipShadows = true;
          }
        });
      }
    );
  }, []);

  const togglePlane = () => {
    setPlaneVisible(!planeVisible);
  };

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        style={{
          height: "100vh",
          width: "auto",
          backgroundColor: "black",
        }}
        colorManagement
        camera={{ position: [0, 0, 50], fov: 70 }}
        color="black"
      >
        <group ref={groupRef} />
        {planeVisible && (
          <mesh ref={slicerRef}>
            <planeBufferGeometry args={[5, 5]} />
            <meshBasicMaterial
              transparent
              color="lightgrey"
              opacity={0.5}
              side={THREE.DoubleSide}
              wireframe
              wireframeLinewidth={2}
            />
          </mesh>
        )}
        <OrbitControls />
      </Canvas>
      <button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          width: "6rem",
        }}
        onClick={togglePlane}
      >
        {planeVisible ? "Hide Plane" : "Show Plane"}
      </button>
    </div>
  );
}

export default App;
