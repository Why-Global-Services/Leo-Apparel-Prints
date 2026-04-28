// 'use client';

// import { useEffect, useRef } from 'react';

// export default function GLBViewer({
//   glbPath = '/images/jerseys/jersey.glb',
//   autoRotate = true,
//   rotationSpeed = 0.005,
//   backgroundColor = '#E2E8F0',
//   jerseyColor = '#DC2626',
//   playerName = 'PLAYER',
//   playerNumber = '10',
//   nameColor = '#FFFFFF',
//   numberColor = '#F59E0B',
//   nameStyleId = 'collegiate',
//   nameTextStyle = 'straight',
//   nameVertical = 38,
//   showText = true,
//   sleeveColor = '#111111'
// }) {
//   const containerRef = useRef(null);

//   const getFontFamily = (styleId) => {
//     const fonts = {
//       collegiate: '"Arial Black", sans-serif',
//       block: 'Impact, sans-serif',
//       varsity: '"Georgia", serif',
//       athletic: '"Trebuchet MS", sans-serif',
//       sport: '"Verdana", sans-serif',
//       modern: '"Helvetica", sans-serif',
//       retro: '"Courier New", monospace',
//       slim: '"Arial", sans-serif',
//       'bold-con': '"Arial Narrow", sans-serif',
//       serif: '"Times New Roman", serif',
//     };
//     return fonts[styleId] || '"Arial Black", sans-serif';
//   };

//   useEffect(() => {
//     if (!containerRef.current) return;

//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '12px';

//     const fontFamily = getFontFamily(nameStyleId);
//     const autoRotateJS = autoRotate ? 'true' : 'false';
//     const showTextJS = showText ? 'true' : 'false';

//     const htmlContent = `<!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
//   <style>
//     * { margin:0; padding:0; box-sizing:border-box; }
//     body { overflow:hidden; background:${backgroundColor}; }
//     #loading {
//       position:absolute; top:50%; left:50%;
//       transform:translate(-50%,-50%);
//       text-align:center; z-index:10;
//       background:rgba(255,255,255,0.97);
//       padding:24px 36px; border-radius:18px;
//       font-family:system-ui,sans-serif;
//       box-shadow:0 8px 32px rgba(0,0,0,0.15);
//     }
//     .sp {
//       width:40px; height:40px;
//       border:3px solid #E8820C; border-top-color:transparent;
//       border-radius:50%; animation:spin 0.9s linear infinite;
//       margin:0 auto 12px;
//     }
//     @keyframes spin { to { transform:rotate(360deg); } }
//     #hint {
//       position:absolute; bottom:14px; left:50%;
//       transform:translateX(-50%);
//       background:rgba(0,0,0,0.5); color:#fff;
//       padding:5px 14px; border-radius:20px;
//       font-size:11px; font-family:system-ui;
//       pointer-events:none; z-index:10; white-space:nowrap;
//     }
//     #ri {
//       position:absolute; top:14px; right:14px;
//       background:rgba(255,255,255,0.85); color:#334155;
//       padding:4px 10px; border-radius:10px;
//       font-size:10px; font-family:system-ui; font-weight:600;
//       pointer-events:none; z-index:10;
//     }
//   </style>
// </head>
// <body>
//   <div id="loading">
//     <div class="sp"></div>
//     <div id="lm" style="color:#334155;font-weight:600;font-size:13px;">Loading 3D Model...</div>
//     <div style="color:#94A3B8;font-size:10px;margin-top:4px;">Please wait</div>
//   </div>
//   <div id="hint">&#128432; Drag to rotate &middot; Scroll to zoom</div>
//   <div id="ri">AUTO ROTATING</div>

//   <script type="importmap">
//   {"imports":{"three":"https://unpkg.com/three@0.150.1/build/three.module.js","three/addons/":"https://unpkg.com/three@0.150.1/examples/jsm/"}}
//   </script>

// <script type="module">
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const scene = new THREE.Scene();
// scene.background = new THREE.Color('${backgroundColor}');

// // Camera
// const camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.01, 100);
// camera.position.set(0, 0.2, 2.5);

// // Renderer (NO tone tricks)
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(innerWidth, innerHeight);
// renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
// renderer.outputEncoding = THREE.sRGBEncoding;

// document.body.appendChild(renderer.domElement);

// // ✅ ADD HERE (environment for Blender look)
// const pmrem = new THREE.PMREMGenerator(renderer);
// pmrem.compileEquirectangularShader();

// new THREE.TextureLoader().load(
//   'https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.jpg',
//   (texture) => {
//     const envMap = pmrem.fromEquirectangular(texture).texture;
//     scene.environment = envMap;
//     texture.dispose();
//     pmrem.dispose();
//   }
// );

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.07;
// controls.autoRotate = false;
// controls.enableZoom = true;
// controls.enablePan = false;

// // State
// let model = null;

// // Load model
// new GLTFLoader().load(
//   window.location.origin + '${glbPath}',

//   (gltf) => {
//     model = gltf.scene;
// // 🔥 FIX BLACK MODEL (ADD THIS BLOCK)
// model.traverse((child) => {
//   if (child.isMesh) {
//     child.material = new THREE.MeshBasicMaterial({
//       map: child.material.map || null
//     });
//   }
// });
//     // ✅ DO NOT TOUCH MATERIALS (original Blender look)

//     // Center model
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     const size = box.getSize(new THREE.Vector3());

//     model.position.sub(center);

//     // Scale nicely
//     const scale = 1.5 / Math.max(size.x, size.y, size.z);
//     model.scale.setScalar(scale);

//     // Optional: rotate if needed
//     model.rotation.y = 0

//     scene.add(model);

//     // Camera focus
//     controls.target.set(0, 0.45, 0);
//     controls.update();

//     // Hide loader
//     document.getElementById('loading').style.display = 'none';
//   },

//   undefined,

//   (err) => {
//     document.getElementById('loading').innerHTML =
//       '<b style="color:red">Failed to load model</b>';
//   }
// );

// // Resize
// window.addEventListener('resize', () => {
//   camera.aspect = innerWidth / innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(innerWidth, innerHeight);
// });

// // Render loop
// (function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// })();
// </script>
// </body>
// </html>`;

//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     iframe.src = URL.createObjectURL(blob);
//     containerRef.current.appendChild(iframe);
//     return () => URL.revokeObjectURL(iframe.src);

//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor, nameStyleId]);

//   useEffect(() => {
//     const f = containerRef.current?.firstChild;
//     if (!f) return;
//     const send = () => { try { f.contentWindow?.updateModelColor(jerseyColor); } catch (_) {} };
//     f.addEventListener('load', send); send();
//     return () => f.removeEventListener('load', send);
//   }, [jerseyColor]);

//   useEffect(() => {
//     const f = containerRef.current?.firstChild;
//     if (!f) return;
//     const font = getFontFamily(nameStyleId);
//     const send = () => {
//       try { f.contentWindow?.updateText(playerName, playerNumber, nameColor, numberColor, font, nameVertical); }
//       catch (_) {}
//     };
//     f.addEventListener('load', send); send();
//     return () => f.removeEventListener('load', send);
//   }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameVertical]);

//   return (
//     <div ref={containerRef} style={{
//       width:'100%', height:'100%', position:'relative',
//       overflow:'hidden', borderRadius:'12px', background:backgroundColor,
//     }} />
//   );
// }























































// 'use client';

// import { useEffect, useRef } from 'react';

// export default function GLBViewer({
//   glbPath = '/images/jerseys/jersey.glb',
//   autoRotate = true,
//   rotationSpeed = 0.005,
//   backgroundColor = '#E2E8F0',
//   jerseyColor = '#DC2626',
//   playerName = 'PLAYER',
//   playerNumber = '10',
//   nameColor = '#FFFFFF',
//   numberColor = '#F59E0B',
//   nameStyleId = 'collegiate',
//   nameTextStyle = 'straight',
//   nameVertical = 38,
//   showText = true,
//   sleeveColor = '#111111'
// }) {
//   const containerRef = useRef(null);

//   const getFontFamily = (styleId) => {
//     const fonts = {
//       collegiate: '"Arial Black", sans-serif',
//       block: 'Impact, sans-serif',
//       varsity: '"Georgia", serif',
//       athletic: '"Trebuchet MS", sans-serif',
//       sport: '"Verdana", sans-serif',
//       modern: '"Helvetica", sans-serif',
//       retro: '"Courier New", monospace',
//       slim: '"Arial", sans-serif',
//       'bold-con': '"Arial Narrow", sans-serif',
//       serif: '"Times New Roman", serif',
//     };
//     return fonts[styleId] || '"Arial Black", sans-serif';
//   };

//   useEffect(() => {
//     if (!containerRef.current) return;

//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '12px';
//     iframe.style.display = 'block'; // ✅ prevents inline baseline gap

//     const fontFamily = getFontFamily(nameStyleId);
//     const autoRotateJS = autoRotate ? 'true' : 'false';
//     const showTextJS = showText ? 'true' : 'false';

//     const htmlContent = `<!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
//   <style>
//     * { margin:0; padding:0; box-sizing:border-box; }
//     html, body {
//       width: 100%;
//       height: 100%;
//       overflow: hidden;
//       background: ${backgroundColor};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     canvas {
//       display: block;
//       width: 100% !important;
//       height: 100% !important;
//     }
//     #loading {
//       position:absolute; top:50%; left:50%;
//       transform:translate(-50%,-50%);
//       text-align:center; z-index:10;
//       background:rgba(255,255,255,0.97);
//       padding:24px 36px; border-radius:18px;
//       font-family:system-ui,sans-serif;
//       box-shadow:0 8px 32px rgba(0,0,0,0.15);
//     }
//     .sp {
//       width:40px; height:40px;
//       border:3px solid #E8820C; border-top-color:transparent;
//       border-radius:50%; animation:spin 0.9s linear infinite;
//       margin:0 auto 12px;
//     }
//     @keyframes spin { to { transform:rotate(360deg); } }
//     #hint {
//       position:absolute; bottom:14px; left:50%;
//       transform:translateX(-50%);
//       background:rgba(0,0,0,0.5); color:#fff;
//       padding:5px 14px; border-radius:20px;
//       font-size:11px; font-family:system-ui;
//       pointer-events:none; z-index:10; white-space:nowrap;
//     }
//     #ri {
//       position:absolute; top:14px; right:14px;
//       background:rgba(255,255,255,0.85); color:#334155;
//       padding:4px 10px; border-radius:10px;
//       font-size:10px; font-family:system-ui; font-weight:600;
//       pointer-events:none; z-index:10;
//     }
//   </style>
// </head>
// <body>
//   <div id="loading">
//     <div class="sp"></div>
//     <div id="lm" style="color:#334155;font-weight:600;font-size:13px;">Loading 3D Model...</div>
//     <div style="color:#94A3B8;font-size:10px;margin-top:4px;">Please wait</div>
//   </div>
//   <div id="hint">&#128432; Drag to rotate &middot; Scroll to zoom</div>
 

//   <script type="importmap">
//   {"imports":{"three":"https://unpkg.com/three@0.150.1/build/three.module.js","three/addons/":"https://unpkg.com/three@0.150.1/examples/jsm/"}}
//   </script>

// <script type="module">
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// const scene = new THREE.Scene();
// scene.background = new THREE.Color('${backgroundColor}');

// // ✅ Camera centered
// const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.01, 100);
// camera.position.set(0, 0, 2.5);

// // ✅ Renderer fills container perfectly
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.setSize(innerWidth, innerHeight);
// document.body.appendChild(renderer.domElement);

// // Environment
// const pmrem = new THREE.PMREMGenerator(renderer);
// pmrem.compileEquirectangularShader();
// new THREE.TextureLoader().load(
//   'https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.jpg',
//   (texture) => {
//     const envMap = pmrem.fromEquirectangular(texture).texture;
//     scene.environment = envMap;
//     texture.dispose();
//     pmrem.dispose();
//   }
// );

// // Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;
// controls.enablePan = false;
// controls.autoRotate = false;
// controls.enableRotate = true;
// controls.enableDamping = true;
// controls.dampingFactor = 0.07;
// controls.minPolarAngle = Math.PI / 4;     // look slightly up
// controls.maxPolarAngle = Math.PI * 0.75;  // look slightly down

// let model = null;

// // Load model
// new GLTFLoader().load(
//   window.location.origin + '${glbPath}',
//   (gltf) => {
//     model = gltf.scene;

//     model.traverse((child) => {
//       if (child.isMesh) {
//         child.material = new THREE.MeshBasicMaterial({
//           map: child.material.map || null
//         });
//       }
//     });

//     // ✅ Perfect center calculation
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     const size = box.getSize(new THREE.Vector3());

//     // Center the model at origin
//     model.position.sub(center);
//     model.rotation.y = 0;

//     // ✅ Scale to fit nicely
//     const maxDim = Math.max(size.x, size.y, size.z);
//     const scale = 1.5 / maxDim;
//     model.scale.setScalar(scale);

//     scene.add(model);

// // FINAL PERFECT PRODUCT VIEW
// const scaledHeight = size.y * scale;

// // perfect vertical center
// controls.target.set(0, scaledHeight * 0.35, 0);

// // bring camera closer (BIG FIX)
// camera.position.set(0, -0.2, 3.0);

// controls.update();
//     document.getElementById('loading').style.display = 'none';
//   },
//   undefined,
//   (err) => {
//     document.getElementById('loading').innerHTML =
//       '<b style="color:red">Failed to load model</b>';
//   }
// );

// // ✅ Proper resize handler
// window.addEventListener('resize', () => {
//   camera.aspect = innerWidth / innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(innerWidth, innerHeight);
// });

// // Render loop
// (function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// })();
// </script>
// </body>
// </html>`;

//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     iframe.src = URL.createObjectURL(blob);
//     containerRef.current.appendChild(iframe);
//     return () => URL.revokeObjectURL(iframe.src);

//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor, nameStyleId]);

//   useEffect(() => {
//     const f = containerRef.current?.firstChild;
//     if (!f) return;
//     const send = () => {
//       try { f.contentWindow?.updateModelColor(jerseyColor); } catch (_) {}
//     };
//     f.addEventListener('load', send);
//     send();
//     return () => f.removeEventListener('load', send);
//   }, [jerseyColor]);

//   useEffect(() => {
//     const f = containerRef.current?.firstChild;
//     if (!f) return;
//     const font = getFontFamily(nameStyleId);
//     const send = () => {
//       try {
//         f.contentWindow?.updateText(playerName, playerNumber, nameColor, numberColor, font, nameVertical);
//       } catch (_) {}
//     };
//     f.addEventListener('load', send);
//     send();
//     return () => f.removeEventListener('load', send);
//   }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameVertical]);

//   // ✅ Outer wrapper: flex centering so iframe sits perfectly in parent
//   return (
//     <div style={{
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       overflow: 'hidden',
//       borderRadius: '12px',
//       background: backgroundColor,
//     }}>
//       <div ref={containerRef} style={{
//         width: '100%',
//         height: '100%',
//         position: 'relative',
//         overflow: 'hidden',
//         borderRadius: '12px',
//       }} />
//     </div>
//   );
// }







//new glb file crt place show




// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function GLBViewer({
//   glbPath = '/images/jerseys/TSHIRT.glb',
//   autoRotate = true,
//   rotationSpeed = 0.003,
//   backgroundColor = '#F8FAFC',
//   jerseyColor = '#DC2626',
//   playerName = 'PLAYER',
//   playerNumber = '10',
//   nameColor = '#FFFFFF',
//   numberColor = '#F59E0B',
//   nameStyleId = 'collegiate',
//   nameTextStyle = 'straight',
//   nameVertical = 38,
//   showText = true,
//   sleeveColor = '#111111'
// }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '20px';
//     iframe.style.background = backgroundColor;

//     const baseUrl = window.location.origin;
//     const modelUrl = glbPath.startsWith('http') ? glbPath : `${baseUrl}${glbPath}`;

//     const htmlContent = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
//   <style>
//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }
    
//     body {
//       overflow: hidden;
//       background: ${backgroundColor};
//       font-family: 'Inter', system-ui, -apple-system, sans-serif;
//     }
    
//     canvas {
//       display: block;
//       cursor: grab;
//     }
    
//     canvas:active {
//       cursor: grabbing;
//     }
    
//     /* Premium Loading Overlay */
//     .loading-overlay {
//       position: fixed;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: ${backgroundColor};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 100;
//       transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//       backdrop-filter: blur(0px);
//     }
    
//     .loading-container {
//       text-align: center;
//       background: rgba(255, 255, 255, 0.98);
//       padding: 40px 50px;
//       border-radius: 32px;
//       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//       border: 1px solid rgba(14, 165, 233, 0.2);
//       animation: fadeInUp 0.5s ease-out;
//     }
    
//     @keyframes fadeInUp {
//       from {
//         opacity: 0;
//         transform: translateY(20px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
    
//     /* Animated Blue Icon Spinner */
//     .blue-spinner {
//       width: 70px;
//       height: 70px;
//       margin: 0 auto 24px;
//       position: relative;
//     }
    
//     .blue-spinner::before {
//       content: '';
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       border-radius: 50%;
//       background: conic-gradient(from 0deg, #0EA5E9, #0284C7, #1E3A8A, #0EA5E9);
//       animation: rotate 1.5s linear infinite;
//     }
    
//     .blue-spinner::after {
//       content: '';
//       position: absolute;
//       inset: 6px;
//       background: white;
//       border-radius: 50%;
//     }
    
//     @keyframes rotate {
//       to {
//         transform: rotate(360deg);
//       }
//     }
    
//     /* Inner icon */
//     .spinner-icon {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       z-index: 2;
//       font-size: 28px;
//     }
    
//     .loading-title {
//       font-size: 20px;
//       font-weight: 800;
//       background: linear-gradient(135deg, #0EA5E9, #1E3A8A);
//       -webkit-background-clip: text;
//       background-clip: text;
//       color: transparent;
//       margin-bottom: 8px;
//       letter-spacing: -0.3px;
//     }
    
//     .loading-subtitle {
//       font-size: 13px;
//       color: #64748B;
//       margin-bottom: 20px;
//       font-weight: 500;
//     }
    
//     /* Progress Bar */
//     .progress-wrapper {
//       width: 260px;
//       margin: 0 auto;
//     }
    
//     .progress-bar-bg {
//       width: 100%;
//       height: 4px;
//       background: #E2E8F0;
//       border-radius: 10px;
//       overflow: hidden;
//     }
    
//     .progress-bar-fill {
//       height: 100%;
//       background: linear-gradient(90deg, #0EA5E9, #0284C7, #1E3A8A);
//       width: 0%;
//       transition: width 0.3s ease;
//       border-radius: 10px;
//       position: relative;
//       overflow: hidden;
//     }
    
//     .progress-bar-fill::after {
//       content: '';
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
//       animation: shimmer 1.5s infinite;
//     }
    
//     @keyframes shimmer {
//       0% {
//         transform: translateX(-100%);
//       }
//       100% {
//         transform: translateX(100%);
//       }
//     }
    
//     .progress-percent {
//       font-size: 12px;
//       font-weight: 700;
//       color: #0EA5E9;
//       margin-top: 10px;
//       text-align: center;
//     }
    
//     /* Pulsing dots animation */
//     .loading-dots {
//       display: inline-flex;
//       gap: 4px;
//       margin-left: 4px;
//     }
    
//     .loading-dots span {
//       width: 4px;
//       height: 4px;
//       background: #0EA5E9;
//       border-radius: 50%;
//       animation: pulse 1.4s ease-in-out infinite;
//     }
    
//     .loading-dots span:nth-child(1) { animation-delay: 0s; }
//     .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
//     .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
    
//     @keyframes pulse {
//       0%, 100% {
//         opacity: 0.3;
//         transform: scale(0.8);
//       }
//       50% {
//         opacity: 1;
//         transform: scale(1.2);
//       }
//     }
    
//     /* Hint text */
//     .viewer-hint {
//       position: fixed;
//       bottom: 20px;
//       left: 50%;
//       transform: translateX(-50%);
//       background: rgba(0, 0, 0, 0.65);
//       backdrop-filter: blur(12px);
//       color: white;
//       padding: 8px 20px;
//       border-radius: 40px;
//       font-size: 12px;
//       font-weight: 500;
//       pointer-events: none;
//       z-index: 90;
//       white-space: nowrap;
//       letter-spacing: 0.3px;
//       font-family: system-ui;
//       box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//       border: 1px solid rgba(255, 255, 255, 0.1);
//     }
    
//     /* Auto-rotate badge */
//     .auto-rotate-badge {
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       background: rgba(255, 255, 255, 0.95);
//       backdrop-filter: blur(8px);
//       padding: 6px 16px;
//       border-radius: 40px;
//       font-size: 11px;
//       font-weight: 700;
//       color: #0EA5E9;
//       z-index: 90;
//       pointer-events: none;
//       font-family: system-ui;
//       letter-spacing: 0.5px;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
//       border: 1px solid rgba(14, 165, 233, 0.3);
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }
    
//     .rotate-icon {
//       display: inline-block;
//       animation: rotateIcon 2s linear infinite;
//     }
    
//     @keyframes rotateIcon {
//       from {
//         transform: rotate(0deg);
//       }
//       to {
//         transform: rotate(360deg);
//       }
//     }
    
//     /* Error state */
//     .error-container {
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       background: white;
//       padding: 32px 40px;
//       border-radius: 24px;
//       text-align: center;
//       z-index: 200;
//       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//       border-left: 4px solid #DC2626;
//     }
    
//     .error-container h3 {
//       color: #DC2626;
//       margin-bottom: 8px;
//       font-size: 18px;
//     }
    
//     .error-container p {
//       color: #64748B;
//       font-size: 13px;
//     }
//   </style>
// </head>
// <body>
//   <div id="loading-overlay" class="loading-overlay">
//     <div class="loading-container">
//       <div class="blue-spinner"></div>
//       <div class="loading-title">Loading 3D Jersey</div>
//       <div class="loading-subtitle">
//         Preparing immersive preview
//         <div class="loading-dots">
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>
//       <div class="progress-wrapper">
//         <div class="progress-bar-bg">
//           <div class="progress-bar-fill" id="progress-fill"></div>
//         </div>
//         <div class="progress-percent" id="progress-percent">0%</div>
//       </div>
//     </div>
//   </div>
  
//   <div class="viewer-hint">
//     🖱️ Drag to rotate
//   </div>
//   <div class="auto-rotate-badge">
//     <span class="rotate-icon">🔄</span> AUTO ROTATE
//   </div>

//   <script type="importmap">
//     {
//       "imports": {
//         "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
//         "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
//       }
//     }
//   </script>

//   <script type="module">
//     import * as THREE from 'three';
//     import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//     import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//     function updateProgress(percent) {
//       const progressFill = document.getElementById('progress-fill');
//       const progressPercent = document.getElementById('progress-percent');
//       if (progressFill) {
//         progressFill.style.width = percent + '%';
//       }
//       if (progressPercent) {
//         progressPercent.textContent = percent + '%';
//       }
//     }
    
//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color('${backgroundColor}');
    
//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
//     scene.add(ambientLight);
    
//     const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
//     dirLight.position.set(2, 3, 2);
//     scene.add(dirLight);
    
//     const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     backLight.position.set(-1, 1, -2);
//     scene.add(backLight);
    
//     // Camera
//     const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
//     camera.position.set(0, 0, 3);
    
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     document.body.appendChild(renderer.domElement);
    
//     // Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.06;
//     controls.autoRotate = ${autoRotate};
//     controls.autoRotateSpeed = ${rotationSpeed};
//     controls.enableZoom = false;
//     controls.enablePan = false;
//     controls.rotateSpeed = 1.5;
    
//     const loader = new GLTFLoader();
//     const modelUrl = '${modelUrl}';
    
//     loader.load(
//       modelUrl,
//       (gltf) => {
//         const model = gltf.scene;
        
//         // Calculate bounding box
//         const box = new THREE.Box3().setFromObject(model);
//         const center = box.getCenter(new THREE.Vector3());
//         const size = box.getSize(new THREE.Vector3());
        
//         // Center the model
//         model.position.x -= center.x;
//         model.position.y -= center.y;
//         model.position.z -= center.z;
        
//         // Scale to fit
//         const maxDim = Math.max(size.x, size.y, size.z);
//         const targetScale = 1.5 / maxDim;
//         model.scale.setScalar(targetScale);
        
//         scene.add(model);
        
//         // Position camera
//         const newBox = new THREE.Box3().setFromObject(model);
//         const newSize = newBox.getSize(new THREE.Vector3());
//         const newCenter = newBox.getCenter(new THREE.Vector3());
//         const distance = Math.max(newSize.x, newSize.y, newSize.z) * 1.6;
        
//         camera.position.set(0, newCenter.y, distance);
//         controls.target.set(0, newCenter.y, 0);
//         controls.update();
        
//         // Hide loading overlay with animation
//         const loadingOverlay = document.getElementById('loading-overlay');
//         if (loadingOverlay) {
//           loadingOverlay.style.opacity = '0';
//           setTimeout(() => {
//             loadingOverlay.style.display = 'none';
//           }, 600);
//         }
//       },
//       (xhr) => {
//         if (xhr.lengthComputable) {
//           const percent = Math.floor((xhr.loaded / xhr.total) * 100);
//           updateProgress(percent);
//         }
//       },
//       (error) => {
//         console.error('Error:', error);
//         const loadingOverlay = document.getElementById('loading-overlay');
//         if (loadingOverlay) {
//           loadingOverlay.innerHTML = \`
//             <div class="error-container">
//               <h3>⚠️ Failed to Load Model</h3>
//               <p>Please check if the GLB file exists</p>
//               <p style="font-size: 11px; margin-top: 8px;">${glbPath}</p>
//             </div>
//           \`;
//         }
//       }
//     );
    
//     // Animation loop
//     function animate() {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     }
//     animate();
    
//     // Resize handler
//     window.addEventListener('resize', () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     });
//   </script>
// </body>
// </html>`;

//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const blobUrl = URL.createObjectURL(blob);
//     iframe.src = blobUrl;
//     containerRef.current.appendChild(iframe);
    
//     return () => {
//       URL.revokeObjectURL(blobUrl);
//     };
//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

//   return (
//     <div style={{ 
//       width: '100%', 
//       height: '100%', 
//       position: 'relative',
//       borderRadius: '20px',
//       overflow: 'hidden',
//       background: backgroundColor,
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
//     }}>
//       <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
//     </div>
//   );
// }


















//test for new glb file crt place show test -- perfectly working [without logo and text,number,color change only working]

'use client';

import { useEffect, useRef } from 'react';

export default function GLBViewer({
  glbPath = '/images/jerseys/TSHIRT.glb',
  autoRotate = true,
  rotationSpeed = 0.003,
  backgroundColor = '#F8FAFC',
  jerseyColor = '#DC2626',
  sleeveColor = '#111111',
  collarColor = '#ff0099',
  playerName = 'PLAYER',
  playerNumber = '10',
  nameColor = '#FFFFFF',
  numberColor = '#F59E0B',
  nameStyleId = 'collegiate',
  nameTextStyle = 'straight',
  nameVertical = 38,
  showText = true,
  clubLogo = null,
  sponsorLogo = null,
  nameEffect = 'none',
  nameEffectColor = '#000000',
  nameOutlineWidth = 1.5,
  numberEffect = 'none',
  numberEffectColor = '#000000',
}) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframeRef.current = iframe;

    const baseUrl = window.location.origin;
    const modelUrl = glbPath.startsWith('http') ? glbPath : `${baseUrl}${glbPath}`;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: ${backgroundColor};
    }
    canvas { display: block; }
    #loading {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background: ${backgroundColor};
      z-index: 100;
      font-family: system-ui;
    }
    .spinner {
      width: 42px; height: 42px;
      border: 3px solid #E2E8F0;
      border-top-color: #0EA5E9;
      border-radius: 50%;
      animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .hint {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.5);
      color: #fff;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-family: system-ui;
      pointer-events: none;
      white-space: nowrap;
      z-index: 10;
    }
  </style>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    <span style="font-size:13px;font-weight:600;color:#334155;">Loading 3D Model...</span>
  </div>
  <div class="hint">🖱️ Drag to rotate</div>

  <script type="importmap">
  {"imports":{"three":"https://unpkg.com/three@0.128.0/build/three.module.js","three/addons/":"https://unpkg.com/three@0.128.0/examples/jsm/"}}
  </script>

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    let model, controls;
    
    // User customization values (from props)
    let userJerseyColor = '${jerseyColor}';
    let userSleeveColor = '${sleeveColor}';
    let userCollarColor = '${collarColor}';
    
    // Store original GLB colors
    let originalBodyColor = null;
    let originalSleeveColor = null;
    let originalCollarColor = null;
    
    // Track if user has changed colors
    let hasUserModified = {
      jersey: false,
      sleeve: false,
      collar: false
    };

    // Mesh identification
    function isBodyMesh(name) {
      return name === 'default001' || name === 'default001_1';
    }
    
    function isSleeveMesh(name) {
      return name === 'default001_3' || name === 'default001_4';
    }
    
    function isCollarMesh(name) {
      return name === 'default001_2';
    }

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('${backgroundColor}');
    
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(2, 3, 2);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-1, 2, 1);
    scene.add(fillLight);
    
    // Function to apply colors (respecting user modifications)
    function applyColors() {
      if (!model) return;
      
      console.log('🎨 Applying colors - User Jersey:', userJerseyColor, 'Sleeve:', userSleeveColor, 'Collar:', userCollarColor);
      console.log('🎨 Original GLB colors - Body:', originalBodyColor, 'Sleeve:', originalSleeveColor, 'Collar:', originalCollarColor);
      
      model.traverse((child) => {
        if (!child.isMesh) return;
        
        const name = child.name;
        let colorToUse;
        
        if (isSleeveMesh(name)) {
          // Use user color if modified, otherwise use original GLB color
          if (hasUserModified.sleeve && userSleeveColor) {
            colorToUse = userSleeveColor;
            console.log('  👕 Sleeve (user):', name, '->', colorToUse);
          } else if (originalSleeveColor) {
            colorToUse = originalSleeveColor;
            console.log('  👕 Sleeve (original):', name, '->', colorToUse);
          } else {
            colorToUse = userSleeveColor;
          }
        } else if (isCollarMesh(name)) {
          if (hasUserModified.collar && userCollarColor) {
            colorToUse = userCollarColor;
            console.log('  👔 Collar (user):', name, '->', colorToUse);
          } else if (originalCollarColor) {
            colorToUse = originalCollarColor;
            console.log('  👔 Collar (original):', name, '->', colorToUse);
          } else {
            colorToUse = userCollarColor;
          }
        } else if (isBodyMesh(name)) {
          if (hasUserModified.jersey && userJerseyColor) {
            colorToUse = userJerseyColor;
            console.log('  👕 Body (user):', name, '->', colorToUse);
          } else if (originalBodyColor) {
            colorToUse = originalBodyColor;
            console.log('  👕 Body (original):', name, '->', colorToUse);
          } else {
            colorToUse = userJerseyColor;
          }
        } else {
          colorToUse = userJerseyColor;
        }
        
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat && mat.color) mat.color.set(colorToUse);
            });
          } else {
            child.material.color.set(colorToUse);
          }
        }
      });
    }
    
    // Store original colors from GLB
    function storeOriginalColors(modelObj) {
      modelObj.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        
        const name = child.name;
        const colorHex = '#' + child.material.color.getHexString();
        
        if (isBodyMesh(name)) {
          originalBodyColor = colorHex;
          console.log('📦 Stored original Body color:', originalBodyColor);
        } else if (isSleeveMesh(name)) {
          originalSleeveColor = colorHex;
          console.log('📦 Stored original Sleeve color:', originalSleeveColor);
        } else if (isCollarMesh(name)) {
          originalCollarColor = colorHex;
          console.log('📦 Stored original Collar color:', originalCollarColor);
        }
      });
    }
    
    // Update colors from parent component
    window.updateColors = (j, s, c) => {
      let needsUpdate = false;
      
      if (j !== undefined && j !== userJerseyColor) {
        userJerseyColor = j;
        hasUserModified.jersey = true;
        needsUpdate = true;
        console.log('📨 Jersey color updated to:', j);
      }
      if (s !== undefined && s !== userSleeveColor) {
        userSleeveColor = s;
        hasUserModified.sleeve = true;
        needsUpdate = true;
        console.log('📨 Sleeve color updated to:', s);
      }
      if (c !== undefined && c !== userCollarColor) {
        userCollarColor = c;
        hasUserModified.collar = true;
        needsUpdate = true;
        console.log('📨 Collar color updated to:', c);
      }
      
      if (needsUpdate) {
        applyColors();
      }
    };
    
    // Reset to original GLB colors
    window.resetToOriginal = () => {
      console.log('🔄 Resetting to original GLB colors');
      hasUserModified = { jersey: false, sleeve: false, collar: false };
      applyColors();
    };
    
    // Load model
    const loader = new GLTFLoader();
    const modelUrl = '${modelUrl}';
    
    console.log('🚀 Loading from:', modelUrl);
    
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        console.log('✅ Model loaded');
        
        // Log all mesh names
        model.traverse((child) => {
          if (child.isMesh) {
            console.log('📦 Mesh found:', child.name);
          }
        });
        
        // Store original colors from GLB FIRST
        storeOriginalColors(model);
        
        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the model
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        
        // Scale model
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.2 / maxDim;
        model.scale.setScalar(targetScale);
        
        scene.add(model);
        
        // Apply colors (this will use original GLB colors since no user modifications yet)
        applyColors();
        
        // Calculate new bounds after scaling
        const newBox = new THREE.Box3().setFromObject(model);
        const newSize = newBox.getSize(new THREE.Vector3());
        const newCenter = newBox.getCenter(new THREE.Vector3());
        
        // Position camera
        const cameraDistance = newSize.y * 1.8;
        const targetY = newCenter.y;
        
        camera.position.set(0, targetY, cameraDistance);
        
        // Setup controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.autoRotate = ${autoRotate};
        controls.autoRotateSpeed = ${rotationSpeed};
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.target.set(0, targetY, 0);
        controls.update();
        
        // Hide loading
        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'none';
        
        console.log('✨ Model ready! Original colors preserved. User colors will apply on change.');
      },
      (xhr) => {
        const percent = Math.floor(xhr.loaded / xhr.total * 100);
        const loadingEl = document.getElementById('loading');
        if (loadingEl && percent < 100) {
          loadingEl.innerHTML = \`
            <div class="spinner"></div>
            <span style="font-size:13px;font-weight:600;color:#334155;">Loading \${percent}%</span>
          \`;
        }
      },
      (error) => {
        console.error('❌ Error:', error);
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
          loadingEl.innerHTML = '<span style="color:#DC2626;">Failed to load model</span>';
        }
      }
    );
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    iframe.src = blobUrl;
    containerRef.current.appendChild(iframe);

    return () => URL.revokeObjectURL(blobUrl);
  }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const send = () => {
      try { iframe.contentWindow?.updateColors(jerseyColor, sleeveColor, collarColor); } catch (_) {}
    };
    if (iframe.contentDocument?.readyState === 'complete') {
      send();
    } else {
      iframe.addEventListener('load', send, { once: true });
    }
  }, [jerseyColor, sleeveColor, collarColor]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: backgroundColor,
        borderRadius: '20px',
      }}
    />
  );
}


