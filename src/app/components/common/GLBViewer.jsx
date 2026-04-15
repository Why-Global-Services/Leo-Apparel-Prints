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
  showText = true,
  sleeveColor = '#111111'
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
    iframe.style.display = 'block'; // ✅ prevents inline baseline gap

    const fontFamily = getFontFamily(nameStyleId);
    const autoRotateJS = autoRotate ? 'true' : 'false';
    const showTextJS = showText ? 'true' : 'false';

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: ${backgroundColor};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
    #loading {
      position:absolute; top:50%; left:50%;
      transform:translate(-50%,-50%);
      text-align:center; z-index:10;
      background:rgba(255,255,255,0.97);
      padding:24px 36px; border-radius:18px;
      font-family:system-ui,sans-serif;
      box-shadow:0 8px 32px rgba(0,0,0,0.15);
    }
    .sp {
      width:40px; height:40px;
      border:3px solid #E8820C; border-top-color:transparent;
      border-radius:50%; animation:spin 0.9s linear infinite;
      margin:0 auto 12px;
    }
    @keyframes spin { to { transform:rotate(360deg); } }
    #hint {
      position:absolute; bottom:14px; left:50%;
      transform:translateX(-50%);
      background:rgba(0,0,0,0.5); color:#fff;
      padding:5px 14px; border-radius:20px;
      font-size:11px; font-family:system-ui;
      pointer-events:none; z-index:10; white-space:nowrap;
    }
    #ri {
      position:absolute; top:14px; right:14px;
      background:rgba(255,255,255,0.85); color:#334155;
      padding:4px 10px; border-radius:10px;
      font-size:10px; font-family:system-ui; font-weight:600;
      pointer-events:none; z-index:10;
    }
  </style>
</head>
<body>
  <div id="loading">
    <div class="sp"></div>
    <div id="lm" style="color:#334155;font-weight:600;font-size:13px;">Loading 3D Model...</div>
    <div style="color:#94A3B8;font-size:10px;margin-top:4px;">Please wait</div>
  </div>
  <div id="hint">&#128432; Drag to rotate &middot; Scroll to zoom</div>
 

  <script type="importmap">
  {"imports":{"three":"https://unpkg.com/three@0.150.1/build/three.module.js","three/addons/":"https://unpkg.com/three@0.150.1/examples/jsm/"}}
  </script>

<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color('${backgroundColor}');

// ✅ Camera centered
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.01, 100);
camera.position.set(0, 0, 2.5);

// ✅ Renderer fills container perfectly
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Environment
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
new THREE.TextureLoader().load(
  'https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.jpg',
  (texture) => {
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    texture.dispose();
    pmrem.dispose();
  }
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = false;
controls.enableRotate = true;
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minPolarAngle = Math.PI / 4;     // look slightly up
controls.maxPolarAngle = Math.PI * 0.75;  // look slightly down

let model = null;

// Load model
new GLTFLoader().load(
  window.location.origin + '${glbPath}',
  (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          map: child.material.map || null
        });
      }
    });

    // ✅ Perfect center calculation
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model at origin
    model.position.sub(center);
    model.rotation.y = 0;

    // ✅ Scale to fit nicely
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1.5 / maxDim;
    model.scale.setScalar(scale);

    scene.add(model);

// FINAL PERFECT PRODUCT VIEW
const scaledHeight = size.y * scale;

// perfect vertical center
controls.target.set(0, scaledHeight * 0.35, 0);

// bring camera closer (BIG FIX)
camera.position.set(0, -0.2, 3.0);

controls.update();
    document.getElementById('loading').style.display = 'none';
  },
  undefined,
  (err) => {
    document.getElementById('loading').innerHTML =
      '<b style="color:red">Failed to load model</b>';
  }
);

// ✅ Proper resize handler
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Render loop
(function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();
</script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
    containerRef.current.appendChild(iframe);
    return () => URL.revokeObjectURL(iframe.src);

  }, [glbPath, autoRotate, rotationSpeed, backgroundColor, nameStyleId]);

  useEffect(() => {
    const f = containerRef.current?.firstChild;
    if (!f) return;
    const send = () => {
      try { f.contentWindow?.updateModelColor(jerseyColor); } catch (_) {}
    };
    f.addEventListener('load', send);
    send();
    return () => f.removeEventListener('load', send);
  }, [jerseyColor]);

  useEffect(() => {
    const f = containerRef.current?.firstChild;
    if (!f) return;
    const font = getFontFamily(nameStyleId);
    const send = () => {
      try {
        f.contentWindow?.updateText(playerName, playerNumber, nameColor, numberColor, font, nameVertical);
      } catch (_) {}
    };
    f.addEventListener('load', send);
    send();
    return () => f.removeEventListener('load', send);
  }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameVertical]);

  // ✅ Outer wrapper: flex centering so iframe sits perfectly in parent
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '12px',
      background: backgroundColor,
    }}>
      <div ref={containerRef} style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
      }} />
    </div>
  );
}