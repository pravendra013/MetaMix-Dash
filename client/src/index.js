import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import RawTexture from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <RawTexture
      url={`http://192.168.15.170:9006/ftp/report_id--176--newfile.raw`}
    /> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React, { useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MeshNormalMaterial } from "three";
// import { OrbitControls } from "@react-three/drei";

// function App() {
//   const groupRef = useRef();

//   useEffect(() => {
//     const loader = new OBJLoader();
//     loader.load(
//       "http://192.168.15.170:9006/ftp/report_id--170--newfile.obj",
//       (obj) => {
//         obj.traverse((child) => {
//           if (child.isMesh) {
//             child.material = new MeshNormalMaterial(); // Assign a material to the mesh
//           }
//         });

//         if (groupRef.current) {
//           // Add the loaded object to the group
//           groupRef.current.add(obj);
//           groupRef.current.scale.set(10, 10, 10);
//         }
//       }
//     );
//   }, []);

//   return (
//     <Canvas
//       style={{
//         height: "100vh",
//         width: "auto",
//       }}
//     >
//       <group ref={groupRef} />
//       <OrbitControls />
//     </Canvas>
//   );
// }

// export default App;
