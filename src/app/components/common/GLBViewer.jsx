// 'use client';

// import { useEffect, useRef } from 'react';

// export default function GLBViewer({ 
//   glbPath = '/images/jerseys/jersey.glb',
//   autoRotate = true,
//   rotationSpeed = 0.005,
//   backgroundColor = '#E2E8F0'
// }) {
//   const containerRef = useRef(null);
//   const viewerId = useRef(`viewer-${Date.now()}-${Math.random()}`);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Clear any existing content
//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     // Create iframe to load the working test page
//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '12px';
    
//     // Create a simple HTML content that loads the GLB
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { margin: 0; overflow: hidden; font-family: system-ui; }
//           #info {
//             position: absolute;
//             bottom: 10px;
//             left: 10px;
//             background: rgba(0,0,0,0.6);
//             color: white;
//             padding: 4px 8px;
//             border-radius: 4px;
//             font-size: 10px;
//             pointer-events: none;
//             z-index: 100;
//           }
//           .loading {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//             z-index: 10;
//           }
//           .spinner {
//             width: 40px;
//             height: 40px;
//             border: 3px solid #E8820C;
//             border-top-color: transparent;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//             margin: 0 auto 12px auto;
//           }
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="loading" id="loading">
//           <div class="spinner"></div>
//           <p style="color:#64748B; font-size:13px; margin:0;">Loading 3D Model...</p>
//           <p style="color:#94A3B8; font-size:11px; margin-top:8px;">Drag to rotate 360° | Scroll to zoom</p>
//         </div>
//         <div id="info">Initializing...</div>

//         <script type="importmap">
//           {
//             "imports": {
//               "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
//               "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
//             }
//           }
//         </script>

//         <script type="module">
//           import * as THREE from 'three';
//           import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//           import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
          
//           const loadingDiv = document.getElementById('loading');
//           const infoDiv = document.getElementById('info');
          
//           // Setup
//           const scene = new THREE.Scene();
//           scene.background = new THREE.Color('${backgroundColor}');
          
//           const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
//           camera.position.set(0, 0.4, 1.2);
          
//           const renderer = new THREE.WebGLRenderer({ antialias: true });
//           renderer.setSize(window.innerWidth, window.innerHeight);
//           renderer.shadowMap.enabled = true;
//           document.body.appendChild(renderer.domElement);
          
//           const controls = new OrbitControls(camera, renderer.domElement);
//           controls.enableDamping = true;
//           controls.autoRotate = ${autoRotate};
//           controls.autoRotateSpeed = ${rotationSpeed * 100};
//           controls.enableZoom = true;
//           controls.target.set(0, 0.2, 0);
          
//           // Lighting
//           const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//           scene.add(ambientLight);
          
//           const mainLight = new THREE.DirectionalLight(0xffffff, 1);
//           mainLight.position.set(5, 10, 7);
//           mainLight.castShadow = true;
//           scene.add(mainLight);
          
//           const fillLight = new THREE.PointLight(0xffffff, 0.5);
//           fillLight.position.set(0, 0.5, 0);
//           scene.add(fillLight);
          
//           const backLight = new THREE.PointLight(0xffaa66, 0.4);
//           backLight.position.set(0, 0.5, -1);
//           scene.add(backLight);
          
//           // Grid helper
//           const gridHelper = new THREE.GridHelper(1.5, 20, 0x888888, 0xcccccc);
//           gridHelper.position.y = -0.25;
//           scene.add(gridHelper);
          
//           // Load GLB
//           const loader = new GLTFLoader();
//           const glbUrl = window.location.origin + '${glbPath}';
//           infoDiv.textContent = 'Loading: ' + glbUrl;
          
//           loader.load(
//             glbUrl,
//             (gltf) => {
//               const model = gltf.scene;
//               infoDiv.textContent = 'Model loaded!';
              
//               // Calculate bounds
//               const box = new THREE.Box3().setFromObject(model);
//               const center = box.getCenter(new THREE.Vector3());
//               const size = box.getSize(new THREE.Vector3());
              
//               // Position and scale
//               model.position.x = -center.x;
//               model.position.y = -center.y + 0.15;
//               model.position.z = -center.z;
              
//               const targetHeight = 0.6;
//               const scale = targetHeight / size.y;
//               model.scale.set(scale, scale, scale);
              
//               // Improve materials
//               model.traverse((node) => {
//                 if (node.isMesh) {
//                   node.castShadow = true;
//                   node.receiveShadow = true;
//                   if (node.material) {
//                     if (Array.isArray(node.material)) {
//                       node.material.forEach(mat => {
//                         mat.roughness = 0.4;
//                         mat.metalness = 0.1;
//                       });
//                     } else {
//                       node.material.roughness = 0.4;
//                       node.material.metalness = 0.1;
//                     }
//                   }
//                 }
//               });
              
//               scene.add(model);
//               loadingDiv.style.display = 'none';
              
//               controls.target.set(0, 0.2, 0);
//               controls.update();
//             },
//             (progress) => {
//               const percent = (progress.loaded / progress.total) * 100;
//               infoDiv.textContent = \`Loading: \${percent.toFixed(0)}%\`;
//             },
//             (error) => {
//               console.error('Error:', error);
//               infoDiv.textContent = 'Error: ' + error.message;
//               loadingDiv.innerHTML = '<div style="color:#EF4444;">⚠️ Failed to load model</div><p style="color:#64748B; font-size:12px; margin-top:8px;">Check console for details</p>';
//             }
//           );
          
//           // Animation
//           function animate() {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//           }
//           animate();
          
//           // Handle resize
//           window.addEventListener('resize', () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//           });
//         </script>
//       </body>
//       </html>
//     `;
    
//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const blobUrl = URL.createObjectURL(blob);
//     iframe.src = blobUrl;
    
//     containerRef.current.appendChild(iframe);
    
//     return () => {
//       URL.revokeObjectURL(blobUrl);
//     };
//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: '100%',
//         height: '100%',
//         position: 'relative',
//         overflow: 'hidden',
//         borderRadius: '12px',
//         background: backgroundColor
//       }}
//     />
//   );
// }





























// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function GLBViewer({ 
//   glbPath = '/images/jerseys/jersey.glb',
//   autoRotate = true,
//   rotationSpeed = 0.005,
//   backgroundColor = '#E2E8F0',
//   jerseyColor = '#DC2626'
// }) {
//   const containerRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scriptLoadedRef = useRef(false);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     setIsLoading(true);
//     setError(null);

//     // Clear previous content
//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     const containerId = `glb-container-${Date.now()}`;
//     containerRef.current.id = containerId;

//     // Create iframe with the working test page
//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '12px';
    
//     // Create HTML content that will load the GLB and handle color updates
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { margin: 0; overflow: hidden; font-family: system-ui; }
//           #loading {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//             z-index: 10;
//             background: rgba(255,255,255,0.95);
//             padding: 20px 30px;
//             border-radius: 16px;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//             pointer-events: none;
//           }
//           .spinner {
//             width: 40px;
//             height: 40px;
//             border: 3px solid #E8820C;
//             border-top-color: transparent;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//             margin: 0 auto 12px auto;
//           }
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//           #info {
//             position: absolute;
//             bottom: 10px;
//             left: 10px;
//             background: rgba(0,0,0,0.6);
//             backdrop-filter: blur(4px);
//             color: white;
//             padding: 4px 8px;
//             border-radius: 4px;
//             font-size: 10px;
//             pointer-events: none;
//             z-index: 100;
//           }
//           .controls-hint {
//             position: absolute;
//             bottom: 10px;
//             right: 10px;
//             background: rgba(0,0,0,0.5);
//             backdrop-filter: blur(4px);
//             padding: 4px 8px;
//             border-radius: 4px;
//             font-size: 9px;
//             color: white;
//             pointer-events: none;
//           }
//         </style>
//       </head>
//       <body>
//         <div id="loading">
//           <div class="spinner"></div>
//           <div style="color: #64748B; font-size: 13px;">Loading 3D Model...</div>
//           <div style="color: #94A3B8; font-size: 11px; margin-top: 8px;">Drag to rotate 360° | Scroll to zoom</div>
//         </div>
//         <div id="info">Initializing...</div>
//         <div class="controls-hint">🖱️ Drag to rotate | 🔍 Scroll to zoom</div>

//         <script type="importmap">
//           {
//             "imports": {
//               "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
//               "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
//             }
//           }
//         </script>

//         <script type="module">
//           import * as THREE from 'three';
//           import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//           import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
          
//           const loadingDiv = document.getElementById('loading');
//           const infoDiv = document.getElementById('info');
          
//           // Setup scene
//           const scene = new THREE.Scene();
//           scene.background = new THREE.Color('${backgroundColor}');
          
//           const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
//           camera.position.set(0, 0.4, 1.2);
          
//           const renderer = new THREE.WebGLRenderer({ antialias: true });
//           renderer.setSize(window.innerWidth, window.innerHeight);
//           renderer.shadowMap.enabled = true;
//           document.body.appendChild(renderer.domElement);
          
//           const controls = new OrbitControls(camera, renderer.domElement);
//           controls.enableDamping = true;
//           controls.autoRotate = ${autoRotate};
//           controls.autoRotateSpeed = ${rotationSpeed * 100};
//           controls.enableZoom = true;
//           controls.target.set(0, 0.2, 0);
          
//           // Lighting
//           const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//           scene.add(ambientLight);
          
//           const mainLight = new THREE.DirectionalLight(0xffffff, 1);
//           mainLight.position.set(5, 10, 7);
//           mainLight.castShadow = true;
//           scene.add(mainLight);
          
//           const fillLight = new THREE.PointLight(0xffffff, 0.5);
//           fillLight.position.set(0, 0.5, 0);
//           scene.add(fillLight);
          
//           const backLight = new THREE.PointLight(0xffaa66, 0.4);
//           backLight.position.set(0, 0.5, -1);
//           scene.add(backLight);
          
//           // Grid helper
//           const gridHelper = new THREE.GridHelper(1.5, 20, 0x888888, 0xcccccc);
//           gridHelper.position.y = -0.25;
//           scene.add(gridHelper);
          
//           // Store model reference
//           let currentModel = null;
          
//           // Function to update model color
//           window.updateModelColor = function(colorHex) {
//             if (!currentModel) return;
//             const color = new THREE.Color(colorHex);
//             currentModel.traverse((node) => {
//               if (node.isMesh && node.material) {
//                 // Skip logos and sponsors
//                 const nodeName = node.name.toLowerCase();
//                 if (!nodeName.includes('logo') && !nodeName.includes('badge') && !nodeName.includes('sponsor')) {
//                   if (Array.isArray(node.material)) {
//                     node.material.forEach(mat => mat.color.set(color));
//                   } else {
//                     node.material.color.set(color);
//                   }
//                 }
//               }
//             });
//           };
          
//           // Load GLB
//           const loader = new GLTFLoader();
//           const fullUrl = window.location.origin + '${glbPath}';
//           infoDiv.textContent = 'Loading: ' + fullUrl.split('/').pop();
          
//           loader.load(
//             fullUrl,
//             (gltf) => {
//               currentModel = gltf.scene;
//               infoDiv.textContent = '✅ Model loaded!';
//               infoDiv.style.background = 'rgba(16, 185, 129, 0.8)';
              
//               // Calculate bounds
//               const box = new THREE.Box3().setFromObject(currentModel);
//               const center = box.getCenter(new THREE.Vector3());
//               const size = box.getSize(new THREE.Vector3());
              
//               // Position and scale
//               currentModel.position.x = -center.x;
//               currentModel.position.y = -center.y + 0.15;
//               currentModel.position.z = -center.z;
              
//               const targetHeight = 0.6;
//               const scale = targetHeight / size.y;
//               currentModel.scale.set(scale, scale, scale);
              
//               // Enable shadows
//               currentModel.traverse((node) => {
//                 if (node.isMesh) {
//                   node.castShadow = true;
//                   node.receiveShadow = true;
//                 }
//               });
              
//               // Apply initial color
//               window.updateModelColor('${jerseyColor}');
              
//               scene.add(currentModel);
//               loadingDiv.style.display = 'none';
              
//               controls.target.set(0, 0.2, 0);
//               controls.update();
              
//               // Hide info after 2 seconds
//               setTimeout(() => {
//                 infoDiv.style.opacity = '0.5';
//               }, 2000);
//             },
//             (progress) => {
//               const percent = (progress.loaded / progress.total) * 100;
//               infoDiv.textContent = \`Loading: \${percent.toFixed(0)}%\`;
//             },
//             (error) => {
//               console.error('Error:', error);
//               infoDiv.textContent = '❌ Failed to load model';
//               infoDiv.style.background = 'rgba(239, 68, 68, 0.8)';
//               loadingDiv.innerHTML = \`
//                 <div style="color:#EF4444; font-size:14px; margin-bottom:8px;">⚠️ Failed to Load Model</div>
//                 <div style="color:#64748B; font-size:12px;">Make sure the GLB file exists at:<br>${glbPath}</div>
//                 <button onclick="location.reload()" style="margin-top:12px; padding:6px 12px; background:#E8820C; color:white; border:none; border-radius:4px; cursor:pointer;">Retry</button>
//               \`;
//             }
//           );
          
//           // Animation
//           function animate() {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//           }
//           animate();
          
//           // Handle resize
//           window.addEventListener('resize', () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//           });
          
//           // Expose controls for external access
//           window.controls = controls;
//         </script>
//       </body>
//       </html>
//     `;
    
//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const blobUrl = URL.createObjectURL(blob);
//     iframe.src = blobUrl;
//     containerRef.current.appendChild(iframe);
    
//     // Store iframe reference for color updates
//     window.currentIframe = iframe;
//     window.currentIframeUrl = blobUrl;
    
//     return () => {
//       if (window.currentIframeUrl) {
//         URL.revokeObjectURL(window.currentIframeUrl);
//       }
//     };
//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

//   // Update color when jerseyColor changes
//   useEffect(() => {
//     if (window.currentIframe && window.currentIframe.contentWindow) {
//       try {
//         window.currentIframe.contentWindow.updateModelColor(jerseyColor);
//       } catch (e) {
//         console.log('Color update not yet available');
//       }
//     }
//   }, [jerseyColor]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: '100%',
//         height: '100%',
//         position: 'relative',
//         overflow: 'hidden',
//         borderRadius: '12px',
//         background: backgroundColor
//       }}
//     />
//   );
// }





















// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export default function GLBViewer({ 
//   glbPath = '/images/jerseys/jersey.glb',
//   autoRotate = true,
//   rotationSpeed = 0.005,
//   backgroundColor = '#E2E8F0',
//   jerseyColor = '#DC2626',
//   // Text customization props
//   playerName = 'PLAYER',
//   playerNumber = '10',
//   nameColor = '#FFFFFF',
//   numberColor = '#F59E0B',
//   nameStyleId = 'collegiate',
//   nameTextStyle = 'straight',
//   nameVertical = 38,
//   showText = true
// }) {
//   const containerRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Font style mapping
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
//       thin: '"Helvetica", sans-serif',
//       condensed: 'Impact, sans-serif',
//       wide: '"Trebuchet MS", sans-serif'
//     };
//     return fonts[styleId] || '"Arial Black", sans-serif';
//   };

//   useEffect(() => {
//     if (!containerRef.current) return;

//     setIsLoading(true);
//     setError(null);

//     // Clear previous content
//     while (containerRef.current.firstChild) {
//       containerRef.current.removeChild(containerRef.current.firstChild);
//     }

//     const iframe = document.createElement('iframe');
//     iframe.style.width = '100%';
//     iframe.style.height = '100%';
//     iframe.style.border = 'none';
//     iframe.style.borderRadius = '12px';
    
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body { margin: 0; overflow: hidden; font-family: system-ui; }
//           #loading {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//             z-index: 10;
//             background: rgba(255,255,255,0.95);
//             padding: 20px 30px;
//             border-radius: 16px;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//             pointer-events: none;
//           }
//           .spinner {
//             width: 40px;
//             height: 40px;
//             border: 3px solid #E8820C;
//             border-top-color: transparent;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//             margin: 0 auto 12px auto;
//           }
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//           .debug-info {
//             position: absolute;
//             bottom: 10px;
//             left: 10px;
//             background: rgba(0,0,0,0.7);
//             color: #0f0;
//             font-size: 10px;
//             padding: 4px 8px;
//             border-radius: 4px;
//             font-family: monospace;
//             z-index: 100;
//             pointer-events: none;
//           }
//         </style>
//       </head>
//       <body>
//         <div id="loading">
//           <div class="spinner"></div>
//           <div style="color: #64748B; font-size: 13px;">Loading 3D Model...</div>
//           <div style="color: #94A3B8; font-size: 11px; margin-top: 8px;">Drag to rotate 360° | Scroll to zoom</div>
//         </div>
//         <div id="debug" class="debug-info">Initializing...</div>

//         <script type="importmap">
//           {
//             "imports": {
//               "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
//               "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
//             }
//           }
//         </script>

//         <script type="module">
//           import * as THREE from 'three';
//           import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//           import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
          
//           const loadingDiv = document.getElementById('loading');
//           const debugDiv = document.getElementById('debug');
          
//           // Setup scene
//           const scene = new THREE.Scene();
//           scene.background = new THREE.Color('${backgroundColor}');
          
//           const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
//           camera.position.set(0, 0.4, 1.2);
          
//           const renderer = new THREE.WebGLRenderer({ antialias: true });
//           renderer.setSize(window.innerWidth, window.innerHeight);
//           renderer.shadowMap.enabled = true;
//           document.body.appendChild(renderer.domElement);
          
//           const controls = new OrbitControls(camera, renderer.domElement);
//           controls.enableDamping = true;
//           controls.autoRotate = ${autoRotate};
//           controls.autoRotateSpeed = ${rotationSpeed * 100};
//           controls.enableZoom = true;
//           controls.target.set(0, 0.2, 0);
          
//           // Lighting
//           const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//           scene.add(ambientLight);
          
//           const mainLight = new THREE.DirectionalLight(0xffffff, 1);
//           mainLight.position.set(5, 10, 7);
//           mainLight.castShadow = true;
//           scene.add(mainLight);
          
//           const fillLight = new THREE.PointLight(0xffffff, 0.5);
//           fillLight.position.set(0, 0.5, 0);
//           scene.add(fillLight);
          
//           const backLight = new THREE.PointLight(0xffaa66, 0.4);
//           backLight.position.set(0, 0.5, -1);
//           scene.add(backLight);
          
//           // Grid helper
//           const gridHelper = new THREE.GridHelper(1.5, 20, 0x888888, 0xcccccc);
//           gridHelper.position.y = -0.25;
//           scene.add(gridHelper);
          
//           let currentModel = null;
//           let nameTextMesh = null;
//           let numberTextMesh = null;
          
//           // Font mapping
//           const fontMap = {
//             collegiate: '"Arial Black", sans-serif',
//             block: 'Impact, sans-serif',
//             varsity: '"Georgia", serif',
//             athletic: '"Trebuchet MS", sans-serif',
//             sport: '"Verdana", sans-serif',
//             modern: '"Helvetica", sans-serif',
//             retro: '"Courier New", monospace',
//             slim: '"Arial", sans-serif',
//             'bold-con': '"Arial Narrow", sans-serif',
//             serif: '"Times New Roman", serif',
//             thin: '"Helvetica", sans-serif',
//             condensed: 'Impact, sans-serif',
//             wide: '"Trebuchet MS", sans-serif'
//           };
          
//           // Function to create text texture with full styling
//           function createTextTexture(text, color, fontFamily, isCurved = false, fontSize = 50) {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             canvas.width = 1024;
//             canvas.height = 512;
            
//             // Clear canvas (transparent background)
//             ctx.fillStyle = 'rgba(0,0,0,0)';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
            
//             if (isCurved) {
//               // For curved text, create a circular path
//               const centerX = canvas.width / 2;
//               const centerY = canvas.height / 2;
//               const radius = 200;
              
//               const chars = text.toUpperCase().split('');
//               const angleStep = (Math.PI * 1.5) / chars.length;
//               let startAngle = -Math.PI * 0.75;
              
//               ctx.font = \`Bold \${fontSize}px \${fontFamily}\`;
//               ctx.fillStyle = color;
//               ctx.shadowBlur = 0;
              
//               chars.forEach((char, i) => {
//                 const angle = startAngle + i * angleStep;
//                 const x = centerX + Math.cos(angle) * radius;
//                 const y = centerY + Math.sin(angle) * radius;
//                 ctx.save();
//                 ctx.translate(x, y);
//                 ctx.rotate(angle + Math.PI / 2);
//                 ctx.fillText(char, 0, 0);
//                 ctx.restore();
//               });
//             } else {
//               // Straight text
//               ctx.font = \`Bold \${fontSize}px \${fontFamily}\`;
//               ctx.fillStyle = color;
//               ctx.textAlign = 'center';
//               ctx.textBaseline = 'middle';
              
//               // Add outline for better visibility
//               ctx.shadowBlur = 0;
//               ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
              
//               // Add subtle outline
//               ctx.strokeStyle = '#000000';
//               ctx.lineWidth = 3;
//               ctx.strokeText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
//             }
            
//             const texture = new THREE.CanvasTexture(canvas);
//             texture.needsUpdate = true;
//             return texture;
//           }
          
//           // Function to add text to model
//           function addTextToModel(name, number, nameColorHex, numberColorHex, fontFamily, isCurved, verticalPos) {
//             if (!currentModel) return;
            
//             // Remove existing text
//             if (nameTextMesh) currentModel.remove(nameTextMesh);
//             if (numberTextMesh) currentModel.remove(numberTextMesh);
            
//             // Calculate Y position based on vertical position (20-65 range)
//             const yPosition = 0.1 + (verticalPos / 100) * 0.5;
            
//             // Create NAME text
//             const nameTexture = createTextTexture(name, nameColorHex, fontFamily, isCurved, isCurved ? 40 : 50);
//             const nameMaterial = new THREE.MeshStandardMaterial({ 
//               map: nameTexture, 
//               side: THREE.DoubleSide, 
//               transparent: true,
//               emissive: 0x333333,
//               emissiveIntensity: 0.2
//             });
            
//             let nameGeometry, nameScale;
//             if (isCurved) {
//               nameGeometry = new THREE.PlaneGeometry(1.2, 0.5);
//               nameScale = 0.8;
//             } else {
//               nameGeometry = new THREE.PlaneGeometry(1.0, 0.4);
//               nameScale = 0.9;
//             }
            
//             nameTextMesh = new THREE.Mesh(nameGeometry, nameMaterial);
//             nameTextMesh.position.set(0, yPosition, -0.1);
//             nameTextMesh.rotation.y = Math.PI;
//             nameTextMesh.scale.set(nameScale, nameScale, 1);
            
//             // Create NUMBER text
//             const numberTexture = createTextTexture(number, numberColorHex, 'Arial Black', false, 70);
//             const numberMaterial = new THREE.MeshStandardMaterial({ 
//               map: numberTexture, 
//               side: THREE.DoubleSide, 
//               transparent: true,
//               emissive: 0x333333,
//               emissiveIntensity: 0.2
//             });
//             const numberGeometry = new THREE.PlaneGeometry(0.7, 0.5);
//             numberTextMesh = new THREE.Mesh(numberGeometry, numberMaterial);
//             numberTextMesh.position.set(0, yPosition - 0.25, -0.1);
//             numberTextMesh.rotation.y = Math.PI;
            
//             currentModel.add(nameTextMesh);
//             currentModel.add(numberTextMesh);
            
//             debugDiv.textContent = \`Text added: Name: \${name}, Font: \${fontFamily}, Curved: \${isCurved}, Y: \${yPosition.toFixed(2)}\`;
//           }
          
//           // Function to update model color
//           window.updateModelColor = function(colorHex) {
//             if (!currentModel) return;
//             const color = new THREE.Color(colorHex);
//             currentModel.traverse((node) => {
//               if (node.isMesh && node.material && node !== nameTextMesh && node !== numberTextMesh) {
//                 const nodeName = node.name.toLowerCase();
//                 if (!nodeName.includes('logo') && !nodeName.includes('badge') && !nodeName.includes('sponsor')) {
//                   if (Array.isArray(node.material)) {
//                     node.material.forEach(mat => mat.color.set(color));
//                   } else {
//                     node.material.color.set(color);
//                   }
//                 }
//               }
//             });
//           };
          
//           // Function to update text with all parameters
//           window.updateText = function(name, number, nameColorHex, numberColorHex, fontFamily, isCurved, verticalPos) {
//             if (!currentModel) {
//               debugDiv.textContent = 'Model not ready yet...';
//               return;
//             }
//             addTextToModel(name, number, nameColorHex, numberColorHex, fontFamily, isCurved, verticalPos);
//           };
          
//           // Load GLB
//           const loader = new GLTFLoader();
//           const fullUrl = window.location.origin + '${glbPath}';
//           debugDiv.textContent = \`Loading: \${fullUrl}\`;
          
//           loader.load(
//             fullUrl,
//             (gltf) => {
//               currentModel = gltf.scene;
//               debugDiv.textContent = 'Model loaded! Applying text...';
              
//               // Calculate bounds
//               const box = new THREE.Box3().setFromObject(currentModel);
//               const center = box.getCenter(new THREE.Vector3());
//               const size = box.getSize(new THREE.Vector3());
              
//               // Position and scale
//               currentModel.position.x = -center.x;
//               currentModel.position.y = -center.y + 0.15;
//               currentModel.position.z = -center.z;
              
//               const targetHeight = 0.6;
//               const scale = targetHeight / size.y;
//               currentModel.scale.set(scale, scale, scale);
              
//               // Enable shadows
//               currentModel.traverse((node) => {
//                 if (node.isMesh) {
//                   node.castShadow = true;
//                   node.receiveShadow = true;
//                 }
//               });
              
//               // Apply initial color
//               window.updateModelColor('${jerseyColor}');
              
//               // Add text if enabled
//               if (${showText}) {
//                 addTextToModel('${playerName}', '${playerNumber}', '${nameColor}', '${numberColor}', 
//                   '${getFontFamily(nameStyleId)}', ${nameTextStyle === 'curved'}, ${nameVertical});
//               }
              
//               scene.add(currentModel);
//               loadingDiv.style.display = 'none';
              
//               controls.target.set(0, 0.2, 0);
//               controls.update();
              
//               debugDiv.textContent = 'Ready! Drag to rotate 360°';
//               setTimeout(() => {
//                 debugDiv.style.opacity = '0.5';
//               }, 5000);
//             },
//             (progress) => {
//               const percent = (progress.loaded / progress.total) * 100;
//               debugDiv.textContent = \`Loading: \${percent.toFixed(0)}%\`;
//             },
//             (error) => {
//               console.error('Error:', error);
//               debugDiv.textContent = \`Error: \${error.message}\`;
//               loadingDiv.innerHTML = '<div style="color:#EF4444;">⚠️ Failed to load model</div>';
//             }
//           );
          
//           // Animation
//           function animate() {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//           }
//           animate();
          
//           // Handle resize
//           window.addEventListener('resize', () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//           });
//         </script>
//       </body>
//       </html>
//     `;
    
//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const blobUrl = URL.createObjectURL(blob);
//     iframe.src = blobUrl;
//     containerRef.current.appendChild(iframe);
    
//     return () => {
//       URL.revokeObjectURL(blobUrl);
//     };
//   }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

//   // Update color when jerseyColor changes
//   useEffect(() => {
//     const iframe = containerRef.current?.firstChild;
//     if (iframe && iframe.contentWindow) {
//       try {
//         iframe.contentWindow.updateModelColor(jerseyColor);
//       } catch (e) {}
//     }
//   }, [jerseyColor]);

//   // Update text when any text-related prop changes
//   useEffect(() => {
//     const iframe = containerRef.current?.firstChild;
//     if (iframe && iframe.contentWindow) {
//       try {
//         iframe.contentWindow.updateText(
//           playerName, 
//           playerNumber, 
//           nameColor, 
//           numberColor,
//           getFontFamily(nameStyleId),
//           nameTextStyle === 'curved',
//           nameVertical
//         );
//       } catch (e) {}
//     }
//   }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameTextStyle, nameVertical]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: '100%',
//         height: '100%',
//         position: 'relative',
//         overflow: 'hidden',
//         borderRadius: '12px',
//         background: backgroundColor
//       }}
//     />
//   );
// }




















'use client';

import { useEffect, useRef } from 'react';

export default function GLBViewer({ 
  glbPath = '/images/jerseys/jersey.glb',
  autoRotate = true,
  rotationSpeed = 0.005,
  backgroundColor = '#E2E8F0',
  jerseyColor = '#DC2626',
  playerName = 'PLAYER',
  playerNumber = '10',
  nameColor = '#FFFFFF',
  numberColor = '#F59E0B',
  nameStyleId = 'collegiate',
  nameTextStyle = 'straight',
  nameVertical = 38,
  showText = true
}) {
  const containerRef = useRef(null);

  const getFontFamily = (styleId) => {
    const fonts = {
      collegiate: '"Arial Black", sans-serif',
      block: 'Impact, sans-serif',
      varsity: '"Georgia", serif',
      athletic: '"Trebuchet MS", sans-serif',
      sport: '"Verdana", sans-serif',
      modern: '"Helvetica", sans-serif',
      retro: '"Courier New", monospace',
      slim: '"Arial", sans-serif',
      'bold-con': '"Arial Narrow", sans-serif',
      serif: '"Times New Roman", serif',
    };
    return fonts[styleId] || '"Arial Black", sans-serif';
  };

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { margin: 0; overflow: hidden; }
          #loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10;
            background: rgba(255,255,255,0.95);
            padding: 20px 30px;
            border-radius: 16px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #E8820C;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 12px auto;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div id="loading">
          <div class="spinner"></div>
          <div style="color: #64748B;">Loading 3D Model...</div>
          <div style="color: #94A3B8; font-size: 11px; margin-top: 8px;">Drag to rotate 360° | Scroll to zoom</div>
        </div>

        <script type="importmap">
          {
            "imports": {
              "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
              "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
            }
          }
        </script>

        <script type="module">
          import * as THREE from 'three';
          import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
          import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
          
          const loadingDiv = document.getElementById('loading');
          
          const scene = new THREE.Scene();
          scene.background = new THREE.Color('${backgroundColor}');
          
          const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
          camera.position.set(0, 0.4, 1.2);
          
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          document.body.appendChild(renderer.domElement);
          
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.autoRotate = ${autoRotate};
          controls.autoRotateSpeed = ${rotationSpeed * 100};
          controls.enableZoom = true;
          controls.target.set(0, 0.2, 0);
          
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
          scene.add(ambientLight);
          
          const mainLight = new THREE.DirectionalLight(0xffffff, 1);
          mainLight.position.set(5, 10, 7);
          scene.add(mainLight);
          
          const fillLight = new THREE.PointLight(0xffffff, 0.5);
          fillLight.position.set(0, 0.5, 0);
          scene.add(fillLight);
          
          const gridHelper = new THREE.GridHelper(1.5, 20, 0x888888, 0xcccccc);
          gridHelper.position.y = -0.25;
          scene.add(gridHelper);
          
          let currentModel = null;
          let nameMesh = null;
          let numberMesh = null;
          
          function createTextTexture(text, color, fontFamily, fontSize = 50) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1024;
            canvas.height = 512;
            
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = \`Bold \${fontSize}px \${fontFamily}\`;
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
            
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.strokeText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
          }
          
          function addTextToModel(name, number, nameColorHex, numberColorHex, fontFamily, verticalPos) {
            if (!currentModel) return;
            if (nameMesh) currentModel.remove(nameMesh);
            if (numberMesh) currentModel.remove(numberMesh);
            
            const yPos = 0.1 + (verticalPos / 100) * 0.5;
            
            const nameTexture = createTextTexture(name, nameColorHex, fontFamily, 45);
            const nameMaterial = new THREE.MeshStandardMaterial({ map: nameTexture, side: THREE.DoubleSide, transparent: true });
            const nameGeometry = new THREE.PlaneGeometry(0.9, 0.35);
            nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
            nameMesh.position.set(0, yPos, -0.1);
            nameMesh.rotation.y = Math.PI;
            
            const numberTexture = createTextTexture(number, numberColorHex, 'Arial Black', 65);
            const numberMaterial = new THREE.MeshStandardMaterial({ map: numberTexture, side: THREE.DoubleSide, transparent: true });
            const numberGeometry = new THREE.PlaneGeometry(0.7, 0.45);
            numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);
            numberMesh.position.set(0, yPos - 0.25, -0.1);
            numberMesh.rotation.y = Math.PI;
            
            currentModel.add(nameMesh);
            currentModel.add(numberMesh);
          }
          
          window.updateModelColor = function(colorHex) {
            if (!currentModel) return;
            const color = new THREE.Color(colorHex);
            currentModel.traverse((node) => {
              if (node.isMesh && node.material && node !== nameMesh && node !== numberMesh) {
                if (Array.isArray(node.material)) {
                  node.material.forEach(mat => mat.color.set(color));
                } else {
                  node.material.color.set(color);
                }
              }
            });
          };
          
          window.updateText = function(name, number, nameColorHex, numberColorHex, fontFamily, verticalPos) {
            if (!currentModel) return;
            addTextToModel(name, number, nameColorHex, numberColorHex, fontFamily, verticalPos);
          };
          
          const loader = new GLTFLoader();
          const fullUrl = window.location.origin + '${glbPath}';
          
          loader.load(
            fullUrl,
            (gltf) => {
              currentModel = gltf.scene;
              
              const box = new THREE.Box3().setFromObject(currentModel);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              
              currentModel.position.x = -center.x;
              currentModel.position.y = -center.y + 0.15;
              currentModel.position.z = -center.z;
              
              const scale = 0.6 / size.y;
              currentModel.scale.set(scale, scale, scale);
              
              window.updateModelColor('${jerseyColor}');
              
              if (${showText}) {
                addTextToModel('${playerName}', '${playerNumber}', '${nameColor}', '${numberColor}', 
                  '${getFontFamily(nameStyleId)}', ${nameVertical});
              }
              
              scene.add(currentModel);
              loadingDiv.style.display = 'none';
              controls.target.set(0, 0.2, 0);
              controls.update();
            },
            (progress) => {},
            (error) => {
              loadingDiv.innerHTML = '<div style="color:#EF4444;">Failed to load model</div>';
            }
          );
          
          function animate() {
            requestAnimationFrame(animate);
            controls.update();
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
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
    containerRef.current.appendChild(iframe);
    
    return () => { URL.revokeObjectURL(iframe.src); };
  }, [glbPath, autoRotate, rotationSpeed, backgroundColor]);

  useEffect(() => {
    const iframe = containerRef.current?.firstChild;
    if (iframe?.contentWindow) {
      try { iframe.contentWindow.updateModelColor(jerseyColor); } catch(e) {}
    }
  }, [jerseyColor]);

  useEffect(() => {
    const iframe = containerRef.current?.firstChild;
    if (iframe?.contentWindow) {
      try { 
        iframe.contentWindow.updateText(
          playerName, playerNumber, nameColor, numberColor,
          getFontFamily(nameStyleId), nameVertical
        );
      } catch(e) {}
    }
  }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameVertical]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        background: backgroundColor
      }}
    />
  );
}